<?php
/**
 * AI Chat Endpoint - Matthew Carlson Consulting
 * Receives chat prompts, applies guardrails, and proxies requests to the LLM API.
 */

// Load API configuration if config.php exists (for environments where .htaccess SetEnv doesn't work)
$configPath = __DIR__ . '/config.php';
if (file_exists($configPath)) {
    require_once $configPath;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(['error' => 'Method not allowed.']);
    exit;
}

header('Content-Type: application/json; charset=utf-8');

$rawBody = file_get_contents('php://input');
$payload = json_decode($rawBody, true);
$message = trim($payload['message'] ?? '');

if ($message === '') {
    http_response_code(400);
    echo json_encode(['error' => 'Message is required.']);
    exit;
}

if (mb_strlen($message) > 2000) {
    http_response_code(400);
    echo json_encode(['error' => 'Message is too long.']);
    exit;
}

$apiKey = getenv('OPENAI_API_KEY');
$model = getenv('OPENAI_MODEL') ?: 'gpt-4o-mini';

if (!$apiKey) {
    http_response_code(500);
    echo json_encode(['error' => 'Server configuration error.']);
    exit;
}

$clientIp = $_SERVER['HTTP_CF_CONNECTING_IP']
    ?? ($_SERVER['HTTP_X_FORWARDED_FOR'] ?? '')
    ?? $_SERVER['REMOTE_ADDR']
    ?? 'unknown';

if (strpos($clientIp, ',') !== false) {
    $clientIp = trim(explode(',', $clientIp)[0]);
}

$rateLimitPath = sys_get_temp_dir() . '/ai-chat-rate-limit.json';
$rateLimitWindow = 300;
$rateLimitMax = 12;
$now = time();
$ipKey = hash('sha256', $clientIp);

$rateHandle = fopen($rateLimitPath, 'c+');
if ($rateHandle) {
    flock($rateHandle, LOCK_EX);
    $contents = stream_get_contents($rateHandle);
    $rateData = $contents ? json_decode($contents, true) : [];
    if (!is_array($rateData)) {
        $rateData = [];
    }

    $timestamps = $rateData[$ipKey] ?? [];
    $timestamps = array_values(array_filter($timestamps, function ($timestamp) use ($now, $rateLimitWindow) {
        return $timestamp > ($now - $rateLimitWindow);
    }));

    if (count($timestamps) >= $rateLimitMax) {
        flock($rateHandle, LOCK_UN);
        fclose($rateHandle);
        http_response_code(429);
        echo json_encode(['error' => 'Rate limit exceeded. Please wait and try again.']);
        exit;
    }

    $timestamps[] = $now;
    $rateData[$ipKey] = $timestamps;

    ftruncate($rateHandle, 0);
    rewind($rateHandle);
    fwrite($rateHandle, json_encode($rateData));
    fflush($rateHandle);
    flock($rateHandle, LOCK_UN);
    fclose($rateHandle);
}

