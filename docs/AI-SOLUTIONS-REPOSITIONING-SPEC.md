# Site Repositioning Spec: AI Solutions Engineer

**Date:** 2026-10-14
**Supersedes:** `docs/SITE-UPDATE-SPEC-CRM-AI-INTEGRATIONS.md` (July 2026). Its project drafts are folded into Part 5 below.
**Sources:** `Matthew_Carlson_Skills_Reference_MASTER.md` (Sep 22, 2026), `..._CURRENT_2026-08-10_to_09-21.md`, `..._8-13-26.md`, `Website_Build_Skill_Reference.pdf` (Evergreen), and a full audit of this repository, which is the source deployed to matthewcarlsonconsulting.com. The live domain could not be fetched from the build environment (proxy block), so the audit was run against the repo.

**How to use this document:** Parts 1-4 are the strategy and the page-by-page specification. Part 7 is the build guide: phased, PR-sized steps with paste-ready Claude Code prompts and acceptance checks. Part 8 lists the decisions Matthew needs to make before launch.

---

## Part 1. The Positioning

### 1.1 The problem with the current site

The site currently reads as a **Madison digital-marketing freelancer who also does some AI**. The evidence:

| Signal | Where | What a buyer concludes |
|---|---|---|
| Meta description: "Custom n8n workflows, Google Shopping feeds, Meta ads, Performance Max. Fast deployment for local businesses." | `index.html` | Local PPC and feed freelancer |
| 7 service sections, 3 of them ad-platform services (Google Shopping & LIA, Meta DPA, Performance Max) | `services.html`, home services grid | Media buyer |
| "Feed optimization" as the first "What AI automation delivers" card | `index.html` | Feed specialist |
| Automations page of 20 generic SMB automations (missed-call text-back, waitlist manager, expense receipts) | `automations.html` | Template reseller competing on price |
| `llms.txt` lists Google Shopping, Meta Dynamic Ads, Performance Max as the four services | `llms.txt` | AI answer engines will describe him as a PPC/feed consultant |
| Newest project on the site is from March 2026; 6 months of the strongest work (Client Mind, Voice AI, agent-built CRM systems, Account Health Dashboard, Evergreen) is absent | `projects.html` | Portfolio looks stale and small (5 projects) |

The actual record is far stronger than the site: the AI layer of an agency (33-agent platform, MCP server, 104 packaged skills, voice agents, autonomous agent builds inside a CRM), a 30-day solo enterprise website launch, and 11 years running a $40M+ budget. The site undersells all of it.

### 1.2 The new position

**Category:** AI Solutions Engineer / AI Solutions Provider.

**Positioning statement (internal):**
> For marketing-driven businesses and agencies that know AI should be doing more of their work but can't get past demos, Matthew Carlson designs, builds and runs production AI systems: agents, voice and chat assistants, CRM automation and reporting pipelines. Unlike AI generalists, he spent 11 years running a $40M+ marketing budget, so every system is scoped against revenue and operating hours, and it ships with tests, verification gates and a known cost per run.

**The wedge (what nobody else on page one can say):** *Operator who builds.* He has owned the P&L side (Duluth Trading: $40M+ budget, $200M+ revenue) and has shipped the engineering side (production agents, MCP servers, voice AI). Most AI consultants are one or the other.

**Proof pillars (repeat these everywhere, in this order):**
1. **Production, not prototypes.** Live systems with status labels: Client Mind (33 agents, 39 client minds), Account Health Dashboard (every client account nightly), Google Ads suite (15 scripts, ~12-15 hours/week of manual reporting eliminated).
2. **Agents that build.** Claude and OpenAI Codex constructing CRM workflows, pipelines and knowledge bases from written specifications, with verification gates. This is the most novel thing on the site; feature it.
3. **Engineering discipline.** Test suites before demos (50+ case voice AI suite), read-only by default, stop-and-notify instead of guessing, cost metered per run (~$4-8 per client research pull).
4. **Marketing operator DNA.** $40M+ budget, holdout tests proving 25% incremental lift, attribution architecture. AI scoped against business outcomes.

### 1.3 Audience (in priority order)

| Segment | What they need to see | Primary CTA |
|---|---|---|
| **Marketing agencies** (GoHighLevel and HubSpot shops especially) | Agency-scale systems: onboarding automation, portfolio health monitoring, voice AI they can resell, snapshot builds | Book an AI build call |
| **Mid-market marketing/RevOps leaders** | Reporting automation, ad-ops automation, attribution, AI readiness roadmap | AI Readiness Sprint |
| **Professional services firms** (healthcare IT, consultancies; Evergreen is the reference) | AI roadmap, website + AI discovery, integration planning | Roadmap consult |
| **Hiring managers** for AI Solutions Engineer / AI Solutions Architect roles | Depth of shipped work, architecture, honest status labels, résumé link | View work / download résumé |

The site should serve the fourth audience without saying so: case studies written to the depth a technical hiring manager wants are also what a serious buyer wants.

### 1.4 Voice rules

