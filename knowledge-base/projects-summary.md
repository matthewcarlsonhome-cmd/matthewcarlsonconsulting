# Projects & Case Studies — Matthew Carlson Consulting

Real-world applications demonstrating AI-assisted development, full-stack engineering, and production-ready SaaS platforms. Each project showcases innovative approaches to solving complex problems.

---

## Project 1: SkillEngine

**Type:** AI Career Productivity Platform (Full-scale SaaS)
**Status:** Completed February 2026
**Live Application:** https://aicareerskills.netlify.app/

### Key Stats

| Metric | Value |
|--------|-------|
| Days to Build | 31 |
| Lines of Code | 125,000+ |
| AI Skills | 277+ |
| App Pages | 48 |
| Workflows | 24 |
| Role Templates | 27 |
| Git Commits | 311 |
| Monthly Hosting Cost | $0 |

### The Problem

Most people use AI the same way every time: open ChatGPT, explain what they need, get a response, close the tab. Tomorrow they start over with zero memory of what worked. Valuable prompts are lost, and professionals waste time re-explaining context repeatedly.

### The Solution

SkillEngine saves your best prompts as reusable **Skills** — complete with expert personas, structured outputs, and industry-specific context. Run them with one click instead of re-explaining yourself constantly. Build once, use forever.

### Core Capabilities

#### For Job Seekers
- **Job Readiness Scorer** — Match analysis for roles
- **Resume Customizer** — Tailored bullet points
- **ATS Keyword Optimizer** — Pass screening
- **Interview Prep** — STAR-format answers
- **Salary Coach** — Negotiation guidance

#### For Professionals (27 Roles)
- **Software Engineer** — Code review, specs
- **Financial Analyst** — Reports, forecasts
- **Marketing Manager** — Campaigns, strategy
- **Project Manager** — Status, risk assessment
- **+ 22 more roles** with 4-12 skills each

#### Enterprise Operations
- **Contract Review** — Risk identification
- **Compliance** — Program development
- **AI Governance** — Implementation
- **Tech Debt** — Assessment & planning
- **RFP Response** — Automation

### Technical Architecture

**Multi-Provider AI Interface:**
- Google Gemini (2.0 Flash)
- Anthropic Claude (Haiku, Sonnet, Opus)
- OpenAI ChatGPT (GPT-4o, 4o-mini, o1)
- Switch providers with one click; model-specific token limits and streaming handled automatically

**Local-First Data Architecture:**
- Primary storage: IndexedDB in the user's browser (workspaces, skill history, custom skills, preferences)
- Optional cloud sync via Supabase (community skills, user profiles)

### Technology Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18, TypeScript |
| Styling | Tailwind CSS |
| Build | Vite |
| Routing | React Router |
| Local DB | IndexedDB |
| Backend | Supabase |
| Hosting | Netlify |
| Testing | Vitest |

### AI-Assisted Development with Claude Code

**Daily Development Velocity:**
- 4,000+ lines of production code per day
- 9 new AI skills created daily
- 10 git commits per day average
- 1.5 application pages completed daily

**Commit Distribution by Week:**
- Week 1: 86 commits — Core architecture
- Week 2: 114 commits — Skills + Roles
- Week 3: 61 commits — Workflows
- Week 4: 50 commits — Polish + Keys

### Key Takeaway

> "The cost and time equation for building software has fundamentally changed."

This project — 48 pages, 277 skills, 24 workflows, full authentication, multi-provider AI integration — would traditionally require a team of 3-4 developers working 2-3 months. Built solo in 31 days. Hosting cost: $0/month. The tools are here. The question is who learns to use them effectively.

---

## Project 2: Enterprise Client & CRM Management System

**Type:** B2B Client Relationship Management Platform
**Status:** Completed February 2026

### Key Stats

| Metric | Value |
|--------|-------|
| Industries Supported | 21 |
| Pipeline Stages | 5 |
| Contacts per Client | 3 |
| Activity Types | 15 |

### The Problem

Consulting firms struggled to track multiple stakeholders per client, keep outreach consistent, and demonstrate value with generic follow-ups. Manual CRM systems couldn't keep up with complex pipelines or personalization demands.

