# Site Update Specification — CRM Platform, Client Intelligence & AI Agent Work (Apr–Jul 2026)

**Date:** 2026-07-25
**Status:** Specification — approved copy drafts ready for implementation
**Scope:** Add the past ~3 months of GoHighLevel, API/webhook, Claude Routines, Client Mind, and AI agent work to matthewcarlsonconsulting.com

---

## Part 1 — Research Summary (What Was Accomplished)

Work performed for a Houston-based digital marketing agency (Small Screen Producer / MyLeadHub white-label GoHighLevel platform), April–July 2026. Evidence: Claude Routine configs, Drive specs (client-mind-gap-audit v3.10, onboarding field catalogs, GHL super-agent build prompts), GHL-generated email flows, Hubstaff logs.

### 1. AI Client Intelligence Engine ("Client Mind")
- A 26-section AI-built business intelligence profile ("Mind") for each agency client, built from a URL alone
- Custom Claude Skill (`client-mind-gap-audit`, iterated v3.7 → v3.10) that audits, enriches, or builds any client Mind via:
  - Website crawl (FireCrawl) + external signal sweep: Google Business Profile, Yelp, Houzz, BBB, BuildZoom, state license registries, PHTA, Wayback Machine, WHOIS
  - Competitor scan with differentiation matrix
- Outputs: 26-section Mind, GHL Brand Voice profile, Contact Import CSV, FAQ CSV, onboarding field-audit workbook
- v3.10 execution profiles split the pipeline into ACQUISITION vs PACKAGING layers with 10 independently invocable profiles (CORE-SEED ≤5 min / ≤6 external calls; MIND-CORE; MIND-ACTIVATE; CONTENT-SEED; ADS-SEED; REP-SEED; MAP-GHL; GBP-REFRESH; DIRECTORY-REFRESH; BATCH for client waves)
- Source-tier verification framework (Tier A/B/C), no-fabrication rules, frozen Minds with amendment logs, QA gates
- Field audit workbook deliverable: ~200 onboarding fields mapped to value + verification status + cited source per client

### 2. Webhook-Triggered Autonomous AI Research Agent (Claude Routines × GoHighLevel)
- Production integration: GHL workflow fires a webhook → Claude Routine wakes an autonomous agent → agent researches the business live (site crawl + external sweep) → builds a 16-section email-safe HTML "Client Mini-Mind" report (8 client-facing core sections + 8 internal account-manager sections: meeting brief, brand voice, competitor lookup, personas, customer language, content direction, channel map, directory listings)
- Report archived to Google Drive, then POSTed back to a GHL inbound webhook on a locked 12-key JSON contract → GHL maps fields and emails the report to the account manager
- End-to-end in under 20 minutes, fully unattended
- Engineering details worth citing: payload-as-data security rules, callback-URL-only posting, retry with exponential backoff, per-field provenance badging (CLIENT / MIND / DERIVED / GAP), email-client-safe inline-styled HTML

### 3. 10-Minute Client Onboarding System (GoHighLevel)
- Redesigned agency onboarding from a ~200-field questionnaire into a ~10-minute client experience: Welcome → Verify (15-16 prefilled fields) → Access & Uploads → Book the kickoff call
- Design principle: "the client is asked only what only they can know or decide" — everything researchable is supplied by the Client Mind AI pull, never asked
- 75-field Phase 1 contact data architecture in GHL (custom field catalog with owner/source classification: MIND / CLIENT / AM CALL / DERIVED / CRM / SYSTEM); Phase 2 (~64 fields) designed
- Identity transport: parameterized invite links + header script identity stamping + server-side pairing
- Branded review-and-sign-off email flow built in GHL with Liquid conditional templates ("Business Profile Information For Your Review" → client confirms → internal "Phase 1 signed" snapshot + client confirmation email)
- On completion, automation fan-out with zero further client effort: A2P brand registration, DNS + email authentication via delegate access, snapshot install, list/user imports
- PII security boundary: EIN, logins, credentials never travel through forms — status fields only, values via secure channel

