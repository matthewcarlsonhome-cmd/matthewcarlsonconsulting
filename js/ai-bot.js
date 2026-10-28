/* SkillEngine Assistant chat */
(function () {
    'use strict';

    var form = document.getElementById('chat-form');
    if (!form) return;
    var input = document.getElementById('chat-input');
    var log = document.getElementById('chat-log');
    var status = document.getElementById('chat-status');
    var submit = form.querySelector('button[type="submit"]');
    var resetBtn = document.getElementById('chat-reset');
    var endpoint = form.getAttribute('data-endpoint') || 'api/ai-chat.php';
    var greeting = log.innerHTML;
    var MAX_HISTORY = 12;

    var history = [];
    var conversationId = newId();
    var sending = false;

    function newId() {
        try { return crypto.randomUUID(); } catch (e) { return String(Date.now()) + Math.random().toString(16).slice(2); }
    }

    function setStatus(text, isError) {
        status.textContent = text || '';
        status.classList.toggle('error', Boolean(isError));
    }

    function addMessage(role, text) {
        var row = document.createElement('div');
        row.className = 'chat-message ' + role;
        var avatar = document.createElement('div');
        avatar.className = 'chat-avatar';
        avatar.setAttribute('aria-hidden', 'true');
        avatar.textContent = role === 'user' ? 'You' : 'AI';
        var bubble = document.createElement('div');
        bubble.className = 'chat-bubble';
        bubble.textContent = text;
        row.appendChild(avatar);
        row.appendChild(bubble);
        log.appendChild(row);
        log.scrollTop = log.scrollHeight;
        return bubble;
    }

    function setSending(value) {
        sending = value;
        input.disabled = value;
        submit.disabled = value;
        log.setAttribute('aria-busy', String(value));
    }

    function readStream(res, bubble) {
        var reader = res.body.getReader();
        var decoder = new TextDecoder();
        var buffer = '';
        var text = '';
        var errorMessage = '';

        function handle(block) {
            block.split('\n').forEach(function (line) {
                if (line.indexOf('data:') !== 0) return;
                var data = line.slice(5).trim();
                if (!data || data === '[DONE]') return;
                try {
                    var obj = JSON.parse(data);
                    if (obj.delta) {
                        text += obj.delta;
                        bubble.textContent = text;
                        log.scrollTop = log.scrollHeight;
                    }
                    if (obj.error) errorMessage = obj.error;
                } catch (e) { /* ignore a malformed line */ }
            });
        }

        function pump() {
            return reader.read().then(function (result) {
                if (result.done) {
                    if (buffer) handle(buffer);
                    return { text: text, error: errorMessage };
                }
                buffer += decoder.decode(result.value, { stream: true });
                var parts = buffer.split('\n\n');
                buffer = parts.pop();
                parts.forEach(handle);
                return pump();
            });
        }
        return pump();
    }

    function send(prompt) {
        prompt = (prompt || '').trim();
        if (!prompt || sending) return;
        addMessage('user', prompt);
        history.push({ role: 'user', content: prompt });
        input.value = '';
        autosize();
        var bubble = addMessage('assistant', 'Thinking…');
        setSending(true);
        setStatus('');
        if (typeof gtag === 'function') gtag('event', 'assistant_message', { event_category: 'engagement' });

        fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'text/event-stream' },
            body: JSON.stringify({ messages: history.slice(-MAX_HISTORY), conversation_id: conversationId })
        })
            .then(function (res) {
                var type = res.headers.get('content-type') || '';
                if (type.indexOf('text/event-stream') !== -1 && res.body) return readStream(res, bubble);
                return res.json().catch(function () { return {}; }).then(function (data) {
                    if (!res.ok || data.error) return { text: '', error: data.error || 'The assistant is unavailable right now.' };
                    bubble.textContent = data.message || '';
                    return { text: data.message || '', error: '' };
                });
            })
            .then(function (result) {
                if (result.text) {
                    history.push({ role: 'assistant', content: result.text });
                } else {
                    history.pop();
                    bubble.textContent = 'Sorry, I couldn\'t answer that just now.';
                }
                if (result.error) setStatus(result.error, true);
            })
            .catch(function () {
                history.pop();
                bubble.textContent = 'Sorry, I couldn\'t answer that just now.';
                setStatus('Connection problem. Please check your internet and try again.', true);
            })
            .then(function () {
                setSending(false);
                input.focus();
                log.scrollTop = log.scrollHeight;
            });
    }

    function autosize() {
        input.style.height = 'auto';
        input.style.height = Math.min(input.scrollHeight, 160) + 'px';
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        send(input.value);
    });

    input.addEventListener('input', autosize);
    input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            send(input.value);
        }
    });

    if (resetBtn) {
        resetBtn.addEventListener('click', function () {
            if (sending) return;
            history = [];
            conversationId = newId();
            log.innerHTML = greeting;
            setStatus('');
            input.focus();
        });
    }

    document.querySelectorAll('[data-prompt]').forEach(function (btn) {
        btn.addEventListener('click', function () {
            send(btn.getAttribute('data-prompt'));
            if (window.matchMedia('(max-width: 900px)').matches) {
                document.getElementById('chat-panel').scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
})();
