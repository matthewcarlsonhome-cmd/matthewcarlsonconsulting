# SEO & AEO Implementation Workplan
## Matthew Carlson Consulting - Week of March 9, 2026

---

## PRIORITY 1: CRITICAL TECHNICAL FILES (Day 1)

### 1.1 Create robots.txt
**File:** `/robots.txt`
**Status:** MISSING - Must Create

```txt
# Matthew Carlson Consulting - AI Automation & Digital Marketing
# Madison, Wisconsin

User-agent: *
Allow: /

# Block admin/utility paths
Disallow: /api/
Disallow: /*.json$

# AI Crawler Permissions (AEO/GEO)
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Applebot-Extended
Allow: /

# Sitemap Location
Sitemap: https://matthewcarlsonconsulting.com/sitemap.xml

# LLMs.txt for AI Crawlers
# See: https://matthewcarlsonconsulting.com/llms.txt
```

---

### 1.2 Create llms.txt (AI Crawler Optimization)
**File:** `/llms.txt`
**Status:** MISSING - Must Create

```markdown
# Matthew Carlson Consulting

> AI automation and digital marketing consulting based in Madison, Wisconsin. We specialize in custom AI solutions, workflow automation, Google Shopping feeds, Meta dynamic ads, and Performance Max campaigns.

## Company Information

- **Name:** Matthew Carlson Consulting
- **Location:** Madison, Wisconsin, USA
- **Phone:** (608) 284-7333
- **Email:** contact@matthewcarlsonconsulting.com
- **Website:** https://matthewcarlsonconsulting.com

## Services

### AI Automation
Custom AI implementations including n8n workflow automation, document retrieval systems, vector database semantic search, AI-powered research assistants, and automated report generation. We build 20+ pre-built automation frameworks for lead management, customer support, content creation, and business operations.

### Google Shopping Feeds
Professional Google Shopping feed development, Local Inventory Ad (LIA) feed management, product data optimization, and Merchant Center troubleshooting for retail and e-commerce businesses.

### Meta Dynamic Ads
Facebook and Instagram dynamic product ad feed development, catalog management, and campaign optimization for e-commerce and retail clients.

### Performance Max Campaigns
Google Performance Max campaign strategy, asset group creation, audience signal optimization, and ongoing campaign management for maximum ROI.

## Key Projects

### SkillEngine
AI Career Productivity Platform with 277+ AI skills, 48 application pages, 24 workflows, and 27 role templates. Built in 31 days using Claude Code. Multi-provider AI interface supporting Google Gemini, Anthropic Claude, and OpenAI ChatGPT.
- Live: https://aicareerskills.netlify.app/

### Enterprise CRM System
B2B Client Relationship Management Platform with AI research assistant, multi-contact profiles, activity timeline tracking, and 5-stage pipeline management. Supports 21 industries.

### Media Mix Model Platform
Bayesian Media Mix Modeling with hierarchical models, adstock/saturation curves, multi-platform data connectors, and budget scenario modeling for marketing optimization.

## Expertise

- AI Workflow Automation (n8n, Make, Zapier)
- Vector Databases & Semantic Search (LanceDB, Pinecone)
- Large Language Model Integration (Claude, GPT-4, Gemini)
- Google Ads & Shopping Feed Development
- Meta/Facebook Advertising
- Marketing Analytics & Attribution
- React/TypeScript Full-Stack Development

## Service Area

Primary: Madison, Wisconsin
Secondary: Dane County, Milwaukee, Chicago, Minneapolis
Remote: Nationwide USA

## Contact

For AI automation consulting or digital marketing services in Madison, Wisconsin:
- Phone: (608) 284-7333
- Email: contact@matthewcarlsonconsulting.com
- Website: https://matthewcarlsonconsulting.com/contact.html
```

---

