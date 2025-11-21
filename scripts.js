// Vino Arsan - Tropical Wine Website
// Interactive functionality for carousels and UI elements

// ============================================
// PAIRING CAROUSEL FUNCTIONALITY
// ============================================
let currentPairingSlide = 0;
const pairingCards = document.querySelectorAll('.pairing-card');

function movePairingCarousel(direction) {
    // Remove active class from current card
    pairingCards[currentPairingSlide].classList.remove('active');

    // Calculate new index
    currentPairingSlide += direction;

    // Handle wrapping
    if (currentPairingSlide >= pairingCards.length) {
        currentPairingSlide = 0;
    } else if (currentPairingSlide < 0) {
        currentPairingSlide = pairingCards.length - 1;
    }

    // Add active class to new card
    pairingCards[currentPairingSlide].classList.add('active');
}

// Auto-advance pairing carousel every 5 seconds
function startPairingCarousel() {
    setInterval(() => {
        movePairingCarousel(1);
    }, 5000);
}

// ============================================
// LIMITED RELEASES CAROUSEL FUNCTIONALITY
// ============================================
let currentLimitedSlide = 0;
const limitedDots = document.querySelectorAll('.carousel-dots .dot');

function moveLimitedCarousel(direction) {
    goToLimitedSlide(currentLimitedSlide + direction);
}

function goToLimitedSlide(slideIndex) {
    // Handle wrapping
    if (slideIndex >= limitedDots.length) {
        slideIndex = 0;
    } else if (slideIndex < 0) {
        slideIndex = limitedDots.length - 1;
    }

    // Remove active class from all dots
    limitedDots.forEach(dot => dot.classList.remove('active'));

    // Add active class to current dot
    if (limitedDots[slideIndex]) {
        limitedDots[slideIndex].classList.add('active');
    }

    currentLimitedSlide = slideIndex;

    // Update carousel position
    const track = document.querySelector('.limited-carousel-track');
    if (track) {
        const cardWidth = 250; // Width of card plus gap
        const offset = -slideIndex * (cardWidth + 30);
        // Optional: Add transform if you want to slide the carousel
        // track.style.transform = `translateX(${offset}px)`;
    }
}

// Auto-advance limited releases carousel every 6 seconds
function startLimitedCarousel() {
    setInterval(() => {
        moveLimitedCarousel(1);
    }, 6000);
}

// ============================================
// TESTIMONIAL CAROUSEL FUNCTIONALITY
// ============================================
let currentTestimonial = 0;
const testimonialCards = document.querySelectorAll('.testimonial-card');
const testimonialDots = document.querySelectorAll('.testimonial-dots .dot');

function moveTestimonialCarousel(direction) {
    goToTestimonialSlide(currentTestimonial + direction);
}

function goToTestimonialSlide(slideIndex) {
    // Handle wrapping
    if (slideIndex >= testimonialCards.length) {
        slideIndex = 0;
    } else if (slideIndex < 0) {
        slideIndex = testimonialCards.length - 1;
    }

    // Remove active class from all cards and dots
    testimonialCards[currentTestimonial].classList.remove('active');
    if (testimonialDots[currentTestimonial]) {
        testimonialDots[currentTestimonial].classList.remove('active');
    }

    // Update current index
    currentTestimonial = slideIndex;

    // Add active class to new card and dot
    testimonialCards[currentTestimonial].classList.add('active');
    if (testimonialDots[currentTestimonial]) {
        testimonialDots[currentTestimonial].classList.add('active');
    }
}

// Auto-advance testimonial carousel every 7 seconds
function startTestimonialCarousel() {
    setInterval(() => {
        moveTestimonialCarousel(1);
    }, 7000);
}

