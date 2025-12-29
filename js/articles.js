/**
 * Matthew Carlson Consulting
 * Article/Blog System
 *
 * A simple, WordPress-like article management system.
 * Articles are stored as JSON data and rendered dynamically.
 *
 * To add a new article:
 * 1. Add article metadata to the ARTICLES array below
 * 2. Create an HTML file in /articles/ with the article content
 *
 * Or use the simpler approach:
 * 1. Add full article data including content to the ARTICLES array
 */

const ArticleSystem = (function() {
    'use strict';

    // ========================================
    // Article Database
    // Add new articles here!
    // ========================================

    const ARTICLES = [
        {
            id: 'google-shopping-feed-automation',
            slug: 'google-shopping-feed-automation-guide',
            title: 'The Complete Guide to Google Shopping Feed Automation',
            excerpt: 'Learn how to automate your Google Shopping feeds for better performance and less manual work. A step-by-step guide for e-commerce businesses.',
            category: 'Google Ads',
            categorySlug: 'google-ads',
            author: 'Matthew Carlson',
            date: '2024-12-15',
            readTime: '8 min read',
            featured: true,
            tags: ['google shopping', 'feed automation', 'e-commerce', 'pmax'],
            image: null,
            content: `
                <p>Managing Google Shopping feeds manually is one of the biggest time sinks for e-commerce businesses and the agencies that serve them. Every product update, price change, and inventory adjustment requires attention—and mistakes can lead to disapproved products or wasted ad spend.</p>

                <h2>Why Automate Your Google Shopping Feeds?</h2>

                <p>The math is simple: a catalog of 1,000 products with weekly updates means 52,000 potential manual touches per year. Even at 30 seconds per update, that's 433 hours of work—more than 10 full work weeks.</p>

                <p>Automation doesn't just save time. It also:</p>

                <ul>
                    <li>Reduces errors that lead to product disapprovals</li>
                    <li>Ensures real-time inventory accuracy</li>
                    <li>Enables dynamic pricing strategies</li>
                    <li>Frees your team for strategic work</li>
                </ul>

                <h2>Key Components of Feed Automation</h2>

                <p>A robust feed automation system includes several interconnected components:</p>

                <h3>1. Data Source Integration</h3>

                <p>Your automation starts with clean data. This means connecting directly to your:</p>

                <ul>
                    <li>E-commerce platform (Shopify, WooCommerce, Magento, etc.)</li>
                    <li>Inventory management system</li>
                    <li>Pricing engine</li>
                    <li>Product information management (PIM) system</li>
                </ul>

                <h3>2. Transformation Rules</h3>

                <p>Raw product data rarely matches Google's requirements exactly. Your automation should handle:</p>

                <ul>
                    <li>Title optimization for search visibility</li>
                    <li>Description formatting and length requirements</li>
                    <li>Category mapping to Google's taxonomy</li>
                    <li>Image URL validation and sizing</li>
                    <li>Custom label assignment for campaign segmentation</li>
                </ul>

                <h3>3. Validation & Quality Control</h3>

                <p>Before any data reaches Google Merchant Center, automated validation should catch:</p>

                <ul>
                    <li>Missing required fields</li>
                    <li>Invalid GTINs or MPNs</li>
                    <li>Price mismatches with landing pages</li>
                    <li>Out-of-stock products still marked available</li>
                </ul>

                <h3>4. Scheduled Sync</h3>

                <p>Different data types need different update frequencies:</p>

                <ul>
                    <li><strong>Inventory:</strong> Every 15-30 minutes for high-velocity products</li>
                    <li><strong>Pricing:</strong> Hourly or as changes occur</li>
                    <li><strong>Product details:</strong> Daily is usually sufficient</li>
                    <li><strong>New products:</strong> Immediate upon publication</li>
                </ul>

                <h2>Getting Started</h2>

                <p>If you're currently managing feeds manually, don't try to automate everything at once. Start with your highest-impact pain point—usually inventory sync or pricing—and expand from there.</p>

                <p>For most businesses, the ROI on feed automation is measured in weeks, not months. The combination of time savings and reduced errors typically pays for implementation costs within the first quarter.</p>

                <blockquote>
                    <p>Ready to automate your Google Shopping feeds? <a href="/contact.html">Let's discuss your specific needs</a> and build a solution that scales with your business.</p>
                </blockquote>
            `
        },
        {
            id: 'ai-document-retrieval-business',
            slug: 'ai-document-retrieval-for-business',
            title: 'AI Document Retrieval: Transform How Your Team Finds Information',
            excerpt: 'Discover how vector databases and semantic search can help your team find the right information in seconds instead of hours.',
            category: 'AI Automation',
            categorySlug: 'ai-automation',
            author: 'Matthew Carlson',
            date: '2024-12-10',
            readTime: '6 min read',
            featured: true,
            tags: ['ai', 'semantic search', 'vector database', 'automation'],
            image: null,
            content: `
                <p>How much time does your team spend searching for information? Studies suggest knowledge workers spend up to 20% of their time looking for internal information—and often fail to find what they need.</p>

                <p>AI-powered document retrieval changes this equation entirely.</p>

                <h2>The Problem with Traditional Search</h2>

                <p>Traditional keyword search works great when you know exactly what you're looking for. But business reality is messier:</p>

                <ul>
                    <li>"What did we decide about the Johnson account pricing?" (searching for a decision, not a document)</li>
                    <li>"Show me examples of how we've handled similar client objections" (conceptual search)</li>
                    <li>"What's our policy on remote work for contractors?" (finding relevant policy in multiple documents)</li>
                </ul>

                <p>Keyword search fails here because it matches words, not meaning.</p>

                <h2>How Semantic Search Works</h2>

                <p>Semantic search uses AI to understand the meaning behind your query and match it to the meaning in your documents. The technology behind this—vector embeddings—converts text into numerical representations that capture semantic relationships.</p>

                <p>When you search for "client objection handling," the system finds documents about:</p>

                <ul>
                    <li>Sales call scripts addressing common concerns</li>
                    <li>Case studies showing how objections were overcome</li>
                    <li>Training materials on negotiation techniques</li>
                </ul>

                <p>Even if none of these documents contain the exact phrase "client objection handling."</p>

                <h2>Real Business Applications</h2>

                <h3>For Sales Teams</h3>
                <p>Find relevant case studies, proposals, and competitive intelligence in seconds. Answer prospect questions with accurate, up-to-date information without hunting through folders.</p>

                <h3>For Customer Support</h3>
                <p>Surface relevant knowledge base articles, past ticket resolutions, and product documentation instantly. Reduce resolution time and improve consistency.</p>

                <h3>For Professional Services</h3>
                <p>Search across years of project documentation, contracts, and deliverables. Find precedents and templates without knowing exactly where they're stored.</p>

                <h2>Implementation Considerations</h2>

                <p>Building an effective document retrieval system requires attention to:</p>

                <ul>
                    <li><strong>Document processing:</strong> Converting various formats (PDFs, docs, emails) into searchable text</li>
                    <li><strong>Chunking strategy:</strong> Breaking documents into appropriately sized pieces for retrieval</li>
                    <li><strong>Vector database selection:</strong> Choosing the right storage for your scale and query patterns</li>
                    <li><strong>Access controls:</strong> Ensuring users only find documents they're authorized to see</li>
                </ul>

                <p>The good news: modern tools make this more accessible than ever. A basic system can be operational in weeks, not months.</p>

                <blockquote>
                    <p>Interested in bringing AI-powered search to your organization? <a href="/contact.html">Schedule a consultation</a> to explore what's possible.</p>
                </blockquote>
            `
        },
        {
            id: 'meta-dynamic-product-ads',
            slug: 'meta-dynamic-product-ads-setup-guide',
            title: 'Meta Dynamic Product Ads: Setup Guide for Maximum ROAS',
            excerpt: 'Everything you need to know about setting up Facebook and Instagram dynamic product ads that convert. Feed setup, catalog configuration, and campaign structure.',
            category: 'Meta Ads',
            categorySlug: 'meta-ads',
            author: 'Matthew Carlson',
            date: '2024-12-05',
            readTime: '10 min read',
            featured: false,
            tags: ['meta ads', 'facebook ads', 'instagram ads', 'dynamic ads', 'product catalog'],
            image: null,
            content: `
                <p>Dynamic Product Ads (DPAs) on Meta platforms are one of the most efficient ways to drive e-commerce revenue. By automatically showing users products they've viewed or similar items they might like, DPAs combine the power of personalization with the scale of paid social.</p>

                <p>But setup matters. A poorly configured catalog or feed can tank performance before you even launch a campaign.</p>

                <h2>Feed Fundamentals</h2>

                <p>Your product feed is the foundation of everything. Meta requires specific fields and formats:</p>

                <h3>Required Fields</h3>
                <ul>
                    <li><strong>id:</strong> Unique identifier matching your website</li>
                    <li><strong>title:</strong> Product name (max 150 characters, front-load important info)</li>
                    <li><strong>description:</strong> Product details (max 5,000 characters)</li>
                    <li><strong>availability:</strong> in stock, out of stock, preorder, available for order</li>
                    <li><strong>condition:</strong> new, refurbished, used</li>
                    <li><strong>price:</strong> Format as "99.99 USD"</li>
                    <li><strong>link:</strong> Product page URL</li>
                    <li><strong>image_link:</strong> Primary product image (min 500x500px)</li>
                    <li><strong>brand:</strong> Product brand name</li>
                </ul>

                <h3>Recommended Fields</h3>
                <ul>
                    <li><strong>sale_price:</strong> Discounted price if applicable</li>
                    <li><strong>additional_image_link:</strong> Up to 10 additional images</li>
                    <li><strong>product_type:</strong> Your own categorization</li>
                    <li><strong>google_product_category:</strong> Google's taxonomy ID</li>
                    <li><strong>custom_label_0-4:</strong> For campaign segmentation</li>
                </ul>

                <h2>Catalog Configuration</h2>

                <p>Once your feed is ready, proper catalog setup determines how well Meta can match products to users:</p>

                <h3>Event Matching</h3>
                <p>Ensure your Pixel events pass the correct content_ids that match your feed's id field. Mismatched IDs break retargeting entirely.</p>

                <h3>Product Sets</h3>
                <p>Create logical product sets for campaign targeting:</p>
                <ul>
                    <li>By category or product type</li>
                    <li>By price range</li>
                    <li>By margin (use custom labels)</li>
                    <li>By bestseller status</li>
                </ul>

                <h2>Campaign Structure</h2>

                <p>A proven DPA campaign structure:</p>

                <h3>Retargeting Campaigns</h3>
                <ul>
                    <li><strong>Viewed but not purchased (1-3 days):</strong> Hot prospects, highest intent</li>
                    <li><strong>Viewed but not purchased (4-14 days):</strong> Warm prospects</li>
                    <li><strong>Add to cart abandoners:</strong> Very high intent, prioritize these</li>
                    <li><strong>Past purchasers (cross-sell):</strong> Show complementary products</li>
                </ul>

                <h3>Prospecting Campaigns</h3>
                <ul>
                    <li><strong>Broad targeting with DPA:</strong> Let Meta's algorithm find buyers</li>
                    <li><strong>Lookalike audiences + DPA:</strong> Based on past purchasers</li>
                    <li><strong>Interest targeting + DPA:</strong> Category-specific prospecting</li>
                </ul>

                <h2>Optimization Tips</h2>

                <ol>
                    <li><strong>Image quality matters:</strong> Use clean, consistent product photography</li>
                    <li><strong>Titles drive clicks:</strong> Include key details like brand, size, color</li>
                    <li><strong>Update frequency:</strong> Sync inventory at least every 24 hours</li>
                    <li><strong>Exclude low performers:</strong> Remove products that never convert</li>
                    <li><strong>Test creative overlays:</strong> Add "Sale" or "Free Shipping" badges</li>
                </ol>

                <blockquote>
                    <p>Need help setting up or optimizing your Meta product catalog? <a href="/contact.html">Get in touch</a> for a personalized strategy.</p>
                </blockquote>
            `
        },
        {
            id: 'performance-max-strategy',
            slug: 'performance-max-campaign-strategy',
            title: 'Performance Max Campaigns: Strategy Guide for 2025',
            excerpt: 'How to structure, optimize, and scale Google Performance Max campaigns. Asset groups, audience signals, and reporting insights.',
            category: 'Google Ads',
            categorySlug: 'google-ads',
            author: 'Matthew Carlson',
            date: '2024-11-28',
            readTime: '12 min read',
            featured: false,
            tags: ['performance max', 'pmax', 'google ads', 'campaign strategy'],
            image: null,
            content: `
                <p>Performance Max has become Google's flagship campaign type, consolidating Shopping, Display, YouTube, Search, and Discovery into a single AI-driven format. Love it or hate it, understanding PMax is essential for modern Google Ads management.</p>

                <h2>Understanding Performance Max</h2>

                <p>PMax fundamentally changes the advertiser's role. Instead of managing bids, placements, and targeting directly, you provide:</p>

                <ul>
                    <li>Creative assets (images, videos, headlines, descriptions)</li>
                    <li>Audience signals (suggestions, not restrictions)</li>
                    <li>Conversion goals and values</li>
                    <li>Budget and bid strategy</li>
                </ul>

                <p>Google's AI handles everything else. This is both its strength and its challenge.</p>

                <h2>Campaign Structure</h2>

                <h3>When to Use Multiple Campaigns</h3>
                <p>Consider separate PMax campaigns for:</p>
                <ul>
                    <li>Different products with different margins (to allow different ROAS targets)</li>
                    <li>Branded vs. non-branded focus</li>
                    <li>Different geographic regions</li>
                    <li>New customer acquisition vs. remarketing emphasis</li>
                </ul>

                <h3>Asset Group Strategy</h3>
                <p>Within each campaign, asset groups should be:</p>
                <ul>
                    <li><strong>Thematically coherent:</strong> Products that make sense to advertise together</li>
                    <li><strong>Asset-aligned:</strong> Creative that represents the products in that group</li>
                    <li><strong>Audience-appropriate:</strong> Signals matching the likely buyers</li>
                </ul>

                <h2>Audience Signals</h2>

                <p>Audience signals are suggestions to Google's algorithm, not hard targeting rules. Effective signals include:</p>

                <h3>First-Party Data</h3>
                <ul>
                    <li>Past purchasers (for similar product interests)</li>
                    <li>High-value customers (to find more like them)</li>
                    <li>Cart abandoners</li>
                </ul>

                <h3>Custom Segments</h3>
                <ul>
                    <li>Search term-based (people who searched for X)</li>
                    <li>URL-based (people who browse competitor sites)</li>
                    <li>App-based (people who use related apps)</li>
                </ul>

                <h3>Google Audiences</h3>
                <ul>
                    <li>In-market audiences relevant to your products</li>
                    <li>Affinity audiences matching your customer profile</li>
                    <li>Life events (where relevant)</li>
                </ul>

                <h2>Creative Best Practices</h2>

                <p>Assets make or break PMax performance:</p>

                <h3>Images</h3>
                <ul>
                    <li>Provide all size variations (square, landscape, portrait)</li>
                    <li>Mix product shots with lifestyle imagery</li>
                    <li>Ensure text overlays are minimal and readable</li>
                    <li>Test different styles per asset group</li>
                </ul>

                <h3>Headlines & Descriptions</h3>
                <ul>
                    <li>Use all available slots (15 headlines, 4 descriptions)</li>
                    <li>Include keywords naturally</li>
                    <li>Mix benefit-focused and feature-focused copy</li>
                    <li>Include calls-to-action</li>
                </ul>

                <h3>Video</h3>
                <ul>
                    <li>YouTube-ready formats are essential</li>
                    <li>Short-form (15-30 seconds) for awareness</li>
                    <li>Longer form for consideration</li>
                    <li>If you don't provide video, Google will auto-generate (usually poorly)</li>
                </ul>

                <h2>Optimization & Reporting</h2>

                <p>PMax's limited reporting is frustrating but workable:</p>

                <ul>
                    <li>Use asset group reports to understand product performance</li>
                    <li>Check auction insights for competitive positioning</li>
                    <li>Review placement reports (when available) for quality</li>
                    <li>Monitor search term insights for query matching</li>
                </ul>

                <p>Third-party scripts can extract additional data, including search term performance—essential for understanding what's actually driving conversions.</p>

                <blockquote>
                    <p>Need help building or optimizing your Performance Max campaigns? <a href="/contact.html">Let's develop a strategy</a> tailored to your business goals.</p>
                </blockquote>
            `
        },
        {
            id: 'ai-research-assistants',
            slug: 'building-ai-research-assistants',
            title: 'Building AI Research Assistants for Business',
            excerpt: 'How to create custom AI tools that accelerate research, competitive analysis, and market intelligence gathering.',
            category: 'AI Automation',
            categorySlug: 'ai-automation',
            author: 'Matthew Carlson',
            date: '2024-11-20',
            readTime: '7 min read',
            featured: false,
            tags: ['ai', 'research', 'automation', 'competitive intelligence'],
            image: null,
            content: `
                <p>Research is essential but time-consuming. Whether you're analyzing competitors, exploring new markets, or gathering technical information, the process often involves hours of reading, summarizing, and synthesizing information.</p>

                <p>AI research assistants can compress this work dramatically—if built correctly.</p>

                <h2>What AI Research Assistants Do Well</h2>

                <ul>
                    <li><strong>Summarization:</strong> Condensing long documents into key points</li>
                    <li><strong>Comparison:</strong> Analyzing multiple sources to find patterns</li>
                    <li><strong>Extraction:</strong> Pulling specific data points from unstructured text</li>
                    <li><strong>Synthesis:</strong> Combining information from multiple sources</li>
                    <li><strong>Monitoring:</strong> Tracking changes over time</li>
                </ul>

                <h2>Common Use Cases</h2>

                <h3>Competitive Intelligence</h3>
                <p>Monitor competitor websites, press releases, job postings, and social media. Automatically summarize changes and flag significant developments.</p>

                <h3>Market Research</h3>
                <p>Analyze industry reports, news articles, and analyst commentary. Extract trends, sizing data, and growth projections.</p>

                <h3>Technical Research</h3>
                <p>Survey documentation, forums, and technical articles. Summarize approaches, compare solutions, and identify best practices.</p>

                <h3>Content Research</h3>
                <p>Analyze top-performing content in your space. Identify topics, formats, and angles that resonate with your audience.</p>

                <h2>Building Effective Research Assistants</h2>

                <h3>1. Define Specific Outputs</h3>
                <p>Generic research requests produce generic results. Instead of "research our competitors," define exactly what you want:</p>
                <ul>
                    <li>Pricing comparison table</li>
                    <li>Feature matrix</li>
                    <li>Messaging analysis</li>
                    <li>Customer review sentiment summary</li>
                </ul>

                <h3>2. Structure the Process</h3>
                <p>Break research into discrete steps:</p>
                <ol>
                    <li>Source identification</li>
                    <li>Data collection</li>
                    <li>Information extraction</li>
                    <li>Analysis and synthesis</li>
                    <li>Report generation</li>
                </ol>

                <h3>3. Include Quality Controls</h3>
                <p>AI can hallucinate or misinterpret. Build in:</p>
                <ul>
                    <li>Source citation requirements</li>
                    <li>Confidence scoring</li>
                    <li>Human review checkpoints</li>
                    <li>Fact verification steps</li>
                </ul>

                <h3>4. Iterate Based on Usage</h3>
                <p>Initial versions are rarely perfect. Plan for refinement based on:</p>
                <ul>
                    <li>Output quality feedback</li>
                    <li>Missing information patterns</li>
                    <li>User workflow integration</li>
                </ul>

                <h2>The ROI Calculation</h2>

                <p>A research task that takes 4 hours manually might take 30 minutes with a well-built AI assistant. Over a year of weekly research tasks, that's 180+ hours saved—equivalent to more than a month of full-time work.</p>

                <p>More importantly, faster research means faster decisions and faster action on opportunities.</p>

                <blockquote>
                    <p>Ready to accelerate your research workflows? <a href="/contact.html">Let's discuss</a> building custom AI research tools for your specific needs.</p>
                </blockquote>
            `
        },
        {
            id: 'marketing-agency-ai-automation',
            slug: 'ai-automation-for-marketing-agencies',
            title: 'AI Automation Opportunities for Marketing Agencies',
            excerpt: 'Where AI can save your agency time and improve client results. From reporting to creative to campaign management.',
            category: 'AI Automation',
            categorySlug: 'ai-automation',
            author: 'Matthew Carlson',
            date: '2024-11-15',
            readTime: '9 min read',
            featured: true,
            tags: ['ai', 'marketing agencies', 'automation', 'efficiency'],
            image: null,
            content: `
                <p>Marketing agencies face a constant tension: deliver better results for clients while maintaining (or improving) margins. AI automation offers a path through this challenge—not by replacing your team, but by amplifying their capabilities.</p>

                <h2>High-Impact Automation Opportunities</h2>

                <h3>1. Client Reporting</h3>
                <p>The average agency spends 8-12 hours per client per month on reporting. AI can:</p>
                <ul>
                    <li>Aggregate data from multiple platforms automatically</li>
                    <li>Generate narrative insights from performance data</li>
                    <li>Create visualizations and charts</li>
                    <li>Draft executive summaries</li>
                </ul>
                <p><strong>Potential time savings:</strong> 60-80% of current reporting time</p>

                <h3>2. Feed Management</h3>
                <p>For agencies managing e-commerce clients:</p>
                <ul>
                    <li>Automated feed updates and synchronization</li>
                    <li>Title and description optimization</li>
                    <li>Error monitoring and alerts</li>
                    <li>Custom label management</li>
                </ul>
                <p><strong>Potential time savings:</strong> 70-90% of manual feed work</p>

                <h3>3. Campaign Creation</h3>
                <p>AI-assisted campaign building includes:</p>
                <ul>
                    <li>Audience research and recommendations</li>
                    <li>Ad copy generation and testing</li>
                    <li>Keyword research and grouping</li>
                    <li>Budget allocation suggestions</li>
                </ul>
                <p><strong>Potential time savings:</strong> 40-50% of campaign setup time</p>

                <h3>4. Content Production</h3>
                <p>For content-focused agencies:</p>
                <ul>
                    <li>Research and outline generation</li>
                    <li>First draft creation</li>
                    <li>SEO optimization suggestions</li>
                    <li>Repurposing content across formats</li>
                </ul>
                <p><strong>Potential time savings:</strong> 30-50% of content production time</p>

                <h2>Implementation Approach</h2>

                <h3>Start with Pain Points</h3>
                <p>Don't automate everything at once. Identify your agency's biggest time sinks and start there. Common candidates:</p>
                <ul>
                    <li>Monthly reporting cycles</li>
                    <li>New client onboarding tasks</li>
                    <li>Repetitive campaign optimizations</li>
                    <li>Data entry and platform synchronization</li>
                </ul>

                <h3>Build for Your Workflow</h3>
                <p>Off-the-shelf tools rarely fit agency workflows perfectly. Custom automation—built around your specific processes—delivers better ROI.</p>

                <h3>Train Your Team</h3>
                <p>Automation changes roles, not headcount. Your team needs to understand:</p>
                <ul>
                    <li>How to prompt AI tools effectively</li>
                    <li>When to trust automated outputs (and when to verify)</li>
                    <li>How to incorporate automation into client deliverables</li>
                </ul>

                <h2>The Competitive Advantage</h2>

                <p>Agencies that embrace AI automation can:</p>
                <ul>
                    <li>Serve more clients without proportional staff growth</li>
                    <li>Deliver faster turnaround on client requests</li>
                    <li>Provide deeper analysis and insights</li>
                    <li>Maintain healthier margins</li>
                </ul>

                <p>The agencies that wait will find themselves competing against more efficient competitors.</p>

                <blockquote>
                    <p>Ready to explore AI automation for your agency? <a href="/contact.html">Schedule a consultation</a> to identify your highest-impact opportunities.</p>
                </blockquote>
            `
        }
    ];

    // ========================================
    // Utility Functions
    // ========================================

    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }

    function getArticlesByCategory(category) {
        return ARTICLES.filter(article => article.categorySlug === category);
    }

    function getFeaturedArticles() {
        return ARTICLES.filter(article => article.featured);
    }

    function getLatestArticles(count = 3) {
        return [...ARTICLES]
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, count);
    }

    function getArticleBySlug(slug) {
        return ARTICLES.find(article => article.slug === slug);
    }

    function getAllCategories() {
        const categories = [...new Set(ARTICLES.map(a => a.category))];
        return categories.map(cat => ({
            name: cat,
            slug: ARTICLES.find(a => a.category === cat).categorySlug,
            count: ARTICLES.filter(a => a.category === cat).length
        }));
    }

    // ========================================
    // Rendering Functions
    // ========================================

    function renderArticleCard(article, featured = false) {
        return `
            <article class="article-card ${featured ? 'featured' : ''}">
                <div class="article-image">
                    ${article.image
                        ? `<img src="${article.image}" alt="${article.title}">`
                        : `<svg viewBox="0 0 48 48" fill="none">
                            <rect x="6" y="10" width="36" height="28" rx="2" stroke="currentColor" stroke-width="2"/>
                            <path d="M6 18h36" stroke="currentColor" stroke-width="2"/>
                            <circle cx="14" cy="14" r="2" fill="currentColor"/>
                            <circle cx="22" cy="14" r="2" fill="currentColor"/>
                            <path d="M12 26h24M12 32h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                        </svg>`
                    }
                </div>
                <div class="article-content">
                    <span class="article-category">${article.category}</span>
                    <h3 class="article-title">
                        <a href="article.html?slug=${article.slug}">${article.title}</a>
                    </h3>
                    <p class="article-excerpt">${article.excerpt}</p>
                    <div class="article-meta">
                        <span class="article-date">${formatDate(article.date)}</span>
                        <span class="article-read-time">${article.readTime}</span>
                    </div>
                </div>
            </article>
        `;
    }

    function renderLatestArticles(containerId, count = 3) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const articles = getLatestArticles(count);
        container.innerHTML = articles.map((article, index) =>
            renderArticleCard(article, index === 0)
        ).join('');
    }

    function renderAllArticles(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const articles = [...ARTICLES].sort((a, b) => new Date(b.date) - new Date(a.date));
        container.innerHTML = articles.map(article => renderArticleCard(article)).join('');
    }

    function renderArticlesByCategory(containerId, category) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const articles = getArticlesByCategory(category);
        container.innerHTML = articles.map(article => renderArticleCard(article)).join('');
    }

    function renderSingleArticle(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const urlParams = new URLSearchParams(window.location.search);
        const slug = urlParams.get('slug');

        if (!slug) {
            container.innerHTML = '<p>Article not found.</p>';
            return;
        }

        const article = getArticleBySlug(slug);

        if (!article) {
            container.innerHTML = '<p>Article not found.</p>';
            return;
        }

        // Update page title and meta
        document.title = `${article.title} | Matthew Carlson Consulting`;

        // Update meta description
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute('content', article.excerpt);
        }

        // Render article header
        const headerContainer = document.getElementById('article-header-content');
        if (headerContainer) {
            headerContainer.innerHTML = `
                <span class="article-category">${article.category}</span>
                <h1 class="article-title">${article.title}</h1>
                <div class="article-meta">
                    <span class="article-author">By ${article.author}</span>
                    <span class="article-date">${formatDate(article.date)}</span>
                    <span class="article-read-time">${article.readTime}</span>
                </div>
            `;
        }

        // Render article body
        container.innerHTML = article.content;

        // Add article structured data
        const articleSchema = {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": article.title,
            "description": article.excerpt,
            "author": {
                "@type": "Person",
                "name": article.author
            },
            "datePublished": article.date,
            "publisher": {
                "@type": "Organization",
                "name": "Matthew Carlson Consulting"
            }
        };

        const scriptTag = document.createElement('script');
        scriptTag.type = 'application/ld+json';
        scriptTag.textContent = JSON.stringify(articleSchema);
        document.head.appendChild(scriptTag);
    }

    function renderCategoryFilter(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const categories = getAllCategories();
        container.innerHTML = `
            <button class="category-filter active" data-category="all">All</button>
            ${categories.map(cat => `
                <button class="category-filter" data-category="${cat.slug}">
                    ${cat.name} (${cat.count})
                </button>
            `).join('')}
        `;

        // Add click handlers
        container.querySelectorAll('.category-filter').forEach(btn => {
            btn.addEventListener('click', function() {
                container.querySelectorAll('.category-filter').forEach(b => b.classList.remove('active'));
                this.classList.add('active');

                const category = this.dataset.category;
                const articlesContainer = document.getElementById('articles-grid');

                if (category === 'all') {
                    renderAllArticles('articles-grid');
                } else {
                    renderArticlesByCategory('articles-grid', category);
                }
            });
        });
    }

    // ========================================
    // Initialize
    // ========================================

    function init() {
        // Render latest articles on homepage
        renderLatestArticles('latest-articles', 3);

        // Render all articles on articles page
        renderAllArticles('articles-grid');

        // Render category filter
        renderCategoryFilter('category-filters');

        // Render single article
        renderSingleArticle('article-body');
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // ========================================
    // Public API
    // ========================================

    return {
        getArticles: () => ARTICLES,
        getLatestArticles,
        getFeaturedArticles,
        getArticleBySlug,
        getAllCategories,
        renderArticleCard,
        renderLatestArticles,
        renderAllArticles
    };

})();

// Make available globally for debugging
window.ArticleSystem = ArticleSystem;
