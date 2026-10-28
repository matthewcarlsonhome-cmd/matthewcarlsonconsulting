/* Matthew Carlson Consulting: shared behavior */

function track(eventName, params) {
    if (typeof gtag === 'function') {
        gtag('event', eventName, params || {});
    }
}

function trackContactFormSubmission(formLocation) {
    track('form_submission', { event_category: 'engagement', event_label: formLocation || 'contact-page', form_type: 'contact' });
}

(function () {
    'use strict';

    // Old service anchors from the previous site map to the closest current section.
    var RETIRED_ANCHORS = {
        '#google-shopping': '#reporting-automation',
        '#meta-ads': '#reporting-automation',
        '#pmax': '#reporting-automation',
        '#campaign-builders': '#reporting-automation',
        '#prompt-engineering': '#ai-agents',
        '#ai-automation': '#ai-agents',
        '#workflow-automation': '#crm-automation',
        '#website-development': '#ai-ready-web'
    };
    if (RETIRED_ANCHORS[location.hash] && document.querySelector(RETIRED_ANCHORS[location.hash])) {
        history.replaceState(null, '', RETIRED_ANCHORS[location.hash]);
        document.querySelector(location.hash).scrollIntoView();
    }

    var header = document.getElementById('site-header');
    if (header) {
        var onScroll = function () { header.classList.toggle('is-scrolled', window.scrollY > 8); };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    var toggle = document.getElementById('nav-toggle');
    var menu = document.getElementById('nav-menu');
    if (toggle && menu) {
        var setOpen = function (open) {
            menu.classList.toggle('is-open', open);
            toggle.setAttribute('aria-expanded', String(open));
            toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
        };
        toggle.addEventListener('click', function () { setOpen(!menu.classList.contains('is-open')); });
        menu.addEventListener('click', function (e) { if (e.target.closest('a')) setOpen(false); });
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && menu.classList.contains('is-open')) { setOpen(false); toggle.focus(); }
        });
    }

    document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

    document.addEventListener('click', function (e) {
        var link = e.target.closest('[data-track]');
        if (link) track('cta_click', { event_category: 'engagement', event_label: link.getAttribute('data-track') });
    });

    // Solutions sub-nav: highlight the section in view
    var subnav = document.querySelector('[data-subnav]');
    if (subnav && 'IntersectionObserver' in window) {
        var links = Array.prototype.slice.call(subnav.querySelectorAll('a[href^="#"]'));
        var sections = links.map(function (a) { return document.querySelector(a.getAttribute('href')); }).filter(Boolean);
        var setActive = function (id) {
            links.forEach(function (a) { a.classList.toggle('is-active', a.getAttribute('href') === '#' + id); });
        };
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (en) { if (en.isIntersecting) setActive(en.target.id); });
        }, { rootMargin: '-45% 0px -50% 0px' });
        sections.forEach(function (s) { io.observe(s); });
    }

    // Work page filters
    var filterBar = document.querySelector('[data-filters]');
    if (filterBar) {
        var items = document.querySelectorAll('[data-category]');
        filterBar.addEventListener('click', function (e) {
            var btn = e.target.closest('button[data-filter]');
            if (!btn) return;
            var value = btn.getAttribute('data-filter');
            filterBar.querySelectorAll('button').forEach(function (b) { b.setAttribute('aria-pressed', String(b === btn)); });
            items.forEach(function (item) {
                var cats = item.getAttribute('data-category').split(' ');
                item.hidden = value !== 'all' && cats.indexOf(value) === -1;
            });
            document.querySelectorAll('[data-filter-group]').forEach(function (group) {
                group.hidden = !group.querySelector('[data-category]:not([hidden])');
            });
            track('work_filter', { event_label: value });
        });
    }

    // AI readiness checklist scoring
    var checklist = document.getElementById('checklist');
    if (checklist) {
        var boxes = checklist.querySelectorAll('input[type="checkbox"]');
        var num = document.getElementById('score-num'), fill = document.getElementById('score-fill'), text = document.getElementById('score-text');
        var bands = [
            [0, 'Tick what\'s true today. A rough answer is fine; this is a starting point, not an exam.'],
            [5, 'Something upstream isn\'t ready yet. The fix is usually the process or the data, not the AI. A readiness sprint sorts that out first.'],
            [50, 'You\'re close. Pick the one process with the clearest hours-saved number and pilot it on a small slice.'],
            [75, 'The inputs, outputs and owners exist. This is ready for a build sprint.']
        ];
        var update = function () {
            var score = 0;
            boxes.forEach(function (b) { if (b.checked) score += Number(b.value); });
            num.textContent = score;
            fill.style.width = score + '%';
            var msg = bands[0][1];
            bands.forEach(function (b) { if (score >= b[0]) msg = b[1]; });
            text.textContent = msg;
            try { localStorage.setItem('mcc-readiness', JSON.stringify(Array.prototype.map.call(boxes, function (b) { return b.checked; }))); } catch (e) {}
        };
        try {
            var saved = JSON.parse(localStorage.getItem('mcc-readiness') || 'null');
            if (saved && saved.length === boxes.length) boxes.forEach(function (b, i) { b.checked = saved[i]; });
        } catch (e) {}
        boxes.forEach(function (b) { b.addEventListener('change', update); });
        update();
    }

    // Preselect the contact form's interest from ?interest=
    var interest = new URLSearchParams(location.search).get('interest');
    var serviceSelect = document.getElementById('service');
    if (interest && serviceSelect) {
        var map = { readiness: 'AI readiness / roadmap / fractional AI lead', agents: 'AI agents & workflows', voice: 'Voice & chat AI', crm: 'CRM automation', reporting: 'Reporting & ad-ops automation', web: 'AI-ready website & search visibility' };
        if (map[interest]) serviceSelect.value = map[interest];
    }

    // Contact form result message
    var status = document.getElementById('form-status');
    if (status) {
        var params = new URLSearchParams(location.search);
        if (params.get('status') === 'success') {
            status.textContent = "Thanks. Your message is on its way, and I'll reply within one business day.";
            status.className = 'form-status success';
            status.hidden = false;
            var form = document.getElementById('contact-form');
            if (form) form.hidden = true;
        } else if (params.get('status') === 'error') {
            status.textContent = params.get('message') || 'Something went wrong. Please email contact@matthewcarlsonconsulting.com.';
            status.className = 'form-status error';
            status.hidden = false;
        }
    }
})();