// ============================================
// SMOOTH SCROLLING FOR ANCHOR LINKS
// ============================================
function initSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

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
// INTERSECTION OBSERVER FOR ANIMATIONS
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

    // Check if we're on the contact page or limited-releases page
    const isContactPage = window.location.pathname.includes('contact.html');
    const isLimitedReleasesPage = window.location.pathname.includes('limited-releases.html');

    // Observe sections for animation, but exclude shop-section, content-sections, and unforgettable
    const sections = document.querySelectorAll('section:not(.shop-section):not(.content-sections):not(.unforgettable)');
    sections.forEach(section => {
        // On contact page, skip animation for about-company-section but animate its content
        if (isContactPage && section.classList.contains('about-company-section')) {
            // Make the section background immediately visible
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';

            // Animate the about-content container instead
            const aboutContent = section.querySelector('.about-content');
            if (aboutContent) {
                aboutContent.style.opacity = '0';
                aboutContent.style.transform = 'translateY(30px)';
                aboutContent.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(aboutContent);
            }
            return;
        }

        // On limited-releases page, skip animation for background sections
        if (isLimitedReleasesPage &&
            (section.classList.contains('limited-releases-hero') ||
             section.classList.contains('limited-releases-grid-section'))) {
            // Make the section backgrounds immediately visible
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
            return;
        }

        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // For shop page, animate individual product cards instead of the whole grid
    const productsGrid = document.querySelector('.products-grid');

    if (productsGrid) {
        const productCards = productsGrid.querySelectorAll('.product-card');

        productCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });
    }

    // For limited-releases page, animate only the grid container
    if (isLimitedReleasesPage) {
        const limitedGridContainer = document.querySelector('.limited-releases-grid-container');

        if (limitedGridContainer) {
            limitedGridContainer.style.opacity = '0';
            limitedGridContainer.style.transform = 'translateY(30px)';
            limitedGridContainer.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(limitedGridContainer);
        }
    }
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
// KEYBOARD NAVIGATION FOR CAROUSELS
// ============================================
function initKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        // Get the currently focused element
        const activeElement = document.activeElement;

        // Check if a carousel button is focused
        if (activeElement && activeElement.classList.contains('carousel-btn')) {
            if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                e.preventDefault();

                const direction = e.key === 'ArrowLeft' ? -1 : 1;

                // Determine which carousel
                if (activeElement.closest('.pairing-carousel')) {
                    movePairingCarousel(direction);
                } else if (activeElement.closest('.limited-content')) {
                    moveLimitedCarousel(direction);
                } else if (activeElement.closest('.testimonials-carousel')) {
                    moveTestimonialCarousel(direction);
                }
            }
        }
    });
}

// ============================================
// LAZY LOADING FOR IMAGES
// ============================================
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

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

    images.forEach(img => imageObserver.observe(img));
}

// ============================================
// PERFORMANCE OPTIMIZATIONS
// ============================================
function initPerformanceOptimizations() {
    // Debounce resize events
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            initMobileMenu();
            updateTestimonialCalamansiPositions();
        }, 250);
    });

    // Preload critical images
    const criticalImages = [
        'hero-bottle.webp',
        'pairing-wine-1.webp',
        'logo.svg'
    ];

    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

// ============================================
// PRODUCT VOLUME SELECTOR
// ============================================
function initProductVolumeSelector() {
    const volumeButtons = document.querySelectorAll('.volume-btn');

    volumeButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get the product card this button belongs to
            const productCard = this.closest('.product-card');

            // Remove active class from all buttons in this product card
            const allButtons = productCard.querySelectorAll('.volume-btn');
            allButtons.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            this.classList.add('active');

            // Update the price
            const price = this.getAttribute('data-price');
            const priceElement = productCard.querySelector('.product-price');

            if (priceElement && price) {
                priceElement.textContent = `₱${price}`;
                // Update data-price attribute on product card for sorting
                productCard.setAttribute('data-price', price);
            }
        });
    });
}

// ============================================
// SHOP FILTER AND SORT FUNCTIONALITY
// ============================================
// Global reference to filterProducts function
let filterProducts;

