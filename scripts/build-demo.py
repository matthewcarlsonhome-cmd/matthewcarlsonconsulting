#!/usr/bin/env python3
"""Build a self-contained preview copy of the site (styles, scripts and images inlined,
analytics removed, form and assistant replies simulated).  Usage: build-demo.py OUT_DIR"""
import re, sys, base64, pathlib
D = pathlib.Path(sys.argv[1]); D.mkdir(parents=True, exist_ok=True); R = pathlib.Path(__file__).resolve().parent.parent
css = (R / 'css/site.css').read_text()
def conv(m):
    body = m.group(1)
    return '@media (prefers-color-scheme: dark) {\n    :root:not([data-theme="light"]) {%s\n        color-scheme: dark;\n    }\n}\n:root[data-theme="dark"] {%s\n    color-scheme: dark;\n}' % (body, body)
css, n = re.subn(r'@media \(prefers-color-scheme: dark\) \{\s*:root \{(.*?)\n    \}\n\}', conv, css, flags=re.S)
assert n == 2, n
css += '\n.site-header { top: env(safe-area-inset-top, 0px); }\n.demo-bar { background: var(--accent-soft); color: var(--ink); font-size: 0.85rem; text-align: center; padding: 8px 16px; border-bottom: 1px solid var(--line); }\n'
img = lambda p, m: 'data:%s;base64,%s' % (m, base64.b64encode((R / p).read_bytes()).decode())
head_jpg = img('assets/matthew-carlson.jpg', 'image/jpeg'); mmm = img('assets/MMMExecutiveDashboard.png', 'image/png'); fav = img('assets/favicon.svg', 'image/svg+xml')
main_js = (R / 'js/main.js').read_text(); bot_js = (R / 'js/ai-bot.js').read_text()
demo_js = '''<script>
(function(){
  var realFetch = window.fetch;
  window.fetch = function(url, opts){
    if (String(url).indexOf('api/ai-chat.php') !== -1) {
      var reply = "This is a preview, so replies are simulated. On the live site this goes to Claude Sonnet with the full text of the site and the conversation so far, and you get a specific answer or a first-pass plan: the trigger, the data it needs, the steps, the safety rules and how to test it before launch.";
      return new Promise(function(r){ setTimeout(function(){ r(new Response(JSON.stringify({message: reply}), {status:200, headers:{'Content-Type':'application/json'}})); }, 700); });
    }
    return realFetch.apply(this, arguments);
  };
  var form = document.getElementById('contact-form');
  if (form) form.addEventListener('submit', function(e){
    e.preventDefault();
    var s = document.getElementById('form-status');
    s.textContent = "Preview only: on the live site this message is emailed to Matthew, and he replies within one business day.";
    s.className = 'form-status success'; s.hidden = false; form.hidden = true;
  });
})();
</script>'''
bar = '<div class="demo-bar">Preview of the redesigned matthewcarlsonconsulting.com. The contact form and AI Assistant replies are simulated here.</div>'
for f in ['index.html', 'services.html', 'projects.html', 'about.html', 'faq.html', 'contact.html', 'ai-bot.html', 'privacy.html', 'terms.html']:
    s = (R / f).read_text()
    s = re.sub(r'\s*<script async src="https://www.googletagmanager.com[^<]*</script>\s*<script>window.dataLayer[^<]*</script>', '', s)
    s = re.sub(r'\s*<link rel="alternate" type="text/plain"[^>]*>', '', s)
    s = s.replace('href="/"', 'href="index.html"')
    s = re.sub(r'href="/([a-z0-9-]+\.html)', 'href="\\1', s)
    s = s.replace('<link rel="stylesheet" href="css/site.css">', '<style>\n' + css + '\n</style>')
    s = s.replace('href="assets/favicon.svg"', 'href="%s"' % fav)
    s = s.replace('src="assets/matthew-carlson.jpg"', 'src="%s"' % head_jpg).replace('src="assets/MMMExecutiveDashboard.png"', 'src="%s"' % mmm)
    s = s.replace('<script src="js/main.js"></script>', '<script>\n' + main_js + '\n</script>')
    s = s.replace('<script src="js/ai-bot.js"></script>', demo_js + '\n<script>\n' + bot_js + '\n</script>')
    if f == 'contact.html': s = s.replace('<script>\n' + main_js, demo_js + '\n<script>\n' + main_js)
    s = s.replace(' onsubmit="trackContactFormSubmission(\'contact-page\')"', '')
    s = re.sub(r'(<body>)', r'\1\n    ' + bar, s, count=1)
    if f == 'index.html':
        hd = re.search(r'<head>(.*?)</head>', s, re.S).group(1); bd = re.search(r'<body>(.*?)</body>', s, re.S).group(1)
        hd = re.sub(r'\s*<meta (charset|name="viewport")[^>]*>', '', hd)
        hd = re.sub(r'<title>.*?</title>', '<title>Matthew Carlson Site Preview</title>', hd)
        s = hd.strip() + '\n' + bd
    assert 'css/site.css' not in s and 'googletagmanager' not in s, f
    (D / f).write_text(s)
print('demo built in', D)
