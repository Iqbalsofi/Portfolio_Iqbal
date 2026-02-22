// =========================================
// Iqbal Maqbool Sofi — Portfolio 2026
// Optimized interactions
// =========================================

document.addEventListener('DOMContentLoaded', () => {

    // --- Cursor Spotlight (throttled with rAF) ---
    let rafId = null;

    document.addEventListener('mousemove', (e) => {
        if (rafId) return; // Skip if a frame is already queued
        rafId = requestAnimationFrame(() => {
            document.documentElement.style.setProperty('--mouse-x', e.clientX + 'px');
            document.documentElement.style.setProperty('--mouse-y', e.clientY + 'px');
            rafId = null;
        });
    });

    // --- Active Section Detection ---
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.dataset.section === id);
                });
            }
        });
    }, {
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0
    });

    sections.forEach(section => sectionObserver.observe(section));

    // --- Smooth Scroll ---
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.getElementById(link.dataset.section);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // --- Fade-in Animation with Staggered Delays ---
    const fadeTargets = document.querySelectorAll(
        '.experience-card, .project-card, .skills-group, .about-text p'
    );

    fadeTargets.forEach((el, index) => {
        el.classList.add('fade-target');
        // Stagger within each section: reset index per parent
        const siblings = el.parentElement.querySelectorAll(':scope > .fade-target');
        const siblingIndex = Array.from(siblings).indexOf(el);
        el.style.transitionDelay = `${siblingIndex * 0.08}s`;
    });

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    fadeTargets.forEach(el => fadeObserver.observe(el));

    // --- Mobile Menu Toggle ---
    const mobileToggle = document.getElementById('mobileToggle');
    const sidebar = document.getElementById('sidebar');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            sidebar.classList.toggle('mobile-open');
            document.body.style.overflow = sidebar.classList.contains('mobile-open') ? 'hidden' : '';
        });

        // Close menu on nav link click (mobile)
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (sidebar.classList.contains('mobile-open')) {
                    mobileToggle.classList.remove('active');
                    sidebar.classList.remove('mobile-open');
                    document.body.style.overflow = '';
                }
            });
        });
    }

    // --- Prevent default on experience cards (no link yet) ---
    document.querySelectorAll('.experience-card[href="#"]').forEach(card => {
        card.addEventListener('click', (e) => e.preventDefault());
    });

});