function initShopFilters() {
    const productsContainer = document.getElementById('products-container');
    if (!productsContainer) return; // Only run on shop page

    const filterCheckboxes = document.querySelectorAll('.filter-option input[type="checkbox"]');
    const sortSelect = document.getElementById('sort-products');

    // Filter products function - now accessible globally
    filterProducts = function() {
        const products = Array.from(productsContainer.querySelectorAll('.product-card'));
        const sectionTitle = productsContainer.querySelector('.section-title');

        // Get selected filters
        const selectedTypes = Array.from(document.querySelectorAll('input[name="wine-type"]:checked'))
            .map(cb => cb.value);
        const selectedPrices = Array.from(document.querySelectorAll('input[name="price-range"]:checked'))
            .map(cb => cb.value);
        const selectedAvailability = Array.from(document.querySelectorAll('input[name="availability"]:checked'))
            .map(cb => cb.value);
        const selectedFruits = Array.from(document.querySelectorAll('input[name="fruit"]:checked'))
            .map(cb => cb.value);

        let hasVisibleWhiteWines = false;

        products.forEach(product => {
            let show = true;

            // Check wine type
            if (selectedTypes.length > 0) {
                const productType = product.getAttribute('data-type');
                show = show && selectedTypes.includes(productType);
            }

            // Check price range
            if (selectedPrices.length > 0) {
                const productPrice = parseInt(product.getAttribute('data-price'));
                let priceMatch = false;

                selectedPrices.forEach(range => {
                    const [min, max] = range.split('-').map(Number);
                    if (productPrice >= min && productPrice <= max) {
                        priceMatch = true;
                    }
                });

                show = show && priceMatch;
            }

            // Check availability
            if (selectedAvailability.length > 0) {
                const productAvailability = product.getAttribute('data-availability');
                show = show && selectedAvailability.includes(productAvailability);
            }

            // Check fruit variety
            if (selectedFruits.length > 0) {
                const productFruit = product.getAttribute('data-fruit');
                let fruitMatch = false;

                selectedFruits.forEach(fruit => {
                    if (productFruit.includes(fruit)) {
                        fruitMatch = true;
                    }
                });

                show = show && fruitMatch;
            }

            // Show or hide product
            product.style.display = show ? 'block' : 'none';

            // Track if any white wines are visible
            if (show && product.getAttribute('data-type') === 'white') {
                hasVisibleWhiteWines = true;
            }
        });

        // Show/hide section title based on visible white wines
        if (sectionTitle) {
            sectionTitle.style.display = hasVisibleWhiteWines ? 'block' : 'none';
        }
    }

    // Sort products
    function sortProducts() {
        const products = Array.from(productsContainer.querySelectorAll('.product-card'));
        const sortValue = sortSelect.value;

        products.sort((a, b) => {
            switch (sortValue) {
                case 'price-low':
                    return parseInt(a.getAttribute('data-price')) - parseInt(b.getAttribute('data-price'));

                case 'price-high':
                    return parseInt(b.getAttribute('data-price')) - parseInt(a.getAttribute('data-price'));

                case 'name-az':
                    return a.getAttribute('data-name').localeCompare(b.getAttribute('data-name'));

                case 'name-za':
                    return b.getAttribute('data-name').localeCompare(a.getAttribute('data-name'));

                case 'best-selling':
                    // For now, keep original order for best-selling
                    // In production, you would sort by actual sales data
                    return 0;

                default: // 'default' or 'featured'
                    return 0;
            }
        });

        // Re-append products in sorted order
        products.forEach(product => {
            productsContainer.appendChild(product);
        });
    }

    // Add event listeners to filter checkboxes
    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', filterProducts);
    });

    // Add event listener to sort select
    if (sortSelect) {
        sortSelect.addEventListener('change', () => {
            sortProducts();
            filterProducts(); // Reapply filters after sorting
        });
    }
}

