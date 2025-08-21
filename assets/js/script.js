// ===== MAIN JAVASCRIPT FILE =====
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // Initialize animations and interactions
    initScrollAnimations();
    initTypingAnimation();
    initSmoothScrolling();
    initContactForm();
    initHeaderBar();
    initSkillsCarousel();
    initRecommendationsCarousel();
    
    console.log('🚀 Portfolio website loaded successfully!');
});

// ===== SCROLL ANIMATIONS =====
let globalObserver; // Make observer accessible globally

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    globalObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all elements with animate-on-scroll class
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(element => {
        globalObserver.observe(element);
    });
}

// Helper function to observe new elements (for dynamically created content)
function observeElement(element) {
    if (globalObserver && element.classList.contains('animate-on-scroll')) {
        globalObserver.observe(element);
    }
}

// ===== TYPING ANIMATION =====
function initTypingAnimation() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;
    
    const texts = [
        'Senior .NET Developer',
        'MAUI App Creator',
        'Problem Solver',
        'Full-Stack Developer'
    ];
    
    let currentTextIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const pauseBetweenTexts = 2000;
    
    function typeText() {
        const currentText = texts[currentTextIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, currentCharIndex - 1);
            currentCharIndex--;
        } else {
            typingElement.textContent = currentText.substring(0, currentCharIndex + 1);
            currentCharIndex++;
        }
        
        let nextDelay = isDeleting ? deletingSpeed : typingSpeed;
        
        if (!isDeleting && currentCharIndex === currentText.length) {
            nextDelay = pauseBetweenTexts;
            isDeleting = true;
        } else if (isDeleting && currentCharIndex === 0) {
            isDeleting = false;
            currentTextIndex = (currentTextIndex + 1) % texts.length;
            nextDelay = typingSpeed;
        }
        
        setTimeout(typeText, nextDelay);
    }
    
    typeText();
}

