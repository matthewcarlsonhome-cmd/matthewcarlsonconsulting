<?php
header('Content-Type: application/json; charset=UTF-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed.']);
    exit;
}

$raw_input = file_get_contents('php://input');
$payload = json_decode($raw_input, true);
$message = isset($payload['message']) ? trim($payload['message']) : '';

if ($message === '') {
    http_response_code(400);
    echo json_encode(['error' => 'Message is required.']);
    exit;
}

$system_prompt = <<<PROMPT
You are SkillEngine, a concise AI assistant that produces reusable Skills for marketing and automation work.
Always respond in this Skill format with clear section labels:

Inputs:
- List the inputs or data needed.

Steps:
- Provide an ordered, actionable sequence to complete the task.

Deliverables:
- List the tangible outputs the user will receive.
PROMPT;

$api_key = getenv('OPENAI_API_KEY');
$model = getenv('OPENAI_MODEL') ?: 'gpt-4o-mini';

if (!$api_key) {
    echo json_encode([
        'reply' => "Inputs:\n- Goal clarification\n- Access details\n\nSteps:\n- Confirm scope\n- Draft plan\n\nDeliverables:\n- Skill outline\n- Next steps"
    ]);
    exit;
}

$request_body = json_encode([
    'model' => $model,
    'messages' => [
        ['role' => 'system', 'content' => $system_prompt],
        ['role' => 'user', 'content' => $message]
    ],
    'temperature' => 0.4
]);

$context = stream_context_create([
    'http' => [
        'method' => 'POST',
        'header' => "Content-Type: application/json\r\nAuthorization: Bearer {$api_key}\r\n",
        'content' => $request_body,
        'timeout' => 30
    ]
]);

$response = file_get_contents('https://api.openai.com/v1/chat/completions', false, $context);

if ($response === false) {
    http_response_code(502);
    echo json_encode(['error' => 'Unable to reach the LLM service.']);
    exit;
}

$data = json_decode($response, true);
$reply = $data['choices'][0]['message']['content'] ?? '';

if ($reply === '') {
    http_response_code(502);
    echo json_encode(['error' => 'LLM response was empty.']);
    exit;
}

echo json_encode(['reply' => $reply]);
