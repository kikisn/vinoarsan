// About Page - Testimonials Carousel
const aboutTestimonials = document.querySelectorAll('.about-testimonial-card');
const nextAboutTestimonial = document.getElementById('nextAboutTestimonial');
const prevAboutTestimonial = document.getElementById('prevAboutTestimonial');

if (aboutTestimonials.length > 0 && nextAboutTestimonial && prevAboutTestimonial) {
    let currentAboutTestimonial = 0;
    const totalAboutTestimonials = aboutTestimonials.length;

    function showAboutTestimonial(index) {
        aboutTestimonials.forEach(testimonial => testimonial.classList.remove('active'));
        aboutTestimonials[index].classList.add('active');
    }

    nextAboutTestimonial.addEventListener('click', () => {
        currentAboutTestimonial = (currentAboutTestimonial + 1) % totalAboutTestimonials;
        showAboutTestimonial(currentAboutTestimonial);
    });

    prevAboutTestimonial.addEventListener('click', () => {
        currentAboutTestimonial = (currentAboutTestimonial - 1 + totalAboutTestimonials) % totalAboutTestimonials;
        showAboutTestimonial(currentAboutTestimonial);
    });

    // Auto-rotate testimonials every 6 seconds
    setInterval(() => {
        currentAboutTestimonial = (currentAboutTestimonial + 1) % totalAboutTestimonials;
        showAboutTestimonial(currentAboutTestimonial);
    }, 6000);
}

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