// ============================================
// MOBILE FILTER PANEL FUNCTIONALITY
// ============================================
function initMobileFilterPanel() {
    const mobileFilterBtn = document.getElementById('mobile-filter-btn');
    const shopSidebar = document.getElementById('shop-sidebar');
    const doneBtn = document.getElementById('done-filters-btn');
    const resetBtn = document.getElementById('reset-filters-btn');
    const closeBtn = document.getElementById('mobile-filter-close');

    if (!mobileFilterBtn || !shopSidebar) return; // Only run on shop page

    // Function to close filter panel
    const closeFilterPanel = () => {
        shopSidebar.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    };

    // Open filter panel
    mobileFilterBtn.addEventListener('click', () => {
        shopSidebar.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });

    // Close filter panel (X button)
    if (closeBtn) {
        closeBtn.addEventListener('click', closeFilterPanel);
    }

    // Close filter panel (Done button)
    if (doneBtn) {
        doneBtn.addEventListener('click', closeFilterPanel);
    }

    // Reset filters
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            // Uncheck all filter checkboxes
            const filterCheckboxes = document.querySelectorAll('.filter-option input[type="checkbox"]');
            filterCheckboxes.forEach(checkbox => {
                checkbox.checked = true; // Reset to show all
            });

            // Reset sort to default
            const sortSelect = document.getElementById('sort-products');
            if (sortSelect) {
                sortSelect.value = 'default';
            }

            // Trigger filter update if function is available
            if (typeof filterProducts === 'function') {
                filterProducts();
            }
        });
    }
}

// ============================================
// FORM HANDLING
// ============================================
function initFormHandling() {
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Basic form validation
            const inputs = form.querySelectorAll('input[required], textarea[required]');
            let isValid = true;

            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#e74c3c';
                } else {
                    input.style.borderColor = '';
                }
            });

            if (isValid) {
                // Form submission logic would go here
                console.log('Form submitted successfully');
                alert('Thank you for your message! We\'ll get back to you soon.');
                form.reset();
            } else {
                alert('Please fill in all required fields.');
            }
        });
    });
}

// ============================================
// ACCESSIBILITY IMPROVEMENTS
// ============================================
function initAccessibility() {
    // Add ARIA labels to carousel buttons
    const carouselButtons = document.querySelectorAll('.carousel-btn');
    carouselButtons.forEach(btn => {
        if (!btn.getAttribute('aria-label')) {
            const direction = btn.classList.contains('prev') ? 'previous' : 'next';
            btn.setAttribute('aria-label', `View ${direction} item`);
        }
    });

    // Add focus visible styles
    const focusableElements = document.querySelectorAll('a, button, input, textarea, select');
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--tropical-green)';
            this.style.outlineOffset = '2px';
        });

        element.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });
}

// ============================================
// PARALLAX EFFECT FOR DECORATIVE ELEMENTS
// ============================================
// DISABLED: Background patterns are now static via CSS
// The new background pattern approach uses position: absolute with fixed positions
// instead of parallax scrolling for better performance and matching the design reference
function initParallaxEffect() {
    // Function disabled - background patterns are now purely CSS-based
    return;
}

// ============================================
// LIMITED RELEASES SIZE SELECTOR
// ============================================
function initLimitedReleasesSizeSelector() {
    const sizeButtons = document.querySelectorAll('.limited-release-item .size-price-item');

    sizeButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get the product card this button belongs to
            const productCard = this.closest('.limited-release-item');

            // Remove active class from all buttons in this product card
            const allButtons = productCard.querySelectorAll('.size-price-item');
            allButtons.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            this.classList.add('active');

            // Store selected size and price for cart functionality
            const size = this.getAttribute('data-size');
            const price = this.getAttribute('data-price');
            productCard.setAttribute('data-selected-size', size);
            productCard.setAttribute('data-selected-price', price);
        });
    });
}

