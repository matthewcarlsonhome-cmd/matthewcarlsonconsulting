#!/usr/bin/env python3
"""Generate insights/index.html and one page per article from ARTICLES below.
Run from the repo root: python3 scripts/build-insights.py && python3 scripts/sync-partials.py
Facts in articles come from Matthew's skills references; client names are never used."""
import html, json, pathlib, re, sys
sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
import work_diagrams as wd

ROOT = pathlib.Path(__file__).resolve().parent.parent
SITE = "https://matthewcarlsonconsulting.com"
FONTS = "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,600;12..96,700;12..96,800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;600&display=swap"

ARTICLES = [
 dict(slug="voice-agent-guardrails", cat="voice", cat_label="Voice AI", date="2026-10-28", minutes=6,
  hook="A phone agent that quotes the wrong price is worse than no agent at all.",
  diagram="voice-ai",
  numbers=[("50+", "test cases before any client demo"), ("11 / 11", "checks passed in the first test block"), ("6", "service branches, each with its own follow-up"), ("2 min", "after the call, one consented text")],
  qa=[("Can an AI voice agent give prices?", "It can, but it shouldn't. A confident wrong number is a customer-service problem and a trust problem. The agent I build declines price questions politely and ends with an action: a transfer, a message, or a text with the right link."),
      ("How do you test a voice agent before launch?", "With a written test plan. The first block was eleven checks including a live booking; the suite is now more than fifty cases plus a regression set of twenty-plus checks, run on every change, and no client demo happens until it passes."),
      ("What should a voice agent do when the caller asks for a person?", "Transfer on the first ask, with a spoken summary of the call so far. An agent should never argue with a caller who wants a human.")],
  title="How do you keep an AI voice agent from quoting prices?",
  summary="You write down what it must never say, test every rule before a customer hears it, and give the agent a graceful way out: transfer to a person.",
  body="""
<p class="article-short"><strong>Short answer:</strong> the agent gets a written list of things it will not do (quote prices, give technical advice, promise dates, confirm stock), a safe behavior for each one (transfer, take a message, give the emergency number), and a test suite that proves the rules hold before anyone outside the team hears it.</p>

<h2>Why price quoting is the first rule</h2>
<p>A phone agent for a multi-location retailer gets asked prices constantly. A confident, wrong number from an AI is a customer-service problem the day it happens and a trust problem for every call afterward. The same goes for chemical or technical advice, delivery promises and "is it in stock?" Each one sounds helpful and each one creates a commitment the business didn't make.</p>
<p>So the agent I built for a multi-location retailer was designed inbound-only and given hard limits. It will retrieve business information, book showroom appointments to the calendar, update contact details, save the conversation to the contact record, take messages, transfer to a person with a spoken summary, roll to voicemail when nobody answers, and give the 24-hour number on anything that sounds like a safety issue. It declines to quote prices, give chemical advice, promise dates or confirm stock. The decline is polite and short, and it always ends with an action: a transfer, a message, or a text with the right link.</p>

<h2>Design the agent around the caller's time</h2>
<p>The first version answered questions well in testing, but the discovery call changed the design. The client wanted routing to stay with their own people. So the agent became a prequalifying survey that hands off to the main line: it captures a name, a callback number and permission to text, works through one of six service branches, and transfers.</p>
<p>Three rules came out of that redesign and I now use them on every voice agent:</p>
<ul>
<li>Shoppers get the full set of questions. Service callers get at most two.</li>
<li>"Put me through" is honored on the first ask. No agent should ever argue with a caller who wants a person.</li>
<li>An upset caller skips everything and goes straight to transfer.</li>
</ul>
<p>After the call, a workflow sends one follow-up text matched to the service branch (a buying guide, the online service scheduler, a brochure), two minutes after the call ends, only if the caller agreed to texts. One text per call, no exceptions. A one-line promotions switch lets the client turn seasonal offers on and off without touching the agent.</p>

<h2>Test before anyone hears it</h2>
<p>None of this reached the client until it passed a written test plan. The first block was eleven checks, and all eleven passed, including booking a showroom visit at the correct time on a live call. Two defects were found and fixed before a demo, one of them an emergency response the caller could interrupt. A later round fixed three more, including a handoff that happened without capturing the caller's details. The full suite is now more than fifty cases, with a regression set of twenty-plus checks that runs on every change and includes every safety behavior.</p>
<p>The rule I keep: no client demo until the suite passes. A demo that goes wrong costs more trust than a week of delay.</p>

<h2>Price it so the rules stay enforced</h2>
<p>Voice agents are not a one-time build. Rules change, branches get added, the regression suite has to keep running. So the pricing separates the parts: a launch fee, a prepaid build allowance for changes, a monthly fee for operation and maintenance, and calls and texts billed at cost. The monthly fee is what keeps the test suite running after launch, which is what keeps the agent from quoting prices six months from now.</p>

<h2>What to ask any voice AI vendor</h2>
<ul>
<li>Show me the written list of things the agent will not do, and what it does instead.</li>
<li>Show me the test cases, and the regression set that runs on every change.</li>
<li>What happens when the caller says "put me through"?</li>
<li>Who owns the knowledge base, the prompts and the call logs after launch?</li>
</ul>
<p>If the answers are specific, the agent is probably safe to put in front of your customers. If they're vague, it isn't yet.</p>
"""),
 dict(slug="cost-per-research-pull", cat="agents", cat_label="AI agents", date="2026-10-28", minutes=5,
  hook="If you can't say what one run costs, you can't price it, and you can't fix it.",
  diagram="research-pipeline",
  numbers=[("$4–8", "measured cost per client research pull"), ("0.8–1.4M", "tokens per pull"), ("17", "deliverables from one prompt"), ("$32–42", "per month to run a 33-agent platform")],
  qa=[("How much does an AI research pipeline cost per run?", "Measured on real clients, about $4–8 and 0.8–1.4 million tokens per full pull, with crawl credits metered per step. The lighter webhook-triggered report is budgeted at about eight page scrapes and four searches."),
      ("Why route AI work across different model tiers?", "Because cost telemetry shows which steps need judgment and which only need extraction. Sending extraction to the small model and judgment to the large one came directly from reading per-step costs."),
      ("What does a multi-agent AI platform cost to operate?", "The 33-agent platform serving an entire agency runs for about $32–42 a month in model and infrastructure spend, against $49–249 per user per month for commercial alternatives in the category.")],
  title="What does an AI client research pull cost, and why meter it?",
  summary="A full research pull on a new client costs about $4–8 in model and crawl spend, and I know that because every step is metered. That number is what makes AI priceable.",
  body="""
<p class="article-short"><strong>Short answer:</strong> about $4–8 and 0.8–1.4 million tokens per client, measured, not estimated. Metering every run is what turns "AI is expensive" into a unit cost you can put in a proposal.</p>

<h2>What a research pull does</h2>
<p>When a new client comes into the agency I work with, one prompt runs nine skills in sequence and in parallel: a crawl of the client's site, an external sweep of review platforms, directories and public records, a competitor scan, and then the packaging steps that produce seventeen deliverables, from a structured client profile to a CRM import file, a brand-voice guide and a 50-question FAQ. The whole pipeline runs as a directed graph: a serial build, a validation gate, a checksummed freeze of the source document, four readers running in parallel, and a single join at the end.</p>
<p>That's a lot of model calls and a lot of crawling. Without measurement it would be impossible to say what one client costs, which means impossible to price.</p>

<h2>How the metering works</h2>
<ul>
<li><strong>Every agent run records its tokens and its model.</strong> The platform routes work across three Claude tiers depending on the step, so the cheap model handles extraction and the expensive one handles judgment. The telemetry shows which step used which model and what it cost.</li>
<li><strong>Crawl credits are metered per step.</strong> The crawler is the other variable cost; each profile declares its budget. The lightest profile, a seed pull that gates the client's onboarding invite, allows at most six external calls and targets five minutes. The full build allows the whole sweep.</li>
<li><strong>The cost is reported at the end of every run</strong>, next to the artifacts. Nobody has to go looking for it.</li>
</ul>
<p>Measured across real client pulls, the full pipeline lands at roughly $4–8 and 0.8–1.4 million tokens per client. The lighter webhook-triggered research report, which runs when a lead enters the CRM, is budgeted at about eight page scrapes and four searches and finishes in under twenty minutes.</p>

<h2>Why the number matters</h2>
<p>Three reasons, in the order I discovered them:</p>
<ol>
<li><strong>Pricing.</strong> A known unit cost can be marked up, bundled or passed through. An unknown one gets padded, and padding loses deals.</li>
<li><strong>Design.</strong> Once you can see cost per step, you find the expensive steps and ask whether they need the expensive model. Routing extraction to the small model and judgment to the large one came directly from reading the telemetry.</li>
<li><strong>Trust.</strong> When leadership asks "what is this costing us?", the answer is a number with a date on it. The whole 33-agent platform, serving the entire agency, operates for about $32–42 a month. Commercial alternatives in the same category run $49–249 per user per month.</li>
</ol>

<h2>Compute is a budget line</h2>
<p>The same discipline applies when AI coding agents do the building. A multi-hour unattended build inside a CRM, at high compute settings, is real money. I run those in a fresh session per phase and use a small skill that warns when the context window grows larger than the task needs. Treating compute as a line item, rather than a surprise on the invoice, is part of the engineering.</p>

<h2>What to ask before you buy an AI pipeline</h2>
<ul>
<li>What does one run cost, measured on real inputs?</li>
<li>Which steps use which model, and why?</li>
<li>Is crawl or API usage capped per run?</li>
<li>Where does the cost show up after each run?</li>
</ul>
<p>If a vendor can't answer the first question with a number, the pipeline isn't finished.</p>
"""),
 dict(slug="gate-before-fan-out", cat="agents", cat_label="AI agents", date="2026-10-28", minutes=6,
  hook="The most expensive AI mistake I've seen wasn't a bad model. It was 43 good agents reading one bad document.",
  diagram="gate-before-fanout",
  numbers=[("22 of 43", "outputs regenerated after one ungated run"), ("6", "gates, each ending in a decision"), ("42 × 31", "client profiles × data dimensions audited"), ("2", "auto-remediation passes, then stop")],
  qa=[("What does it mean to gate before fanning out?", "Before many AI agents read one shared source, validate the source and grade a single sample output. If either fails, fix the source instead of generating dozens of flawed outputs."),
      ("Why freeze a document before parallel agents read it?", "Validators change the document. If readers start before it's frozen, they read different versions. A checksummed freeze, with late corrections queued as amendments at the join, keeps every output consistent."),
      ("What happens when one agent in a parallel run fails?", "It flags the failure and the others finish. Remediation is bounded to two passes so a broken input can't loop forever, and nothing is silently truncated.")],
  title="Why gate before you fan out",
  summary="Scaling dozens of AI outputs from an unchecked source multiplies every upstream mistake. One graded sample and a consistency check cost hours; regeneration costs days.",
  body="""
<p class="article-short"><strong>Short answer:</strong> when many AI tasks read from one source document, validate the source and grade one sample output before you run the rest. On one engagement, skipping that step meant regenerating 22 of 43 outputs.</p>

<h2>The failure that taught me this</h2>
<p>The agency I work with runs a 43-skill agent suite: campaign briefs, landing pages, email sequences, FAQ sets, local-SEO audits and more, all reading from a single client profile. Early on, one engagement ran all 43 against a profile nobody had validated. The profile had inconsistencies and the brand voice was slightly off. Every one of the 43 outputs inherited those problems, and 22 had to be regenerated after the client reviewed them.</p>
<p>The lesson wasn't "be more careful." It was that the pipeline had no gate between the source and the fan-out, and a pipeline without a gate will eventually do this again.</p>

<h2>Six gates, each a counter-measure to a named failure</h2>
<p>I rebuilt the process as a five-pass system with a gate layer in front of it. Every gate ends in a decision, not a report:</p>
<ul>
<li><strong>Source document validator.</strong> Checks the client profile for internal consistency and returns GO or NO-GO. A NO-GO stops everything.</li>
<li><strong>Brand voice sample validator.</strong> Runs one representative skill, grades the output A to F against the client's voice anchors (attributes, words to use, words to avoid, signature claims), and only passes on a grade the team would ship. If the voice fails, the account manager fixes the profile instead of scaling 43 wrong-voice outputs.</li>
<li><strong>Capacity model.</strong> Compares each team member's available hours with what the engagement will ask of them. This exists because an earlier synthesis pass discovered 20–25 hours of work landing on a team that had eight.</li>
<li><strong>Sprint-zero intake.</strong> A hard gate on twenty critical data points that must be present before any content is produced.</li>
<li><strong>Engagement goal generator.</strong> Ten ranked candidate goals, scored on market position, competitive angle and trend fit, so the fan-out has a target.</li>
<li><strong>Skill router.</strong> Routes each of the 43 skills to Critical, High, Medium or Skip for this client, with structural disqualifiers. Not every client needs every output.</li>
</ul>

<h2>Freeze shared state before parallel reads</h2>
<p>The second rule follows from the first. Validators change the source document, so the parallel readers must not start until it is frozen. The onboarding pipeline builds the profile serially, runs the validator as a barrier, checksums the frozen document, and only then fans out four parallel readers. Late corrections don't edit the frozen document mid-run; they queue as amendments and are applied once at the join. If one reader fails, it flags the failure and the others finish; one bad branch doesn't kill the run. Auto-remediation is bounded to two passes, so a broken input can't loop forever.</p>

<h2>Keep the library honest</h2>
<p>Gates protect each run. Something also has to protect the library over time. A quarterly auditor fingerprints every skill, finds near-duplicates, applies retirement criteria to dead skills, and proposes composites, against a target of 200 active skills. And the schema itself gets audited from evidence: a scan of 42 client profiles across 31 data dimensions found social links missing for more than 97% of older profiles and business-listing data captured for one of 42. Twenty recommendations from that scan shipped in the next release.</p>

<h2>Post-mortems should ship as architecture</h2>
<p>Every gate above is a named counter-measure to a named failure. None of them live in a lessons-learned document; they live in the tooling, where they run whether or not anyone remembers the lesson. That's the real principle. If an AI system failed once in a way that could repeat, the fix is a gate in the pipeline, not a note in a wiki.</p>

<h2>What to ask about any multi-agent system</h2>
<ul>
<li>What validates the source before the agents read it?</li>
<li>Is one output graded before the rest are generated?</li>
<li>What happens to the shared state while agents run in parallel?</li>
<li>What happens when one agent fails?</li>
</ul>
"""),
]

