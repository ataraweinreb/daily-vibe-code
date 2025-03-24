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
    // Initialize MailerLite script
    (function(w,d,e,u,f,l,n){w[f]=w[f]||function(){(w[f].q=w[f].q||[]).push(arguments);};l=d.createElement(e);l.async=1;l.src=u;n=d.getElementsByTagName(e)[0];n.parentNode.insertBefore(l,n);})(window,document,'script','https://assets.mailerlite.com/js/universal.js','ml');
    ml('account', '123456789');

    // Handle MailerLite form submission
    const form = document.querySelector('.ml-form-embedContainer form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = form.querySelector('input[type="email"]');
            const submitButton = form.querySelector('.ml-form-embedSubmit button');
            const originalButtonText = submitButton.innerHTML;
            
            if (!emailInput.value) {
                return;
            }

            // Show loading state
            submitButton.innerHTML = '<div class="ml-form-embedSubmitLoad"></div>';
            submitButton.classList.add('loading');

            // Submit to MailerLite
            ml('subscribe', {
                email: emailInput.value,
                success: function() {
                    // Show success message
                    const successMessage = document.createElement('div');
                    successMessage.className = 'ml-form-successBody';
                    successMessage.innerHTML = `
                        <div class="ml-form-successContent">
                            <h4>Thank you!</h4>
                            <p>You've been successfully subscribed.</p>
                        </div>
                    `;
                    form.appendChild(successMessage);
                    
                    // Reset form
                    emailInput.value = '';
                    submitButton.innerHTML = originalButtonText;
                    submitButton.classList.remove('loading');
                },
                error: function() {
                    // Show error message
                    const errorMessage = document.createElement('div');
                    errorMessage.className = 'ml-form-errorBody';
                    errorMessage.innerHTML = `
                        <div class="ml-form-errorContent">
                            <h4>Oops!</h4>
                            <p>Something went wrong. Please try again.</p>
                        </div>
                    `;
                    form.appendChild(errorMessage);
                    
                    // Reset button
                    submitButton.innerHTML = originalButtonText;
                    submitButton.classList.remove('loading');
                }
            });
        });
    }

    // Clap button functionality
    const clapButton = document.querySelector('.clap-button');
    if (clapButton) {
        clapButton.addEventListener('click', function() {
            // Play clap sound
            const clapSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2017/2017-preview.mp3');
            clapSound.play();

            // Add clap animation
            this.classList.add('clap-active');
            setTimeout(() => this.classList.remove('clap-active'), 500);

            // Trigger confetti
            triggerConfetti();
        });
    }

    // Trigger confetti on page load
    triggerConfetti();
});

// Confetti effect function
function triggerConfetti() {
    const duration = 3000;
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

        const particleCount = 50 * (timeLeft / duration);

        confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
        });
        confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
        });
    }, 250);
}

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

// Handle hero image loading
document.addEventListener('DOMContentLoaded', function() {
    const heroImg = document.querySelector('.hero-img');
    if (heroImg) {
        heroImg.addEventListener('load', function() {
            this.classList.add('loaded');
        });
    }
}); 