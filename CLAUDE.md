# CLAUDE.md

Matthew Carlson Consulting website. Positioning: **AI Solutions Engineer**. The active plan is `docs/AI-SOLUTIONS-REPOSITIONING-SPEC.md`; read it before changing page content.

## Stack and deploy
- Static HTML/CSS/vanilla JS in the repo root; `css/styles.css` holds design tokens; `js/main.js` shared behavior.
- `api/ai-chat.php` (SkillEngine Assistant proxy, system prompt inside) and `send-mail.php` run on GoDaddy Apache. Redirects go in `.htaccess`.
- Deploy with `upload.sh` / FTP. No build step; don't add frameworks or bundlers.

## Rules
- Nav and footer are shared across every root `*.html`. If `scripts/sync-partials.py` exists, edit `partials/` and run it instead of hand-editing pages.
- Every page keeps a `<title>`, meta description, canonical and OG tags. Every visible FAQ has a matching FAQPage schema entry.
- Metrics and project facts come only from Matthew's skills reference files or the spec. Never invent numbers. Keep each item's status word (Live, Pilot, Tested, Delivered, Shipped).
- Don't publish end-client names (e.g. pool and spa retailers) or client screenshots. Employer/client naming follows Part 8 of the spec.
- Retired positioning stays retired: no Google Shopping/feeds, Meta DPA, Performance Max or n8n services. Google Ads appears only as reporting and optimization automation.
- Voice: plain and specific, numbers with units, no "revolutionize/unlock/cutting-edge/seamless".
- Keep `knowledge-base/projects-summary.md` and `llms.txt` in sync with `projects.html` and `services.html`.
