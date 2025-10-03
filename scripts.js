// Vino Arsan - Interactive Functionality

// ============================================
// AGE VERIFICATION
// ============================================
function verifyAge(isOldEnough) {
    if (isOldEnough) {
        document.getElementById('ageVerify').classList.add('hidden');
        localStorage.setItem('ageVerified', 'true');
    } else {
        alert('Sorry, you must be of legal drinking age to access this site.');
        window.location.href = 'https://www.google.com';
    }
}

// Check if age was already verified
window.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('ageVerified') === 'true') {
        document.getElementById('ageVerify').classList.add('hidden');
    }
});

// ============================================
// HERO SLIDER
// ============================================
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.slider-dot');

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        dots[i].classList.remove('active');
    });
    
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

// Initialize slider
if (slides.length > 0) {
    showSlide(0);
    // Auto-advance slider every 5 seconds
    setInterval(nextSlide, 5000);
}

// Dot click functionality
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => showSlide(index));
});

// ============================================
// MOBILE MENU
// ============================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// ============================================
// MEGA MENU
// ============================================
function toggleMegaMenu(menuId) {
    const menu = document.getElementById(menuId);
    const allMenus = document.querySelectorAll('.mega-menu');
    
    // Close all other mega menus
    allMenus.forEach(m => {
        if (m.id !== menuId) {
            m.classList.remove('active');
        }
    });
    
    // Toggle current menu
    if (menu) {
        menu.classList.toggle('active');
    }
}

function toggleMobileMenu(event, menuId) {
    event.preventDefault();
    
    // On mobile, just toggle the submenu
    if (window.innerWidth <= 768) {
        const menu = document.getElementById(menuId);
        if (menu) {
            menu.classList.toggle('active');
        }
    } else {
        // On desktop, use the regular mega menu toggle
        toggleMegaMenu(menuId);
    }
}

// Close mega menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.menu-item')) {
        document.querySelectorAll('.mega-menu').forEach(menu => {
            menu.classList.remove('active');
        });
    }
});

// ============================================
// WINE FILTERING SYSTEM
// ============================================

// Page descriptions for each filter category
const pageDescriptions = {
    'spicy-asian': {
        title: 'Perfect Pairings for Spicy Asian Cuisine',
        description: 'These wines complement the bold, spicy flavors of Asian cuisine. From aromatic whites to fruit-forward reds, each selection balances heat with refreshing notes.'
    },
    'appetizers': {
        title: 'Wines for Appetizers & Small Plates',
        description: 'Light, versatile wines that pair beautifully with appetizers, tapas, and small bites. Perfect for social gatherings and celebrations.'
    },
    'adventurer': {
        title: 'For the Adventurous Palate',
        description: 'Unique and distinctive wines for those who love to explore new flavors. Bold choices that make a statement.'
    },
    'crowd-pleaser': {
        title: 'Crowd-Pleasing Favorites',
        description: 'Universally loved wines that appeal to a wide range of tastes. Safe bets for parties and gatherings where you want everyone to be happy.'
    },
    'patio-sipper': {
        title: 'Refreshing Patio Sippers',
        description: 'Light, refreshing wines perfect for warm weather and outdoor relaxation. Easy-drinking selections for lazy afternoons.'
    },
    'digestif': {
        title: 'After-Dinner Digestifs',
        description: 'Rich, contemplative wines and spirits perfect for sipping after a meal. These selections aid digestion and provide a sophisticated finish to your dining experience.'
    },
    'desserts': {
        title: 'Sweet Wine & Dessert Pairings',
        description: 'Sweet wines that complement desserts or stand beautifully on their own as a sweet conclusion to your meal.'
    },
    'cheese': {
        title: 'Perfect Cheese Pairings',
        description: 'Wines selected specifically to enhance the flavors of various cheeses. From creamy to sharp, these pairings elevate your cheese board.'
    }
};

// Pairing information for food categories
const pairingInfo = {
    'spicy-asian': 'Balances heat and spice from Asian dishes',
    'appetizers': 'Perfect with small plates and starters',
    'desserts': 'Complements sweet treats beautifully',
    'cheese': 'Enhances cheese flavors wonderfully'
};