- Plain, specific, confident. Numbers with units and status. No "revolutionize", "unlock", "harness the power", "cutting-edge", "seamless", "game-changer".
- Every claim carries a number or a named artifact. "Built a 10-workflow speed-to-lead engine; first test delivered SMS and email in under a minute" beats "Lightning-fast lead response."
- Use status words honestly: **Live, Pilot, Tested, Delivered, Shipped.** Buyers who've been burned by AI demos trust a "Tested, client rollout pending" label more than a vague "production-ready."
- First person singular ("I build...") for the About page and case studies; "Matthew Carlson Consulting" in schema and legal. Pick one voice for marketing pages (recommendation: first person; it's a solo practice and that is a selling point).

---

## Part 2. Content Inventory: Keep, Reframe, Remove

### 2.1 Remove

| Item | File(s) | Action |
|---|---|---|
| Google Shopping & Local Inventory Ads service | `services.html#google-shopping`, home grid, footers, FAQ, schema, `llms.txt` | Delete. 301 anchor traffic to `services.html#reporting-automation` |
| Meta Dynamic Product Ads service | `services.html#meta-ads`, home grid, `llms.txt` | Delete |
| Performance Max service | `services.html#pmax`, `llms.txt` | Delete |
| "Feed optimization" outcome card | `index.html` | Replace with "Ad-ops & reporting automation" |
| FAQ: "What's included in Google Shopping feed development?", "Can you help with Local Inventory Ads?", "How often should my feed update?" (entire "Google Shopping & Feeds" category) | `faq.html` + FAQPage schema | Delete; replace with new category (Part 4.6) |
| `automations.html` (20 SMB automations) | Nav, footers, sitemap | Retire from nav. 301 to `services.html#patterns`. Fold the 6 strongest ideas into a "Solution patterns" strip (Part 4.2) |
| n8n mentions | `index.html` meta, `llms.txt` | Delete (already removed from body copy in July) |
| "Your Team is Drowning in Manual Work" section | `index.html` | Replace with the "Why production AI stalls" section (Part 4.1) |
| "Resume-ready highlights at a glance" heading | `index.html` | Rename. "Resume" signals job-seeking to buyers. Use "Track record" |
| `bot.html` (legacy SkillEngine bot page) | root | Confirm it's unlinked; delete or `noindex` |
| `mcc-website.zip` in the web root | root | Remove from the deployed site (it exposes the full source) |

### 2.2 Reframe (keep the substance, change the story)

| Current | New framing | Why it stays |
|---|---|---|
| Google Ads / PMax / feed expertise | **Ad-ops & reporting automation**: 15-script MCC-level Google Ads suite, Monthly Client Report automation, Monday deck generator | Matthew asked to keep Google reporting and optimization automation. It is AI-adjacent engineering with clear ROI (12-15 hrs/week) |
| "AI Campaign Builders" service | Part of Ad-ops automation (campaign build + Google Ads Editor CSV export skills) | Same |
| "AI Prompt Engineering" service | **Skill engineering**: 104-skill library, prompt versioning, eval harness. Folded into "AI Agents & Workflow Engineering" | "Prompt engineering" reads junior in late 2026; "skill libraries with versioning and evals" reads senior |
| "Workflow Automation" service | **CRM & Marketing Automation** (GoHighLevel/HubSpot-class) | Same skill, sharper market |
| "Website Development" service | **AI-ready websites & search visibility** (Evergreen + SEO/AEO/GEO + LLM Visibility audit) | Evergreen is a premium reference; AI search visibility is an AI service |
| Duluth Trading metrics | "Operator track record" band on Home and About | This is the wedge (Part 1.2) |
| SkillEngine, MMM platform | Kept as product builds under "Platforms & Products" | Shows full-stack range |
| Security scanner, CRM, Resume search | "Lab" tier on Work page (short cards, not full sections) | Breadth without diluting flagship work |
| Madison, WI local SEO | Secondary: footer, schema `areaServed`, one line on About and Contact. Remove from H1s and titles | National/remote buyers and hiring managers; keep local signal without leading with it |
| SkillEngine Assistant | Keep, retrain knowledge on new positioning and projects | Live demo of the work |

### 2.3 Add

- 11 new case studies (Part 5).
- "How I build" principles section (engineering discipline, Part 4.1).
- Engagement models (Part 4.2).
- Status badges component (Live / Pilot / Tested / Delivered / Shipped).
- Résumé / one-page capability PDF download on About (optional, Part 8).
- `CLAUDE.md` at repo root so every Claude Code session follows these rules (created alongside this spec).

---

## Part 3. Information Architecture

### 3.1 Navigation

```
Home | Solutions | Work | AI Assistant | About | FAQ | [Book a Call]
```

| Nav label | File | Change |
|---|---|---|
| Home | `index.html` | Rewrite |
| Solutions | `services.html` | Rename label only (keep filename for SEO continuity), rewrite content |
| Work | `projects.html` | Rename label, rebuild as filterable case-study index |
| AI Assistant | `ai-bot.html` | Copy + chips + knowledge refresh |
| About | `about.html` | Rewrite |
| FAQ | `faq.html` | Rewrite questions |
| Book a Call (CTA button) | `contact.html` | Rename CTA label, update form options |
| *(removed)* Automations | `automations.html` | 301 to `services.html#patterns` |

Optional later: split flagship case studies into their own pages (`work/client-mind.html` etc.) for SEO depth. Not required for launch; anchors on `projects.html` are fine for phase 1.

### 3.2 Redirects (`.htaccess`, GoDaddy Apache)

```apache
Redirect 301 /automations.html /services.html
Redirect 301 /bot.html /ai-bot.html
```
Fragment anchors (`#google-shopping`) can't be redirected server-side; add a small script in `js/main.js` that maps retired anchors (`#google-shopping`, `#meta-ads`, `#pmax`, `#campaign-builders`, `#prompt-engineering`, `#workflow-automation`) to their new sections.

---

## Part 4. Page-by-Page Specification

### 4.1 Home (`index.html`)

**Title:** `AI Solutions Engineer | Production AI Agents & Automation | Matthew Carlson`
**Meta description:** `I design, build and run production AI systems for marketing teams and agencies: AI agents, voice and chat assistants, CRM automation and reporting pipelines. 11 years running a $40M+ marketing budget.`

**Section order and copy:**

1. **Hero**
   - Eyebrow: `AI Solutions Engineer · Madison, WI · Working nationally`
   - H1 options (pick one):
     - A (recommended): **"I build the AI systems that run your marketing operations."**
     - B: **"Production AI for teams that are done with demos."**
     - C: **"AI agents, voice assistants and automation, built to production standard."**
   - Subhead: "Agents, voice and chat assistants, CRM automation and reporting pipelines, designed by someone who ran a $40M marketing budget and shipped with tests, verification gates and a known cost per run."
   - CTAs: primary `Book an AI build call` → contact; secondary `See the work` → projects.
   - Right column: keep the clickable SkillEngine Assistant card. Replace the demo messages:
     - User: "Which client accounts have leads waiting more than 24 hours?" → Assistant: "4 accounts flagged. Two have unassigned leads from last night's form fills; tasks created for their account managers."
     - User: "Build the speed-to-lead workflow from the spec." → Assistant: "10 workflows drafted in the test location. Gap report: 2 SMS actions need an A2P-safe number before live testing."
     - Chips: `Audit my AI readiness` · `Design a voice agent` · `Automate my reporting`

2. **Proof bar** (replaces "Resume-ready highlights"; 5 stat tiles)
   - `33` production AI agents in one client-intelligence platform
   - `104` packaged AI skills in a published library
   - `12-15 hrs/week` of manual ad reporting replaced by a 15-script automation suite
   - `30 days` concept to launch for a 20+ page enterprise website, solo
   - `$40M+` annual marketing budget managed (11 years, Duluth Trading)

3. **What I build** (6 tiles = the 6 solutions in 4.2, each linking to its anchor). One line each, one proof line each.

4. **Featured work** (4 cards with status badge, 1-line outcome, stack chips): Client Mind · Agents that build inside the CRM · Voice AI agent family · Account Health Dashboard. "See all 20+ projects →"

5. **Why production AI stalls** (replaces "Drowning in manual work"): three short problem/answer pairs.
   - "The demo worked; the rollout didn't." → Gates before fan-out; graded samples before scale.
   - "Nobody trusts what the AI wrote." → Every fact carries a source and a confidence tier; unverified items are labeled, never guessed.
   - "We don't know what it costs." → Every pipeline is metered; a client research pull costs ~$4-8 and that number is in the proposal.

6. **How I build** (6 principles, icon + 1 sentence; drawn from the master's Insights section): Spec first · Test before demo · Read-only by default · Stop and notify beats guessing · Meter every run · Buy the commodity, own the interpretation.

7. **Engagement models** (4 cards, see 4.2). No prices on cards.

8. **Who I work with** (keep the existing audience grid, retitle): Marketing agencies · Marketing & RevOps teams · Professional services firms · Product & ops leaders.

9. **Process** (keep the 4-step "Concept to deployment" but rename steps): Discovery → Specification → Build with verification → Launch, monitor, hand off.

10. **CTA**: "Have a process AI should be running? Let's spec it." → Book a call.

### 4.2 Solutions (`services.html`)

**Title:** `AI Solutions: Agents, Voice AI, CRM Automation & Reporting | Matthew Carlson`
**H1:** "Six ways I put AI into production"
**Subhead:** "Every engagement ships with a written specification, a test plan and a cost model. You own everything I build."

Replace the 8 existing `service-showcase` sections with these 6, reusing the existing section markup and SVG illustration slots:

| # | id | Title | Lead line | Bullets (capability) | Proof line (with link to Work) |
|---|---|---|---|---|---|
| 1 | `ai-agents` | **AI Agents & Workflow Engineering** | Multi-agent systems, skill libraries and orchestration pipelines that do real work on a schedule or a trigger. | Multi-agent platforms with shared client memory · MCP servers that connect Claude to your data · Skill libraries with versioning and evals · Orchestration with QA gates and cost telemetry · Coding agents (Claude Code, Codex) building inside SaaS from specs | Client Mind: 33 agents, 8-tool MCP server, 39 client minds. Live. |
| 2 | `voice-chat-ai` | **Voice & Conversational AI** | Phone and chat agents that answer, qualify, book and hand off, tested before a customer ever hears them. | Inbound voice agents with booking and warm transfer · Website and SMS chat assistants · Knowledge-base architecture · Consent and safety logic · 50+ case test suites and regression gates | Pool retailer voice agent family: 11/11 first-block checks, live booking verified. Tested. |
| 3 | `crm-automation` | **CRM & Marketing Automation** | GoHighLevel and HubSpot-class systems that onboard clients, respond to leads in under a minute and build themselves from a spec. | Speed-to-lead engines · AI-researched client onboarding · Sub-account provisioning and snapshots · Custom fields/values at scale · Webhook and API integrations | Speed-to-lead engine: 10 workflows, first test under 60 seconds. Tested. |
| 4 | `reporting-automation` | **Reporting, Analytics & Ad-Ops Automation** | The reporting and optimization work your team does by hand every Monday, automated. | Google Ads scripts at MCC level (audit, pacing, search terms, structure) · Nightly account-health monitoring with alerts · Automated client report packets from Looker Studio · Attribution architecture (click-ID capture, CRM as join point) · Executive dashboards | 15-script Google Ads suite, ~12-15 hrs/week of reporting eliminated. Live. |
| 5 | `ai-strategy` | **AI Readiness, Roadmaps & Fractional AI Lead** | Where AI fits, what to buy versus build, and the order to do it in. | AI readiness audit (5 domains, scored /100) · Automation roadmaps for leadership and finance · Build-vs-buy evaluations · Vendor and builder selection · Fractional AI lead / CTO scope | Healthcare IT consultancy AI automation roadmap; BrightLocal build-vs-buy. Delivered. |
| 6 | `ai-ready-web` | **AI-Ready Websites & Search Visibility** | Websites built to be found by Google and cited by ChatGPT, Perplexity and Gemini. | Hand-coded, accessible (WCAG AA) builds · SEO, AEO and GEO from day one · LLM visibility audits across answer engines · llms.txt, schema, citable claims | Evergreen: 30 days concept to live; 1K organic clicks/28 days within a month. Shipped. |

**Then:**

- **`#patterns` Solution patterns** (replaces automations.html): a compact grid of 8 ready-to-scope patterns, one line each: AI lead research report · Speed-to-lead responder · Voice receptionist with booking · Client onboarding (research, then verify) · Nightly account health alerts · Monthly client report packet · Website asset loader · Missed-call text-back with AI qualifier.
- **Engagement models** (4 cards):
  - **AI Readiness Sprint** (2 weeks): scored audit, opportunity map, build-vs-buy, 90-day roadmap.
  - **Build Sprint** (2-6 weeks): one system specified, built, tested and handed off.
  - **Fractional AI Lead** (monthly): ongoing build, ops and team enablement.
  - **Managed AI Operations** (monthly): monitoring, maintenance and iteration of systems I built. Note pricing structure on the page: "Launch, build and maintenance are priced separately; usage is billed at cost." (from the voice AI pricing model; signals maturity without numbers)
- **Tools I work in** strip: Claude (API, Code, MCP), OpenAI (API, Codex), Gemini · GoHighLevel, HubSpot · Supabase/Postgres, pgvector · Python, TypeScript, React, Next.js · Google Ads API & Scripts, GA4, Looker Studio · Firecrawl · WordPress.

### 4.3 Work (`projects.html`)

**Title:** `AI Projects & Case Studies | Matthew Carlson, AI Solutions Engineer`
**H1:** "Work"  **Subhead:** "Systems in production, in pilot and in test, labeled honestly."

**Layout:**
1. **Filter bar** (JS, no framework): All · Agentic Systems · Voice & Chat AI · CRM Automation · Reporting & Analytics · Web & Search · Products.
2. **Flagship case studies** (full `project-section` treatment, existing markup): 8 entries (Part 5, Tier 1).
3. **More work** (card grid): Tier 2.
4. **Lab** (compact list): Tier 3.
5. CTA.

**Case study template** (every Tier 1 entry; reuse existing `project-section` markup):
```
[Status badge]  [Category tag]  [Date]
H2 Title
One-sentence outcome
Stats row (3-4 numbers)
The problem       (2-3 sentences, business language)
What I built      (3-5 bullets)
How it works      (architecture: 3-4 bullets or a simple inline SVG diagram)
Results           (numbers + status)
Stack             (chips)
```

Keep existing screenshot assets (MMM, Security, Client portal). For new projects without screenshots, use a simple inline SVG architecture diagram per case study (cheaper than screenshots and more legible for technical readers). Do not publish client-identifying screenshots.

### 4.4 About (`about.html`)

**Title:** `About Matthew Carlson | AI Solutions Engineer, Madison WI`
**H1:** "Matthew Carlson" · **Tagline:** "AI Solutions Engineer. Former $40M marketing operator."

**Opening paragraph (draft):**
> I build production AI systems for marketing teams, agencies and professional-services firms. Before AI, I spent 11 years at Duluth Trading running a $40M+ digital marketing budget that drove $200M+ in annual revenue, owning analytics, attribution, paid media and data feeds. That's why every system I build is scoped against hours saved, revenue and risk, and why it ships with tests and a cost model instead of a demo.

**Sections:**
1. Opening + headshot (add a real photo; the single biggest trust lift on a solo-consultant site).
2. **Now:** AI Lead Consultant for a marketing agency (Mar 2026–present; fractional CTO scope) · Website & AI Consultant for a healthcare IT consultancy (Jun 2026–present). Naming per Part 8.
3. **Career timeline:** Matthew Carlson Consulting (2024–) · Duluth Trading, Sr. Marketing & BI Analyst (2014–2025) · Epic Systems, Technical Services (2006–2009). The Epic line matters: healthcare IT credibility.
4. **Operator track record** (stat band from Duluth): $40M+ budget / $200M+ revenue · 25% incremental lift proven by holdout test · Facebook $3.5M→$7M+ while cutting ad ratio 60%→35% · Affiliate to $33M · RTB House launch to $8.3M.
5. **Core competencies** (rewrite the existing grid into 6): Agentic systems & MCP · Voice & conversational AI · CRM & marketing automation · Analytics, attribution & reporting automation · Full-stack development · AI-ready web & search.
6. **How I work** (keep section; replace contents with the 6 principles from Home, expanded to 2 sentences each).
7. **Credentials:** MCP implementation, Claude API & skill authoring, GoHighLevel AI Studio/Voice AI, autonomous coding agents, WCAG AA engineering, Google Ads certified, UW-Madison.
8. CTA + optional résumé download.

**Schema:** `Person` (jobTitle "AI Solutions Engineer", `knowsAbout` list below) + `ProfessionalService`.
`knowsAbout`: AI agent development, Model Context Protocol (MCP), Voice AI, Conversational AI, GoHighLevel automation, Marketing automation, Google Ads scripts and API, Marketing analytics and attribution, Retrieval-augmented generation, Answer engine optimization, Generative engine optimization.

### 4.5 AI Assistant (`ai-bot.html` + `api/ai-chat.php` + `knowledge-base/`)

- Hero subhead: "Ask about my work, or describe a process and get a first-pass automation plan."
- Chip categories (replace current 4): **AI Agent Ideas** · **Voice & Chat AI** · **CRM Automation** · **Reporting Automation**. Remove "Google Campaign Setup".
- Update `$systemPrompt` in `api/ai-chat.php`: positioning statement from 1.2, the 6 solutions, instruction to cite case studies from the knowledge base, and the rule to never quote prices (route to a call).
- Rewrite `knowledge-base/projects-summary.md` from Part 5 so the assistant can discuss every project.

### 4.6 FAQ (`faq.html`)

Replace categories with: **Working together** · **AI systems & safety** · **Platforms & integrations**. Keep FAQPage schema in sync (one entry per visible Q).

Keep (edit copy): What types of AI systems do you build? · How long does a build take? · Do you work with marketing agencies? · Do you serve businesses outside Madison? · How is pricing structured? · Ongoing support? · First step? · What is the SkillEngine Assistant? · Data privacy & security? · What platforms can you integrate with? (remove feed platforms; add GoHighLevel, HubSpot, Supabase, Looker Studio, Google Ads API).

Add:
- **What does an AI Solutions Engineer do?** (owns the AEO query; answer in 2 sentences, then specifics)
- **How do you make sure an AI agent won't do something wrong?** (TEST environments, read-only defaults, test suites, verification gates, stop-and-notify)
- **What does it cost to run an AI system after launch?** (metered per run; example ~$4-8 per research pull; launch/build/maintenance priced separately; usage at cost)
- **Can AI agents build inside GoHighLevel?** (yes, spec-driven builds with Claude and Codex; gap reports; what platform AI can and can't do)
- **Do you build voice AI agents?** (inbound, booking, transfer, consent; tested before demo)
- **Can you automate our Google Ads reporting?** (keeps the Google angle; 15-script suite)
- **Should we build or buy?** (principle 24: buy the commodity, own the interpretation)

### 4.7 Contact (`contact.html`)

- Title: `Book an AI Build Call | Matthew Carlson`.
- H1: "Tell me what you want AI to run."
- Form "Interest" options → the 6 solutions + "Not sure yet". Add optional field "What tools do you use today? (CRM, ads, reporting)".
- Keep phone, email, Madison location line.

### 4.8 Global

- **Footer Services column** (all pages): AI Agents · Voice & Chat AI · CRM Automation · Reporting Automation · AI Readiness.
- **Footer tagline:** "Production AI systems for marketing teams, agencies and professional services. Based in Madison, Wisconsin; working nationally."
- **`llms.txt`:** full rewrite to new positioning, 6 solutions, Tier 1 projects with one-line outcomes, contact. This file is how answer engines will describe the practice; it is high-leverage.
- **`sitemap.xml`:** drop `automations.html`, update `lastmod`.
- **Organization/ProfessionalService schema** on Home: update `description`, `serviceType`, `hasOfferCatalog` to the 6 solutions.
- **Status badge component** (`css/styles.css`): `.status-badge` + modifiers `--live` (green), `--pilot` (teal), `--tested` (blue), `--delivered` (gray), `--shipped` (green outline). Respect existing color tokens and contrast (WCAG AA).

### 4.9 SEO targets

| Page | Primary query | Secondary |
|---|---|---|
| Home | AI solutions engineer | AI automation consultant, production AI systems |
| Solutions | AI agent development services | voice AI agent developer, GoHighLevel AI automation, Google Ads reporting automation |
| Work | AI automation case studies | MCP server example, AI agent portfolio |
| About | Matthew Carlson AI | fractional AI lead, AI consultant Madison WI |
| FAQ | what does an AI solutions engineer do | how to make AI agents safe, cost to run AI agents |

---

## Part 5. Projects: The Portfolio Plan

Twenty-one entries in three tiers. Names are the public titles. Client identification follows Part 8 decision 1 (defaults: "a marketing agency", "a pool & spa retailer", "a healthcare IT consultancy").

### Tier 1: Flagship case studies (full sections)

| # | Public title | Category | Status | Stats row | Why it's flagship |
|---|---|---|---|---|---|
| 1 | **Client Mind: Multi-Agent Client Intelligence Platform** | Agentic Systems | Live | 33 agents · 39 client minds · 8-tool MCP server · ~$32-42/mo to operate | Proves platform architecture, MCP, multi-tenancy, cost discipline |
| 2 | **Agents That Build: Spec-Driven CRM Construction with Claude & Codex** | Agentic Systems | Tested / Draft (TEST locations) | 3.5 hrs unattended · 351 custom values · 12-stage pipeline · 52-entry KB · 10-workflow engine built from spec | The most novel work on the site; this is what "AI Solutions Engineer" looks like in 2026 |
| 3 | **Inbound Voice AI Agent Family** | Voice & Chat AI | Tested | 11/11 first-block checks · 50+ case suite · 6 service branches · 5 phone agents | Client-facing AI, safety logic, testing rigor, pricing model |
| 4 | **Account Health Dashboard & Alert Bridge** | Reporting & Analytics | Live | Every client account nightly · 18 health flags · alerts written back into the CRM · Monday digest | Production data pipeline + operator insight (9,600-deal pipeline analysis as the companion finding) |
| 5 | **Google Ads Automation Suite (MCC-level)** | Reporting & Analytics | Live | 15 scripts · ~12,666 lines · ~12-15 hrs/week saved · daily to quarterly cadences | Keeps the Google expertise, reframed as automation engineering |
| 6 | **Research-then-Verify Client Onboarding** | CRM Automation | Pilot / Live | 26-section AI research profile · ~10-min client review · 74-field automated test suite · webhook routine under 20 min | Combines the July webhook routine, onboarding app v4.x, autobuild and no-website research |
| 7 | **104-Skill AI Library & Orchestration Pipeline** | Agentic Systems | Live | 104 skills · 9-skill parallel DAG · 17-artifact contract · ~$4-8 per run | Skill engineering, gated orchestration, governance |
| 8 | **30-Day Enterprise Website Launch (Healthcare IT)** | Web & Search | Shipped | 30 days concept to live · 20+ pages · WCAG AA · 1K organic clicks/28 days | Solo end-to-end delivery for a premium client; AI-search groundwork |

### Tier 2: Supporting work (cards: title, status, 2-line outcome, 3 stats, stack)

| # | Title | Category | Status |
|---|---|---|---|
| 9 | Speed-to-Lead Engine (10 workflows, <60s first response) | CRM Automation | Tested |
| 10 | Three-Bot Conversational AI with Shared Knowledge Bases (6 KBs, 163 FAQs, >85% accuracy) | Voice & Chat AI | Live |
| 11 | AI Visibility Audit Product Family (LLM visibility, SEO/AEO/GEO, AI readiness; 0-100 scoring) | Web & Search | Live |
| 12 | Automated Monthly Client Report (Looker Studio in; AM + client packets out) | Reporting & Analytics | Tested |
| 13 | Portfolio Pipeline Analysis (27 accounts, 9,600 deals, 81% idle) | Reporting & Analytics | Delivered |
| 14 | Website Asset Loader (~350 images to CRM in 8 min) | CRM Automation | Tested |
| 15 | Fact-Locked AI Content (Client Context Block; drift diagnosis) | Agentic Systems | Live |
| 16 | SkillEngine (277 skills, 125K LOC, 31 days) | Products | Shipped |
| 17 | Media Mix Model Platform (Bayesian MMM, scenario planning) | Products | Shipped |
| 18 | AI Automation Roadmap & Integration Readout (healthcare IT; Workday + HubSpot) | AI Strategy | Delivered |

### Tier 3: Lab (one line each)

19. Client-Side Security Scanner & Compliance Engine · 20. Resume Intelligence Search (RAG in <2 hrs) · 21. B2B Client CRM & Prospect Portals. (Optionally add AI Governance Platform and Knowledge Management Platform from the master portfolio if screenshots exist.)

### Draft copy for the two most important new case studies

**Agents That Build: Spec-Driven CRM Construction with Claude & Codex**
- *Outcome:* AI coding agents built a marketing agency's CRM systems directly inside the platform from written specifications, with a verification report at every step.
- *Problem:* Building a CRM "snapshot" (pipelines, workflows, fields, emails, knowledge bases, pages) took contract builders weeks per template at ~$500 each, and quality varied.
- *What I built:* A specification format that defines every CRM object · A build method where Claude or OpenAI Codex constructs those objects in the live platform · API readback and gap reports after each phase · Hard boundaries: TEST locations only, repeated location checks, no live SMS until compliance-safe numbers exist.
- *Results:* Claude built a 10-workflow speed-to-lead engine from spec; first test delivered SMS and email in under a minute. Codex ran 3.5 hours unattended, then completed a two-day build: 351 custom values, 20 tags, 21 fields, a 12-stage pipeline, 2 calendars, a 52-entry knowledge base, 11 workflows, 28 SMS snippets and 4 pages. Contractor hiring was put on hold.
- *What I learned (show judgment):* Platform AI features have edges (the CRM's AI created data objects but not workflows); the specification and the gap report are the product; compute is a budget line.
- *Stack:* Claude Code, OpenAI Codex, GoHighLevel API v2, Python.

**Client Mind: Multi-Agent Client Intelligence Platform**
- *Outcome:* One structured, sourced memory of every client, shared by 33 AI agents and reachable from Claude through an MCP server.
- *Problem:* Every AI output at the agency started from a blank prompt and generic copy; client facts lived in people's heads and drifted.
- *What I built:* 26-section client schema with field-level provenance · 33 specialized agents · prompt library with versioning (92 prompts, 94 versions) · QA audit engine (1,504 field-level suggestions) · RAG document layer · 8-tool MCP server with token auth and audit logs · CRM integration layer (2,590 assets cataloged).
- *Results:* 39 client minds live; ~$32-42/month total operating cost versus $49-249 per user per month for commercial alternatives.
- *Stack:* Next.js, TypeScript, Supabase (Postgres, JSONB, pgvector), Claude (tiered Haiku/Sonnet/Opus routing), MCP.

Remaining Tier 1 copy: draft from the master's sections 1-8 using the case-study template. Every number must come from the master or CURRENT file; keep the status word from the source.

---

## Part 6. Design Notes

- Keep the existing design system (tokens in `css/styles.css`, Inter + Playfair, dark hero). The repositioning is a content and IA change, not a redesign; that's what makes a fast rollout possible.
- Add: status badge component, filter chips on Work, an inline-SVG architecture diagram style (2-color, uses existing tokens, labeled boxes and arrows; one per Tier 1 case study).
- Run the `website-designer-taste` lint over the rewritten pages before launch (18 rules, zero Critical).
- Add a real headshot to About and the Home hero or proof band.

---

## Part 7. Build Guide for Claude Code

### 7.0 Ground rules (also in `CLAUDE.md`)

- Static HTML/CSS/JS, deployed to GoDaddy (Apache) via `upload.sh` / FTP; `api/*.php` for chat and mail. No build step. Don't introduce frameworks.
- Nav and footer are duplicated in 10 HTML files. **Phase 0 builds a sync script so they're edited once.**
- Every visible FAQ needs a matching FAQPage schema entry; every page keeps title, meta description, canonical, OG tags.
- Numbers come only from the skills references. Never invent metrics.
- Commit per phase; one PR per phase is ideal.

### 7.1 Phases

**Phase 0: Foundation (30-45 min)**
Prompt:
> Read `docs/AI-SOLUTIONS-REPOSITIONING-SPEC.md` and `CLAUDE.md`. Create `scripts/sync-partials.py` that replaces the content between `<!-- NAV:START -->`/`<!-- NAV:END -->` and `<!-- FOOTER:START -->`/`<!-- FOOTER:END -->` markers in every root `*.html` with `partials/nav.html` and `partials/footer.html`, setting `active` on the current page's nav link. Add the markers to all pages around the existing nav and footer, extract the current blocks into `partials/`, run the script, and confirm `git diff` shows only marker additions. Then update the partials to Part 3.1 nav and Part 4.8 footer and re-run. Add the `.htaccess` redirects and the retired-anchor mapper from Part 3.2. Delete `mcc-website.zip` from the web root (confirm it isn't referenced) and remove `automations.html` from `sitemap.xml`. Add the `.status-badge` component (Part 4.8).

Accept: every page shows the new nav/footer; `/automations.html` redirects; `grep -l automations.html *.html` returns nothing.

**Phase 1: Remove and reframe (45 min)**
> Following Part 2.1, delete the Google Shopping, Meta DPA, Performance Max, Campaign Builders and Prompt Engineering sections from `services.html` and their home-page cards; remove the "Google Shopping & Feeds" FAQ category (visible and schema); remove all n8n mentions. Run the verification grep in 7.2 and fix anything left.

**Phase 2: Solutions page (60-90 min)**
> Rewrite `services.html` per Part 4.2: new title/meta/H1, six `service-showcase` sections with ids `ai-agents`, `voice-chat-ai`, `crm-automation`, `reporting-automation`, `ai-strategy`, `ai-ready-web` using the existing section markup and SVG slots, then `#patterns`, engagement models and the tools strip. Update Service schema.

**Phase 3: Work page (2-3 hrs, the largest phase)**
> Rebuild `projects.html` per Parts 4.3 and 5: filter bar (vanilla JS in `js/main.js`, `data-category` attributes), 8 Tier 1 case studies using the template and existing `project-section` markup (keep SkillEngine and MMM screenshots; Tier 1 entries without screenshots get an inline SVG architecture diagram), Tier 2 card grid, Tier 3 lab list. Draft copy only from the two skills reference files and the drafts in Part 5; keep each item's status word. Then rewrite `knowledge-base/projects-summary.md` to match.

Split if needed: 3a = layout + filter + Tier 2/3; 3b = Tier 1 entries 1-4; 3c = Tier 1 entries 5-8.

**Phase 4: Home (60-90 min)**
> Rewrite `index.html` per Part 4.1, using hero option A. Keep the clickable assistant card and replace its demo messages and chips. Proof bar, What I build, Featured work (4), Why production AI stalls, How I build, Engagement models, Who I work with, Process, CTA. Update title, meta, OG and Organization schema.

**Phase 5: About, FAQ, Contact (60-90 min)**
> Rewrite `about.html` (Part 4.4, Person schema), `faq.html` (Part 4.6, keep schema in sync), `contact.html` (Part 4.7).

**Phase 6: Assistant + discovery files (45 min)**
> Update `ai-bot.html` chips and copy (Part 4.5), the system prompt in `api/ai-chat.php`, rewrite `llms.txt` (Part 4.8), update `sitemap.xml` lastmod, and update `docs/` references to the old services.

**Phase 7: QA and launch (45 min)**
> Run the 7.2 checks. Open every page at 375px and 1280px in Playwright (Chromium is preinstalled) and screenshot. Validate JSON-LD with a JSON parse of every `application/ld+json` block. Check all internal links resolve. Run the website-designer-taste critique on Home, Solutions and Work and fix Critical findings.

### 7.2 Verification commands

```bash
# No retired positioning left (expect no output)
grep -rniE "google shopping|local inventory|merchant center|dynamic product ads|performance max|\bpmax\b|n8n|feed optimization" --include=*.html --include=*.txt --include=*.xml . | grep -v docs/

# No links to retired pages/anchors
grep -rnE "automations\.html|#google-shopping|#meta-ads|#pmax|#campaign-builders|#prompt-engineering" --include=*.html .

# Every JSON-LD block parses
python3 - <<'EOF'
import re,json,glob
for f in glob.glob('*.html'):
    for b in re.findall(r'<script type="application/ld\+json">(.*?)</script>', open(f).read(), re.S):
        json.loads(b)
print("JSON-LD OK")
EOF

# FAQ visible count == schema count
python3 -c "import re;s=open('faq.html').read();print(len(re.findall(r'class=\"faq-question\"',s)),len(re.findall(r'\"@type\": \"Question\"',s)))"
```

### 7.3 Rollout sequence

Ship Phases 0-2 together (the site stops saying "PPC freelancer" immediately), then Phase 3, then 4-6, then QA. A realistic total with Claude Code is 2-3 working sessions. Deploy with `upload.sh` after each merge; keep the previous upload as a rollback zip off the web root.

---

## Part 8. Decisions Needed Before Launch

1. **Name clients publicly?** Small Screen Producer, Evergreen Healthcare Partners, Duluth Trading, Epic. Recommendation: name **Duluth Trading** and **Epic** (past employers, already on LinkedIn); ask **Evergreen** and **SSP** for written OK. Until then use "a marketing agency" / "a Best in KLAS healthcare IT consultancy". Never name SSP's end clients (Liverpool, Central Jersey Pools, AAA Pools, etc.).
2. **Title on the site:** "AI Solutions Engineer" (recommended; matches job titles and the query) or "AI Solutions Architect" (more senior, fewer searches) or both ("AI Solutions Engineer & Architect").
3. **Hiring-manager signals:** add a résumé PDF download and a "Open to full-time AI Solutions roles" line on About, or keep the site purely consulting? Recommendation: résumé download yes, explicit "open to roles" line no (it weakens consulting conversion; LinkedIn carries that signal).
4. **Draft/Tested work:** publish Tier 1 items with "Tested"/"Draft" status (recommended, labeled honestly) or wait until they're Live.
5. **Headshot:** supply one (strongly recommended).
6. **Automations page:** retire with redirect (recommended) or keep unlinked for existing ad traffic. Check Google Ads final URLs first; the July Madison campaign plan in `docs/` may point there.
