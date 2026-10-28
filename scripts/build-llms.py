#!/usr/bin/env python3
"""Build llms-full.txt from the site's pages and check llms.txt links.

llms-full.txt is the complete site content as plain Markdown for AI tools.
It is generated, so never edit it by hand. Run from the repo root after
changing page content:  python3 scripts/build-llms.py
"""
import html
import pathlib
import re
import sys
from html.parser import HTMLParser

ROOT = pathlib.Path(__file__).resolve().parent.parent
SITE = "https://matthewcarlsonconsulting.com"
PAGES = ["index.html", "about.html", "services.html", "projects.html", "faq.html"]
# Containers whose content is navigation, decoration or example UI, not facts.
SKIP_CLASSES = {"assistant-card", "cta-band", "filters", "btn-row", "hero-person", "visually-hidden",
                "skip-link", "case-num", "eyebrow", "card-link", "card-icon", "num", "portrait-caption", "chat-disclaimer"}
SKIP_TAGS = {"script", "style", "nav", "header", "footer", "button", "svg", "form", "aside", "img"}
VOID = {"meta", "link", "img", "br", "input", "hr", "source", "area", "base", "col", "embed", "param", "track", "wbr"}
BLOCK = {"h1", "h2", "h3", "h4", "p", "summary", "li", "div", "section", "article", "ul", "ol", "details"}
HEADING = {"h1": "## ", "h2": "### ", "h3": "#### ", "h4": "##### ", "summary": "#### "}


def simplify(src):
    """Rewrite the site's visual components into plain headings, paragraphs and lists."""
    s = re.sub(r'<div class="stats">', "<ul>", src)
    s = re.sub(r'<div class="stat"><div class="stat-value">(.*?)</div><div class="stat-label">(.*?)</div></div>',
               r"<li><strong>\1</strong>: \2</li>", s)
    s = re.sub(r'(<li><strong>[^<]*</strong>: [^<]*</li>\s*)</div>', r"\1</ul>", s)
    s = re.sub(r'<div class="case-stats">((?:\s*<div><strong>.*?</strong><span>.*?</span></div>)+)\s*</div>',
               lambda m: "<ul>" + re.sub(r"<div><strong>(.*?)</strong><span>(.*?)</span></div>",
                                        r"<li><strong>\1</strong>: \2</li>", m.group(1)) + "</ul>", s, flags=re.S)
    s = re.sub(r'<h4>Stack</h4>\s*<ul class="chips">(.*?)</ul>',
               lambda m: "<p>Stack: %s</p>" % ", ".join(re.findall(r"<li>(.*?)</li>", m.group(1))), s, flags=re.S)
    s = re.sub(r'<div class="meta-row"><span class="badge[^"]*">(.*?)</span>(?:<span class="tag">(.*?)</span>)?</div>',
               lambda m: "<p>Status: %s%s</p>" % (m.group(1), (". " + m.group(2)) if m.group(2) else ""), s)
    s = re.sub(r'<span class="badge[^"]*">(.*?)</span>', r"<p>Status: \1</p>", s)
    s = re.sub(r'<a class="card" href="([^"]+)">(.*?)</a>', r'<div>\2<p>Details: <a href="\1">\1</a></p></div>', s, flags=re.S)
    s = re.sub(r'<div class="problem">\s*<div>(.*?)</div>\s*<div>(.*?)</div>\s*</div>', r"<div><h4>\1</h4>\2</div>", s, flags=re.S)
    s = re.sub(r'<p class="duration">(.*?)</p>', r"<p>Duration: \1</p>", s)
    s = re.sub(r'<span class="when">(.*?)</span>', r"<p>\1</p>", s)
    s = s.replace("</strong><span>", "</strong>: <span>")
    return s


