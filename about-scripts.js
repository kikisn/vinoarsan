// FAQ Accordion
const aboutFaqItems = document.querySelectorAll('.about-faq-item');

aboutFaqItems.forEach(item => {
    const question = item.querySelector('.about-faq-question');
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close all items
        aboutFaqItems.forEach(faq => faq.classList.remove('active'));

        // Open clicked item if it wasn't active
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        if (this.getAttribute('href') !== '#') {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Header scroll effect
const header = document.querySelector('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ============================================
// SCROLL-TRIGGERED ANIMATIONS FOR TIMELINE
// ============================================
function initScrollAnimations() {
    const timelineEvents = document.querySelectorAll('.timeline-event');

    // Create an Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                // Optional: stop observing after animation
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    });

    // Observe timeline events
    timelineEvents.forEach(event => {
        observer.observe(event);
    });
}

// Initialize animations when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollAnimations);
} else {
    initScrollAnimations();
}


// ============================================
// MOBILE MENU FUNCTIONALITY
// ============================================
function initMobileMenu() {
    const headerContainer = document.querySelector('.header-container');
    const nav = document.querySelector('nav');
    const headerIcons = document.querySelector('.header-icons');

    // Only create mobile menu button on mobile devices
    if (window.innerWidth <= 768) {
        // Check if button already exists
        if (!document.querySelector('.mobile-menu-btn')) {
            const mobileMenuBtn = document.createElement('button');
            mobileMenuBtn.className = 'mobile-menu-btn';
            mobileMenuBtn.innerHTML = '☰';
            mobileMenuBtn.setAttribute('aria-label', 'Toggle mobile menu');
            mobileMenuBtn.style.cssText = `
                display: block;
                background: none;
                border: none;
                font-size: 24px;
                color: var(--text-dark);
                cursor: pointer;
                padding: 10px;
                grid-column: 2;
                justify-self: end;
                z-index: 10;
            `;

            headerContainer.appendChild(mobileMenuBtn);

            // Clone header icons for mobile menu if not already done
            if (nav && !nav.querySelector('.mobile-nav-icons')) {
                const mobileIcons = headerIcons.cloneNode(true);
                mobileIcons.className = 'mobile-nav-icons';
                mobileIcons.style.cssText = `
                    display: flex;
                    gap: 20px;
                    justify-content: center;
                    padding-top: 20px;
                    margin-top: 20px;
                    border-top: 1px solid rgba(0, 0, 0, 0.1);
                `;
                nav.appendChild(mobileIcons);
            }

            // Toggle mobile menu
            mobileMenuBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const isOpen = nav.style.display === 'flex';
                nav.style.display = isOpen ? 'none' : 'flex';

                if (!isOpen) {
                    nav.style.cssText = `
                        display: flex;
                        flex-direction: column;
                        position: absolute;
                        top: 100%;
                        left: 0;
                        right: 0;
                        background: var(--cream);
                        padding: 20px;
                        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                        z-index: 999;
                    `;
                    mobileMenuBtn.innerHTML = '✕';
                } else {
                    nav.style.display = 'none';
                    mobileMenuBtn.innerHTML = '☰';
                }
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!nav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                    nav.style.display = 'none';
                    mobileMenuBtn.innerHTML = '☰';
                }
            });
        }
    } else {
        // Remove mobile menu button on desktop
        const existingBtn = document.querySelector('.mobile-menu-btn');
        if (existingBtn) {
            existingBtn.remove();
        }
        // Remove cloned icons from nav
        const mobileNavIcons = nav?.querySelector('.mobile-nav-icons');
        if (mobileNavIcons) {
            mobileNavIcons.remove();
        }
        // Reset nav display
        if (nav) {
            nav.style.cssText = '';
        }
    }
}

// ============================================
// PARALLAX EFFECT FOR AWARDS IMAGE BANNER
// ============================================
function initParallaxEffect() {
    const awardsBanner = document.querySelector('.awards-image-banner');
    const awardsImage = document.querySelector('.awards-image-banner img');

    if (!awardsBanner || !awardsImage) return;

    function updateParallax() {
        const bannerRect = awardsBanner.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Check if banner is in viewport
        if (bannerRect.top < windowHeight && bannerRect.bottom > 0) {
            // Calculate scroll progress through the banner
            // 0 when banner top enters viewport, 1 when banner bottom leaves viewport
            const scrollProgress = (windowHeight - bannerRect.top) / (windowHeight + bannerRect.height);

            // Apply parallax transform
            // Move image up to 50px as user scrolls
            const parallaxOffset = (scrollProgress - 0.5) * 50;
            awardsImage.style.transform = `translate(-50%, calc(-50% + ${parallaxOffset}px))`;
        }
    }

    // Use requestAnimationFrame for smooth performance
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateParallax();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Initial call
    updateParallax();
}

// Initialize parallax when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initParallaxEffect);
} else {
    initParallaxEffect();
}

// Initialize mobile menu
initMobileMenu();

// Re-initialize on window resize
window.addEventListener('resize', initMobileMenu);