### 4. Agency AI Agent Toolkit (GHL Conversation AI "Super Agents")
- Designed a tiered agent toolkit from an audited 423-skill worksheet: e.g. daily operations brief agent (new leads, stale conversations, pipeline gaps, overdue tasks, unpaid invoices → "Top 5 today"), lead triage & speed-to-lead agent, provisioning and campaign agents
- Safety architecture: least-privilege skill scoping per agent, draft-only write constraints, never-delete rules, mandatory write reporting, per-brand voice anchors, verified-claims-only numbers discipline
- Conversation AI booking bots built and demo-tested with live calendar booking (May 2026)

### 5. Sub-Account Autobuild (GHL API)
- Automated GHL sub-account provisioning/build pipeline with completion notifications ("Subaccount Autobuild Complete")

### 6. GoHighLevel ↔ Claude MCP Integration
- Connected GHL accounts directly to Claude via MCP custom connector (Private Integration Tokens, location-scoped access, per-client `.mcp.json` project configs in Claude Code so each client folder auto-scopes to the right CRM)
- Enables plain-English CRM operations: contact queries, pipeline moves, transaction pulls

### 7. Ongoing client account management
- Google Ads account management for agency clients (paused-campaign/billing rescue, campaign oversight)

---

## Part 2 — Gap Analysis vs. Current Site

| Capability (new) | Current site coverage | Gap |
|---|---|---|
| GoHighLevel / CRM platform automation | None (zero mentions of CRM platforms as a service) | New service section + SEO opportunity ("GoHighLevel consultant") |
| Claude Routines / webhook-triggered autonomous agents | None | Flagship differentiator — almost nobody offers this |
| AI client research / onboarding intelligence | None | New project entry + automation cards |
| Client onboarding automation | Generic "client onboarding sequences" mention | Full case study available |
| Conversation AI agents in CRM | SkillEngine Assistant only (own site) | Extend AI Automation service copy |
| Projects newer than March 2026 | Newest project is MMM (March 2026) | 3 new project entries |

**Anonymization rule for ALL public copy below:** the agency is described as *"a Houston-based digital marketing agency"* (or *"a multi-location home & outdoor living marketing agency"*); the client example as *"a multi-location pool & spa retailer."* Do **not** publish "Small Screen Producer," "MyLeadHub," or client business names unless Matthew obtains written permission. Internal team names and field keys never appear publicly.

---

## Part 3 — Page-by-Page Specification

### A. projects.html — add 3 new projects (top of the list, newest first)

Follow the existing project block pattern (h2 title, meta tags, stats table, The Problem / The Solution, Key Capabilities). Also append each to `knowledge-base/projects-summary.md` so the SkillEngine Assistant can answer questions about them.

#### Project: AI Client Intelligence Engine ("Client Mind")
- **Type:** AI Research & Client Intelligence System · **Status:** In production, July 2026
- **Stats table:** 26 intelligence sections per client · 10+ external data sources · 10 execution profiles · ~5 min fastest pull (full build ~40 min) · ~200 onboarding fields auto-mapped per client
- **Problem:** Agencies onboard clients with long questionnaires and tribal knowledge. Account managers walk into kickoff calls cold; copywriters guess at brand voice; nobody audits what's actually known vs. assumed about a client.
- **Solution:** An AI engine that builds a complete, source-cited business intelligence profile for any client from a URL alone — website crawl, Google Business Profile, review platforms, business registries, directory listings, and archive history — plus a competitor scan with a differentiation matrix. Every fact carries a cited source and confidence tier; anything unverifiable is flagged as a gap for the kickoff call instead of being invented.
- **Capabilities bullets:** 26-section client profile from a URL alone · Source-tiered verification (every fact cited, gaps flagged — never fabricated) · Competitor scan with differentiation matrix · Auto-generated brand voice guide, CRM import files, and client FAQ · Modular execution profiles: 5-minute seed pull to full-depth build · Batch mode for onboarding entire client waves

