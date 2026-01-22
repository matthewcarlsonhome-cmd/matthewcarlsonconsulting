<?php
/**
 * API Configuration - Matthew Carlson Consulting
 *
 * SETUP INSTRUCTIONS:
 * 1. Copy this file to 'config.php' in the same directory
 * 2. Replace 'your-api-key-here' with your actual OpenAI API key
 * 3. NEVER commit config.php to version control (it's in .gitignore)
 *
 * Get your API key at: https://platform.openai.com/api-keys
 */

// OpenAI API Key - REQUIRED
putenv('OPENAI_API_KEY=your-api-key-here');

// Model to use (optional - defaults to gpt-4o-mini)
// putenv('OPENAI_MODEL=gpt-4o-mini');