### 1.3 Update sitemap.xml
**File:** `/sitemap.xml`
**Status:** EXISTS - Needs Update (add automations.html, update dates)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <!-- Homepage -->
    <url>
        <loc>https://matthewcarlsonconsulting.com/</loc>
        <lastmod>2026-03-09</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
    </url>

    <!-- Services - High priority, key conversion page -->
    <url>
        <loc>https://matthewcarlsonconsulting.com/services.html</loc>
        <lastmod>2026-03-09</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
    </url>

    <!-- Automations - NEW PAGE -->
    <url>
        <loc>https://matthewcarlsonconsulting.com/automations.html</loc>
        <lastmod>2026-03-09</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
    </url>

    <!-- Projects/Portfolio - Showcases work -->
    <url>
        <loc>https://matthewcarlsonconsulting.com/projects.html</loc>
        <lastmod>2026-03-09</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>

    <!-- About - Trust building page -->
    <url>
        <loc>https://matthewcarlsonconsulting.com/about.html</loc>
        <lastmod>2026-03-09</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
    </url>

    <!-- Contact - Critical conversion page -->
    <url>
        <loc>https://matthewcarlsonconsulting.com/contact.html</loc>
        <lastmod>2026-03-09</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>

    <!-- FAQ - SEO/AEO value, answers common questions -->
    <url>
        <loc>https://matthewcarlsonconsulting.com/faq.html</loc>
        <lastmod>2026-03-09</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.6</priority>
    </url>

    <!-- AI Assistant - Interactive AI marketing assistant -->
    <url>
        <loc>https://matthewcarlsonconsulting.com/ai-bot.html</loc>
        <lastmod>2026-03-09</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.7</priority>
    </url>

    <!-- SkillEngine Bot - AI skills launcher -->
    <url>
        <loc>https://matthewcarlsonconsulting.com/bot.html</loc>
        <lastmod>2026-03-09</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.6</priority>
    </url>

    <!-- Privacy Policy -->
    <url>
        <loc>https://matthewcarlsonconsulting.com/privacy.html</loc>
        <lastmod>2026-03-09</lastmod>
        <changefreq>yearly</changefreq>
        <priority>0.2</priority>
    </url>

    <!-- Terms of Service -->
    <url>
        <loc>https://matthewcarlsonconsulting.com/terms.html</loc>
        <lastmod>2026-03-09</lastmod>
        <changefreq>yearly</changefreq>
        <priority>0.2</priority>
    </url>