def head(title, desc, url, extra_ld, og_type="website"):
    return f'''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-W2PZBSP7J8"></script>
    <script>window.dataLayer = window.dataLayer || []; function gtag(){{dataLayer.push(arguments);}} gtag('js', new Date()); gtag('config', 'G-W2PZBSP7J8');</script>

    <title>{html.escape(title, quote=False)}</title>
    <meta name="description" content="{html.escape(desc)}">
    <link rel="canonical" href="{url}">
    <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
    <meta property="og:type" content="{og_type}">
    <meta property="og:title" content="{html.escape(title)}">
    <meta property="og:description" content="{html.escape(desc)}">
    <meta property="og:url" content="{url}">
    <meta property="og:image" content="{SITE}/assets/matthew-carlson.jpg">
    <meta property="og:site_name" content="Matthew Carlson Consulting">
    <meta property="og:locale" content="en_US">
    <meta property="og:image:width" content="400">
    <meta property="og:image:height" content="400">
    <meta property="og:image:alt" content="Matthew Carlson, AI Solutions Engineer">
    <meta name="twitter:card" content="summary">
    <meta name="twitter:title" content="{html.escape(title)}">
    <meta name="twitter:description" content="{html.escape(desc)}">
    <meta name="twitter:image" content="{SITE}/assets/matthew-carlson.jpg">
    <meta name="author" content="Matthew Carlson">
    <meta name="theme-color" content="#0d1233">
    <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM-readable summary">
    <link rel="alternate" type="text/plain" href="/llms-full.txt" title="LLM-readable full text">
    <link rel="icon" type="image/svg+xml" href="/assets/favicon.svg">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="{FONTS}" rel="stylesheet">
    <link rel="stylesheet" href="/css/site.css">

    <script type="application/ld+json">
{json.dumps(extra_ld, indent=4, ensure_ascii=False)}
    </script>
</head>
<body>
    <a href="#main" class="skip-link">Skip to main content</a>
    <!-- NAV:START -->
    <!-- NAV:END -->
'''

