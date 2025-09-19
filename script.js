// Beautiful Website JavaScript
// Interactive functionality will be added section by section

console.log('Beautiful website loaded!');

// Mobile Menu Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active link highlighting on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // Header background change on scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.style.background = 'rgba(245, 241, 235, 0.98)';
            header.style.boxShadow = '0 2px 30px rgba(139, 115, 85, 0.2)';
        } else {
            header.style.background = 'rgba(245, 241, 235, 0.95)';
            header.style.boxShadow = '0 2px 20px rgba(139, 115, 85, 0.15)';
        }
    });

    // Hero section animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe hero elements for animation
    const heroElements = document.querySelectorAll('.hero-title, .hero-description, .hero-buttons, .hero-stats, .hero-visual');
    heroElements.forEach(el => {
        observer.observe(el);
    });

    // Floating cards interaction
    const floatingCards = document.querySelectorAll('.floating-card');
    floatingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.05)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0px) scale(1)';
        });
    });

    // Before/After Slider functionality
    const beforeAfterSlider = document.querySelector('.before-after-slider');
    const sliderHandle = document.querySelector('.slider-handle');
    const afterImage = document.querySelector('.after-image');
    const sliderButton = document.querySelector('.slider-button');
    
    if (beforeAfterSlider && sliderHandle && afterImage) {
        let isDragging = false;
        let startX = 0;
        let currentX = 0;
        
        // Mouse events
        sliderHandle.addEventListener('mousedown', startDrag);
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', endDrag);
        
        // Touch events for mobile
        sliderHandle.addEventListener('touchstart', startDrag);
        document.addEventListener('touchmove', drag);
        document.addEventListener('touchend', endDrag);
        
        // Click on slider to move handle
        beforeAfterSlider.addEventListener('click', function(e) {
            if (e.target === beforeAfterSlider || e.target === sliderButton) {
                const rect = beforeAfterSlider.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const percentage = (x / rect.width) * 100;
                updateSlider(percentage);
            }
        });
        
        function startDrag(e) {
            isDragging = true;
            startX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
            beforeAfterSlider.style.cursor = 'grabbing';
            e.preventDefault();
        }
        
        function drag(e) {
            if (!isDragging) return;
            
            currentX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
            const rect = beforeAfterSlider.getBoundingClientRect();
            const x = currentX - rect.left;
            const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
            
            updateSlider(percentage);
            e.preventDefault();
        }
        
        function endDrag() {
            isDragging = false;
            beforeAfterSlider.style.cursor = 'grab';
        }
        
        function updateSlider(percentage) {
            sliderHandle.style.left = percentage + '%';
            afterImage.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
        }
        
            // Auto-animation every 3 seconds
            let autoAnimation = null;
            let isAutoAnimating = false;
            
            function startAutoAnimation() {
                if (isAutoAnimating) return;
                isAutoAnimating = true;
                
                let percentage = 20;
                let direction = 1;
                
                autoAnimation = setInterval(() => {
                    percentage += direction * 1;
                    if (percentage >= 80) direction = -1;
                    if (percentage <= 20) direction = 1;
                    updateSlider(percentage);
                }, 30);
            }
            
            function stopAutoAnimation() {
                if (autoAnimation) {
                    clearInterval(autoAnimation);
                    autoAnimation = null;
                }
                isAutoAnimating = false;
            }
            
            // Start auto animation on page load
            setTimeout(startAutoAnimation, 1000);
            
            // Pause on hover, resume on leave
            beforeAfterSlider.addEventListener('mouseenter', stopAutoAnimation);
            beforeAfterSlider.addEventListener('mouseleave', function() {
                setTimeout(startAutoAnimation, 500);
            });
    }

    // Scroll indicator click
    const scrollIndicator = document.querySelector('.hero-scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const nextSection = document.querySelector('#company') || document.querySelector('section:nth-child(2)');
            if (nextSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = nextSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Pricing section animations
    const pricingObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe pricing elements
    const pricingElements = document.querySelectorAll('.pricing-card');
    pricingElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.2}s`;
        pricingObserver.observe(el);
    });

    // Pricing card hover effects
    const pricingCards = document.querySelectorAll('.pricing-card');
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = this.classList.contains('featured') 
                ? 'scale(1.05) translateY(-10px)' 
                : 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = this.classList.contains('featured') 
                ? 'scale(1.05)' 
                : 'translateY(0)';
        });
    });

    // Package button interactions
    const packageButtons = document.querySelectorAll('.btn-package');
    packageButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Scroll to contact section
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = contactSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Feature item hover effects
    const featureItems = document.querySelectorAll('.feature-item');
    featureItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const checkIcon = this.querySelector('.check-icon');
            checkIcon.style.transform = 'scale(1.2)';
            checkIcon.style.transition = 'transform 0.2s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            const checkIcon = this.querySelector('.check-icon');
            checkIcon.style.transform = 'scale(1)';
        });
    });

    // Gallery filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeIn 0.5s ease-in-out';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Gallery item animations
    const galleryObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe gallery items
    galleryItems.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.1}s`;
        galleryObserver.observe(el);
    });

    // Gallery item hover effects
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.15)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.1)';
        });
    });

    // Gallery CTA button interaction
    const galleryCTA = document.querySelector('.btn-gallery');
    if (galleryCTA) {
        galleryCTA.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Scroll to contact section
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = contactSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Timeline animations
    const timelineObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.3}s`;
        timelineObserver.observe(el);
    });

    // Timeline marker hover effects
    const timelineMarkers = document.querySelectorAll('.timeline-marker');
    timelineMarkers.forEach(marker => {
        marker.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.marker-icon');
            icon.style.transform = 'scale(1.1)';
            icon.style.boxShadow = '0 12px 35px rgba(231, 76, 60, 0.5)';
        });
        
        marker.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.marker-icon');
            icon.style.transform = 'scale(1)';
            icon.style.boxShadow = '0 8px 25px rgba(231, 76, 60, 0.4)';
        });
    });

    // Timeline card hover effects
    const timelineCards = document.querySelectorAll('.timeline-card');
    timelineCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.25)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 15px 50px rgba(0, 0, 0, 0.2)';
        });
    });

    // Timeline feature hover effects
    const timelineFeatures = document.querySelectorAll('.timeline-features .feature-item');
    timelineFeatures.forEach(feature => {
        feature.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.background = 'rgba(255, 255, 255, 0.15)';
        });
        
        feature.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.background = 'rgba(255, 255, 255, 0.1)';
        });
    });

    // Timeline CTA button interaction
    const timelineCTA = document.querySelector('.btn-timeline');
    if (timelineCTA) {
        timelineCTA.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Scroll to contact section
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = contactSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Featured Spaces animations
    const featuredSpacesObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe featured spaces items
    const featuredSpacesItems = document.querySelectorAll('.featured-space-item');
    featuredSpacesItems.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.1}s`;
        featuredSpacesObserver.observe(el);
    });

    // Featured spaces hover effects
    featuredSpacesItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 25px 70px rgba(0, 0, 0, 0.15)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 15px 50px rgba(0, 0, 0, 0.1)';
        });
    });

    // Featured spaces CTA button interaction
    const featuredSpacesCTA = document.querySelector('.btn-featured');
    if (featuredSpacesCTA) {
        featuredSpacesCTA.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Scroll to contact section
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = contactSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Customer Stories Carousel
    let currentSlide = 0;
    const carouselTrack = document.getElementById('carouselTrack');
    const customerCards = document.querySelectorAll('.customer-story-card');
    const totalSlides = customerCards.length;
    const slidesToShow = window.innerWidth > 1024 ? 3 : window.innerWidth > 768 ? 2 : 1;
    const totalPages = Math.ceil(totalSlides / slidesToShow);
    
    // Create dots
    const carouselDots = document.getElementById('carouselDots');
    for (let i = 0; i < totalPages; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot';
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        carouselDots.appendChild(dot);
    }
    
    // Auto-move carousel every 5 seconds
    let autoSlideInterval = setInterval(() => {
        nextSlide();
    }, 5000);
    
    function updateCarousel() {
        const cardWidth = customerCards[0].offsetWidth + 30; // card width + gap
        const translateX = -currentSlide * cardWidth * slidesToShow;
        carouselTrack.style.transform = `translateX(${translateX}px)`;
        
        // Update dots
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalPages;
        updateCarousel();
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalPages) % totalPages;
        updateCarousel();
    }
    
    function goToSlide(slideIndex) {
        currentSlide = slideIndex;
        updateCarousel();
    }
    
    // Event listeners for carousel controls
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            clearInterval(autoSlideInterval);
            autoSlideInterval = setInterval(() => {
                nextSlide();
            }, 5000);
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            clearInterval(autoSlideInterval);
            autoSlideInterval = setInterval(() => {
                nextSlide();
            }, 5000);
        });
    }
    
    // Pause auto-slide on hover
    const carousel = document.querySelector('.customer-stories-carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', () => {
            clearInterval(autoSlideInterval);
        });
        
        carousel.addEventListener('mouseleave', () => {
            autoSlideInterval = setInterval(() => {
                nextSlide();
            }, 5000);
        });
    }
    
    // Handle window resize
    window.addEventListener('resize', () => {
        clearInterval(autoSlideInterval);
        currentSlide = 0;
        updateCarousel();
        autoSlideInterval = setInterval(() => {
            nextSlide();
        }, 5000);
    });
    
    // Customer Stories CTA button interaction
    const customerStoriesCTA = document.querySelector('.btn-customer');
    if (customerStoriesCTA) {
        customerStoriesCTA.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Scroll to contact section
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = contactSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('.newsletter-input');
            const submitBtn = this.querySelector('.newsletter-btn');
            const email = emailInput.value.trim();
            
            if (email) {
                // Add loading state
                submitBtn.innerHTML = '<span>Subscribing...</span>';
                submitBtn.disabled = true;
                
                // Simulate API call
                setTimeout(() => {
                    // Show success message
                    submitBtn.innerHTML = '<span>Subscribed!</span>';
                    submitBtn.style.background = 'linear-gradient(135deg, #27ae60, #2ecc71)';
                    
                    // Reset form
                    emailInput.value = '';
                    
                    // Reset button after 3 seconds
                    setTimeout(() => {
                        submitBtn.innerHTML = '<span>Subscribe</span><svg viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>';
                        submitBtn.style.background = 'linear-gradient(135deg, #e74c3c, #c0392b)';
                        submitBtn.disabled = false;
                    }, 3000);
                }, 1500);
            }
        });
    }

    // Footer link smooth scrolling
    const footerLinks = document.querySelectorAll('.footer-links a[href^="#"]');
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Social media icon hover effects
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.1)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Contact item hover effects
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.contact-icon');
            icon.style.background = 'rgba(231, 76, 60, 0.3)';
            icon.style.transform = 'scale(1.1)';
        });
        
        item.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.contact-icon');
            icon.style.background = 'rgba(231, 76, 60, 0.2)';
            icon.style.transform = 'scale(1)';
        });
    });

    // Location section animations
    const locationObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe location items
    const locationItems = document.querySelectorAll('.location-item, .transport-option');
    locationItems.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.1}s`;
        locationObserver.observe(el);
    });

    // Location button interactions
    const locationButtons = document.querySelectorAll('.btn-location');
    locationButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // Location item hover effects
    const locationItemsHover = document.querySelectorAll('.location-item');
    locationItemsHover.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.location-icon');
            icon.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        item.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.location-icon');
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // Transport option hover effects
    const transportOptions = document.querySelectorAll('.transport-option');
    transportOptions.forEach(option => {
        option.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.transport-icon');
            icon.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        option.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.transport-icon');
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // Map overlay interaction
    const mapOverlay = document.querySelector('.map-overlay');
    if (mapOverlay) {
        mapOverlay.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.2)';
        });
        
        mapOverlay.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        });
    }
});
