#!/bin/bash
# Build a clean deploy/ folder containing only the files the web server needs.
# Usage (from the repo root, in Git Bash, macOS Terminal or Linux):  bash scripts/package.sh
# Then upload the CONTENTS of deploy/ to the site root with FileZilla.
set -euo pipefail
cd "$(dirname "$0")/.."

FILES=(
  index.html services.html projects.html about.html faq.html contact.html ai-bot.html
  privacy.html terms.html 404.html ai-readiness-checklist.html
  insights/index.html insights/voice-agent-guardrails.html insights/cost-per-research-pull.html insights/gate-before-fan-out.html
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

# Version-stamp CSS and JS links with a hash of each file's contents, so browsers fetch a
# changed file (the server caches them for 7 days) while unchanged pages stay byte-identical.
stamp() { md5sum "$1" | cut -c1-8; }
CSSV=$(stamp css/site.css); MAINV=$(stamp js/main.js); BOTV=$(stamp js/ai-bot.js)
for f in deploy/*.html deploy/insights/*.html; do
  sed -i -e "s#css/site\.css\"#css/site.css?v=$CSSV\"#" -e "s#js/main\.js\"#js/main.js?v=$MAINV\"#" -e "s#js/ai-bot\.js\"#js/ai-bot.js?v=$BOTV\"#" "$f"
done

# Files changed since the last package (tracked in deploy-manifest.txt at the repo root)
MANIFEST=deploy-manifest.txt
NEW=$(cd deploy && find . -type f | sort | xargs md5sum)
if [ -f "$MANIFEST" ]; then
  echo ""
  echo "Changed since last package (upload these):"
  comm -13 <(sort "$MANIFEST") <(echo "$NEW" | sort) | awk '{print "  " $2}' | sed 's#\./##'
fi
echo "$NEW" > "$MANIFEST"
echo "deploy/ is ready: ${#FILES[@]} files ."
echo "Note: api/config.php (your Anthropic API key) is NOT included. Leave the copy already on the server in place."
