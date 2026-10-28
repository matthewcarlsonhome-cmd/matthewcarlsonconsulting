"""Inline SVG system diagrams for the Work page case studies."""
import html

W, H = 440, 240


def node(n):
    x, y, w, h = n["box"]
    lines = n["t"].split("|")
    sub = n.get("s")
    lh = 14
    total = len(lines) * lh + (13 if sub else 0)
    ty = y + h / 2 - total / 2 + 11
    out = ['<g class="n %s">' % n.get("k", "in"),
           '<rect x="%g" y="%g" width="%g" height="%g" rx="9" fill="%s" stroke="#94a3b8"/>' % (x, y, w, h, "#4f46e5" if n.get("k") == "core" else "#ffffff")]
    for i, line in enumerate(lines):
        out.append('<text x="%g" y="%g" class="t" text-anchor="middle" font-size="12" font-weight="600" fill="%s">%s</text>' % (x + w / 2, ty + i * lh, "#ffffff" if n.get("k") == "core" else "#0f1a2b", html.escape(line)))
    if sub:
        out.append('<text x="%g" y="%g" class="s" text-anchor="middle" font-size="10" fill="%s">%s</text>' % (x + w / 2, ty + len(lines) * lh + 1, "#ffffff" if n.get("k") == "core" else "#5b6575", html.escape(sub)))
    out.append("</g>")
    return "".join(out)


def edge(a, b, mid=None):
    ax, ay, aw, ah = a["box"]
    bx, by, bw, bh = b["box"]
    if bx >= ax + aw - 1:          # b to the right
        x1, y1, x2, y2 = ax + aw, ay + ah / 2, bx, by + bh / 2
    elif bx + bw <= ax + 1:        # b to the left
        x1, y1, x2, y2 = ax, ay + ah / 2, bx + bw, by + bh / 2
    else:                          # vertical
        down = by > ay
        x1, x2 = ax + aw / 2, bx + bw / 2
        y1, y2 = (ay + ah, by) if down else (ay, by + bh)
        if abs(x1 - x2) < 1:
            return '<path class="e" d="M%g %gV%g"/>' % (x1, y1, y2 + (-4 if down else 4))
        my = (y1 + y2) / 2
        return '<path class="e" d="M%g %gV%gH%gV%g"/>' % (x1, y1, my, x2, y2 + (-4 if down else 4))
    sign = 1 if x2 > x1 else -1
    if abs(y1 - y2) < 1:
        return '<path class="e" d="M%g %gH%g"/>' % (x1, y1, x2 - 4 * sign)
    mx = mid if mid is not None else (x1 + x2) / 2
    return '<path class="e" d="M%g %gH%gV%gH%g"/>' % (x1, y1, mx, y2, x2 - 4 * sign)


def svg(key, label, nodes, edges, extra=""):
    ids = {n["id"]: n for n in nodes}
    parts = ['<svg class="diagram" viewBox="0 0 %d %d" role="img" aria-label="%s">' % (W, H, html.escape(label)),
             '<defs><marker id="arr-%s" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L8 4L0 8z" class="ah" fill="#64748b"/></marker></defs>' % key,
             '<g class="edges" fill="none" stroke="#64748b" stroke-width="1.4" style="marker-end:url(#arr-%s)">' % key]
    for e in edges:
        if len(e) > 2 and isinstance(e[2], str):
            parts.append('<path class="e" d="%s"/>' % e[2])
        else:
            parts.append(edge(ids[e[0]], ids[e[1]], e[2] if len(e) > 2 else None))
    parts.append("</g>" + extra)
    parts += [node(n) for n in nodes]
    parts.append("</svg>")
    return "".join(parts)


def N(id, box, t, s=None, k="in"):
    return {"id": id, "box": box, "t": t, "s": s, "k": k}


