document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('bot-form');
    if (!form) {
        return;
    }

    const input = document.getElementById('bot-input');
    const messages = document.getElementById('bot-messages');
    const chips = document.querySelectorAll('.skill-chip');

    const appendMessage = (text, role) => {
        const message = document.createElement('div');
        message.className = `bot-message ${role}`;
        message.textContent = text;
        messages.appendChild(message);
        messages.scrollTop = messages.scrollHeight;
        return message;
    };

    const sendMessage = async (text) => {
        const trimmed = text.trim();
        if (!trimmed) {
            return;
        }

        appendMessage(trimmed, 'user');
        input.value = '';
        input.focus();

        const loadingMessage = appendMessage('Working on that...', 'assistant loading');

        try {
            const response = await fetch('skillengine-bot.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: trimmed })
            });

            if (!response.ok) {
                throw new Error('Request failed');
            }

            const data = await response.json();
            loadingMessage.remove();
            appendMessage(data.reply || 'No response received yet.', 'assistant');
        } catch (error) {
            loadingMessage.remove();
            appendMessage('Sorry, I could not reach the SkillEngine right now. Please try again shortly.', 'assistant');
        }
    };

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        sendMessage(input.value);
    });

    chips.forEach((chip) => {
        chip.addEventListener('click', () => {
            const skill = chip.dataset.skill || chip.textContent;
            sendMessage(skill);
        });
    });
});
