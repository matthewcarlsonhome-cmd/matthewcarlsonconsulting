<?php
/**
 * AI Chat Endpoint - Matthew Carlson Consulting
 * Receives chat prompts, applies guardrails, and proxies requests to the LLM API.
 */

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
    'You are Matthew Carlson Consulting\'s AI assistant for Madison, Wisconsin digital marketing and AI automation.',
    'Offer helpful, concise guidance for marketing strategy, analytics, and automation workflows.',
    'Safety: Do not request, store, or echo personal data, confidential information, or credentials.',
    'If the user provides PII or sensitive data, instruct them to remove it and continue with high-level guidance.',
    'Avoid policy violations, illegal or harmful advice, or instructions that enable wrongdoing.',
    'If asked for sensitive or regulated advice, provide a brief refusal and suggest contacting a professional.',
    'Keep responses to 2-4 short paragraphs with actionable bullets when appropriate.'
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
    echo json_encode(['error' => 'AI service error.']);
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
