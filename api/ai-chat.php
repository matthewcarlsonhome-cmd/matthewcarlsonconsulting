<?php
/**
 * SkillEngine Assistant endpoint - Matthew Carlson Consulting
 *
 * Receives the recent conversation from js/ai-bot.js, applies limits, and
 * streams a reply from the Claude Messages API back to the browser as
 * simplified server-sent events:  data: {"delta":"..."}  /  data: {"error":"..."}  /  data: [DONE]
 *
 * Configuration lives in api/config.php on the server (see config.example.php).
 */

$configPath = __DIR__ . '/config.php';
if (file_exists($configPath)) {
    require_once $configPath;
}

const MAX_TURNS = 12;            // most recent messages sent to Claude
const MAX_MESSAGE_CHARS = 2000;  // per message
const MAX_TOTAL_CHARS = 16000;   // whole conversation
const RATE_WINDOW_SECONDS = 300;
const RATE_MAX_REQUESTS = 12;

function fail($status, $message)
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(['error' => $message]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    fail(405, 'Method not allowed.');
}

$payload = json_decode(file_get_contents('php://input'), true);
if (!is_array($payload)) {
    fail(400, 'Invalid request.');
}

// Accept the full recent conversation, or a single message from older clients.
$incoming = $payload['messages'] ?? null;
if (!is_array($incoming)) {
    $incoming = [['role' => 'user', 'content' => (string)($payload['message'] ?? '')]];
}

$messages = [];
foreach (array_slice($incoming, -MAX_TURNS) as $turn) {
    $role = $turn['role'] ?? '';
    $text = trim((string)($turn['content'] ?? ''));
    if (!in_array($role, ['user', 'assistant'], true) || $text === '') {
        continue;
    }
    if (mb_strlen($text) > MAX_MESSAGE_CHARS) {
        if ($role === 'user') {
            fail(400, 'Message is too long. Please keep it under ' . MAX_MESSAGE_CHARS . ' characters.');
        }
        $text = mb_substr($text, 0, MAX_MESSAGE_CHARS);
    }
    // The API needs alternating roles; merge any repeats.
    $last = count($messages) - 1;
    if ($last >= 0 && $messages[$last]['role'] === $role) {
        $messages[$last]['content'] .= "\n\n" . $text;
    } else {
        $messages[] = ['role' => $role, 'content' => $text];
    }
}
while ($messages && $messages[0]['role'] !== 'user') {
    array_shift($messages);
}
if (!$messages || end($messages)['role'] !== 'user') {
    fail(400, 'Message is required.');
}
$total = array_sum(array_map(fn($m) => mb_strlen($m['content']), $messages));
while ($total > MAX_TOTAL_CHARS && count($messages) > 1) {
    $removed = array_splice($messages, 0, 2);
    $total -= array_sum(array_map(fn($m) => mb_strlen($m['content']), $removed));
}

$apiKey = getenv('ANTHROPIC_API_KEY');
if (!$apiKey) {
    fail(500, 'The assistant is not configured yet.');
}
$model = getenv('ANTHROPIC_MODEL') ?: 'claude-sonnet-5-5';
$apiUrl = getenv('ANTHROPIC_API_URL') ?: 'https://api.anthropic.com/v1/messages';

// ---- Rate limit (per visitor, by hashed IP) ----
$clientIp = $_SERVER['HTTP_CF_CONNECTING_IP'] ?? $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$clientIp = trim(explode(',', $clientIp)[0]);
$visitor = substr(hash('sha256', $clientIp . '|' . __DIR__), 0, 16);

$rateHandle = fopen(sys_get_temp_dir() . '/ai-chat-rate-limit.json', 'c+');
if ($rateHandle) {
    flock($rateHandle, LOCK_EX);
    $rateData = json_decode(stream_get_contents($rateHandle) ?: '[]', true) ?: [];
    $now = time();
    foreach ($rateData as $key => $stamps) {
        $rateData[$key] = array_values(array_filter($stamps, fn($t) => $t > $now - RATE_WINDOW_SECONDS));
        if (!$rateData[$key]) {
            unset($rateData[$key]);
        }
    }
    $limited = count($rateData[$visitor] ?? []) >= RATE_MAX_REQUESTS;
    if (!$limited) {
        $rateData[$visitor][] = $now;
    }
    ftruncate($rateHandle, 0);
    rewind($rateHandle);
    fwrite($rateHandle, json_encode($rateData));
    flock($rateHandle, LOCK_UN);
    fclose($rateHandle);
    if ($limited) {
        fail(429, "You've sent a lot of messages in a short time. Please wait a few minutes and try again.");
    }
}

