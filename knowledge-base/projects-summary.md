# Work — Matthew Carlson, AI Solutions Engineer

Generated from projects.html. Client names are confidential.

## Multi-agent client intelligence platform (Live)

One structured, sourced memory of every client, shared by 33 AI agents and reachable from Claude through an MCP server.

- **33** specialized AI agents
- **39** client profiles in production
- **8 tools** in the MCP server
- **~$32–42** per month to operate

**The problem:** Every AI output at the agency started from a blank prompt. Client facts lived in people's heads and drifted, so content came back generic or wrong.
**Results:** Commercial alternatives run $49–249 per user per month; this runs the whole agency for about $32–42. Its QA engine has generated 1,504 field-level suggestions for human review.
**What I built:** A 26-section client schema with field-level provenance; 33 agents reading from that shared memory; A prompt library with versioning: 92 prompts, 94 tracked versions; A document layer with embeddings, and a CRM integration that has cataloged 2,590 assets; An MCP server with token auth and audit logging
**Stack:** TypeScript; Supabase / Postgres; Claude API (tiered model routing); MCP

## Agents that build: CRM construction from a spec with Claude & Codex (Tested)

AI coding agents built a marketing agency's CRM systems directly inside the platform from written specifications, verified at every step.

- **3.5 hrs** unattended Codex build run
- **351** custom values built in two days
- **10** workflows built by Claude from spec
- **<1 min** first lead response in testing

**The problem:** Each CRM template (pipelines, workflows, fields, emails, knowledge base, pages) took contract builders weeks at about $500 per template, and quality varied.
**Results:** A two-day build produced 351 custom values, 20 tags, 21 fields, a 12-stage pipeline, 2 calendars, a 52-entry knowledge base, 11 workflow shells, 28 SMS snippets and 4 pages. The agency put contractor hiring on hold.
**What I learned:** The platform's own AI created data objects but not workflows, so the agents worked in the workflow builder instead. The specification and the gap report are the real product.
**What I built:** A specification format that defines every CRM object; A build method where Claude or Codex constructs those objects in the live platform; API readback and a gap report after each phase; Hard boundaries: test locations only, repeated location checks, no live SMS until a compliance-safe number exists; A QA skill that enrolls test contacts across workflows (23 enrollments across 16 workflows)
**Stack:** Claude Code; OpenAI Codex; GoHighLevel API v2; Python

## Inbound voice AI agent family (Tested)

Phone agents that answer, qualify, book and hand off, tested against 50+ cases before any client demo.

- **11 / 11** first test block passed
- **50+** test cases plus a stop-ship regression
- **6** service branches with matched follow-up texts
- **5** phone agents and a website voice pilot

**The problem:** A retailer with several showrooms was missing calls and wanted every caller qualified and routed, without an AI that quotes prices or gives risky advice.
**Results:** Showroom booking verified on a live call. Defects found in testing, including an emergency response that could be interrupted, were fixed before the client heard the agent. Pricing proposed as a launch fee, a prepaid build and monthly maintenance, with usage at cost.
**What I built:** An agent that books appointments, takes messages and transfers with a spoken summary; A prequalifying flow: full questions for shoppers, two at most for service calls, immediate transfer on request; Consent-gated follow-up texts sent two minutes after the call, matched to the caller's need; Safety rules: no prices, chemical advice or promised dates; the 24-hour number on safety issues
**Stack:** GoHighLevel Voice AI; Conversation AI; CRM workflows

## Account health dashboard & alert bridge (Live)

Every client CRM account checked nightly; problems become tasks in the tool account managers already use.

- **18** health flags per account
- **Nightly** read-only check of every account
- **9,600** open deals analyzed across 27 accounts
- **~1 week** from start to live

**The problem:** Account managers checked client accounts by hand. Silent forms, waiting leads and stalled deals surfaced only when a client complained.
**Results:** The first portfolio read found 81% of 9,600 open deals idle for over 30 days. The fix was three habits (closing deals out, marking losses, clearing dead deals), not a pipeline redesign.
**What I built:** A Python engine that reads every account through read-only tokens into Supabase; Flags compared against each account's own baseline and against peers; A severity-sorted view by account manager with a one-click weekly client update; An alert bridge that creates CRM tasks and emails for silent forms, dropped lead sources and stalled pipelines; A Monday digest: every open issue per client in one email
**Stack:** Python; Supabase; GoHighLevel API; HTML email

## Google Ads automation suite (Live)

Portfolio-wide Google Ads reporting and optimization running on a schedule at the manager-account level.

- **15** production scripts
- **~12,666** lines of code
- **12–15 hrs** of manual reporting saved each week
- **3 weeks** to build

