// 🚀 PREMIUM INTERACTIONS - Professional Grade Features

/* ================================
   🎯 SMOOTH SCROLL & NAVIGATION
================================ */
class PremiumNavigation {
    constructor() {
        this.init();
    }

    init() {
        this.setupSmoothScroll();
        this.setupActiveLinks();
        this.setupScrollEffects();
    }

    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    setupActiveLinks() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.pageYOffset >= sectionTop - 100) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }

    setupScrollEffects() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.scroll-reveal').forEach(el => {
            observer.observe(el);
        });
    }
}

/* ================================
   ✨ PREMIUM PARTICLE BACKGROUND
================================ */
class PremiumParticles {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 100;
        this.connectionDistance = 150;
        this.init();
    }

    init() {
        this.resize();
        this.createParticles();
        this.animate();
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        this.particles = [];
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update and draw particles
        this.particles.forEach((particle, index) => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Bounce off edges
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;

            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = 'rgba(99, 102, 241, 0.5)';
            this.ctx.fill();

            // Draw connections
            for (let j = index + 1; j < this.particles.length; j++) {
                const dx = this.particles[j].x - particle.x;
                const dy = this.particles[j].y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.connectionDistance) {
                    const opacity = (1 - distance / this.connectionDistance) * 0.3;
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        });

        requestAnimationFrame(() => this.animate());
    }
}

/* ================================
   🎨 PREMIUM CARD INTERACTIONS
================================ */
class PremiumCards {
    constructor() {
        this.init();
    }

    init() {
        this.setupFeatureCards();
        this.setupProjectCards();
        this.setup3DTilt();
    }

    setupFeatureCards() {
        const cards = document.querySelectorAll('.feature-card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.animateCardHover(card);
            });
        });
    }

    setupProjectCards() {
        const cards = document.querySelectorAll('.project-card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.animateCardHover(card);
            });
        });
    }

    animateCardHover(card) {
        // Add ripple effect
        const ripple = document.createElement('div');
        ripple.className = 'card-ripple';
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(99, 102, 241, 0.3);
            width: 20px;
            height: 20px;
            animation: ripple-animation 0.6s ease-out;
            pointer-events: none;
        `;
        
        card.style.position = 'relative';
        card.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    }

    setup3DTilt() {
        const cards = document.querySelectorAll('.feature-card, .project-card, .stat-card');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                card.style.transform = `
                    perspective(1000px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    scale3d(1.02, 1.02, 1.02)
                `;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            });
        });
    }
}

/* ================================
   💫 PREMIUM BUTTON EFFECTS
================================ */
class PremiumButtons {
    constructor() {
        this.init();
    }

    init() {
        this.setupRippleEffect();
        this.setupMagneticEffect();
    }

    setupRippleEffect() {
        const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
        
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                const ripple = document.createElement('span');
                const rect = button.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.5);
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    animation: ripple 0.6s ease-out;
                    pointer-events: none;
                `;
                
                button.style.position = 'relative';
                button.style.overflow = 'hidden';
                button.appendChild(ripple);
                
                setTimeout(() => ripple.remove(), 600);
            });
        });

        // Add ripple animation
        if (!document.getElementById('ripple-styles')) {
            const style = document.createElement('style');
            style.id = 'ripple-styles';
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(2);
                        opacity: 0;
                    }
                }
                @keyframes ripple-animation {
                    to {
                        transform: scale(10);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    setupMagneticEffect() {
        const buttons = document.querySelectorAll('.btn-primary');
        
        buttons.forEach(button => {
            button.addEventListener('mousemove', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) scale(1.02)`;
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translate(0, 0) scale(1)';
            });
        });
    }
}

/* ================================
   📊 PREMIUM STATS COUNTER
================================ */
class PremiumStatsCounter {
    constructor() {
        this.counters = document.querySelectorAll('.stat-number');
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        this.counters.forEach(counter => observer.observe(counter));
    }

    animateCounter(element) {
        const target = element.textContent;
        const isPlus = target.includes('+');
        const number = parseInt(target.replace(/[^0-9]/g, ''));
        const duration = 2000;
        const steps = 60;
        const increment = number / steps;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= number) {
                element.textContent = isPlus ? `${number.toLocaleString()}+` : number.toLocaleString();
                clearInterval(timer);
            } else {
                element.textContent = isPlus ? `${Math.floor(current).toLocaleString()}+` : Math.floor(current).toLocaleString();
            }
        }, duration / steps);
    }
}

/* ================================
   🎭 PREMIUM CURSOR EFFECTS
================================ */
class PremiumCursor {
    constructor() {
        this.cursor = document.createElement('div');
        this.cursorFollower = document.createElement('div');
        this.init();
    }

    init() {
        this.cursor.className = 'premium-cursor';
        this.cursorFollower.className = 'premium-cursor-follower';
        
        this.cursor.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            border-radius: 50%;
            pointer-events: none;
            z-index: 10000;
            transition: transform 0.2s ease;
        `;
        
        this.cursorFollower.style.cssText = `
            position: fixed;
            width: 40px;
            height: 40px;
            border: 2px solid rgba(99, 102, 241, 0.5);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: all 0.3s ease;
        `;
        
        document.body.appendChild(this.cursor);
        document.body.appendChild(this.cursorFollower);
        
        let mouseX = 0, mouseY = 0;
        let followerX = 0, followerY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            this.cursor.style.left = mouseX - 5 + 'px';
            this.cursor.style.top = mouseY - 5 + 'px';
        });
        
        const followCursor = () => {
            followerX += (mouseX - followerX) * 0.1;
            followerY += (mouseY - followerY) * 0.1;
            
            this.cursorFollower.style.left = followerX - 20 + 'px';
            this.cursorFollower.style.top = followerY - 20 + 'px';
            
            requestAnimationFrame(followCursor);
        };
        followCursor();
        
        // Hover effects
        const hoverElements = document.querySelectorAll('a, button, .feature-card, .project-card');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.cursor.style.transform = 'scale(1.5)';
                this.cursorFollower.style.transform = 'scale(1.5)';
            });
            el.addEventListener('mouseleave', () => {
                this.cursor.style.transform = 'scale(1)';
                this.cursorFollower.style.transform = 'scale(1)';
            });
        });
    }
}