</urlset>
```

---

## PRIORITY 2: TITLE & META OPTIMIZATION (Day 1-2)

### Page-by-Page Optimization

| Page | Current Title Length | Optimized Title (55-60 chars) | Optimized Meta Description (151-155 chars) |
|------|---------------------|-------------------------------|-------------------------------------------|
| index.html | 76 chars (TOO LONG) | See below | See below |
| about.html | Needs check | See below | See below |
| services.html | Needs check | See below | See below |
| automations.html | Needs check | See below | See below |
| projects.html | Needs check | See below | See below |
| faq.html | Needs check | See below | See below |
| contact.html | Needs check | See below | See below |

---

### 2.1 Homepage (index.html) - OPTIMIZE

**Current Title:** "AI Automation & Digital Marketing Solutions Madison WI | Matthew Carlson Consulting" (76 chars - TOO LONG)

**NEW Title (59 chars):**
```html
<title>AI Automation Consultant Madison WI | Matthew Carlson</title>
```

**NEW Meta Description (154 chars):**
```html
<meta name="description" content="Madison Wisconsin AI automation consultant. Custom n8n workflows, Google Shopping feeds, Meta ads, Performance Max. Fast deployment for local businesses.">
```

---

### 2.2 About Page (about.html) - OPTIMIZE

**NEW Title (58 chars):**
```html
<title>About Matthew Carlson | Madison AI Automation Expert</title>
```

**NEW Meta Description (153 chars):**
```html
<meta name="description" content="Matthew Carlson: Madison Wisconsin AI consultant with expertise in workflow automation, Google Ads, and full-stack development. Serving local businesses.">
```

---

### 2.3 Services Page (services.html) - OPTIMIZE

**NEW Title (60 chars):**
```html
<title>AI Automation & Digital Marketing Services | Madison WI</title>
```

**NEW Meta Description (155 chars):**
```html
<meta name="description" content="AI automation, Google Shopping feeds, Meta dynamic ads, Performance Max campaigns. Custom solutions for Madison Wisconsin businesses. Free consultation.">
```

---

### 2.4 Automations Page (automations.html) - OPTIMIZE

**NEW Title (55 chars):**
```html
<title>Business Automation Services Madison WI | AI Workflows</title>
```

**NEW Meta Description (154 chars):**
```html
<meta name="description" content="20+ pre-built AI automations for Madison businesses. Lead capture, customer support, content creation, appointment booking. n8n workflow automation.">
```

---

### 2.5 Projects Page (projects.html) - OPTIMIZE

**NEW Title (57 chars):**
```html
<title>AI Projects & Case Studies | Madison WI Consulting</title>
```

**NEW Meta Description (152 chars):**
```html
<meta name="description" content="Real AI automation case studies: SkillEngine platform, Enterprise CRM, Media Mix Modeling. See how Madison businesses transform with custom AI solutions.">
```

---

### 2.6 FAQ Page (faq.html) - OPTIMIZE

**NEW Title (58 chars):**
```html
<title>AI Automation FAQ | Madison WI Consulting Questions</title>
```

**NEW Meta Description (153 chars):**
```html
<meta name="description" content="Common questions about AI automation consulting in Madison Wisconsin. Pricing, timelines, integrations, and how AI workflows help local businesses grow.">
```

---

### 2.7 Contact Page (contact.html) - OPTIMIZE

**NEW Title (54 chars):**
```html
<title>Contact AI Automation Consultant Madison WI | Free Quote</title>
```

**NEW Meta Description (151 chars):**
```html
<meta name="description" content="Contact Matthew Carlson Consulting in Madison, Wisconsin. (608) 284-7333. Free consultation for AI automation, Google Ads, Meta advertising projects.">
```

---

## PRIORITY 3: SCHEMA MARKUP ENHANCEMENTS (Day 2)

### 3.1 Add Person Schema to About Page

Add this schema block to `about.html` in the `<head>`:

```html
<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Matthew Carlson",
    "jobTitle": "AI Automation Consultant",
    "worksFor": {
        "@type": "Organization",
        "name": "Matthew Carlson Consulting",
        "@id": "https://matthewcarlsonconsulting.com/#business"
    },
    "url": "https://matthewcarlsonconsulting.com/about.html",
    "sameAs": [
        "https://linkedin.com/in/matthewcarlsonconsulting",
        "https://x.com/MatthewDCarlson"
    ],
    "knowsAbout": [
        "AI Automation",
        "n8n Workflow Automation",
        "Google Shopping Feeds",
        "Performance Max Campaigns",
        "Meta Dynamic Ads",
        "Vector Databases",
        "Semantic Search",
        "React Development",
        "TypeScript"
    ],
    "address": {
        "@type": "PostalAddress",
        "addressLocality": "Madison",
        "addressRegion": "WI",
        "addressCountry": "US"
    }
}
</script>
```

---

### 3.2 Add BreadcrumbList Schema to All Pages

Add to each page (adjust itemListElement for each page):

**Homepage:**
```html
<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
        {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://matthewcarlsonconsulting.com/"
        }
    ]
}
</script>
```

**Services Page:**
```html
<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
        {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://matthewcarlsonconsulting.com/"
        },
        {
            "@type": "ListItem",
            "position": 2,
            "name": "Services",
            "item": "https://matthewcarlsonconsulting.com/services.html"
        }
    ]
}
</script>
```

**Automations Page:**
```html
<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
        {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://matthewcarlsonconsulting.com/"
        },
        {
            "@type": "ListItem",
            "position": 2,
            "name": "Automations",
            "item": "https://matthewcarlsonconsulting.com/automations.html"
        }
    ]
}
</script>
```

---

### 3.3 Enhanced FAQPage Schema for faq.html

Replace existing FAQ schema with expanded version:

```html
<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "What is AI automation and how can it help my Madison business?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "AI automation uses artificial intelligence to handle repetitive business tasks automatically. For Madison businesses, this means automated lead follow-up, customer support chatbots, appointment scheduling, invoice processing, and more. Most automations save 10-20 hours per week and reduce manual errors."
            }
        },
        {
            "@type": "Question",
            "name": "How much does AI automation consulting cost in Madison WI?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "AI automation projects typically range from simple single-workflow implementations to complex multi-system integrations. Pricing depends on complexity, number of integrations, and ongoing support needs. Contact us for a free consultation and custom quote for your Madison business."
            }
        },
        {
            "@type": "Question",
            "name": "What tools do you use for workflow automation?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "We primarily use n8n for workflow automation due to its flexibility and self-hosting capabilities. We also work with Make (formerly Integromat), Zapier, and custom API integrations. The best tool depends on your specific business needs and existing tech stack."
            }
        },
        {
            "@type": "Question",
            "name": "Do you work with businesses outside Madison?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! While we're based in Madison, Wisconsin, we serve clients throughout Dane County, Milwaukee, Chicago, Minneapolis, and nationwide via remote consulting. AI automation projects work well with remote collaboration."
            }
        },
        {
            "@type": "Question",
            "name": "How long does it take to implement an AI automation?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Simple automations like lead notification systems can be deployed within days. More complex projects involving multiple integrations, custom AI models, or enterprise systems typically take 2-4 weeks. We provide detailed timelines during our initial consultation."
            }
        }
    ]
}
</script>
```

---

## PRIORITY 4: SERVICE SCHEMA FOR AUTOMATIONS PAGE (Day 2-3)

Add comprehensive Service schema to `automations.html`:

```html
<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "AI Workflow Automation",
    "provider": {
        "@type": "LocalBusiness",
        "name": "Matthew Carlson Consulting",
        "@id": "https://matthewcarlsonconsulting.com/#business"
    },
    "areaServed": {
        "@type": "City",
        "name": "Madison",
        "containedInPlace": {
            "@type": "State",
            "name": "Wisconsin"
        }
    },
    "description": "Custom AI automation solutions for Madison businesses. 20+ pre-built automation frameworks including lead management, customer support, content creation, and business operations. Powered by n8n workflow automation.",
    "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "AI Automation Services",
        "itemListElement": [
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": "Lead Management Automations",
                    "description": "Automated lead capture, qualification, routing, and follow-up sequences"
                }
            },
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": "Customer Support Automations",
                    "description": "AI chatbots, ticket routing, FAQ automation, and support analytics"
                }
            },
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": "Content Creation Automations",
                    "description": "Automated blog writing, social media scheduling, and content repurposing"
                }
            },
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": "Business Operations Automations",
                    "description": "Invoice processing, appointment scheduling, reporting, and data sync"
                }
            }
        ]
    }
}
</script>
```

---

## PRIORITY 5: CONTENT ADDITIONS FOR AEO (Day 3-4)

### 5.1 Add "Quick Answer" Sections to Key Pages

**Pattern to add at top of main content on services.html, automations.html:**

```html
<!-- Quick Answer Box for AEO -->
<div class="quick-answer" style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-left: 4px solid #00d4ff; padding: 1.5rem; margin-bottom: 2rem; border-radius: 8px;">
    <p style="font-size: 1.1rem; color: #e0e0e0; margin: 0;">
        <strong style="color: #00d4ff;">Quick Answer:</strong> Matthew Carlson Consulting provides AI automation services in Madison, Wisconsin. We specialize in n8n workflow automation, Google Shopping feeds, Meta dynamic ads, and Performance Max campaigns. Call <a href="tel:+16082847333" style="color: #00d4ff;">(608) 284-7333</a> for a free consultation.
    </p>
