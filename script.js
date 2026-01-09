// =========================================
// Modern Portfolio JavaScript - 2025/2026
// Clean, performant, and interactive
// =========================================

// =========================================
// Navigation
// =========================================
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navItems = document.querySelectorAll('.nav-item');

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Active section highlighting
function highlightActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-item[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink?.classList.add('active');
        } else {
            navLink?.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', highlightActiveSection);

// =========================================
// Smooth Scroll
// =========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// =========================================
// Scroll to Top Button
// =========================================
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// =========================================
// Intersection Observer for Animations
// =========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for fade-in animations
document.querySelectorAll('.project-card, .skill-group, .timeline-item, .stat-card, .info-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// =========================================
// Contact Form Handling
// =========================================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Create mailto link
    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    const mailtoLink = `mailto:iqbalmaqbol@gmail.com?subject=${subject}&body=${body}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Show feedback
    alert('Opening your email client... Thank you for reaching out!');
    
    // Reset form
    contactForm.reset();
});

// =========================================
// Stats Counter Animation
// =========================================
function animateCounter(element, target, suffix = '') {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + suffix;
            clearInterval(timer);
        } else {
            if (suffix === '+') {
                element.textContent = Math.floor(current) + suffix;
            } else {
                element.textContent = Math.floor(current) + suffix;
            }
        }
    }, 30);
}

// Animate stats when they come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = document.querySelectorAll('.stat-number');
            statNumbers.forEach((stat) => {
                const text = stat.textContent;
                if (text.includes('2.5')) {
                    animateCounter(stat, 2.5, '+');
                } else if (text.includes('500K')) {
                    animateCounter(stat, 500, 'K+');
                } else if (text.includes('15')) {
                    animateCounter(stat, 15, '+');
                }
            });
            statsObserver.disconnect();
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.about-stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// =========================================
// Parallax Effect for Scroll
// =========================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const terminalWindow = document.querySelector('.terminal-window');
    
    if (terminalWindow) {
        const speed = 0.3;
        terminalWindow.style.transform = `translateY(${scrolled * speed}px)`;
    }
});

// =========================================
// Skill Tag Interactions
// =========================================
const skillTags = document.querySelectorAll('.skill-tag');

skillTags.forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        // Add ripple effect
        this.style.transform = 'translateY(-2px) scale(1.05)';
    });
    
    tag.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// =========================================
// Project Card Tilt Effect
// =========================================
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
    });
});

// =========================================
// Timeline Item Interactions
// =========================================
const timelineItems = document.querySelectorAll('.timeline-item');

timelineItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        const marker = this.querySelector('.timeline-marker');
        marker.style.transform = 'scale(1.2)';
    });
    
    item.addEventListener('mouseleave', function() {
        const marker = this.querySelector('.timeline-marker');
        marker.style.transform = 'scale(1)';
    });
});

// =========================================
// Copy Email to Clipboard
// =========================================
const emailCards = document.querySelectorAll('.contact-card[href^="mailto:"]');

emailCards.forEach(card => {
    card.addEventListener('click', function(e) {
        // Still allow default mailto behavior
        // But also copy to clipboard as bonus
        const email = 'iqbalmaqbol@gmail.com';
        
        if (navigator.clipboard) {
            navigator.clipboard.writeText(email).then(() => {
                // Show temporary feedback
                const originalText = this.querySelector('p').textContent;
                this.querySelector('p').textContent = 'Email copied!';
                setTimeout(() => {
                    this.querySelector('p').textContent = originalText;
                }, 2000);
            });
        }
    });
});

// =========================================
// Keyboard Navigation
// =========================================
document.addEventListener('keydown', (e) => {
    // Press 'T' to scroll to top
    if (e.key === 't' || e.key === 'T') {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    
    // Press 'C' to go to contact
    if (e.key === 'c' || e.key === 'C') {
        if (!e.target.matches('input, textarea')) {
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }
});

// =========================================
// Performance Optimization
// =========================================

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Apply throttle to scroll-heavy functions
const throttledHighlight = throttle(highlightActiveSection, 100);
window.addEventListener('scroll', throttledHighlight);

// =========================================
// Console Easter Egg
// =========================================
const styles = [
    'font-size: 20px; font-weight: bold; color: #3b82f6;',
    'font-size: 16px; color: #8b5cf6;',
    'font-size: 14px; color: #a1a1aa;'
];

console.log('%c👋 Hi there!', styles[0]);
console.log('%c🚀 Looking at the code? I like your style!', styles[1]);
console.log('%cLet\'s work together: iqbalmaqbol@gmail.com', styles[2]);
console.log('%cGitHub: https://github.com/iqbalsofi', styles[2]);

// =========================================
// Page Load Complete
// =========================================
window.addEventListener('load', () => {
    console.log('✅ Portfolio loaded successfully');
    document.body.classList.add('loaded');
    
    // Trigger initial animations
    highlightActiveSection();
});

// =========================================
// Utility: Log viewport size (dev helper)
// =========================================
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    const logViewport = debounce(() => {
        console.log(`Viewport: ${window.innerWidth}x${window.innerHeight}`);
    }, 500);
    
    window.addEventListener('resize', logViewport);
}

// =========================================
// Auto-update Year in Footer
// =========================================
const currentYear = new Date().getFullYear();
const footerText = document.querySelector('.footer-bottom p');
if (footerText) {
    footerText.innerHTML = `&copy; ${currentYear} Iqbal Maqbool Sofi. Built with passion for data science.`;
}

// =========================================
// Lazy Loading for Images (future-proof)
// =========================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// =========================================
// Accessibility: Focus visible
// =========================================
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('user-is-tabbing');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('user-is-tabbing');
});

// =========================================
// Dark/Light Theme Toggle (Optional - commented out)
// Uncomment if you want to add theme switching
// =========================================
/*
const themeToggle = document.createElement('button');
themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
themeToggle.className = 'theme-toggle';
themeToggle.style.cssText = `
    position: fixed;
    bottom: 6rem;
    right: 2rem;
    width: 48px;
    height: 48px;
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 12px;
    color: var(--text);
    cursor: pointer;
    z-index: 999;
    transition: var(--transition);
`;
document.body.appendChild(themeToggle);

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    const icon = themeToggle.querySelector('i');
    if (document.body.classList.contains('light-theme')) {
        icon.className = 'fas fa-sun';
        localStorage.setItem('theme', 'light');
    } else {
        icon.className = 'fas fa-moon';
        localStorage.setItem('theme', 'dark');
    }
});

// Check saved theme
if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-theme');
    themeToggle.querySelector('i').className = 'fas fa-sun';
}
*/

// =========================================
// Loading Animation Complete
// =========================================
console.log('🎨 Modern portfolio ready!');
console.log('💼 Iqbal Maqbool Sofi - Data Scientist');
console.log('📧 iqbalmaqbol@gmail.com');