/* ================================
   🌟 PREMIUM LOADING SCREEN
================================ */
class PremiumLoader {
    constructor() {
        this.createLoader();
    }

    createLoader() {
        const loader = document.createElement('div');
        loader.id = 'premium-loader';
        loader.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            z-index: 10001;
            transition: opacity 0.5s ease;
        `;
        
        loader.innerHTML = `
            <div class="premium-loader"></div>
            <h2 style="color: white; margin-top: 2rem; font-size: 1.5rem; font-weight: 700;">
                Loading Premium Experience...
            </h2>
            <div style="width: 300px; height: 4px; background: rgba(99, 102, 241, 0.2); border-radius: 10px; margin-top: 1rem; overflow: hidden;">
                <div id="loader-progress" style="height: 100%; background: linear-gradient(90deg, #667eea, #764ba2); width: 0%; transition: width 0.3s ease;"></div>
            </div>
        `;
        
        document.body.appendChild(loader);
        
        // Simulate loading
        let progress = 0;
        const progressBar = document.getElementById('loader-progress');
        const interval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                setTimeout(() => {
                    loader.style.opacity = '0';
                    setTimeout(() => loader.remove(), 500);
                }, 300);
            }
            progressBar.style.width = progress + '%';
        }, 200);
    }
}

/* ================================
   🎯 PREMIUM NOTIFICATIONS
================================ */
class PremiumNotifications {
    constructor() {
        this.container = this.createContainer();
    }

    createContainer() {
        const container = document.createElement('div');
        container.id = 'notification-container';
        container.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            z-index: 10000;
            display: flex;
            flex-direction: column;
            gap: 1rem;
        `;
        document.body.appendChild(container);
        return container;
    }

    show(message, type = 'success') {
        const notification = document.createElement('div');
        const colors = {
            success: 'linear-gradient(135deg, #43e97b, #38f9d7)',
            error: 'linear-gradient(135deg, #fa709a, #fee140)',
            info: 'linear-gradient(135deg, #667eea, #764ba2)',
            warning: 'linear-gradient(135deg, #f093fb, #f5576c)'
        };
        
        notification.style.cssText = `
            background: ${colors[type]};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            font-weight: 600;
            animation: slideInRight 0.3s ease;
            cursor: pointer;
        `;
        
        notification.textContent = message;
        this.container.appendChild(notification);
        
        notification.addEventListener('click', () => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        });
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
        
        // Add animations
        if (!document.getElementById('notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                @keyframes slideInRight {
                    from { transform: translateX(400px); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOutRight {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(400px); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    }
}

/* ================================
   🚀 INITIALIZE PREMIUM FEATURES
================================ */
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all premium features
    new PremiumLoader();
    new PremiumNavigation();
    new PremiumParticles('particleCanvas');
    new PremiumCards();
    new PremiumButtons();
    new PremiumStatsCounter();
    
    // Initialize cursor on desktop only
    if (window.innerWidth > 1024) {
        new PremiumCursor();
    }
    
    // Initialize notifications
    window.premiumNotify = new PremiumNotifications();
    
    // Welcome notification
    setTimeout(() => {
        window.premiumNotify.show('🎉 Welcome to Premium ECE Universe!', 'success');
    }, 2000);
    
    // Add scroll reveal class to sections
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('scroll-reveal');
    });
    
    console.log('🚀 Premium features initialized!');
});

// Export for external use
window.PremiumFeatures = {
    notify: (message, type) => window.premiumNotify?.show(message, type),
    Navigation: PremiumNavigation,
    Particles: PremiumParticles,
    Cards: PremiumCards,
    Buttons: PremiumButtons,
    StatsCounter: PremiumStatsCounter,
    Cursor: PremiumCursor,
    Notifications: PremiumNotifications
};
