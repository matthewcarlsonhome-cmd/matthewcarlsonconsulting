/**
 * Matthew Carlson Consulting
 * Main JavaScript
 */

(function() {
    'use strict';

    // ========================================
    // Navigation
    // ========================================

    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    // Scroll handling for navbar
    function handleScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on load

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            navToggle.setAttribute('aria-expanded', navMenu.classList.contains('active'));
        });
    }

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // ========================================
    // Smooth scrolling for anchor links
    // ========================================

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const navHeight = navbar.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========================================
    // Intersection Observer for animations
    // ========================================

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.service-card, .use-case, .process-step, .article-card, .stat-card').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });

    // ========================================
    // FAQ Accordion
    // ========================================

    document.querySelectorAll('.faq-question').forEach(button => {
        button.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');

            // Close all other items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });

            // Toggle current item
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });

    // ========================================
    // Contact Form Handling
    // ========================================

    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());

            // Here you would typically send the data to your backend
            // For now, we'll show a success message
            console.log('Form submitted:', data);

            // Show success message
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;

            submitBtn.innerHTML = `
                <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"/>
                </svg>
                Message Sent!
            `;
            submitBtn.disabled = true;

            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                contactForm.reset();
            }, 3000);
        });
    }

    // ========================================
    // Counter Animation
    // ========================================

    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(start + (target - start) * easeOutQuart);

            element.textContent = current;

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    }

    // Observe stat numbers
    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-count'));
                if (target) {
                    animateCounter(entry.target, target);
                    statObserver.unobserve(entry.target);
                }
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('[data-count]').forEach(el => {
        statObserver.observe(el);
    });

    // ========================================
    // Update Copyright Year
    // ========================================

    const yearEl = document.getElementById('current-year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // ========================================
    // Active Nav Link Highlighting
    // ========================================

    function updateActiveNavLink() {
        const currentPath = window.location.pathname;
        const filename = currentPath.split('/').pop() || 'index.html';

        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');

            if (href === '/' && (filename === '' || filename === 'index.html')) {
                link.classList.add('active');
            } else if (href === filename) {
                link.classList.add('active');
            }
        });
    }

    updateActiveNavLink();

    // ========================================
    // Preload critical images
    // ========================================

    function preloadImage(src) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = resolve;
            img.onerror = reject;
            img.src = src;
        });
    }

    // ========================================
    // Performance: Lazy load images
    // ========================================

    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[data-src]');

        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // ========================================
    // Keyboard Navigation Enhancement
    // ========================================

    document.addEventListener('keydown', function(e) {
        // ESC closes mobile menu
        if (e.key === 'Escape') {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // ========================================
    // Reduced Motion Support
    // ========================================

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (prefersReducedMotion.matches) {
        // Disable animations for users who prefer reduced motion
        document.documentElement.style.setProperty('--transition-fast', '0ms');
        document.documentElement.style.setProperty('--transition-base', '0ms');
        document.documentElement.style.setProperty('--transition-slow', '0ms');
    }

})();