FOOT = '''
    <!-- FOOTER:START -->
    <!-- FOOTER:END -->
    <script src="/js/main.js"></script>
</body>
</html>
'''

def crumbs(items):
    lst = [{"@type": "ListItem", "position": 1, "name": "Home", "item": SITE + "/"}]
    for i, (n, u) in enumerate(items, 2):
        lst.append({"@type": "ListItem", "position": i, "name": n, "item": u})
    return {"@type": "BreadcrumbList", "itemListElement": lst}

def nice_date(d):
    y, m, dd = d.split("-")
    return ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][int(m)] + f" {int(dd)}, {y}"

# Article pages
for a in ARTICLES:
    url = f"{SITE}/insights/{a['slug']}.html"
    ld = {"@context": "https://schema.org", "@graph": [
        {"@type": "Article", "@id": url + "#article", "headline": a["title"], "description": a["summary"], "url": url,
         "datePublished": a["date"], "dateModified": a["date"], "inLanguage": "en-US",
         "author": {"@id": SITE + "/#matthew"}, "publisher": {"@id": SITE + "/#business"},
         "image": SITE + "/assets/matthew-carlson.jpg", "articleSection": a["cat_label"],
         "mainEntityOfPage": {"@id": url + "#webpage"}},
        {"@type": "WebPage", "@id": url + "#webpage", "url": url, "name": a["title"], "description": a["summary"],
         "isPartOf": {"@id": SITE + "/#website"}, "breadcrumb": {"@id": url + "#breadcrumb"}, "dateModified": a["date"]},
        dict(crumbs([("Insights", SITE + "/insights/"), (a["title"], url)]), **{"@id": url + "#breadcrumb"})]}
    svg, cap = wd.render(a["diagram"])
    nums = "\n".join(f'                    <div><strong>{html.escape(n)}</strong><span>{html.escape(l)}</span></div>' for n, l in a["numbers"])
    qa_html = "\n".join(f'''                    <details class="faq-item">
                        <summary>{html.escape(q)}</summary>
                        <div class="faq-answer"><p>{html.escape(ans, quote=False)}</p></div>
                    </details>''' for q, ans in a["qa"])
    ld["@graph"].append({"@type": "FAQPage", "@id": url + "#faq", "mainEntity": [{"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": ans}} for q, ans in a["qa"]]})
    others = [o for o in ARTICLES if o["slug"] != a["slug"]]
    more = "\n".join(f'                    <li><a href="/insights/{o["slug"]}.html">{html.escape(o["title"])}</a></li>' for o in others)
    page = head(a["title"] + " | Matthew Carlson", a["summary"], url, ld, "article") + f'''
    <main id="main">
        <article class="article cat--{a['cat']}">
            <header class="hero article-hero">
                <div class="container narrow">
                    <p class="eyebrow"><a href="/insights/">Insights</a> · {a['cat_label']}</p>
                    <h1>{html.escape(a['title'], quote=False)}</h1>
                    <p class="lead article-hook">{html.escape(a['hook'], quote=False)}</p>
                    <p class="article-meta"><img src="/assets/matthew-carlson.jpg" alt="" width="32" height="32"> Matthew Carlson · {nice_date(a['date'])} · {a['minutes']} min read</p>
                </div>
            </header>
            <div class="container narrow article-body">
                <div class="case-stats article-stats">
{nums}
                </div>
                <figure class="case-figure article-figure">
                    {svg}
                    <figcaption>{cap}</figcaption>
                </figure>
{a['body'].strip()}
                <h2 class="article-more-title">Quick answers</h2>
{qa_html}
                <div class="article-cta">
                    <p><strong>Have a process AI should be running?</strong> Describe it and I'll tell you whether it's worth building. <a href="/contact.html">Book a call</a> or <a href="/ai-bot.html">ask the assistant</a>.</p>
                </div>
                <h2 class="article-more-title">More insights</h2>
                <ul class="article-more">
{more}
                </ul>
            </div>
        </article>
    </main>
''' + FOOT
    (ROOT / "insights" / f"{a['slug']}.html").write_text(page)

