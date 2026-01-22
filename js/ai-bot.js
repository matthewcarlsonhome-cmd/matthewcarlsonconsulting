const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
const chatLog = document.getElementById('chat-log');
const chatStatus = document.getElementById('chat-status');

const state = {
    isSending: false
};

const setStatus = (message, type = 'info') => {
    chatStatus.textContent = message;
    chatStatus.classList.remove('error');
    if (type === 'error') {
        chatStatus.classList.add('error');
    }
};

const scrollChatToBottom = () => {
    chatLog.scrollTop = chatLog.scrollHeight;
};

const createMessage = (role, text) => {
    const message = document.createElement('div');
    message.className = `chat-message ${role}`;

    const avatar = document.createElement('div');
    avatar.className = 'chat-avatar';
    avatar.textContent = role === 'user' ? 'You' : 'AI';

    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble';
    bubble.textContent = text;

    message.appendChild(avatar);
    message.appendChild(bubble);

    chatLog.appendChild(message);
    scrollChatToBottom();

    return bubble;
};

const updateSendState = (isSending) => {
    state.isSending = isSending;
    chatInput.disabled = isSending;
    chatForm.querySelector('button[type="submit"]').disabled = isSending;
};

const parseSseLines = (chunk, onData) => {
    const lines = chunk.split(/\r?\n/);
    for (const line of lines) {
        if (!line.startsWith('data:')) {
            continue;
        }
        const payload = line.replace(/^data:\s*/, '');
        onData(payload);
    }
};

const handleStreamingResponse = async (response, assistantBubble) => {
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';
    let fullText = '';

    while (true) {
        const { value, done } = await reader.read();
        if (done) {
            break;
        }
        buffer += decoder.decode(value, { stream: true });
        const parts = buffer.split(/\n\n/);
        buffer = parts.pop() || '';
        for (const part of parts) {
            parseSseLines(part, (payload) => {
                if (payload === '[DONE]') {
                    return;
                }
                try {
                    const data = JSON.parse(payload);
                    if (data.delta) {
                        fullText += data.delta;
                        assistantBubble.textContent = fullText;
                    }
                    if (data.error) {
                        setStatus(data.error, 'error');
                    }
                } catch (error) {
                    console.error('Unable to parse stream chunk', error);
                }
            });
        }
    }
};

const handleJsonResponse = async (response, assistantBubble) => {
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.error || 'Unable to process request.');
    }
    assistantBubble.textContent = data.message || 'No response available.';
};

const sendPrompt = async (prompt) => {
    const endpoint = chatForm.dataset.endpoint || 'api/ai-chat.php';
    const assistantBubble = createMessage('assistant', 'Thinking...');
    updateSendState(true);
    setStatus('');

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'text/event-stream'
            },
            body: JSON.stringify({ message: prompt })
        });

        if (response.headers.get('content-type')?.includes('text/event-stream')) {
            await handleStreamingResponse(response, assistantBubble);
        } else {
            await handleJsonResponse(response, assistantBubble);
        }
    } catch (error) {
        assistantBubble.textContent = 'Sorry, I hit a snag. Please try again in a moment.';
        setStatus(error.message || 'Something went wrong.', 'error');
    } finally {
        updateSendState(false);
        scrollChatToBottom();
    }
};

chatForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (state.isSending) {
        return;
    }
    const prompt = chatInput.value.trim();
    if (!prompt) {
        return;
    }
    createMessage('user', prompt);
    chatInput.value = '';
    sendPrompt(prompt);
});