// ---- Instructions + site knowledge (cached by the API between requests) ----
$instructions = implode("\n", [
    "You are the SkillEngine Assistant on the website of Matthew Carlson, an AI Solutions Engineer and Forward Deployed Engineer in Madison, Wisconsin who works with clients across the U.S. Forward deployed means he embeds with the client's team and builds inside their systems and data; deliverables are working systems the team owns.",
    "Below the line marked SITE CONTENT is the full text of Matthew's website: his solutions, case studies with real numbers and status labels, background, principles and FAQ. It is your only source of facts about Matthew and his work.",
    "You help visitors in two ways: (1) answer questions about Matthew's work, citing specific projects, numbers and status labels from the site content; (2) give practical first-pass plans for using AI on a process the visitor describes: the trigger, the data it needs, the steps, safety rules, how to test it, and what should stay human. Where one of Matthew's projects is relevant, mention it and link its page.",
    "Rules:",
    "- Never invent projects, clients, metrics, prices or timelines. If the site content doesn't say, say you don't know and suggest a call.",
    "- Client names are confidential. Never guess or reveal them.",
    "- For pricing, timelines or anything specific to the visitor's business, suggest booking a call at https://matthewcarlsonconsulting.com/contact.html.",
    "- Do not ask for or repeat personal data, credentials or confidential information. If a visitor shares some, ask them to remove it and continue at a general level.",
    "- Decline illegal or harmful requests. For legal, medical or financial questions, say briefly that a qualified professional should answer.",
    "- Stay on topic: AI, automation, marketing operations, analytics and Matthew's work. Politely redirect anything else.",
    "Style: plain, specific and friendly. Usually 2-4 short paragraphs; use short bullet lists for steps. Plain text only: no Markdown headings, bold markers or tables. Write links as full URLs.",
]);
$siteContent = @file_get_contents(dirname(__DIR__) . '/llms-full.txt');
$system = $instructions . "\n\n==== SITE CONTENT ====\n\n" . ($siteContent ?: '(Site content unavailable. Answer only general questions and suggest the contact page for anything about Matthew.)');

$requestBody = [
    'model' => $model,
    'max_tokens' => 4096,
    'stream' => true,
    'system' => [
        ['type' => 'text', 'text' => $system, 'cache_control' => ['type' => 'ephemeral']],
    ],
    'messages' => $messages,
    'output_config' => ['effort' => 'low'],
];
$headers = [
    'x-api-key: ' . $apiKey,
    'anthropic-version: 2026-10-21',
    'content-type: application/json',
];
// If the model declines a message, let the API retry it on Anthropic's recommended model.
// Haiku has no server-side fallback, so this is only sent for Sonnet and Opus.
if (preg_match('/^claude-(sonnet|opus)-/', $model)) {
    $requestBody['fallbacks'] = 'default';
    $headers[] = 'anthropic-beta: server-side-fallback-2026-07-01';
}

// ---- Stream the reply ----
@ini_set('zlib.output_compression', '0');
@ini_set('output_buffering', 'off');
while (ob_get_level() > 0) {
    ob_end_flush();
}
header('Content-Type: text/event-stream; charset=utf-8');
header('Cache-Control: no-cache');
header('X-Accel-Buffering: no');

function emit($data)
{
    echo 'data: ' . (is_string($data) ? $data : json_encode($data)) . "\n\n";
    flush();
}

$state = ['status' => 0, 'buffer' => '', 'errorBody' => '', 'reply' => '', 'stop' => '', 'usage' => []];