DIAGRAMS = {
    "client-mind": ("Public sources feed one 26-section client profile, which 33 agents and an MCP server read.", [
        N("a", (8, 22, 112, 44), "Website", "crawled pages"),
        N("b", (8, 98, 112, 44), "Reviews & listings", "Google, Yelp, BBB"),
        N("c", (8, 174, 112, 44), "Public records", "licenses, WHOIS"),
        N("m", (160, 76, 122, 88), "Client Mind", "26-section profile", "core"),
        N("o1", (322, 44, 110, 50), "33 AI agents", "content, ads, SEO", "out"),
        N("o2", (322, 146, 110, 50), "MCP server", "Claude reads it", "out"),
    ], [("a", "m", 140), ("b", "m", 140), ("c", "m", 140), ("m", "o1", 302), ("m", "o2", 302)]),
    "agents-that-build": ("A written spec is built by Claude or Codex inside a CRM test location, checked by API readback, and gaps loop back to the spec.", [
        N("s", (8, 40, 104, 56), "Written spec", "every object", "in"),
        N("a", (150, 40, 116, 56), "Claude / Codex", "build in the app", "core"),
        N("c", (304, 40, 128, 56), "CRM test location", "workflows, fields, KB", "out"),
        N("r", (304, 150, 128, 56), "API readback", "verifies each object", "out"),
        N("g", (150, 150, 116, 56), "Gap report", "what still needs work", "in"),
    ], [("s", "a"), ("a", "c"), ("c", "r"), ("r", "g"), ("g", "s", "M150 178H60V100")]),
    "voice-ai": ("An inbound call reaches the voice agent, which books, transfers, takes a message or sends a follow-up text.", [
        N("c", (8, 96, 92, 48), "Inbound call"),
        N("v", (134, 82, 118, 76), "Voice agent", "6 service branches", "core"),
        N("o1", (290, 12, 142, 40), "Book showroom visit", None, "out"),
        N("o2", (290, 70, 142, 40), "Transfer with summary", None, "out"),
        N("o3", (290, 128, 142, 40), "Take a message", None, "out"),
        N("o4", (290, 186, 142, 40), "Follow-up text", None, "out"),
    ], [("c", "v"), ("v", "o1", 272), ("v", "o2", 272), ("v", "o3", 272), ("v", "o4", 272)]),
    "account-health": ("Every client CRM account is read nightly by a read-only engine with 18 flags, producing CRM tasks, a dashboard and a Monday digest.", [
        N("a", (8, 92, 116, 56), "Every client", "CRM account", "in"),
        N("e", (158, 92, 118, 56), "Nightly engine", "18 health flags", "core"),
        N("o1", (310, 30, 122, 44), "Tasks in the CRM", None, "out"),
        N("o2", (310, 98, 122, 44), "Health dashboard", None, "out"),
        N("o3", (310, 166, 122, 44), "Monday digest", None, "out"),
    ], [("a", "e"), ("e", "o1", 294), ("e", "o2", 294), ("e", "o3", 294)]),
    "google-ads-suite": ("Fifteen scripts run across every account in the manager account and produce audits, pacing, search-term reports and the weekly deck.", [
        N("a", (8, 92, 116, 56), "Manager account", "every client", "in"),
        N("e", (158, 92, 118, 56), "15 scripts", "daily to quarterly", "core"),
        N("o1", (310, 30, 122, 44), "Audits & pacing", None, "out"),
        N("o2", (310, 98, 122, 44), "Search-term reports", None, "out"),
        N("o3", (310, 166, 122, 44), "Weekly client deck", None, "out"),
    ], [("a", "e"), ("e", "o1", 294), ("e", "o2", 294), ("e", "o3", 294)]),
    "onboarding": ("A new client triggers a webhook, a Claude agent researches the business, the report returns to the CRM, the client verifies it, and the account builds itself.", [
        N("n", (8, 26, 108, 48), "New client", "in the CRM"),
        N("w", (148, 26, 104, 48), "Webhook", "fires the agent"),
        N("r", (284, 20, 148, 60), "Claude research", "site, records, reviews", "core"),
        N("b", (284, 158, 148, 56), "Report in the CRM", "every field labeled", "out"),
        N("v", (148, 158, 104, 56), "Client verifies", "and e-signs"),
        N("x", (8, 158, 108, 56), "Account builds", "automatically", "out"),
    ], [("n", "w"), ("w", "r"), ("r", "b"), ("b", "v"), ("v", "x")]),
    "skill-library": ("One source document is built, validated and frozen, then parallel skills read it to produce 17 deliverables.", [
        N("b", (8, 92, 86, 56), "Build", "source doc"),
        N("v", (114, 92, 86, 56), "Validate", "go / no-go"),
        N("f", (220, 92, 86, 56), "Freeze", "checksummed", "core"),
        N("p1", (334, 16, 98, 40), "Skill", None, "out"),
        N("p2", (334, 72, 98, 40), "Skill", None, "out"),
        N("p3", (334, 128, 98, 40), "Skill", None, "out"),
        N("p4", (334, 184, 98, 40), "17 deliverables", None, "out"),
    ], [("b", "v"), ("v", "f"), ("f", "p1", 320), ("f", "p2", 320), ("f", "p3", 320), ("f", "p4", 320)]),
    "ai-strategy": ("A two-week readiness sprint scores five domains, maps opportunities, decides build versus buy, and ends in a 90-day roadmap.", [
        N("a", (8, 92, 96, 56), "Readiness audit", "5 domains, /100"),
        N("b", (124, 92, 96, 56), "Opportunity map", "hours, revenue, risk"),
        N("c", (240, 92, 96, 56), "Build vs buy", "one call per item", "core"),
        N("d", (356, 92, 76, 56), "90-day|roadmap", None, "out"),
    ], [("a", "b"), ("b", "c"), ("c", "d")]),
    "forward-deployed": ("An outside consultant delivers recommendations and leaves; a forward deployed engineer builds inside the client's systems and hands off a running system.", [
        N("o1", (8, 30, 126, 44), "Outside consultant", "discovery call"),
        N("o2", (158, 30, 128, 44), "Recommendations", "a deck"),
        N("o3", (310, 30, 122, 44), "You build it", "or it stalls"),
        N("f1", (8, 150, 92, 56), "Discovery", "in your systems", "core"),
        N("f2", (116, 150, 92, 56), "Spec & build", "in your environment", "core"),
        N("f3", (224, 150, 92, 56), "Test & gate", "before anyone sees it", "core"),
        N("f4", (332, 150, 100, 56), "Runs with|your team", "you own it", "out"),
    ], [("o1", "o2"), ("o2", "o3"), ("f1", "f2"), ("f2", "f3"), ("f3", "f4")]),
    "research-pipeline": ("A client research pull crawls and sweeps, builds and freezes one profile, fans out to parallel readers, and reports its cost at the end.", [
        N("a", (8, 22, 96, 44), "Crawl site", "pages, metered"),
        N("b", (8, 98, 96, 44), "External sweep", "reviews, records"),
        N("c", (8, 174, 96, 44), "Competitor scan", "by service type"),
        N("m", (140, 76, 110, 88), "Client profile", "validated, frozen", "core"),
        N("r", (286, 44, 68, 152), "4 parallel|readers", None, "in"),
        N("o", (372, 44, 60, 68), "17|outputs", None, "out"),
        N("$", (372, 128, 60, 68), "$4–8|per run", None, "out"),
    ], [("a", "m", 122), ("b", "m", 122), ("c", "m", 122), ("m", "r"), ("r", "o"), ("r", "$")]),
    "gate-before-fanout": ("A source document passes a validator and a graded voice sample, is frozen with a checksum, and only then fans out to many agents.", [
        N("s", (8, 92, 90, 56), "Source|document"),
        N("v", (118, 92, 92, 56), "Validator", "GO / NO-GO", "core"),
        N("g", (230, 92, 92, 56), "Voice sample", "graded A–F", "core"),
        N("f", (342, 92, 90, 56), "Freeze", "checksummed", "core"),
        N("x1", (342, 8, 90, 36), "Agent", None, "out"),
        N("x2", (342, 196, 90, 36), "Agent ×43", None, "out"),
    ], [("s", "v"), ("v", "g"), ("g", "f"), ("f", "x1"), ("f", "x2")]),
    "website-launch": ("Design and build, content and QA, and a one-evening launch led to 1,000 organic clicks per 28 days within four weeks.", [
        N("a", (8, 36, 128, 56), "Design & build", "Jun 5–25"),
        N("b", (156, 36, 128, 56), "Content & QA", "Jun 25–Jul 3"),
        N("c", (304, 36, 128, 56), "Launch", "Jul 4–5, one evening", "core"),
        N("r", (156, 154, 276, 56), "1,000+ organic clicks / 28 days", "within four weeks of launch", "out"),
    ], [("a", "b"), ("b", "c"), ("c", "r")]),
}


def render(key):
    caption, nodes, edges = DIAGRAMS[key]
    return svg(key, caption, nodes, edges), caption