// ============================================
// CART FUNCTIONALITY
// ============================================
let cart = [];

function initCartFunctionality() {
    // Load cart from localStorage
    const savedCart = localStorage.getItem('vinoArsanCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
    }

    // Add click handlers to all "ADD TO CART" buttons
    const addToCartButtons = document.querySelectorAll('.limited-release-image-overlay .cta-button, .limited-release-item .add-to-cart-btn');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();

            // Get the product card
            const productCard = this.closest('.limited-release-item');
            if (!productCard) return;

            // Get product details
            const productName = productCard.querySelector('h3').textContent;
            const productImage = productCard.querySelector('.limited-release-image img').src;
            const selectedSize = productCard.getAttribute('data-selected-size') ||
                                productCard.querySelector('.size-price-item.active').getAttribute('data-size');
            const selectedPrice = productCard.getAttribute('data-selected-price') ||
                                 productCard.querySelector('.size-price-item.active').getAttribute('data-price');

            // Create cart item
            const cartItem = {
                id: Date.now(),
                name: productName,
                size: selectedSize,
                price: parseInt(selectedPrice),
                image: productImage,
                quantity: 1
            };

            // Add to cart
            cart.push(cartItem);

            // Save to localStorage
            localStorage.setItem('vinoArsanCart', JSON.stringify(cart));

            // Update cart count
            updateCartCount();

            // Show confirmation
            showCartNotification(`${productName} (${selectedSize}) added to cart!`);
        });
    });
}

function updateCartCount() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

    // Update cart icon badge (if exists)
    let cartBadge = document.querySelector('.cart-badge');
    if (!cartBadge && cartCount > 0) {
        const cartIcon = document.querySelector('a[href="#cart"]');
        if (cartIcon) {
            cartBadge = document.createElement('span');
            cartBadge.className = 'cart-badge';
            cartBadge.style.cssText = `
                position: absolute;
                top: -5px;
                right: -5px;
                background: #5A8C6F;
                color: white;
                border-radius: 50%;
                width: 20px;
                height: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 11px;
                font-weight: 600;
            `;
            cartIcon.style.position = 'relative';
            cartIcon.appendChild(cartBadge);
        }
    }

    if (cartBadge) {
        cartBadge.textContent = cartCount;
        cartBadge.style.display = cartCount > 0 ? 'flex' : 'none';
    }
}

