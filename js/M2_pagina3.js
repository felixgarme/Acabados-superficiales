// Theory card interaction
function toggleTheoryDetails(type) {
    // Hide all details first
    const allDetails = document.querySelectorAll('.theory-details');
    const allCards = document.querySelectorAll('.theory-card');

    allDetails.forEach(detail => {
        detail.classList.remove('active');
    });

    allCards.forEach(card => {
        card.classList.remove('active');
    });

    // Show selected detail
    const targetDetail = document.getElementById(type + 'Details');
    const targetCard = event.currentTarget;

    if (targetDetail) {
        targetDetail.classList.add('active');
        targetCard.classList.add('active');

        // Smooth scroll to details
        setTimeout(() => {
            targetDetail.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest'
            });
        }, 100);
    }
}

// Demo content toggle
function toggleDemo(demoType) {
    const demo = document.getElementById(demoType + 'Demo');
    const allDemos = document.querySelectorAll('.demo-content');

    // Hide all other demos
    allDemos.forEach(d => {
        if (d !== demo) {
            d.classList.remove('active');
        }
    });

    // Toggle current demo
    demo.classList.toggle('active');
}

// Enhanced animations and interactions
document.addEventListener('DOMContentLoaded', function () {
    // Add hover effects to process steps
    const processSteps = document.querySelectorAll('.process-step');
    processSteps.forEach((step, index) => {
        step.addEventListener('mouseenter', () => {
            step.style.transform = 'translateY(-5px) scale(1.02)';
            step.style.boxShadow = '0 15px 30px rgba(0, 87, 184, 0.3)';
        });

        step.addEventListener('mouseleave', () => {
            step.style.transform = 'translateY(0) scale(1)';
            step.style.boxShadow = 'none';
        });
    });

    // Add progressive reveal animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all animated sections
    document.querySelectorAll('.theory-section, .dimensional-section, .tolerance-concepts, .clearance-theory, .process-steps').forEach(el => {
        observer.observe(el);
    });

    // Add interactive tooltips
    addInteractiveTooltips();
});

function addInteractiveTooltips() {
    const tooltipTriggers = [
        { selector: '.micrometer-concept', text: 'Un micrómetro diezmilésimal puede detectar diferencias menores al grosor de un cabello humano' },
        { selector: '.bearing-cross-section', text: 'El juego radial se mide en la posición superior del rodamiento' },
        { selector: '.tolerance-visual', text: 'La posición del indicador representa el tipo de ajuste requerido' }
    ];

    tooltipTriggers.forEach(trigger => {
        const elements = document.querySelectorAll(trigger.selector);
        elements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                showTooltip(element, trigger.text);
            });

            element.addEventListener('mouseleave', () => {
                hideTooltip();
            });
        });
    });
}

function showTooltip(element, text) {
    const tooltip = document.createElement('div');
    tooltip.className = 'custom-tooltip';
    tooltip.textContent = text;
    tooltip.style.cssText = `
                position: absolute;
                background: rgba(0,0,0,0.9);
                color: white;
                padding: 10px 15px;
                border-radius: 8px;
                font-size: 0.9rem;
                max-width: 250px;
                z-index: 1000;
                opacity: 0;
                transition: opacity 0.3s ease;
                pointer-events: none;
                line-height: 1.4;
            `;

    document.body.appendChild(tooltip);

    const rect = element.getBoundingClientRect();
    tooltip.style.top = (rect.bottom + 10) + 'px';
    tooltip.style.left = (rect.left + rect.width / 2 - tooltip.offsetWidth / 2) + 'px';

    setTimeout(() => {
        tooltip.style.opacity = '1';
    }, 100);

    // Store reference for cleanup
    element._tooltip = tooltip;
}

function hideTooltip() {
    const tooltips = document.querySelectorAll('.custom-tooltip');
    tooltips.forEach(tooltip => {
        tooltip.style.opacity = '0';
        setTimeout(() => {
            if (tooltip.parentNode) {
                tooltip.parentNode.removeChild(tooltip);
            }
        }, 300);
    });
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close all open demos and details
        document.querySelectorAll('.demo-content.active, .theory-details.active').forEach(el => {
            el.classList.remove('active');
        });

        document.querySelectorAll('.theory-card.active').forEach(el => {
            el.classList.remove('active');
        });
    }

    if (e.key === 'Tab') {
        // Enhance tab navigation by highlighting focused elements
        setTimeout(() => {
            const focused = document.activeElement;
            if (focused.classList.contains('theory-card') || focused.classList.contains('demo-button')) {
                focused.style.outline = '3px solid var(--color-azul-principal, #0057b8)';
                focused.style.outlineOffset = '2px';
            }
        }, 10);
    }
});

// Add focus management
document.addEventListener('blur', (e) => {
    if (e.target.style.outline) {
        e.target.style.outline = '';
        e.target.style.outlineOffset = '';
    }
}, true);

// Enhanced mobile interactions
let touchStartY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
});

document.addEventListener('touchmove', (e) => {
    // Add custom scroll behavior for mobile
    const touchY = e.touches[0].clientY;
    const deltaY = touchStartY - touchY;

    // Add momentum to card interactions
    if (e.target.closest('.theory-card') && Math.abs(deltaY) > 10) {
        e.target.closest('.theory-card').style.transform = `translateY(${-deltaY * 0.1}px)`;
    }
});

document.addEventListener('touchend', (e) => {
    // Reset any transforms
    if (e.target.closest('.theory-card')) {
        e.target.closest('.theory-card').style.transform = '';
    }
});