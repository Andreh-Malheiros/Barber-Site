function toggleMobileMenu() {
            const mobileMenu = document.getElementById('mobileMenu');
            const btn = document.querySelector('.mobile-menu-btn i');
            
            mobileMenu.classList.toggle('active');
            btn.classList.toggle('fa-bars');
            btn.classList.toggle('fa-times');
        }

        function closeMobileMenu() {
            const mobileMenu = document.getElementById('mobileMenu');
            const btn = document.querySelector('.mobile-menu-btn i');
            
            mobileMenu.classList.remove('active');
            btn.classList.add('fa-bars');
            btn.classList.remove('fa-times');
        }

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Improved fade in animation on scroll
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });

        // Special observer for action buttons with delayed animation
        const buttonObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    // Reset button animations
                    const buttons = entry.target.querySelectorAll('.action-btn');
                    buttons.forEach((btn, index) => {
                        btn.style.animation = 'none';
                        btn.offsetHeight; // Trigger reflow
                        btn.style.animation = `fadeInUpDelayed 1s ease-out ${0.2 + (index * 0.2)}s forwards`;
                    });
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '0px 0px -50px 0px'
        });

        const actionButtonsSection = document.getElementById('actionButtons');
        if (actionButtonsSection) {
            buttonObserver.observe(actionButtonsSection);
        }

        // Header background on scroll
        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            if (window.scrollY > 100) {
                header.style.background = 'rgba(10, 10, 10, 0.98)';
            } else {
                header.style.background = 'rgba(10, 10, 10, 0.95)';
            }
        });

        // Gallery item click effect
        document.querySelectorAll('.gallery-item').forEach(item => {
            item.addEventListener('click', function() {
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1.05)';
                }, 150);
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 300);
            });
        });

        // Testimonials auto-rotate
        let currentTestimonial = 0;
        const testimonials = document.querySelectorAll('.testimonial');
        
        function rotateTestimonials() {
            testimonials.forEach((testimonial, index) => {
                testimonial.style.transform = index === currentTestimonial ? 'translateY(-10px) scale(1.05)' : 'translateY(0) scale(1)';
            });
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        }

        setInterval(rotateTestimonials, 4000);

        // Improved parallax effect for hero section
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            if (hero && window.innerWidth > 768) {
                hero.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
        });

        // Loading animation
        window.addEventListener('load', () => {
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.5s ease';
            setTimeout(() => {
                document.body.style.opacity = '1';
            }, 100);
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            const mobileMenu = document.getElementById('mobileMenu');
            const menuBtn = document.querySelector('.mobile-menu-btn');
            
            if (!mobileMenu.contains(event.target) && !menuBtn.contains(event.target)) {
                closeMobileMenu();
            }
        });