// ===== SMOOTH SCROLLING =====
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const elementPosition = targetElement.offsetTop;
                const windowHeight = window.innerHeight;
                
                // Calculate position to center the section in the viewport
                let scrollPosition = targetId === "#hero" ? elementPosition : elementPosition + (windowHeight/2) + 180;
                window.scrollTo({
                    top: scrollPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== CONTACT FORM =====
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Basic validation
        if (!name || !email || !message) {
            showNotification('Please fill in all fields.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Create mailto link with form data
        const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
        const mailtoLink = `mailto:tim@timbarrywoods.dev?subject=${subject}&body=${body}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Show success message and reset form
        showNotification('Opening your email client...', 'success');
        contactForm.reset();
    });
}

// ===== UTILITY FUNCTIONS =====
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type) {
    // Remove existing notification if present
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        color: white;
        font-weight: 500;
        z-index: 1000;
        display: flex;
        align-items: center;
        gap: 1rem;
        max-width: 300px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        animation: slideInRight 0.3s ease;
        background: ${type === 'success' ? 'linear-gradient(135deg, #48bb78, #38a169)' : 'linear-gradient(135deg, #f56565, #e53e3e)'};
    `;
    
    // Add close button functionality
    const closeButton = notification.querySelector('.notification-close');
    closeButton.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0;
        margin-left: auto;
    `;
    
    closeButton.addEventListener('click', () => {
        notification.remove();
    });
    
    // Add to document
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// ===== PARTICLE EFFECT FOR HERO SECTION =====
function createParticleEffect() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1';
    
    hero.appendChild(canvas);
    
    function resizeCanvas() {
        canvas.width = hero.offsetWidth;
        canvas.height = hero.offsetHeight;
    }
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    const particles = [];
    const particleCount = 50;
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 2 + 1;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
        
        draw() {
            ctx.save();
            ctx.globalAlpha = this.opacity;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'white';
            ctx.fill();
            ctx.restore();
        }
    }
    
    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// Initialize particle effect after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(createParticleEffect, 1000);
});

// ===== HEADER BAR =====
function initHeaderBar() {
    const headerBar = document.getElementById('header-bar');
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const headerNav = document.querySelector('.header-nav');
    
    if (!headerBar) return;
        
    // Throttled scroll handler for better performance
    const handleScroll = throttle(() => {
        const scrollY = window.scrollY;
        const heroHeight = window.innerHeight * 0.8; // Show header after 80% of viewport height
        
        if (scrollY > heroHeight) {
            headerBar.classList.add('visible');
        } else {
            headerBar.classList.remove('visible');
        }
    }, 16); // ~60fps
    
    // Mobile menu toggle functionality
    if (mobileMenuToggle && headerNav) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuToggle.classList.toggle('active');
            headerNav.classList.toggle('active');
        });
        
        // Close mobile menu when clicking nav links
        const navLinks = headerNav.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                headerNav.classList.remove('active');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!headerBar.contains(e.target)) {
                mobileMenuToggle.classList.remove('active');
                headerNav.classList.remove('active');
            }
        });
    }
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial check in case user refreshes page mid-scroll
    handleScroll();
}

// ===== PERFORMANCE OPTIMIZATION =====
// Throttle scroll events
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
    }
}

// Debounce resize events
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

// ===== SKILLS CAROUSEL =====
function initSkillsCarousel() {
    const skillsGrid = document.querySelector('.skills-grid');
    const leftArrow = document.querySelector('.skills-scroll-arrow.left');
    const rightArrow = document.querySelector('.skills-scroll-arrow.right');
    
    if (!skillsGrid || !leftArrow || !rightArrow) return;
    
    // Get all original skill items
    const originalSkillItems = Array.from(skillsGrid.querySelectorAll('.skill-item'));
    const itemCount = originalSkillItems.length;
    
    if (itemCount === 0) return;
    
    // Clear the grid and rebuild with proper infinite scroll structure
    skillsGrid.innerHTML = '';
    
    // Create three sets: clone-end + original + clone-start for seamless infinite scroll
    // Clone for beginning (when scrolling left from start)
    const startClones = originalSkillItems.map(item => {
        const clone = item.cloneNode(true);
        clone.classList.add('skill-clone', 'start-clone');
        // Observe the clone for animations
        observeElement(clone);
        return clone;
    });
    
    // Clone for end (when scrolling right past end)
    const endClones = originalSkillItems.map(item => {
        const clone = item.cloneNode(true);
        clone.classList.add('skill-clone', 'end-clone');
        // Observe the clone for animations
        observeElement(clone);
        return clone;
    });
    
    // Append in order: end-clones + originals + start-clones
    endClones.forEach(clone => skillsGrid.appendChild(clone));
    originalSkillItems.forEach(item => {
        skillsGrid.appendChild(item);
        // Re-observe original items in case they were removed from DOM
        observeElement(item);
    });
    startClones.forEach(clone => skillsGrid.appendChild(clone));
    
    // Calculate widths
    const itemWidth = 100; // From CSS: flex: 0 0 140px
    const gap = 24; // From CSS: gap: 1.5rem = 24px
    const itemTotalWidth = itemWidth + gap;
    const originalSetWidth = itemCount * itemTotalWidth;
    
    let animationId;
        
    // Arrow button functionality
    function scrollLeft() {
        skillsGrid.scrollBy({
            left: -itemTotalWidth * 3, // Scroll 3 items at a time
            behavior: 'smooth'
        });
    }
    
    function scrollRight() {
        skillsGrid.scrollBy({
            left: itemTotalWidth * 3, // Scroll 3 items at a time
            behavior: 'smooth'
        });
    }
        
    // Event listeners for arrows
    leftArrow.addEventListener('click', scrollLeft);
    rightArrow.addEventListener('click', scrollRight);
        
    // Handle manual scrolling (mouse wheel, touch, etc.)
    skillsGrid.addEventListener('scroll', () => {
        // Handle infinite scroll position corrections without animation
        const currentScroll = skillsGrid.scrollLeft;
        const maxScroll = originalSetWidth * 2; 
        const minScroll = 0;
        
        // Use a small timeout to avoid interfering with smooth scrolling
        setTimeout(() => {
            if (currentScroll >= maxScroll - 1) {
                skillsGrid.scrollLeft = originalSetWidth;
            } else if (currentScroll <= minScroll + 1) {
                skillsGrid.scrollLeft = originalSetWidth;
            }
        }, 50);
    });
    
    // Arrow visibility based on scroll position
    function updateArrowVisibility() {
        // Always show both arrows since we have infinite scroll
        leftArrow.style.opacity = '0.7';
        rightArrow.style.opacity = '0.7';
    }
    
    // Update arrow visibility on scroll
    skillsGrid.addEventListener('scroll', updateArrowVisibility);
    updateArrowVisibility(); // Initial call
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.target.closest('.skills-grid')) {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                scrollLeft();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                scrollRight();
            }
        }
    });
    
    // Clean up on page unload
    window.addEventListener('beforeunload', () => {
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
    });
}

// ===== RECOMMENDATIONS CAROUSEL =====
function initRecommendationsCarousel() {
    const carousel = document.querySelector('.carousel-wrapper');
    const cards = document.querySelectorAll('.recommendation-card');
    const prevBtn = document.querySelector('.carousel-btn-prev');
    const nextBtn = document.querySelector('.carousel-btn-next');
    const indicators = document.querySelectorAll('.indicator');
    
    if (!carousel || !cards.length) return;
    
    let currentIndex = 0;
    const totalCards = cards.length;
    
    function updateCarousel() {
        const translateX = -(currentIndex * 100);
        carousel.style.transform = `translateX(${translateX}%)`;
        
        // Update indicators
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
        
        // Update button states
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === totalCards - 1;
    }
    
    function goToSlide(index) {
        currentIndex = Math.max(0, Math.min(index, totalCards - 1));
        updateCarousel();
    }
    
    // Previous button
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            goToSlide(currentIndex - 1);
        }
    });
    
    // Next button
    nextBtn.addEventListener('click', () => {
        if (currentIndex < totalCards - 1) {
            goToSlide(currentIndex + 1);
        }
    });
    
    // Indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            goToSlide(index);
        });
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' && currentIndex > 0) {
            goToSlide(currentIndex - 1);
        } else if (e.key === 'ArrowRight' && currentIndex < totalCards - 1) {
            goToSlide(currentIndex + 1);
        }
    });
    
    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0 && currentIndex < totalCards - 1) {
                // Swipe left - go to next
                goToSlide(currentIndex + 1);
            } else if (diff < 0 && currentIndex > 0) {
                // Swipe right - go to previous
                goToSlide(currentIndex - 1);
            }
        }
    }
}

// Add CSS for notification animation
const notificationStyles = `
@keyframes slideInRight {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);