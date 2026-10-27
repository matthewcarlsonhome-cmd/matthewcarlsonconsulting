# CLAUDE.md

Matthew Carlson Consulting website. Positioning: **AI Solutions Engineer**. Background plan: `docs/AI-SOLUTIONS-REPOSITIONING-SPEC.md` (implemented October 2026).

## Stack and deploy
- Static HTML/vanilla JS in the repo root. All styles live in `css/site.css` (design tokens at the top, dark mode via `prefers-color-scheme`). Shared behavior is in `js/main.js`; the assistant chat is in `js/ai-bot.js`.
- `api/ai-chat.php` (assistant proxy; the system prompt inside it holds the assistant's facts) and `send-mail.php` run on GoDaddy Apache. `api/config.php` with the OpenAI key exists only on the server. Redirects and the 404 page are configured in `.htaccess`.
- Deploy: `bash scripts/package.sh` builds `deploy/`, which is uploaded with FileZilla per `DEPLOYMENT.md`. Add any new public file to the list in `scripts/package.sh`.
- No build step. Don't add frameworks or bundlers.

## Rules
- Nav and footer live in `partials/`. Edit them there, then run `python3 scripts/sync-partials.py`. Never hand-edit between the `NAV`/`FOOTER` markers.
- Every page keeps a `<title>`, meta description, canonical and OG tags. Every visible FAQ has a matching FAQPage schema entry.
- Metrics and project facts come only from Matthew's skills reference files. Never invent numbers. Keep each item's status word (Live, Pilot, Tested, Delivered, Shipped).
- **No named clients.** Describe them generically ("a marketing agency", "a healthcare IT consultancy", "a multi-location retailer"). Past employers (Duluth Trading, Epic Systems) may be named. No client screenshots.
- Retired positioning stays retired: no Google Shopping/feeds, Meta DPA, Performance Max or n8n services. Google Ads appears only as reporting and optimization automation.
- Voice: first person, plain and specific, numbers with units. Avoid "revolutionize", "unlock", "cutting-edge" and "seamless".
- When projects change, update `projects.html`, `llms.txt`, the system prompt in `api/ai-chat.php` and `knowledge-base/projects-summary.md` together.