function filterWines(event, category) {
    event.preventDefault();
    
    // Close mega menus
    document.querySelectorAll('.mega-menu').forEach(menu => {
        menu.classList.remove('active');
    });
    
    // Get all product cards
    const productCards = document.querySelectorAll('.product-card');
    const pageDescription = document.getElementById('pageDescription');
    const pageDescriptionContent = pageDescription.querySelector('.page-description-content');
    
    // Show all products if "all" category
    if (category === 'all') {
        productCards.forEach(card => {
            card.style.display = 'block';
            // Hide pairing info
            const pairingInfoEl = card.querySelector('.pairing-info');
            if (pairingInfoEl) {
                pairingInfoEl.style.display = 'none';
            }
        });
        pageDescription.style.display = 'none';
        return;
    }
    
    // Filter products
    let visibleCount = 0;
    productCards.forEach(card => {
        const categories = JSON.parse(card.dataset.categories || '[]');
        
        if (categories.includes(category)) {
            card.style.display = 'block';
            visibleCount++;
            
            // Show pairing info if it's a food pairing category
            const pairingInfoEl = card.querySelector('.pairing-info');
            if (pairingInfoEl && pairingInfo[category]) {
                pairingInfoEl.textContent = pairingInfo[category];
                pairingInfoEl.style.display = 'block';
            } else if (pairingInfoEl) {
                pairingInfoEl.style.display = 'none';
            }
        } else {
            card.style.display = 'none';
        }
    });
    
    // Show page description if category has one
    if (pageDescriptions[category]) {
        pageDescriptionContent.innerHTML = `
            <h2>${pageDescriptions[category].title}</h2>
            <p>${pageDescriptions[category].description}</p>
        `;
        pageDescription.style.display = 'block';
    } else {
        pageDescription.style.display = 'none';
    }
    
    // Scroll to products section
    document.getElementById('products').scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
    
    // Show message if no products found
    if (visibleCount === 0) {
        console.log('No products found for this category');
    }
}

// Reset filters function (optional - can be called from a button)
function resetFilters() {
    filterWines({ preventDefault: () => {} }, 'all');
}

// ============================================
// SHOPPING CART
// ============================================
let cart = [];

function addToCart(productName, price) {
    cart.push({ name: productName, price: price });
    updateCartCount();
    
    // Show feedback
    alert(`${productName} added to cart!`);
}

function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

// Add click handlers to all "Add to Cart" buttons
document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const productCard = e.target.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const priceText = productCard.querySelector('.product-price').textContent;
            const price = parseFloat(priceText.replace(/[₱,]/g, ''));
            
            addToCart(productName, price);
        });
    });
});

// ============================================
// NEWSLETTER FORM
// ============================================
const newsletterButton = document.querySelector('.newsletter button');
if (newsletterButton) {
    newsletterButton.addEventListener('click', (e) => {
        e.preventDefault();
        const emailInput = document.querySelector('.newsletter input');
        const email = emailInput.value;
        
        if (email && email.includes('@')) {
            alert(`Thank you for subscribing with ${email}!`);
            emailInput.value = '';
        } else {
            alert('Please enter a valid email address');
        }
    });
}

// ============================================
// SMOOTH SCROLL
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Skip if it's just "#" or has an onclick handler
        if (href === '#' || this.onclick) {
            return;
        }
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Close mobile menu if open
            if (navMenu && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        }
    });
});

// ============================================
// SCROLL TO TOP BUTTON
// ============================================
const scrollToTopButton = document.createElement('button');
scrollToTopButton.innerHTML = '↑';
scrollToTopButton.setAttribute('aria-label', 'Scroll to top');
scrollToTopButton.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: var(--gold);
    color: var(--dark);
    border: none;
    border-radius: 50%;
    font-size: 24px;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.3s ease, transform 0.3s ease;
    z-index: 1000;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    pointer-events: none;
`;

document.body.appendChild(scrollToTopButton);

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopButton.style.opacity = '1';
        scrollToTopButton.style.pointerEvents = 'auto';
    } else {
        scrollToTopButton.style.opacity = '0';
        scrollToTopButton.style.pointerEvents = 'none';
    }
});

scrollToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollToTopButton.addEventListener('mouseenter', () => {
    scrollToTopButton.style.transform = 'translateY(-5px)';
});

scrollToTopButton.addEventListener('mouseleave', () => {
    scrollToTopButton.style.transform = 'translateY(0)';
});

// ============================================
// ANIMATION ON SCROLL
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const productObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            productObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Apply fade-in animation to product cards
document.addEventListener('DOMContentLoaded', () => {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        productObserver.observe(card);
    });
});

// ============================================
// CONSOLE MESSAGE
// ============================================
console.log('%c🍷 Welcome to Vino Arsan', 'font-size: 20px; color: #C8A14A; font-weight: bold;');
console.log('%cEst. 2009 - Crafted in the Atomic Age', 'font-size: 14px; color: #C8A14A;');
