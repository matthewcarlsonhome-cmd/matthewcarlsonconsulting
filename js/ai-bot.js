/* SkillEngine Assistant chat */
(function () {
    'use strict';

    var form = document.getElementById('chat-form');
    if (!form) return;
    var input = document.getElementById('chat-input');
    var log = document.getElementById('chat-log');
    var status = document.getElementById('chat-status');
    var submit = form.querySelector('button[type="submit"]');
    var endpoint = form.getAttribute('data-endpoint') || 'api/ai-chat.php';
    var sending = false;

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

    function send(prompt) {
        prompt = (prompt || '').trim();
        if (!prompt || sending) return;
        addMessage('user', prompt);
        input.value = '';
        autosize();
        var bubble = addMessage('assistant', 'Thinking…');
        setSending(true);
        setStatus('');
        if (typeof gtag === 'function') gtag('event', 'assistant_message', { event_category: 'engagement' });

        fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({ message: prompt })
        })
            .then(function (res) {
                return res.json().catch(function () { return {}; }).then(function (data) {
                    if (!res.ok) throw new Error(data.error || 'The assistant is unavailable right now.');
                    return data;
                });
            })
            .then(function (data) {
                bubble.textContent = data.message || 'No response received.';
            })
            .catch(function (err) {
                bubble.textContent = 'Sorry, I hit a snag. Please try again in a moment.';
                setStatus(err.message, true);
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

    document.querySelectorAll('[data-prompt]').forEach(function (btn) {
        btn.addEventListener('click', function () {
            send(btn.getAttribute('data-prompt'));
            if (window.matchMedia('(max-width: 900px)').matches) {
                document.getElementById('chat-panel').scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
})();