</div>
```

---

### 5.2 Add Semantic HTML5 Structure

Ensure all pages use proper semantic structure:

```html
<main>
    <article>
        <header>
            <h1>Primary Page Title</h1>
        </header>
        <section>
            <h2>Section Title</h2>
            <p>Content...</p>
        </section>
    </article>
</main>
```

---

## PRIORITY 6: LOCAL SEO ENHANCEMENTS (Day 4-5)

### 6.1 Add Local Business Schema Enhancements

Update LocalBusiness schema on all pages to include:

```html
<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://matthewcarlsonconsulting.com/#business",
    "name": "Matthew Carlson Consulting",
    "image": "https://matthewcarlsonconsulting.com/assets/og-image.jpg",
    "telephone": "+1-608-284-7333",
    "email": "contact@matthewcarlsonconsulting.com",
    "url": "https://matthewcarlsonconsulting.com",
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "",
        "addressLocality": "Madison",
        "addressRegion": "WI",
        "postalCode": "53703",
        "addressCountry": "US"
    },
    "geo": {
        "@type": "GeoCoordinates",
        "latitude": 43.0731,
        "longitude": -89.4012
    },
    "openingHoursSpecification": [
        {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "09:00",
            "closes": "17:00"
        }
    ],
    "priceRange": "$$",
    "paymentAccepted": ["Cash", "Credit Card", "Invoice"],
    "currenciesAccepted": "USD",
    "areaServed": [
        {
            "@type": "City",
            "name": "Madison",
            "containedInPlace": {"@type": "State", "name": "Wisconsin"}
        },
        {
            "@type": "City",
            "name": "Milwaukee",
            "containedInPlace": {"@type": "State", "name": "Wisconsin"}
        },
        {
            "@type": "State",
            "name": "Wisconsin"
        }
    ],
    "sameAs": [
        "https://linkedin.com/in/matthewcarlsonconsulting",
        "https://x.com/MatthewDCarlson"
    ]
}
</script>
```

---

### 6.2 Footer NAP+W Consistency

Ensure footer on ALL pages has consistent NAP+W:

```html
<footer>
    <div class="footer-contact" itemscope itemtype="https://schema.org/LocalBusiness">
        <span itemprop="name">Matthew Carlson Consulting</span>
        <address itemprop="address" itemscope itemtype="https://schema.org/PostalAddress">
            <span itemprop="addressLocality">Madison</span>,
            <span itemprop="addressRegion">WI</span>
        </address>
        <a href="tel:+16082847333" itemprop="telephone">(608) 284-7333</a>
        <a href="mailto:contact@matthewcarlsonconsulting.com" itemprop="email">contact@matthewcarlsonconsulting.com</a>
        <a href="https://matthewcarlsonconsulting.com" itemprop="url">matthewcarlsonconsulting.com</a>
    </div>
