#!/bin/bash
# Build a clean deploy/ folder containing only the files the web server needs.
# Usage (from the repo root, in Git Bash, macOS Terminal or Linux):  bash scripts/package.sh
# Then upload the CONTENTS of deploy/ to the site root with FileZilla.
set -euo pipefail
cd "$(dirname "$0")/.."

FILES=(
  index.html services.html projects.html about.html faq.html contact.html ai-bot.html
  privacy.html terms.html 404.html
  send-mail.php .htaccess robots.txt sitemap.xml llms.txt llms-full.txt
  css/site.css js/main.js js/ai-bot.js
  assets/favicon.svg assets/logo.svg assets/matthew-carlson.jpg assets/MMMExecutiveDashboard.png
  api/ai-chat.php
)

rm -rf deploy
for f in "${FILES[@]}"; do
  mkdir -p "deploy/$(dirname "$f")"
  cp "$f" "deploy/$f"
done

echo "deploy/ is ready: ${#FILES[@]} files."
echo "Note: api/config.php (your OpenAI key) is NOT included. Leave the copy already on the server in place."
