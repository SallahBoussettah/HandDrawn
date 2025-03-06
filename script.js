// Add some playful movement to cards
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const rotateX = (y - rect.height / 2) / 20;
        const rotateY = (x - rect.width / 2) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'none';
    });
});

// Add wiggle effect to buttons
document.querySelectorAll('.sketchy-button').forEach(button => {
    button.addEventListener('mouseover', () => {
        button.style.transform = `rotate(${Math.random() * 2 - 1}deg)`;
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'none';
    });
});

document.addEventListener("DOMContentLoaded", function() {
    // Loading screen
    const loadingScreen = document.querySelector('.loading-screen');
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        document.body.style.overflow = 'visible';
        
        // Animate skill bars after page load
        setTimeout(() => {
            document.querySelectorAll('.skill-level').forEach(skill => {
                const width = skill.style.width;
                skill.style.width = '0';
                setTimeout(() => {
                    skill.style.width = width;
                }, 100);
            });
        }, 500);
    }, 2000);

    // Theme toggle
    const themeToggle = document.getElementById('theme-switch');
    themeToggle.addEventListener('change', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('dark-mode', document.body.classList.contains('dark-mode'));
    });

    // Check for saved theme preference
    if (localStorage.getItem('dark-mode') === 'true') {
        document.body.classList.add('dark-mode');
        themeToggle.checked = true;
    }

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // Animate menu bars
        const bars = document.querySelectorAll('.bar');
        bars.forEach(bar => bar.classList.toggle('active'));
        
        if (navLinks.classList.contains('active')) {
            bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    });

    // Sticky Navigation
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('.sketchy-nav');
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const bars = document.querySelectorAll('.bar');
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Text reveal animation
    const revealText = document.querySelector('.reveal-text');
    setTimeout(() => {
        revealText.classList.add('visible');
    }, 500);

    // Parallax effect
    const parallaxBg = document.querySelector('.parallax-bg');
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        parallaxBg.style.transform = `translateY(${scrollPosition * 0.4}px)`;
    });

    // Gallery filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
                
                // Add animation
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                
                setTimeout(() => {
                    if (!item.classList.contains('hidden')) {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }
                }, 300);
            });
        });
    });

    // Card tilt effect
    const cards = document.querySelectorAll('[data-tilt]');
    cards.forEach(card => {
        card.addEventListener('mousemove', tiltEffect);
        card.addEventListener('mouseleave', resetTilt);
    });
    
    function tiltEffect(e) {
        const card = this;
        const cardRect = card.getBoundingClientRect();
        const cardWidth = cardRect.width;
        const cardHeight = cardRect.height;
        const centerX = cardRect.left + cardWidth / 2;
        const centerY = cardRect.top + cardHeight / 2;
        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;
        const rotateX = (-mouseY / (cardHeight / 2)) * 10;
        const rotateY = (mouseX / (cardWidth / 2)) * 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    }
    
    function resetTilt() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    }

    // Wiggle button effect
    document.querySelectorAll('.sketchy-button').forEach(button => {
        button.addEventListener('mouseover', () => {
            const randomRotate = Math.random() * 2 - 1;
            button.style.transform = `rotate(${randomRotate}deg) translate(-2px, -2px)`;
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'none';
        });
    });

    // Form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!name || !email || !message) {
                alert('Please fill in all fields.');
                return;
            }
            
            // Simulate form submission
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 1500);
        });
    }

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                
                // For skill bars
                if (entry.target.classList.contains('skill')) {
                    const skillLevel = entry.target.querySelector('.skill-level');
                    if (skillLevel) {
                        skillLevel.style.width = skillLevel.getAttribute('style').match(/width: (\d+)%/)[1] + '%';
                    }
                }
            }
        });
    }, observerOptions);
    
    // Observe elements
    document.querySelectorAll('.sketchy, .skill, .gallery-item, .card').forEach(element => {
        observer.observe(element);
        element.classList.add('to-animate');
    });

    // Init
    document.body.style.overflow = 'hidden'; // Prevent scroll during loading
}); 