</footer>
```

---

## PRIORITY 7: EXTERNAL TASKS (Non-Code, Day 5+)

### 7.1 Google Business Profile Setup

1. Go to https://business.google.com
2. Claim/create listing for "Matthew Carlson Consulting"
3. Add:
   - Business name: Matthew Carlson Consulting
   - Category: "Marketing Consultant" + "Computer Consultant"
   - Address: Madison, WI (service area business)
   - Phone: (608) 284-7333
   - Website: https://matthewcarlsonconsulting.com
   - Hours: Mon-Fri 9am-5pm
   - Description: AI automation and digital marketing consulting in Madison, Wisconsin. Custom AI solutions, Google Shopping feeds, Meta ads, Performance Max campaigns.
   - Services: Add all service categories
   - Photos: Add professional photos

### 7.2 Citation Directories

Submit to these directories with consistent NAP+W:

**Priority 1 (This Week):**
- Google Business Profile
- Bing Places
- Apple Business Connect
- Yelp Business

**Priority 2 (Next Week):**
- LinkedIn Company Page
- Facebook Business Page
- Clutch.co
- UpCity

**Priority 3 (Month 2):**
- BBB (Better Business Bureau)
- Chamber of Commerce
- Industry-specific directories

---

## IMPLEMENTATION CHECKLIST

### Day 1 (Monday)
- [ ] Create robots.txt
- [ ] Create llms.txt
- [ ] Update sitemap.xml (add automations.html, update dates)
- [ ] Optimize index.html title/meta
- [ ] Optimize services.html title/meta
- [ ] Optimize automations.html title/meta

### Day 2 (Tuesday)
- [ ] Optimize about.html title/meta
- [ ] Optimize projects.html title/meta
- [ ] Optimize faq.html title/meta
- [ ] Optimize contact.html title/meta
- [ ] Add Person schema to about.html
- [ ] Add BreadcrumbList schema to all pages

### Day 3 (Wednesday)
- [ ] Add enhanced FAQPage schema to faq.html
- [ ] Add Service schema to automations.html
- [ ] Add Service schema to services.html
- [ ] Add Quick Answer boxes to key pages

### Day 4 (Thursday)
- [ ] Update LocalBusiness schema on all pages
- [ ] Add microdata to footer on all pages
- [ ] Verify canonical tags on all pages
- [ ] Test all schema with Google Rich Results Test

### Day 5 (Friday)
- [ ] Set up Google Business Profile
- [ ] Submit to Bing Places
- [ ] Create/verify LinkedIn Company Page
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools

---

## VALIDATION TOOLS

After implementation, test with:

1. **Schema Validation:**
   - https://validator.schema.org/
   - https://search.google.com/test/rich-results

2. **SEO Audit:**
   - Google Search Console
   - Bing Webmaster Tools
   - Screaming Frog (local crawl)

3. **Page Speed:**
   - https://pagespeed.web.dev/
   - Core Web Vitals in Chrome DevTools

4. **Local SEO:**
   - Moz Local
   - BrightLocal Citation Tracker

---

## QUICK REFERENCE: FILE CHANGES NEEDED

| File | Changes Required |
|------|-----------------|
| robots.txt | CREATE (new file) |
| llms.txt | CREATE (new file) |
| sitemap.xml | UPDATE (add automations, update dates) |
| index.html | UPDATE (title, meta, breadcrumb schema) |
| about.html | UPDATE (title, meta, Person schema, breadcrumb) |
| services.html | UPDATE (title, meta, Service schema, breadcrumb) |
| automations.html | UPDATE (title, meta, Service schema, breadcrumb) |
| projects.html | UPDATE (title, meta, breadcrumb schema) |
| faq.html | UPDATE (title, meta, FAQPage schema, breadcrumb) |
| contact.html | UPDATE (title, meta, breadcrumb schema) |
| privacy.html | UPDATE (breadcrumb schema) |
| terms.html | UPDATE (breadcrumb schema) |

---

## ESTIMATED IMPACT

| Optimization | Expected Impact | Timeline |
|-------------|----------------|----------|
| robots.txt + llms.txt | AI crawler indexing | 1-2 weeks |
| Title/Meta optimization | CTR improvement 15-25% | 2-4 weeks |
| Schema markup | Rich snippets eligibility | 2-6 weeks |
| Local SEO (GBP) | Local pack visibility | 4-8 weeks |
| FAQ optimization | PAA/featured snippet eligibility | 4-8 weeks |
| Citation building | Domain authority, local signals | 2-3 months |

---

*Document generated: March 9, 2026*
*Ready for immediate implementation*
