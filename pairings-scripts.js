// Pairings Page - Filter and Interaction Functionality

// ============================================
// FILTER FUNCTIONALITY
// ============================================
function initPairingsFilter() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    const pairingCards = document.querySelectorAll('.pairing-card');

    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            filterTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');

            // Get filter value
            const filterValue = this.getAttribute('data-filter');

            // Filter cards
            pairingCards.forEach(card => {
                const cardTypes = card.getAttribute('data-type');
                
                if (filterValue === 'all') {
                    // Show all cards
                    card.classList.remove('hidden');
                    setTimeout(() => {
                        card.style.display = 'block';
                    }, 10);
                } else if (cardTypes.includes(filterValue)) {
                    // Show matching cards
                    card.classList.remove('hidden');
                    setTimeout(() => {
                        card.style.display = 'block';
                    }, 10);
                } else {
                    // Hide non-matching cards
                    card.classList.add('hidden');
                }
            });

            // Smooth scroll to grid after filter
            const gridSection = document.querySelector('.pairings-grid-section');
            if (gridSection && filterValue !== 'all') {
                setTimeout(() => {
                    gridSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            }
        });
    });
}

// ============================================
// SMOOTH SCROLL FOR NAVIGATION
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#' || href.length <= 1) {
                e.preventDefault();
                return;
            }

            e.preventDefault();
            const target = document.querySelector(href);

            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ============================================
// SCROLL ANIMATIONS
// ============================================
function initScrollAnimations() {
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

    // Observe pairing cards
    const pairingCards = document.querySelectorAll('.pairing-card');
    pairingCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Observe tip cards
    const tipCards = document.querySelectorAll('.tip-card');
    tipCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
}

// ============================================
// MOBILE MENU
// ============================================
function initMobileMenu() {
    const headerContainer = document.querySelector('.header-container');
    const nav = document.querySelector('nav');

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
            const headerIcons = document.querySelector('.header-icons');
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
// HEADER SCROLL EFFECT
// ============================================
function initHeaderScrollEffect() {
    const header = document.querySelector('header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// ============================================
// CARD HOVER EFFECTS
// ============================================
function initCardHoverEffects() {
    const pairingCards = document.querySelectorAll('.pairing-card');

    pairingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add subtle scale effect on hover
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// ============================================
// LAZY LOADING FOR IMAGES
// ============================================
function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.src; // Trigger load
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('🍷 Vino Arsan - Pairings Page Loaded');

    // Initialize all functionality
    initPairingsFilter();
    initSmoothScroll();
    initScrollAnimations();
    initMobileMenu();
    initHeaderScrollEffect();
    initCardHoverEffects();
    initLazyLoading();

    console.log('✨ Pairings page features initialized');
});

// ============================================
// WINDOW RESIZE HANDLER
// ============================================
window.addEventListener('resize', () => {
    initMobileMenu();
});

// ============================================
// CONSOLE WELCOME MESSAGE
// ============================================
console.log('%c🍷 Vino Arsan Pairings', 'font-size: 20px; color: #5A8C6F; font-weight: bold;');
console.log('%cDiscover the Perfect Match', 'font-size: 14px; color: #5A8C6F;');