**The problem:** Every account needed audits, pacing checks and search-term reviews each week. Done by hand across a whole portfolio, that work crowded out optimization.
**Results:** Daily, weekly, monthly and quarterly checks now run on their own, and a companion script builds the 25–29 slide weekly client meeting deck from live data.
**What I built:** Account audits and health checks; Budget pacing with automatic adjustment; Search-term analysis and wasted-spend ranking; Structure optimization and conversion-tracking checks
**Stack:** Google Ads Scripts; Google Ads API & GAQL; Google Sheets

## Research-then-verify client onboarding (Pilot)

AI researches a new client before kickoff, and the client corrects a pre-filled profile instead of filling out a long questionnaire.

- **26** sections in each AI research profile
- **<20 min** unattended research run
- **74** fields covered by an automated save test
- **7** tabs in the client onboarding app

**The problem:** Onboarding asked clients for hundreds of fields across long forms. Clients stalled, data arrived incomplete and launches slipped.
**Results:** In pilot with the agency team. Three client pilots must pass a written checklist before any new features are added.
**What I built:** A CRM workflow that fires a webhook; a Claude agent researches the business and posts a report back into the CRM; Research that works without a website, using license records, permits and directories; Stop-and-notify when a listed site is broken or belongs to another company; A confidence label on every field (verified, derived or needs input), and a client review and e-sign flow; Automatic sub-account build when onboarding completes
**Stack:** Claude Routines; Firecrawl; GoHighLevel API & webhooks; Supabase Edge Functions

## 104-skill AI library & orchestration pipeline (Live)

An agency's AI work packaged as versioned, searchable skills, plus a one-prompt pipeline that runs nine of them in a gated sequence.

- **104** packaged skills across 12 categories
- **9** skills in one gated pipeline
- **17** deliverables per pipeline run
- **~$4–8** measured cost per run

**The problem:** Good prompts lived in individual chats. When one early run scaled 43 outputs from an unchecked source, 22 of them had to be regenerated.
**Results:** The library is published as a searchable site with team and priority filters, so each team starts from an adopt-first list.
**What I built:** A versioned skill plugin with a manifest for team rollout; A pipeline that builds a source document, validates and freezes it, then runs parallel steps from it; Gates before scale: a validator, a graded voice sample and a capacity check; A quarterly library audit for duplicates and retirement
**Stack:** Claude skills; Claude Code; Firecrawl; Netlify

## 30-day website launch for a healthcare IT consultancy (Shipped)

Strategy to launch in 30 days as a solo engagement, with accessibility and AI-search groundwork built in.

- **30 days** concept to live
- **20+** pages designed and built
- **WCAG AA** audited before launch
- **1,000+** organic clicks per 28 days within 4 weeks of launch

**The problem:** The firm needed a site that matched its reputation, on a fixed budget of about 60 hours, without losing the search traffic of the old site.
**Results:** Live in one evening via DNS cutover. Organic clicks rose 33% from the launch month to the following month.
**What I built:** A hand-coded WordPress theme with no page builders and sub-second page loads; A redirect map, launch runbook and parallel build with instant rollback; Forms with file uploads, consent gating and invisible anti-spam; llms.txt, FAQ patterns and citable claims for AI search; An AI automation roadmap for the firm's leadership
**Stack:** WordPress (PHP); HTML/CSS/JS; Cloudflare Turnstile; Search Console

## More work

- **Speed-to-lead engine** (Tested): Ten workflows that catch every lead, check business hours and compliance, text first with email fallback and watch response times. First clean test: one text and one email in under a minute
- **Three-bot chat system with shared knowledge bases** (Live): Chat assistants for three brands drawing on six modular knowledge bases with clean scope separation. 163 FAQs · all bots validated above 85% accuracy
- **AI visibility audit products** (Live): Four audits, including an LLM visibility audit that queries ChatGPT, Gemini and Claude with web grounding and scores visibility 0–100. Branded HTML reports from one shared standard
- **Automated monthly client report** (Tested): A Looker Studio dashboard goes in; an internal report, a client-facing report and a pre-filled meeting doc come out. Google Ads, Meta, Analytics and Business Profile in one run
- **Website asset loader** (Tested): Pulls a client's logo, colors, fonts and photos into an organized folder, then bulk-loads them into the CRM media library. About 350 images loaded in 8 minutes
- **Fact-locked AI content** (Live): Diagnosed why in-tool AI copy drifted from verified client facts, then built a context block that every research run now produces. Unverified items excluded by rule
- **AI automation roadmap** (Delivered): A phased automation roadmap and a CRM and HR-system integration readout for a healthcare IT consultancy's leadership and finance teams. Paired with the 30-day website launch
- **SkillEngine** (Shipped): An AI productivity platform that saves your best prompts as reusable skills, with Claude, Gemini and OpenAI behind one interface. 277 skills · 48 pages · built in 31 days · Open the app
- **Media mix model platform** (Shipped): Bayesian media mix modeling with data connectors, data-quality checks and budget scenario planning. Adstock and saturation curves · scenario comparison