class ToMarkdown(HTMLParser):
    def __init__(self, page):
        super().__init__(convert_charrefs=True)
        self.page, self.out, self.buf, self.stack = page, [], [], []
        self.in_main, self.skip, self.depth, self.href = False, 0, 0, None

    def flush(self, prefix=""):
        text = re.sub(r"\s+", " ", "".join(self.buf)).strip()
        self.buf = []
        if text and text != "**":
            self.out.append(prefix + text)

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "main":
            self.in_main = True
            return
        if not self.in_main or tag in VOID:
            return
        skipping = tag in SKIP_TAGS or bool(set((a.get("class") or "").split()) & SKIP_CLASSES) or "hidden" in a
        self.stack.append(skipping)
        if skipping or self.skip:
            self.skip += skipping
            return
        if tag in BLOCK:
            self.flush()
        if tag in ("ul", "ol"):
            self.depth += 1
        elif tag == "strong":
            self.buf.append("**")
        elif tag == "a" and a.get("href"):
            self.href = a["href"]
            self.buf.append("[")

    def handle_endtag(self, tag):
        if tag == "main":
            self.flush()
            self.in_main = False
            return
        if not self.in_main or tag in VOID or not self.stack:
            return
        if self.stack.pop():
            self.skip -= 1
            return
        if self.skip:
            return
        if tag == "strong":
            self.buf.append("**")
        elif tag == "a" and self.href is not None:
            self.buf.append("](%s)" % absolute(self.href, self.page))
            self.href = None
        elif tag in HEADING:
            self.out.append("")
            self.flush(HEADING[tag])
            self.out.append("")
        elif tag == "li":
            self.flush("  " * (self.depth - 1) + "- ")
        elif tag in ("ul", "ol"):
            self.flush()
            self.depth -= 1
            self.out.append("")
        elif tag in BLOCK:
            self.flush()
            if tag in ("p", "article", "section", "details"):
                self.out.append("")

    def handle_data(self, data):
        if self.in_main and not self.skip:
            self.buf.append(data)


def absolute(href, page):
    if href.startswith(("http", "mailto:", "tel:")):
        return href
    if href.startswith("#"):
        return "%s/%s%s" % (SITE, page, href)
    return SITE + "/" + href.lstrip("/")


def page_markdown(name):
    src = (ROOT / name).read_text()
    title = html.unescape(re.search(r"<title>(.*?)</title>", src, re.S).group(1)).strip()
    parser = ToMarkdown(name)
    parser.feed(simplify(src))
    body = "\n".join(parser.out)
    body = re.sub(r"\*\*\s*\*\*", "", body)
    body = re.sub(r"\[\s*([^\]]*?)\s*\]\(", r"[\1](", body)
    body = re.sub(r"\n\s*\n(\s*\n)+", "\n\n", body).strip()
    url = SITE + "/" + ("" if name == "index.html" else name)
    return "# %s\n\nSource: %s\n\n%s\n" % (title, url, body)


def check_llms_txt():
    text = (ROOT / "llms.txt").read_text()
    problems = []
    for url in re.findall(r"\]\((https://matthewcarlsonconsulting\.com/[^)]*)\)", text):
        path, _, anchor = url[len(SITE) + 1:].partition("#")
        path = path or "index.html"
        f = ROOT / path
        if not f.exists():
            problems.append("missing page: " + url)
        elif anchor and 'id="%s"' % anchor not in f.read_text():
            problems.append("missing anchor: " + url)
    return problems


def main():
    intro = (ROOT / "llms.txt").read_text().split("\n## ", 1)[0].strip()
    parts = [intro, "This file is the full text of the site's main pages, generated from the live HTML. "
             "A shorter index is at %s/llms.txt." % SITE]
    parts += [page_markdown(p) for p in PAGES]
    (ROOT / "llms-full.txt").write_text("\n\n---\n\n".join(p.strip() for p in parts) + "\n")
    problems = check_llms_txt()
    for p in problems:
        print("llms.txt:", p)
    print("wrote llms-full.txt (%d KB)" % ((ROOT / "llms-full.txt").stat().st_size // 1024))
    return 1 if problems else 0


if __name__ == "__main__":
    sys.exit(main())