#### Project: Webhook-Triggered AI Research Agent (CRM × Claude Routines)
- **Type:** Autonomous AI Agent Integration · **Status:** In production, July 2026
- **Stats table:** <20 min end-to-end · 16 report sections · 12-key locked API contract · 100% unattended
- **Problem:** The moment a lead or new client enters the CRM is when research is most valuable — and least likely to happen. Manual research takes hours and doesn't scale.
- **Solution:** A production pipeline where a GoHighLevel workflow fires a webhook that wakes an autonomous Claude agent. The agent researches the business live — website, reviews, competitors, directory presence — assembles a 16-section HTML intelligence report (8 client-facing, 8 internal account-manager sections including a meeting brief and competitor lookup), archives it to Google Drive, and posts it back into the CRM through an inbound webhook, where it's automatically emailed to the account manager. No human touches anything.
- **Capabilities bullets:** CRM workflow → autonomous AI agent → report back in the CRM, in minutes · Meeting brief, personas, competitor table, channel map, directory audit — generated per contact · Per-field provenance badging (client-provided vs. researched vs. gap) · Hardened integration: locked JSON contract, retry with backoff, payload-as-data security rules · Email-client-safe report rendering (inline-styled HTML that survives Gmail/Outlook)

#### Project: 10-Minute Client Onboarding System (CRM Platform)
- **Type:** CRM Data Architecture & Onboarding Automation · **Status:** Launched July 2026
- **Stats table:** ~10 min client experience (down from a ~200-field questionnaire) · 75-field Phase 1 data architecture · 15-16 fields the client actually confirms · 4-step journey
- **Problem:** Agency onboarding asked clients to fill out hundreds of fields across multi-course forms. Clients stalled, data arrived incomplete, and launches slipped.
- **Solution:** Flip the model: AI research pre-fills everything researchable, so the client is asked only what only they can know or decide. A 4-step journey — welcome, verify prefilled profile, grant access & upload assets, book the kickoff call — takes about 10 minutes. On completion, automations fan out in parallel: compliance registration, DNS and email authentication, account template install, and data imports, with zero further client effort. A branded review-and-sign-off email flow (conditional templates built in the CRM) captures approval and distributes internal snapshots automatically.
- **Capabilities bullets:** Research-first design — the client never re-types what AI already found · 75-field CRM data architecture with per-field ownership and provenance · Secure-by-design: credentials and tax IDs never travel through forms · Conditional (Liquid) email templates with e-sign-style confirmation flow · Parallel post-completion automation fan-out (A2P, DNS, snapshot, imports)

### B. services.html — new service section

New `service-showcase` section `id="crm-automation"`, titled **"CRM & GoHighLevel Automation"**, placed after `#workflow-automation`. Copy direction:

- Lead: "Your CRM should run your business, not just record it. We build GoHighLevel systems that provision accounts, onboard clients, research leads, and follow up — automatically."
- Feature bullets: Sub-account provisioning & snapshot automation · Custom field data architecture (75+ field designs) · Workflow + webhook + API integrations · Conversation AI agents (booking bots, lead triage, ops briefs) · AI-powered client research wired into CRM workflows · Connect your CRM to Claude via MCP for plain-English operations
- Also: update `#ai-automation` section copy to mention "autonomous AI agents triggered by your CRM," and add the service to the services hero/list, footer Services column (all pages), and Service schema JSON-LD.

### C. automations.html — extend "All 20 Business Automations" to 24

Add four cards in the existing card format (number, emoji icon, h3, description, benefit line, meta tag):

