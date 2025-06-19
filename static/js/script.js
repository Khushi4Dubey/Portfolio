document.addEventListener('DOMContentLoaded', () => {
    // Navigation functionality
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section, header#hero');
    const menuToggle = document.createElement('button');
    
    // Create mobile menu toggle
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    menuToggle.className = 'menu-toggle';
    menuToggle.style.display = 'none';
    document.body.appendChild(menuToggle);
    
    // Toggle mobile menu
    menuToggle.addEventListener('click', () => {
        navbar.classList.toggle('mobile-closed');
    });
    
    // Highlight active section
    function updateActiveNav() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Handle responsive behavior
    function handleResponsive() {
        if (window.innerWidth <= 768) {
            menuToggle.style.display = 'block';
            navbar.classList.add('mobile-closed');
        } else {
            menuToggle.style.display = 'none';
            navbar.classList.remove('mobile-closed');
        }
    }
    
    // Event listeners for navigation
    window.addEventListener('scroll', updateActiveNav);
    window.addEventListener('resize', handleResponsive);
    
    // Initialize navigation
    handleResponsive();
    updateActiveNav();

    // Smooth scrolling for anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Update URL without jumping
                if (history.pushState) {
                    history.pushState(null, null, this.getAttribute('href'));
                } else {
                    window.location.hash = this.getAttribute('href');
                }
            }
        });
    });

    // Download resume button functionality
    const downloadBtn = document.querySelector('a.btn[href="#"]');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // Assuming resume.pdf is in the static folder
            window.open('/static/resume.pdf', '_blank');
        });
    }

    // Form submission handling
const contactForm = document.querySelector('#contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const statusDiv = contactForm.querySelector('.form-status');
        const originalBtnText = submitBtn.textContent;
        
        try {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            statusDiv.innerHTML = '';
            
            const response = await fetch('/submit-form', {
                method: 'POST',
                body: formData
            });
            
            const data = await response.json();
            
            if (response.ok) {
                submitBtn.style.backgroundColor = '#4BB543';
                submitBtn.textContent = 'Message Sent!';
                statusDiv.innerHTML = '<p class="success">Message sent successfully!</p>';
                contactForm.reset();
            } else {
                throw new Error(data.message || 'Failed to send message');
            }
            
        } catch (error) {
            console.error('Form submission error:', error);
            submitBtn.style.backgroundColor = '#FF3333';
            submitBtn.textContent = 'Error!';
            statusDiv.innerHTML = `<p class="error">Error: ${error.message}</p>`;
        } finally {
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
                submitBtn.style.backgroundColor = '';
            }, 3000);
        }
    });
}
    // Scroll reveal animations
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('section, .project-card, .experience-card, .skills-column');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Set initial state for animations
    document.querySelectorAll('section, .project-card, .experience-card, .skills-column').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    });

    // Run once on load
    animateOnScroll();
    
    // Then on scroll
    window.addEventListener('scroll', animateOnScroll);

    // Back to top button
    const backToTop = document.createElement('button');
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTop.style.display = 'none';
    document.body.appendChild(backToTop);
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', () => {
        backToTop.style.display = window.scrollY > 500 ? 'block' : 'none';
    });

    // Add hover effect to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.boxShadow = '0 5px 25px rgba(0, 0, 0, 0.08)';
        });
    });
});