### The Solution

A unified CRM that models real B2B relationships with multi-contact profiles, AI-assisted research, and one-click portal creation — ensuring every outreach is personalized, measurable, and aligned to the pipeline.

### Key Capabilities

#### AI Research Assistant
- **Quick recommendations** based on industry patterns
- **Full research mode** with pain points and tech stack insights
- **One-click apply** to update client records and messaging

#### Relationship Management
- **Multi-contact profiles** with per-contact statuses
- **Activity timeline** across channels and outcomes
- **Priority contact queue** to surface next actions

#### Pipeline & Data Ops
- **5-stage pipeline** with priority tagging and analytics
- **Bulk CSV import/export** with error reporting
- **Hybrid storage** for online/offline reliability

### Screenshots & Features
- Client Portal Page — Personalized prospect portal with branded messaging and curated highlights
- ROI + Workflow Showcase — ROI calculator and tailored workflow recommendations for each prospect
- Client Setup — Structured setup flow with industry classification, status, and priority controls
- Multi-Contact Tracking — Track multiple stakeholders with individual statuses and outreach history
- Activity Timeline — Consolidated activity timeline across LinkedIn, email, calls, and meetings

---

## Project 3: Client-Side Security Scanner & Compliance Engine

**Type:** Browser-based Security & Compliance Application
**Status:** Completed February 2026

### Key Stats

| Metric | Value |
|--------|-------|
| Security Checks | 15 |
| SPA Routes Scanned | 33 |
| PII Types Detected | 12 |
| Redaction Modes | 4 |

### The Problem

Traditional security scanners miss client-side risks like exposed API keys, PII in localStorage, or vulnerable DOM structures. Teams lacked a unified, in-browser view of security posture.

### The Solution

A client-side scanning engine that navigates every route, evaluates 15 security dimensions, and delivers executive-friendly scoring with actionable remediation guidance.

### Key Capabilities

#### Vulnerability Scanning
- **15 security checks** across storage, headers, and scripts
- **Multi-page scanning** for SPA route coverage
- **Deduped reporting** to keep findings actionable

#### PII & Encryption
- **12 PII types** with confidence scoring
- **4 redaction modes** (mask, hash, remove, placeholder)
- **Device-bound encryption** with PBKDF2 + AES-GCM

#### Compliance Controls
- **Policy framework** for approvals, rate limits, and budgets
- **Audit trail** with exportable logs
- **Weighted scoring** with executive-friendly grades

### Screenshots & Features
- Scanner Dashboard — Weighted security scoring with severity breakdowns and route coverage
- Findings & Remediation — Detailed findings with evidence, severity, and recommended fixes

---

## Project 4: Media Mix Model (MMM) Platform

**Type:** Bayesian Media Mix Modeling & Budget Optimization Platform
**Status:** Completed March 2026

### Key Stats

| Metric | Value |
|--------|-------|
| Modeling Approach | Bayesian (Hierarchical) |
| Data Sources | Multi-Platform Connectors |
| Data Quality | Automated Hygiene Checks |
| Planning | Budget Scenario Modeling |

### The Problem

Marketing teams juggle fragmented data sources, inconsistent attribution, and shifting budgets across channels. They need a trustworthy, end-to-end system that reconciles spend, performance, and outcomes while accounting for uncertainty and lagged effects.

### The Solution

This MMM platform unifies cross-channel data ingestion, validation, and Bayesian modeling into a single workflow, producing transparent lift estimates and scenario-based budget recommendations that drive confident marketing decisions.

### Key Capabilities

#### Bayesian MMM Core
- **Hierarchical Bayesian models** with shrinkage across channels
- **Adstock + saturation curves** to capture lagged effects
- **Transparent uncertainty** with posterior intervals and diagnostics

#### Data Connectors
- **Multi-platform ingestion** for ads, CRM, and analytics sources
- **Connector health monitoring** with refresh alerts and sync logs
- **Unified schema mapping** across spend, outcomes, and touchpoints

#### Data Validation & Hygiene
- **Automated QA checks** for missing, late, or duplicated data
- **Normalization pipelines** with outlier handling and winsorization
- **Audit-ready logs** for data lineage and model readiness

