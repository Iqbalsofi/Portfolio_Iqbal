// =========================================
// Iqbal Maqbool Sofi — Portfolio 2026
// "The Journey" Edition
// =========================================

document.addEventListener('DOMContentLoaded', () => {

    // --- Scroll Progress ---
    const scrollProgress = document.getElementById('scrollProgress');
    window.addEventListener('scroll', () => {
        requestAnimationFrame(() => {
            const h = document.documentElement.scrollHeight - window.innerHeight;
            if (scrollProgress && h > 0) {
                scrollProgress.style.width = (window.scrollY / h * 100) + '%';
            }
        });
    }, { passive: true });

    // --- Nav scroll effect ---
    const nav = document.getElementById('mainNav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        requestAnimationFrame(() => {
            if (!nav) return;
            nav.classList.toggle('scrolled', window.scrollY > 60);
        });
    }, { passive: true });

    // --- Active nav link ---
    const sections = document.querySelectorAll('.section, .hero');
    const navAnchors = document.querySelectorAll('.nav-links a');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navAnchors.forEach(a => {
                    a.classList.toggle('active', a.dataset.section === id);
                });
            }
        });
    }, { rootMargin: '-30% 0px -60% 0px', threshold: 0 });

    sections.forEach(s => { if (s.id) sectionObserver.observe(s); });

    // --- Smooth scroll ---
    navAnchors.forEach(a => {
        a.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.getElementById(a.dataset.section);
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // --- Reveal animations ---
    const reveals = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.06, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(el => revealObserver.observe(el));

    // --- Mobile nav toggle ---
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('mobile-open');
            navToggle.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('mobile-open') ? 'hidden' : '';
        });

        navAnchors.forEach(a => {
            a.addEventListener('click', () => {
                if (navLinks.classList.contains('mobile-open')) {
                    navLinks.classList.remove('mobile-open');
                    navToggle.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        });
    }
});
