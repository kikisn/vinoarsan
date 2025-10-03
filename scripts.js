// Vino Arsan - Interactive Functionality

// ============================================
// AGE VERIFICATION
// ============================================
function verifyAge(isOfAge) {
    if (isOfAge) {
        document.getElementById('ageVerify').classList.add('hidden');
    } else {
        alert('Sorry, you must be of legal drinking age to access this site.');
    }
}

// ============================================
// HERO SLIDER
// ============================================
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.slider-dot');

function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    currentSlide = n;
    if (currentSlide >= slides.length) currentSlide = 0;
    if (currentSlide < 0) currentSlide = slides.length - 1;
    
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function goToSlide(n) {
    showSlide(n);
}

// Auto-advance slider every 5 seconds
setInterval(() => {
    showSlide(currentSlide + 1);
}, 5000);

// ============================================
// MOBILE MENU
// ============================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ============================================
// MOBILE SUBMENU TOGGLE
// ============================================
function toggleMobileMenu(event, menuId) {
    if (window.innerWidth <= 768) {
        event.preventDefault();
        const menu = document.getElementById(menuId);
        menu.classList.toggle('active');
    }
}

// ============================================
// FILTER PRODUCTS BY CATEGORY
// ============================================
function filterProducts(category, pageCopy, menuTitle) {
    const productCards = document.querySelectorAll('.product-card');
    const pageDescription = document.getElementById('pageDescription');
    const pageDescriptionContent = pageDescription.querySelector('.page-description-content');
    
    if (category === 'all') {
        productCards.forEach(card => {
            card.style.display = 'block';
            // Hide all pairing info
            const pairingInfo = card.querySelector('.pairing-info');
            if (pairingInfo) {
                pairingInfo.style.display = 'none';
            }
        });
        pageDescription.style.display = 'none';
        return;
    }
    
    // Filter products
    let visibleCount = 0;
    productCards.forEach(card => {
        const categories = JSON.parse(card.getAttribute('data-categories') || '[]');
        
        if (categories.includes(category)) {
            card.style.display = 'block';
            visibleCount++;
            
            // Show pairing info if applicable
            const pairingInfo = card.querySelector('.pairing-info');
            if (pairingInfo) {
                const specificPairing = pairingInfo.getAttribute(`data-${category}`);
                if (specificPairing) {
                    pairingInfo.textContent = specificPairing;
                    pairingInfo.style.display = 'block';
                } else {
                    pairingInfo.style.display = 'none';
                }
            }
        } else {
            card.style.display = 'none';
        }
    });
    
    // Show page description if there is page copy
    if (pageCopy && pageCopy.trim() !== '') {
        pageDescriptionContent.innerHTML = `
            <h2>${menuTitle}</h2>
            <p>${pageCopy}</p>
        `;
        pageDescription.style.display = 'block';
    } else {
        pageDescription.style.display = 'none';
    }
    
    // Update section title
    const sectionTitle = document.querySelector('.section-title');
    sectionTitle.textContent = menuTitle || 'Featured Wines';
    
    // Scroll to products section
    document.getElementById('shop').scrollIntoView({ behavior: 'smooth' });
    
    // Show message if no products found
    if (visibleCount === 0) {
        console.log('No products found for this category');
    }
}

// ============================================
// ADD CLICK HANDLERS TO MENU LINKS
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const menuLinks = document.querySelectorAll('.mega-menu a[data-filter]');
    
    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const category = link.getAttribute('data-filter');
            const pageCopy = link.getAttribute('data-page-copy') || '';
            const menuTitle = link.textContent.trim();
            
            // Close mega menus
            document.querySelectorAll('.mega-menu').forEach(menu => {
                menu.classList.remove('active');
            });
            
            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
            
            // Filter products
            filterProducts(category, pageCopy, menuTitle);
        });
    });
    
    // Reset view button (optional - can be added to UI)
    window.resetFilters = function() {
        filterProducts('all', '', 'Featured Wines');
    };
});

// ============================================
// SHOPPING CART (BASIC)
// ============================================
let cart = [];

document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const productCard = e.target.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const priceText = productCard.querySelector('.product-price').textContent;
            
            // Add to cart array
            cart.push({
                name: productName,
                price: priceText
            });
            
            // Update cart count
            const cartCount = document.querySelector('.cart-count');
            cartCount.textContent = cart.length;
            
            // Show feedback
            alert(`${productName} added to cart!`);
        });
    });
});

// ============================================
// SEARCH FUNCTIONALITY (BASIC)
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.search-bar button');
    
    if (searchButton) {
        searchButton.addEventListener('click', () => {
            const searchTerm = searchInput.value.toLowerCase().trim();
            
            if (searchTerm) {
                const productCards = document.querySelectorAll('.product-card');
                let foundCount = 0;
                
                productCards.forEach(card => {
                    const title = card.querySelector('h3').textContent.toLowerCase();
                    const description = card.querySelector('.description').textContent.toLowerCase();
                    const wineType = card.querySelector('.wine-type') ? card.querySelector('.wine-type').textContent.toLowerCase() : '';
                    
                    if (title.includes(searchTerm) || description.includes(searchTerm) || wineType.includes(searchTerm)) {
                        card.style.display = 'block';
                        foundCount++;
                        
                        // Hide pairing info during search
                        const pairingInfo = card.querySelector('.pairing-info');
                        if (pairingInfo) {
                            pairingInfo.style.display = 'none';
                        }
                    } else {
                        card.style.display = 'none';
                    }
                });
                
                // Update section title
                const sectionTitle = document.querySelector('.section-title');
                sectionTitle.textContent = `Search Results for "${searchTerm}" (${foundCount} found)`;
                
                // Hide page description
                document.getElementById('pageDescription').style.display = 'none';
                
                // Scroll to products
                document.getElementById('shop').scrollIntoView({ behavior: 'smooth' });
            }
        });
        
        // Allow search on Enter key
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                searchButton.click();
            }
        });
    }
});

// ============================================
// NEWSLETTER SIGNUP
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const newsletterButton = document.querySelector('.newsletter button');
    const newsletterInput = document.querySelector('.newsletter input');
    
    if (newsletterButton) {
        newsletterButton.addEventListener('click', (e) => {
            e.preventDefault();
            const email = newsletterInput.value.trim();
            
            if (email && email.includes('@')) {
                alert(`Thank you for subscribing with ${email}!`);
                newsletterInput.value = '';
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }
});

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const anchorLinks = document.querySelectorAll('a[href^="#"]:not([data-filter])');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') {
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
                if (navMenu.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            }
        });
    });
});

// ============================================
// CONSOLE WELCOME MESSAGE
// ============================================
console.log('%c🍷 Welcome to Vino Arsan', 'font-size: 20px; color: #C8A14A; font-weight: bold;');
console.log('%cEst. 2009 - Crafted in the Atomic Age', 'font-size: 14px; color: #C8A14A;');
