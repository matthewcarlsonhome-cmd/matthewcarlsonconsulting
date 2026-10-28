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

# Version-stamp CSS and JS links so browsers fetch the new files after every upload
# (the server tells browsers to cache them for 7 days).
STAMP=$(date +%Y%m%d%H%M)
for f in deploy/*.html; do
  sed -i -e "s#css/site\.css\"#css/site.css?v=$STAMP\"#" -e "s#js/main\.js\"#js/main.js?v=$STAMP\"#" -e "s#js/ai-bot\.js\"#js/ai-bot.js?v=$STAMP\"#" "$f"
done

echo "deploy/ is ready: ${#FILES[@]} files (asset version $STAMP)."
echo "Note: api/config.php (your Anthropic API key) is NOT included. Leave the copy already on the server in place."