$systemPrompt = implode("\n", [
    'You are the SkillEngine Assistant on the website of Matthew Carlson, an AI Solutions Engineer in Madison, Wisconsin who works with clients across the U.S.',
    'Matthew designs, builds and runs production AI systems for marketing teams, agencies and professional-services firms. Before AI he spent 11 years at Duluth Trading running a $40M+ digital marketing budget that drove $200M+ in annual revenue.',
    'His six solutions: (1) AI agents and workflow engineering, including MCP servers, skill libraries and orchestration with QA gates; (2) voice and chat AI; (3) CRM and marketing automation on GoHighLevel and HubSpot-class platforms; (4) reporting, analytics and ad-ops automation, including Google Ads scripts; (5) AI readiness audits, roadmaps and fractional AI leadership; (6) AI-ready websites and search visibility.',
    'Selected work (client names are confidential; never guess them): a 33-agent client intelligence platform with an 8-tool MCP server and 39 client profiles, running for about $32-42 a month (live); Claude and OpenAI Codex building CRM systems inside GoHighLevel from written specs, including a 3.5-hour unattended run and a two-day build of 351 custom values (tested); an inbound voice AI agent family that passed 11 of 11 first-block checks and a 50+ case test suite (tested); a nightly account-health dashboard with 18 flags and CRM alerts (live); a 15-script Google Ads automation suite saving about 12-15 hours of reporting a week (live); AI research-then-verify client onboarding (pilot); a 104-skill AI library with a gated 9-skill pipeline costing about $4-8 per run (live); a 20+ page website for a healthcare IT consultancy launched in 30 days (shipped); and SkillEngine, a 277-skill AI productivity app built in 31 days.',
    'How he works: written spec first, test environments and test suites before demos, read-only by default for reporting, stop and notify instead of guessing, and every pipeline metered for cost.',
    'Help visitors in two ways: answer questions about Matthew\'s work using only the facts above, and give practical first-pass plans for automating a process with AI (trigger, data, steps, safety rules, how to test, what to keep human).',
    'Never invent projects, clients, metrics or prices. For pricing, timelines or anything specific to the visitor\'s business, suggest booking a call at matthewcarlsonconsulting.com/contact.html.',
    'Safety: Do not request, store, or echo personal data, confidential information, or credentials. If the user shares PII or sensitive data, ask them to remove it and continue with high-level guidance.',
    'Avoid illegal or harmful advice. For legal, medical or financial questions, give a brief refusal and suggest a qualified professional.',
    'Keep responses to 2-4 short paragraphs, using bullets when listing steps. Plain text only, no markdown headings.'
]);

$shouldStream = isset($_SERVER['HTTP_ACCEPT']) && strpos($_SERVER['HTTP_ACCEPT'], 'text/event-stream') !== false;

$requestPayload = [
    'model' => $model,
    'messages' => [
        ['role' => 'system', 'content' => $systemPrompt],
        ['role' => 'user', 'content' => $message]
    ],
    'temperature' => 0.4,
    'stream' => $shouldStream
];

$headers = [
    'Authorization: Bearer ' . $apiKey,
    'Content-Type: application/json'
];

$ch = curl_init('https://api.openai.com/v1/chat/completions');

curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($requestPayload));
curl_setopt($ch, CURLOPT_TIMEOUT, 30);
curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);

if ($shouldStream) {
    header('Content-Type: text/event-stream; charset=utf-8');
    header('Cache-Control: no-cache');
    header('X-Accel-Buffering: no');

    curl_setopt($ch, CURLOPT_WRITEFUNCTION, function ($curl, $data) {
        echo $data;
        if (ob_get_level() > 0) {
            ob_flush();
        }
        flush();
        return strlen($data);
    });

    curl_exec($ch);

    if (curl_errno($ch)) {
        echo "data: " . json_encode(['error' => 'Unable to reach the AI service.']) . "\n\n";
        echo "data: [DONE]\n\n";
    }

    curl_close($ch);
    exit;
}

curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

if (curl_errno($ch)) {
    curl_close($ch);
    http_response_code(502);
    echo json_encode(['error' => 'Unable to reach the AI service.']);
    exit;
}

curl_close($ch);

if ($httpCode >= 400) {
    http_response_code($httpCode);
    $errorData = json_decode($response, true);
    $errorMsg = 'AI service error.';

    if ($httpCode === 401) {
        $errorMsg = 'API authentication failed. Please check the API key configuration.';
    } elseif ($httpCode === 429) {
        $errorMsg = 'OpenAI rate limit exceeded. Please try again later.';
    } elseif ($httpCode === 500 || $httpCode === 502 || $httpCode === 503) {
        $errorMsg = 'OpenAI service temporarily unavailable.';
    } elseif (isset($errorData['error']['message'])) {
        $errorMsg = $errorData['error']['message'];
    }

    echo json_encode(['error' => $errorMsg]);
    exit;
}

$data = json_decode($response, true);
$messageContent = $data['choices'][0]['message']['content'] ?? '';

if ($messageContent === '') {
    http_response_code(500);
    echo json_encode(['error' => 'AI response unavailable.']);
    exit;
}

echo json_encode(['message' => $messageContent]);
