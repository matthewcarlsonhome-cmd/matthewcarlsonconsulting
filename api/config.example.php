<?php
/**
 * SkillEngine Assistant configuration - Matthew Carlson Consulting
 *
 * SETUP:
 * 1. Copy this file to api/config.php ON THE SERVER (never commit config.php; it's in .gitignore).
 * 2. Paste your Anthropic API key below. Create one at https://platform.claude.com (Settings -> API keys).
 *
 * The OpenAI key is no longer used; the old OPENAI_* lines can be deleted.
 */

// Anthropic API key - REQUIRED
putenv('ANTHROPIC_API_KEY=sk-ant-your-key-here');

// Model - optional. Default: claude-sonnet-5-5.
// For the cheapest, fastest option use: putenv('ANTHROPIC_MODEL=claude-haiku-5-5');

// Where the private chat log is written - optional.
// Default: a "chat-logs" folder one level ABOVE public_html, so it can't be opened from the web.
// putenv('CHAT_LOG_DIR=/home/USERNAME/chat-logs');