# Index page
url = SITE + "/insights/"
ld = {"@context": "https://schema.org", "@graph": [
    {"@type": "CollectionPage", "@id": url + "#webpage", "url": url, "name": "Insights", "description": "Short, specific answers about building production AI systems: agents, voice AI, CRM automation and the engineering habits that keep them safe.",
     "isPartOf": {"@id": SITE + "/#website"}, "breadcrumb": {"@id": url + "#breadcrumb"},
     "hasPart": [{"@type": "Article", "@id": f"{SITE}/insights/{a['slug']}.html#article"} for a in ARTICLES]},
    dict(crumbs([("Insights", url)]), **{"@id": url + "#breadcrumb"})]}
cards = "\n".join(f'''                    <a class="card insight-card cat--{a['cat']}" href="/insights/{a['slug']}.html">
                        <div class="meta-row"><span class="tag">{a['cat_label']}</span><span class="tag">{a['minutes']} min read</span></div>
                        <h2>{html.escape(a['title'], quote=False)}</h2>
                        <p>{html.escape(a['summary'], quote=False)}</p>
                        <span class="card-link">Read →</span>
                    </a>''' for a in ARTICLES)
index = head("Insights: Building Production AI Systems | Matthew Carlson", "Short, specific answers about building production AI systems: voice AI guardrails, what an AI research pipeline costs, and why to gate before fanning out.", url, ld) + f'''
    <main id="main">
        <section class="page-hero">
            <div class="container">
                <p class="eyebrow">Insights</p>
                <h1>One question, answered properly</h1>
                <p class="lead">Short articles from the work: how the systems are built, what they cost to run, and the habits that keep them safe. New ones added as the work produces them.</p>
            </div>
        </section>
        <section class="section-tight">
            <div class="container">
                <div class="grid grid-3 insight-grid">
{cards}
                </div>
            </div>
        </section>
        <section class="section-tight">
            <div class="container">
                <div class="cta-band">
                    <div>
                        <h2>Want the answer for your own process?</h2>
                        <p>Thirty minutes is usually enough to know whether it's worth building.</p>
                    </div>
                    <a href="/contact.html" class="btn btn-primary" data-track="insights-book">Book a call</a>
                </div>
            </div>
        </section>
    </main>
''' + FOOT
(ROOT / "insights" / "index.html").write_text(index)
print("wrote", len(ARTICLES), "articles + index")