$ch = curl_init($apiUrl);
curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_HTTPHEADER => $headers,
    CURLOPT_POSTFIELDS => json_encode($requestBody),
    CURLOPT_CONNECTTIMEOUT => 10,
    CURLOPT_TIMEOUT => 90,
    CURLOPT_HEADERFUNCTION => function ($curl, $header) use (&$state) {
        if (preg_match('#^HTTP/\S+\s+(\d{3})#', $header, $m)) {
            $state['status'] = (int)$m[1];
        }
        return strlen($header);
    },
    CURLOPT_WRITEFUNCTION => function ($curl, $chunk) use (&$state) {
        if ($state['status'] >= 400) {
            $state['errorBody'] .= $chunk;
            return strlen($chunk);
        }
        $state['buffer'] .= $chunk;
        while (($pos = strpos($state['buffer'], "\n\n")) !== false) {
            $event = substr($state['buffer'], 0, $pos);
            $state['buffer'] = substr($state['buffer'], $pos + 2);
            foreach (explode("\n", $event) as $line) {
                if (strncmp($line, 'data:', 5) !== 0) {
                    continue;
                }
                $data = json_decode(trim(substr($line, 5)), true);
                $type = $data['type'] ?? '';
                if ($type === 'content_block_delta' && ($data['delta']['type'] ?? '') === 'text_delta') {
                    $state['reply'] .= $data['delta']['text'];
                    emit(['delta' => $data['delta']['text']]);
                } elseif ($type === 'message_start') {
                    $state['usage'] = $data['message']['usage'] ?? [];
                } elseif ($type === 'message_delta') {
                    $state['stop'] = $data['delta']['stop_reason'] ?? '';
                    $state['usage']['output_tokens'] = $data['usage']['output_tokens'] ?? null;
                } elseif ($type === 'error') {
                    $state['stop'] = 'error:' . ($data['error']['type'] ?? 'unknown');
                    emit(['error' => 'The assistant is busy right now. Please try again in a moment.']);
                }
            }
        }
        return strlen($chunk);
    },
]);
curl_exec($ch);
$curlError = curl_errno($ch) ? curl_error($ch) : '';
curl_close($ch);

if ($curlError !== '' && $state['reply'] === '') {
    $state['stop'] = 'network_error';
    emit(['error' => 'Unable to reach the assistant service. Please try again.']);
} elseif ($state['status'] >= 400) {
    $apiError = json_decode($state['errorBody'], true)['error']['type'] ?? '';
    $state['stop'] = 'http_' . $state['status'] . ($apiError ? ':' . $apiError : '');
    $messageForVisitor = in_array($state['status'], [429, 500, 529], true)
        ? 'The assistant is busy right now. Please try again in a moment.'
        : 'The assistant is unavailable right now. Please use the contact page instead.';
    emit(['error' => $messageForVisitor]);
} elseif ($state['stop'] === 'refusal') {
    emit(['delta' => ($state['reply'] === '' ? '' : "\n\n") . "I can't help with that one. Feel free to ask about AI automation or Matthew's work instead."]);
} elseif ($state['stop'] === 'max_tokens') {
    emit(['delta' => "\n\n(Reply cut short. Ask me to continue.)"]);
}
emit('[DONE]');

// ---- Private log of questions and answers ----
// Default location is outside the web root (one level above public_html); override with CHAT_LOG_DIR.
$logDir = getenv('CHAT_LOG_DIR') ?: dirname(__DIR__, 2) . '/chat-logs';
if (!is_dir($logDir)) {
    @mkdir($logDir, 0700, true);
}
if (is_dir($logDir) && is_writable($logDir)) {
    $entry = [
        'time' => gmdate('c'),
        'conversation' => substr(preg_replace('/[^a-zA-Z0-9-]/', '', (string)($payload['conversation_id'] ?? '')), 0, 40),
        'turn' => count($messages),
        'question' => end($messages)['content'],
        'answer' => $state['reply'],
        'status' => $state['stop'] ?: 'ok',
        'model' => $model,
        'tokens' => [
            'input' => $state['usage']['input_tokens'] ?? null,
            'cache_read' => $state['usage']['cache_read_input_tokens'] ?? null,
            'cache_write' => $state['usage']['cache_creation_input_tokens'] ?? null,
            'output' => $state['usage']['output_tokens'] ?? null,
        ],
    ];
    // Keep 12 months of monthly files (matches the privacy policy).
    $oldest = gmdate('Y-m', strtotime('-12 months'));
    foreach (glob($logDir . '/chat-*.jsonl') ?: [] as $file) {
        if (substr(basename($file, '.jsonl'), 5) < $oldest) {
            @unlink($file);
        }
    }
    @file_put_contents($logDir . '/chat-' . gmdate('Y-m') . '.jsonl', json_encode($entry, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) . "\n", FILE_APPEND | LOCK_EX);
}