#### Budget Scenario Modeling
- **What-if simulators** for reallocations across channels
- **Marginal ROI curves** to highlight efficiency thresholds
- **Scenario comparison** with forecasted lift and payback periods

### Screenshots & Features
- Product Walkthrough — End-to-end walkthrough of data ingestion, model execution, and scenario planning
- Workflow Setup — Connector selection, dataset mapping, and validation checkpoints for MMM pipelines
- Model Configuration — Bayesian priors, lag structures, and training ranges configured for accuracy
- Executive Dashboard — ROI summaries, confidence intervals, and contribution analysis for leadership
- Marketing Performance — Channel saturation curves, response metrics, and optimized spend ranges
- Scenario Planning — Compare multiple budget allocations with modeled lift and payback forecasts

---

## Project 5: Resume Intelligence Search

**Type:** RAG-powered Semantic Search Application
**Status:** Completed February 2026

### Key Metrics

| Metric | Value |
|--------|-------|
| Total Build Time | <2 hours |
| Architecture | RAG (Retrieval-Augmented Generation) |
| Lines of Code | ~500 |
| Vector Database | LanceDB |
| AI Synthesis | Claude API |
| Backend | FastAPI |

### Overview

A fully functional RAG (Retrieval-Augmented Generation) application built from scratch in under 2 hours using Claude Code — demonstrating just how fast AI-assisted development can turn ideas into working software.

### Build Timeline

| Phase | Duration | Output |
|-------|----------|--------|
| Requirements + Scaffold | 15 min | FastAPI project + LanceDB setup |
| Embedding pipeline | 20 min | Sentence-transformer to LanceDB table |
| Search endpoint + Claude synthesis | 25 min | /search API with RAG retrieval |
| Minimal HTML/JS UI | 30 min | Full working prototype |
| Testing + bug fixes | 20 min | Production-ready state |
| **Total** | **110 min** | **Fully functional RAG app** |

### Technology Stack

- **Backend:** FastAPI (Python)
- **Vector DB:** LanceDB (embedded, ~10MB)
- **Embeddings:** sentence-transformers (all-MiniLM-L6-v2)
- **Synthesis:** Claude API (claude-3-haiku)
- **Frontend:** Vanilla HTML/JS

### AI-Assisted vs. Traditional Development

| Aspect | Traditional Approach | AI-Assisted (Claude Code) |
|--------|---------------------|---------------------------|
| Time to MVP | 2-3 days | <2 hours |
| Library selection | Manual research, trial & error | Claude recommends optimal stack |
| Boilerplate | Copy-paste from docs | Generated + tested instantly |
| Debugging | Stack Overflow + trial & error | AI pinpoints & fixes |
| Verdict | Slow | 10-15x faster |

### Traditional Build Estimate (Without AI)

- Data modeling + API design: 4-8 hours
- Embedding pipeline + testing: 4-6 hours
- Search logic + integration: 4-6 hours
- UI + polish: 4-8 hours
- **Total: 16-28 hours (2-3 days)**

### Production Path

**Prototype (Current — Completed):**
- Local LanceDB
- Single-file codebase
- Basic HTML/JS UI
- Claude API key in env
- Hosting: $0 (runs locally)

**SaaS Version (Potential):**
- Hosted vector DB (Pinecone/Weaviate)
- User auth + multi-tenant
- React/Tailwind UI
- Stripe integration
- Estimated build: 2-3 additional days with Claude Code

### Key Takeaway

> "The barrier to building AI-powered applications has collapsed."

What previously required specialized ML expertise and days of development can now be built in under 2 hours. This isn't about replacing developers — it's about removing friction between ideas and working software.

---

## About Matthew Carlson Consulting

**Location:** Madison, Wisconsin
**Phone:** (608) 284-7333
**Email:** contact@matthewcarlsonconsulting.com
**Website:** https://matthewcarlsonconsulting.com

### Services
- AI Automation
- Google Shopping Feeds
- Meta Dynamic Ads
- Performance Max

Additional case studies and development projects are added regularly. Each project demonstrates AI-assisted development methodologies and production-ready solutions.
