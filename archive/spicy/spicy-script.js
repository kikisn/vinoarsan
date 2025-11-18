// Hero Carousel
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');
const totalSlides = slides.length;

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
}

let carouselInterval = setInterval(nextSlide, 5000);

document.getElementById('nextSlide').addEventListener('click', () => {
    clearInterval(carouselInterval);
    nextSlide();
    carouselInterval = setInterval(nextSlide, 5000);
});

document.getElementById('prevSlide').addEventListener('click', () => {
    clearInterval(carouselInterval);
    prevSlide();
    carouselInterval = setInterval(nextSlide, 5000);
});

// Wine Deck Slider
let currentWineIndex = 0;
const wineCards = document.querySelectorAll('.wine-card');
const totalWineCards = wineCards.length;

function updateWineCards() {
    wineCards.forEach((card, index) => {
        card.classList.remove('active', 'next', 'prev');
        
        if (index === currentWineIndex) {
            card.classList.add('active');
        } else if (index === (currentWineIndex + 1) % totalWineCards) {
            card.classList.add('next');
        } else if (index === (currentWineIndex - 1 + totalWineCards) % totalWineCards) {
            card.classList.add('prev');
        }
    });
}

document.getElementById('nextWine').addEventListener('click', () => {
    currentWineIndex = (currentWineIndex + 1) % totalWineCards;
    updateWineCards();
});

document.getElementById('prevWine').addEventListener('click', () => {
    currentWineIndex = (currentWineIndex - 1 + totalWineCards) % totalWineCards;
    updateWineCards();
});

// Parallax Effect
const parallaxSection = document.getElementById('parallaxSection');
const parallaxBg = document.getElementById('parallaxBg');

if (parallaxSection && parallaxBg) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const sectionTop = parallaxSection.offsetTop;
        const sectionHeight = parallaxSection.offsetHeight;
        
        if (scrolled > sectionTop - window.innerHeight && scrolled < sectionTop + sectionHeight) {
            const parallaxValue = (scrolled - sectionTop) * 0.5;
            parallaxBg.style.transform = `translateY(${parallaxValue}px)`;
        }
    });
}

// Testimonials Slider
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial');
const totalTestimonials = testimonials.length;

function showTestimonial(index) {
    testimonials.forEach(testimonial => testimonial.classList.remove('active'));
    testimonials[index].classList.add('active');
}

document.getElementById('nextTestimonial').addEventListener('click', () => {
    currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
    showTestimonial(currentTestimonial);
});

document.getElementById('prevTestimonial').addEventListener('click', () => {
    currentTestimonial = (currentTestimonial - 1 + totalTestimonials) % totalTestimonials;
    showTestimonial(currentTestimonial);
});

// Auto-rotate testimonials
setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
    showTestimonial(currentTestimonial);
}, 6000);

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all items
        faqItems.forEach(faq => faq.classList.remove('active'));
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const navLinksRight = document.getElementById('navLinksRight');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('mobile-active');
    navLinksRight.classList.toggle('mobile-active');
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

// ========================================
// SIMPLIFIED COLLECTIONS FUNCTIONALITY
// ========================================

const collectionNames = document.querySelectorAll('.collection-name');
const filteredProductCards = document.querySelectorAll('.filtered-product-card');
const filteredProductsGrid = document.getElementById('filteredProducts');
const shopAllBtn = document.getElementById('shopAllBtn');

// Function to show products for a specific category
function showCategoryProducts(category) {
    console.log('Showing category:', category); // Debug log
    
    // Remove active class from all collection names
    collectionNames.forEach(name => name.classList.remove('active'));
    
    // Show the products grid
    filteredProductsGrid.classList.remove('hidden');
    
    // Filter and show relevant products
    let hasVisibleProducts = false;
    filteredProductCards.forEach(card => {
        const cardCategories = card.dataset.category.split(' ');
        
        if (cardCategories.includes(category)) {
            card.classList.remove('hidden');
            card.classList.add('show');
            hasVisibleProducts = true;
        } else {
            card.classList.add('hidden');
            card.classList.remove('show');
        }
    });
    
    console.log('Has visible products:', hasVisibleProducts); // Debug log
    
    // Scroll to products grid
    if (hasVisibleProducts) {
        setTimeout(() => {
            filteredProductsGrid.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start'
            });
        }, 100);
    }
}

// Function to show all products
function showAllProducts() {
    console.log('Showing all products'); // Debug log
    
    // Remove active class from all collection names
    collectionNames.forEach(name => name.classList.remove('active'));
    
    // Show the products grid
    filteredProductsGrid.classList.remove('hidden');
    
    // Show all products
    filteredProductCards.forEach(card => {
        card.classList.remove('hidden');
        card.classList.add('show');
    });
    
    // Scroll to products grid
    setTimeout(() => {
        filteredProductsGrid.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start'
        });
    }, 100);
}

// Add click event listeners to collection names
collectionNames.forEach(collectionName => {
    collectionName.addEventListener('click', function(event) {
        event.preventDefault();
        const category = this.dataset.category;
        
        console.log('Collection clicked:', category); // Debug log
        
        // Add active class to clicked collection
        this.classList.add('active');
        
        // Show products for this category
        showCategoryProducts(category);
    });
});

// Shop All button functionality
if (shopAllBtn) {
    shopAllBtn.addEventListener('click', function(event) {
        event.preventDefault();
        showAllProducts();
    });
}

// Initialize - products hidden by default
document.addEventListener('DOMContentLoaded', () => {
    // Make sure products grid is hidden on load
    if (filteredProductsGrid) {
        filteredProductsGrid.classList.add('hidden');
    }
});

// Add to cart functionality (placeholder)
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-primary') && e.target.textContent === 'Add to Cart') {
        e.preventDefault();
        const productCard = e.target.closest('.filtered-product-card, .product-card, .wine-card-content');
        const productNameElement = productCard.querySelector('.filtered-product-name, .product-name, .wine-card-title');
        
        if (productNameElement) {
            const productName = productNameElement.textContent.trim();
            
            // Show a simple alert (you can replace this with a proper cart system)
            alert(`Added "${productName}" to cart!`);
            
            // Optional: Add animation or update cart count
            const cartLink = document.querySelector('.nav-link:last-child');
            if (cartLink && cartLink.textContent.includes('Cart')) {
                // Flash animation on cart
                cartLink.style.color = 'var(--color-gold)';
                setTimeout(() => {
                    cartLink.style.color = '';
                }, 500);
            }
        }
    }
});