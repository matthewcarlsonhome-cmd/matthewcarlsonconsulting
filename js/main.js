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
