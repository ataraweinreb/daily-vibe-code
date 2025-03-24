// Smooth scrolling for anchor links
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

// MailerLite Form Handling
(function(w,d,e,u,f,l,n){w[f]=w[f]||function(){(w[f].q=w[f].q||[]).push(arguments);};l=d.createElement(e),l.async=1,l.src=u,n=d.getElementsByTagName(e)[0],n.parentNode.insertBefore(l,n);})(window,document,'script','https://assets.mailerlite.com/js/universal.js','ml');

ml('account', '1406682');

// Form submission handling
document.addEventListener('DOMContentLoaded', function() {
    // Initialize MailerLite
    (function(w,d,e,u,f,l,n){w[f]=w[f]||function(){(w[f].q=w[f].q||[]).push(arguments);};l=d.createElement(e),l.async=1,l.src=u,n=d.getElementsByTagName(e)[0],n.parentNode.insertBefore(l,n);})
    (window,document,'script','https://assets.mailerlite.com/js/universal.js','ml');

    // Handle form submission
    const form = document.querySelector('.ml-block-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = form.querySelector('input[name="fields[email]"]');
            const submitButton = form.querySelector('button[type="submit"]');
            const loadingButton = form.querySelector('button.loading');
            
            if (!emailInput || !submitButton || !loadingButton) return;
            
            const email = emailInput.value;
            
            // Show loading state
            submitButton.style.display = 'none';
            loadingButton.style.display = 'block';
            
            // Submit to MailerLite
            ml('subscribe', '1406682', email, {
                callback: function() {
                    // Show success message
                    const successBody = form.closest('.ml-form-embedBody').nextElementSibling;
                    if (successBody) {
                        successBody.style.display = 'block';
                        form.closest('.ml-form-embedBody').style.display = 'none';
                    }
                    
                    // Reset form
                    emailInput.value = '';
                },
                onError: function() {
                    // Show error state
                    submitButton.style.display = 'block';
                    loadingButton.style.display = 'none';
                    alert('There was an error subscribing. Please try again.');
                }
            });
        });
    }

    // Clap button functionality
    const clapButton = document.querySelector('.clap-button');
    if (clapButton) {
        const clapSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2017/2017-preview.mp3');
        
        clapButton.addEventListener('click', function() {
            // Play clap sound
            clapSound.currentTime = 0;
            clapSound.play();
            
            // Show clap animation
            this.classList.add('clap-active');
            
            // Create round of applause effect
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    createConfetti(1000, 30); // Shorter duration and fewer particles for each clap
                }, i * 200); // Stagger each clap
            }
            
            // Reset animation after 1 second
            setTimeout(() => {
                this.classList.remove('clap-active');
            }, 1000);
        });
    }
});

// Confetti effect function
function createConfetti(duration = 3000, particleCount = 50) {
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const currentParticleCount = particleCount * (timeLeft / duration);
        
        // Confetti from multiple positions
        confetti({
            ...defaults,
            particleCount: currentParticleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
            colors: ['#FF6B6B', '#4ECDC4', '#A8E6CF', '#FFD93D', '#FF8B94']
        });
        confetti({
            ...defaults,
            particleCount: currentParticleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
            colors: ['#FF6B6B', '#4ECDC4', '#A8E6CF', '#FFD93D', '#FF8B94']
        });
    }, 250);
}

// Trigger confetti on page load
window.addEventListener('load', function() {
    createConfetti(5000, 100); // Longer duration and more particles for page load
});

// FAQ accordion functionality
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-answer').style.maxHeight = null;
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
            answer.style.maxHeight = isActive ? null : answer.scrollHeight + 'px';
        });
    });
});

// Feature card animations on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.feature-card').forEach(card => {
        observer.observe(card);
    });
});

// Add animation delay to social icons
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.social-links a').forEach((icon, index) => {
        icon.style.setProperty('--i', index);
    });
});

// Scroll animations
function handleScrollAnimation() {
    const elements = document.querySelectorAll('.fade-in, .rule-item, .faq-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(element => {
        observer.observe(element);
    });
}

// Initialize scroll animations
document.addEventListener('DOMContentLoaded', function() {
    handleScrollAnimation();
});

// Re-run on scroll to handle dynamic content
window.addEventListener('scroll', () => {
    handleScrollAnimation();
});

// Add mouse move effect to hero section
document.addEventListener('DOMContentLoaded', function() {
    const hero = document.querySelector('.hero');
    const heroImage = document.querySelector('.hero-image');

    if (hero && heroImage) {
        hero.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { left, top, width, height } = hero.getBoundingClientRect();
            
            const x = (clientX - left) / width;
            const y = (clientY - top) / height;
            
            const rotateX = (y - 0.5) * 10;
            const rotateY = (x - 0.5) * 10;
            
            heroImage.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        hero.addEventListener('mouseleave', () => {
            heroImage.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    }
});

// Add parallax effect to hero image
document.addEventListener('DOMContentLoaded', function() {
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            heroImage.style.transform = `translateY(${scrolled * 0.1}px)`;
        });
    }
});

// Add sparkle effect to rule icons
document.addEventListener('DOMContentLoaded', function() {
    const ruleIcons = document.querySelectorAll('.rule-icon');
    ruleIcons.forEach(icon => {
        icon.addEventListener('mouseover', () => {
            icon.style.transform = 'scale(1.2) rotate(360deg)';
            icon.style.transition = 'transform 0.5s ease';
        });
        
        icon.addEventListener('mouseout', () => {
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });
}); 