- **21 · AI Lead Research Report** 🔎 — "New lead hits your CRM; an AI agent researches their business and emails your team a full intelligence report before you ever call." Benefit: "Walk into every call knowing more than the competition." Meta: GHL + Claude Routines
- **22 · Instant Client Onboarding** 🚀 — "AI pre-fills the client's business profile; they confirm 15 fields, grant access, and book a call. Ten minutes, done." Benefit: "Cuts onboarding from weeks to days." Meta: GHL Workflows + AI
- **23 · Sub-Account Autobuild** 🏗️ — "New client signed? Their entire CRM sub-account — pipelines, workflows, templates — builds itself and notifies you when it's live." Benefit: "Zero-touch account provisioning." Meta: GHL API
- **24 · AI Morning Ops Brief** ☀️ — "An AI agent reads your CRM every morning: new leads, conversations waiting too long, stale deals, overdue tasks — ranked into a Top 5." Benefit: "Never miss a hot lead in the noise." Meta: Conversation AI

### D. index.html
- Sample-output / capability copy: add a CRM line, e.g. chat demo message "Research this new lead and brief me before the call" → assistant reply summarizing a generated report; or add "CRM & GoHighLevel automation" to the services grid teaser.
- Trust/audience row: consider adding "Marketing Agencies" if not present (already present — verify).

### E. ai-bot.html (SkillEngine Assistant)
- Add skill chip category: **CRM Automation** (e.g. "Design a lead-intake workflow," "What should my onboarding automate?") — keeps category count balanced; place after AI Workflow Automation.
- Update knowledge base (`knowledge-base/projects-summary.md`) with the 3 new projects so the assistant can discuss them.

### F. faq.html — 2 new questions (+ schema entries)
- **"Do you work with GoHighLevel?"** — Yes; sub-account provisioning, snapshots, custom field architecture, workflows, Conversation AI agents, webhook/API integrations, and connecting GHL to Claude via MCP. Production experience building agency-scale systems.
- **"Can AI agents run automatically from my CRM?"** — Yes; describe the webhook → autonomous agent → report-back pattern (research reports, onboarding intelligence, morning briefs), triggered by CRM workflows with no human in the loop.

### G. about.html
- Schema `knowsAbout`: add "GoHighLevel CRM Automation", "Autonomous AI Agents", "Claude Routines Integration", "CRM Data Architecture"
- Experience copy: add a line about current agency platform work: building AI-powered client-intelligence and onboarding systems for a multi-location marketing agency on GoHighLevel.

### H. SEO / metadata
- Target new queries: "GoHighLevel consultant", "GoHighLevel automation expert", "AI client onboarding automation", "CRM AI agent integration", "Claude Routines integration"
- Update: services.html + automations.html meta description/keywords; sitemap.xml lastmod; llms.txt capability list; Organization/Service schema.

---

## Part 4 — Open Decisions (need Matthew's call before publishing)

1. **Name the agency?** Default: anonymized ("Houston-based digital marketing agency"). Naming Small Screen Producer/MyLeadHub publicly requires their OK.
2. **Client example naming:** Always anonymized ("multi-location pool & spa retailer"). Do not publish client business names.
3. **Metrics:** All numbers above are sourced from internal specs (26 sections, 75 fields, <20 min, ~10 min onboarding, 423-skill audit). Safe to publish as capability claims; avoid revenue/performance claims we can't cite.
4. **Project ordering:** Spec assumes newest-first (the 3 new projects go above SkillEngine). Alternative: keep SkillEngine first as flagship.

## Part 5 — Implementation Order (efficient path)

1. projects.html — 3 new project blocks + knowledge-base update (biggest value, self-contained)
2. automations.html — 4 new cards + count updates ("20" → "24" in h1/h2/meta)
3. services.html — new CRM & GoHighLevel section + footer links across all pages
4. faq.html — 2 Q&As + schema
5. index.html, about.html, ai-bot.html — smaller copy/schema touches
6. SEO pass — meta, sitemap, llms.txt
