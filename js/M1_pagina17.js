const rules = [
    {
        title: "Importancia de la seguridad en el entorno",
        icon: "../assets/images/Factores/trabajos_altura.png",
    },
    {
        title: "Dispositivos de seguridad relacionados (neumáticos, etc.)",
        icon: "../assets/images/Factores/equipos_moviles.png",
    },
    {
        title: "Consideraciones en el área de trabajo",
        icon: "../assets/images/Factores/espacios_confinados.png",
    },
    {
        title: "Precaución en caso de tormenta eléctrica",
        icon: "../assets/images/Factores/operacion_minas.png",
    },
    {
        title: "Restricciones y medidas preventivas",
        icon: "../assets/images/Factores/aspectos_basicos.png",
    }
];

function createRuleCards() {
    const grid = document.getElementById('rulesGrid');

    rules.forEach((rule, index) => {
        const card = document.createElement('div');
        card.className = 'rule-card';
        card.tabIndex = 0;
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', `Ver detalles de ${rule.title}`);

        // Detecta si rule.icon es una ruta de imagen
        const isImage = typeof rule.icon === 'string' && rule.icon.match(/\.(png|jpe?g|gif|svg)$/i);
        const iconHTML = isImage
            ? `<img src="${rule.icon}" alt="${rule.title}" class="rule-image-icon" />`
            : `<span class="rule-emoji-icon">${rule.icon}</span>`;

        card.innerHTML = `
                    <div class="rule-number">${String(index + 1).padStart(2, '0')}</div>
                    <div class="rule-icon">${iconHTML}</div>
                    <div class="rule-title">${rule.title}</div>
                `;

        grid.appendChild(card);
    });
}

function animateWords(container) {
    const words = container.querySelectorAll('.word');
    words.forEach((word, index) => {
        setTimeout(() => {
            word.classList.add('fade-in');
        }, index * 50); // 150ms delay between each word
    });
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    createRuleCards();
    setupContinueSection();
});


// Prevenir zoom en dispositivos móviles al hacer doble tap
let lastTouchEnd = 0;
document.addEventListener('touchend', function (event) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);


// Continue section functionality
function setupContinueSection() {
    const continueSection = document.getElementById('continueSection');
    const footer = document.querySelector('.footer');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                continueSection.classList.add('visible');
            } else {
                continueSection.classList.remove('visible');
            }
        });
    }, {
        threshold: 0.5 // Aparece cuando el 50% del footer es visible
    });

    observer.observe(footer);
}