function showCartNotification(message) {
    // Remove existing notification
    const existingNotification = document.querySelector('.cart-notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #5A8C6F;
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        animation: slideInRight 0.3s ease, slideOutRight 0.3s ease 2.7s;
        font-family: 'Noto Sans', sans-serif;
        font-size: 14px;
    `;

    // Add CSS animation
    if (!document.querySelector('#cart-notification-styles')) {
        const style = document.createElement('style');
        style.id = 'cart-notification-styles';
        style.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(400px); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(400px); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// ============================================
// SEARCH FUNCTIONALITY
// ============================================
function initSearchFunctionality() {
    const searchModal = document.getElementById('search-modal');
    const searchTriggers = document.querySelectorAll('.search-trigger');
    const searchCloseBtn = document.querySelector('.search-modal-close');
    const searchOverlay = document.querySelector('.search-modal-overlay');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    const searchTags = document.querySelectorAll('.search-tag');

    if (!searchModal) return; // Only run if search modal exists

    // Sample wine data for searching (in production, this would come from a database)
    const wineData = [
        { name: 'Mango White Wine', category: 'White Wine', fruit: 'Mango', url: 'shop.html#mango-wine' },
        { name: 'Calamansi White Wine', category: 'White Wine', fruit: 'Calamansi', url: 'shop.html#calamansi-wine' },
        { name: 'Honey Lemon White Wine', category: 'White Wine', fruit: 'Honey Lemon', url: 'shop.html#honey-lemon-wine' },
        { name: 'Dragon Fruit Red Wine', category: 'Red Wine', fruit: 'Dragon Fruit', url: 'shop.html#dragon-fruit-wine' },
        { name: 'Bignay Medium Sweet Red Wine', category: 'Red Wine', fruit: 'Bignay', url: 'shop.html#bignay-sweet-wine' },
        { name: 'Bignay Medium Dry Red Wine', category: 'Red Wine', fruit: 'Bignay', url: 'shop.html#bignay-dry-wine' },
        { name: 'Lipote Medium Sweet Red Wine', category: 'Red Wine', fruit: 'Lipote', url: 'shop.html#lipote-sweet-wine' },
        { name: 'Lipote Medium Dry Red Wine', category: 'Red Wine', fruit: 'Lipote', url: 'shop.html#lipote-dry-wine' },
        { name: 'Malibugold Medium Sweet Red Wine', category: 'Red Wine', fruit: 'Malibugold', url: 'shop.html#malibugold-sweet-wine' },
        { name: 'Malibugold Medium Dry Red Wine', category: 'Red Wine', fruit: 'Malibugold', url: 'shop.html#malibugold-dry-wine' },
        { name: 'Bignay, Pitaya Red Wine', category: 'Red Wine', fruit: 'Bignay, Pitaya', url: 'shop.html#bignay-pitaya-wine' },
        { name: 'Sangria Red Wine', category: 'Red Wine', fruit: 'Sangria', url: 'shop.html#sangria-wine' },
        { name: 'Lolo Art Whiskey', category: 'Limited Release', fruit: 'Spirit', url: 'limited-releases.html#whiskey' },
        { name: 'Lolo Art Brandy', category: 'Limited Release', fruit: 'Spirit', url: 'limited-releases.html#brandy' },
        { name: 'Lolo Art Gin', category: 'Limited Release', fruit: 'Spirit', url: 'limited-releases.html#gin' },
        { name: 'Coffee Liquor', category: 'Limited Release', fruit: 'Coffee', url: 'limited-releases.html#coffee' },
        { name: 'Chocolate Liquor', category: 'Limited Release', fruit: 'Chocolate', url: 'limited-releases.html#chocolate' }
    ];

    // Open search modal
    function openSearchModal() {
        searchModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            searchInput.focus();
        }, 100);
    }

    // Close search modal
    function closeSearchModal() {
        searchModal.classList.remove('active');
        document.body.style.overflow = '';
        searchInput.value = '';
        displaySuggestions();
    }

    // Display search suggestions (default view)
    function displaySuggestions() {
        searchResults.innerHTML = `
            <div class="search-suggestions">
                <h3>Popular Searches</h3>
                <div class="search-suggestion-tags">
                    <button class="search-tag" data-query="Mango">Mango Wine</button>
                    <button class="search-tag" data-query="Calamansi">Calamansi Wine</button>
                    <button class="search-tag" data-query="Dragon Fruit">Dragon Fruit Wine</button>
                    <button class="search-tag" data-query="Limited">Limited Releases</button>
                    <button class="search-tag" data-query="Red Wine">Red Wines</button>
                    <button class="search-tag" data-query="White Wine">White Wines</button>
                </div>
            </div>
        `;

        // Re-attach event listeners to new tags
        const newTags = searchResults.querySelectorAll('.search-tag');
        newTags.forEach(tag => {
            tag.addEventListener('click', function() {
                const query = this.getAttribute('data-query');
                searchInput.value = query;
                performSearch(query);
            });
        });
    }

    // Perform search
    function performSearch(query) {
        if (!query || query.trim() === '') {
            displaySuggestions();
            return;
        }

        const lowerQuery = query.toLowerCase();
        const results = wineData.filter(wine =>
            wine.name.toLowerCase().includes(lowerQuery) ||
            wine.category.toLowerCase().includes(lowerQuery) ||
            wine.fruit.toLowerCase().includes(lowerQuery)
        );

        if (results.length === 0) {
            searchResults.innerHTML = `
                <div class="search-no-results">
                    <p>No results found for "${query}"</p>
                    <p style="margin-top: 10px; font-size: 14px; opacity: 0.7;">Try searching for wine types, fruits, or categories</p>
                </div>
            `;
            return;
        }

        const resultsHTML = results.map(wine => `
            <a href="${wine.url}" class="search-result-item">
                <div class="search-result-info">
                    <div class="search-result-title">${wine.name}</div>
                    <div class="search-result-category">${wine.category}</div>
                </div>
            </a>
        `).join('');

        searchResults.innerHTML = `
            <div class="search-results-list">
                <h3 style="font-family: 'Fondamento', serif; font-size: 20px; color: var(--dark-green); margin-bottom: 15px;">
                    Search Results (${results.length})
                </h3>
                ${resultsHTML}
            </div>
        `;
    }

    // Event listeners for opening search modal
    searchTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            openSearchModal();
        });
    });

    // Event listener for closing search modal
    if (searchCloseBtn) {
        searchCloseBtn.addEventListener('click', closeSearchModal);
    }

    if (searchOverlay) {
        searchOverlay.addEventListener('click', closeSearchModal);
    }

    // Event listener for search input
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            performSearch(e.target.value);
        });

        // Handle Enter key
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSearch(searchInput.value);
            }
        });
    }

    // Event listeners for suggestion tags
    searchTags.forEach(tag => {
        tag.addEventListener('click', function() {
            const query = this.getAttribute('data-query');
            searchInput.value = query;
            performSearch(query);
        });
    });

    // Close search modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && searchModal.classList.contains('active')) {
            closeSearchModal();
        }
    });
}

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('🍷 Vino Arsan - Tropical Wine Website Loaded');

    // Initialize all functionality
    startPairingCarousel();
    startLimitedCarousel();
    startTestimonialCarousel();
    initSmoothScrolling();
    initHeaderScrollEffect();
    initScrollAnimations();
    initMobileMenu();
    initKeyboardNavigation();
    initLazyLoading();
    initPerformanceOptimizations();
    initProductVolumeSelector();
    initMobileFilterPanel(); // Initialize mobile filter panel
    initShopFilters();
    initFormHandling();
    initAccessibility();
    initParallaxEffect();
    initLimitedReleasesSizeSelector();
    initCartFunctionality();
    initSearchFunctionality(); // Initialize search functionality
    updateTestimonialCalamansiPositions();

    // Add loading complete class to body
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);

    console.log('✨ All features initialized successfully');
});

// ============================================
// WINDOW RESIZE HANDLER
// ============================================
window.addEventListener('resize', () => {
    initMobileMenu();
    updateTestimonialCalamansiPositions();
});

// ============================================
// ERROR HANDLING
// ============================================
window.addEventListener('error', (e) => {
    console.error('Vino Arsan Website Error:', e.error);
});

// ============================================
// TESTIMONIAL CALAMANSI POSITIONING
// ============================================
function updateTestimonialCalamansiPositions() {
    const testimonialsSection = document.querySelector('.testimonials');
    const calamansiElements = document.querySelectorAll('.testimonial-calamansi');

    if (!testimonialsSection || calamansiElements.length === 0) return;

    // Get the offset of the testimonials section from the top of the page
    const testimonialsOffset = testimonialsSection.offsetTop;

    // Set the CSS custom property on each calamansi element
    calamansiElements.forEach(element => {
        element.style.setProperty('--testimonials-offset', `${testimonialsOffset}px`);
    });
}

// ============================================
// CONSOLE WELCOME MESSAGE
// ============================================
console.log('%c🍷 Welcome to Vino Arsan', 'font-size: 20px; color: #5A8C6F; font-weight: bold;');
console.log('%cTropical Wine Design - Crafted with Filipino Excellence', 'font-size: 14px; color: #5A8C6F;');
