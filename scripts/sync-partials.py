#!/usr/bin/env python3
"""Stamp partials/nav.html and partials/footer.html into every root *.html page.

Pages mark the slots with <!-- NAV:START --><!-- NAV:END --> and
<!-- FOOTER:START --><!-- FOOTER:END -->. The current page's nav link gets
aria-current="page". Run from the repo root: python3 scripts/sync-partials.py
"""
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parent.parent
NAV = (ROOT / "partials" / "nav.html").read_text().rstrip("\n")
FOOTER = (ROOT / "partials" / "footer.html").read_text().rstrip("\n")


def indent(block, prefix):
    return "\n".join(prefix + line if line else line for line in block.splitlines())


def fill(html, name, block):
    pattern = re.compile(r"([ \t]*)<!-- %s:START -->.*?<!-- %s:END -->" % (name, name), re.S)
    match = pattern.search(html)
    if not match:
        return html, False
    pad = match.group(1)
    replacement = "%s<!-- %s:START -->\n%s\n%s<!-- %s:END -->" % (pad, name, indent(block, pad), pad, name)
    return html[: match.start()] + replacement + html[match.end():], True


for page in sorted(ROOT.glob("*.html")):
    html = page.read_text()
    href = "/" + page.name
    nav = NAV.replace('href="%s">' % href, 'href="%s" aria-current="page">' % href)
    nav = nav.replace('href="%s" class="btn">' % href, 'href="%s" class="btn" aria-current="page">' % href)
    html, has_nav = fill(html, "NAV", nav)
    html, has_footer = fill(html, "FOOTER", FOOTER)
    if has_nav or has_footer:
        page.write_text(html)
        print("synced", page.name)
