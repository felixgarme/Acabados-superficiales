// JavaScript con prefijos únicos para evitar conflictos
class DidacticImageInteractive {
    constructor() {
        this.descriptions = {
            '1': {
                title: 'Diámetro nominal',
                text: ''
            },
            '2': {
                title: 'Posición de la tolerancia',
                text: ''
            },
            '3': {
                title: 'Calidad o magnitud de la tolerancia',
                text: ''
            },
            '4': {
                title: 'Diámetro nominal',
                text: ''
            },
            '5': {
                title: 'Posición de la tolerancia',
                text: ''
            },
            '6': {
                title: 'Calidad o magnitud de la tolerancia',
                text: ''
            }
        };


        this.currentActiveMarker = null;
        this.descriptionPanel = document.getElementById('didacticDescriptionPanel');
        this.descriptionContent = document.getElementById('didacticDescriptionContent');
        
        this.initializeEventListeners();
        this.addPulseEffect();
    }

    initializeEventListeners() {
        const markers = document.querySelectorAll('.didactic-marker');
        
        markers.forEach(marker => {
            marker.addEventListener('mouseenter', (e) => this.handleMarkerHover(e));
            marker.addEventListener('mouseleave', (e) => this.handleMarkerLeave(e));
            marker.addEventListener('click', (e) => this.handleMarkerClick(e));
        });
    }

    handleMarkerHover(event) {
        const markerId = event.target.dataset.info;
        const description = this.descriptions[markerId];
        
        if (description) {
            this.showDescription(description);
            this.setActiveMarker(event.target);
            event.target.classList.remove('pulse');
        }
    }

    handleMarkerLeave(event) {
        if (this.currentActiveMarker === event.target) {
            this.showDefaultMessage();
            this.clearActiveMarker();
            event.target.classList.add('pulse');
        }
    }

    handleMarkerClick(event) {
        const markerId = event.target.dataset.info;
        const description = this.descriptions[markerId];
        
        if (description) {
            this.showDescription(description);
            this.setActiveMarker(event.target);
            
            // Efecto visual de clic sin mover el elemento
            event.target.style.filter = 'brightness(1.2)';
            setTimeout(() => {
                event.target.style.filter = '';
            }, 150);
        }
    }

    showDescription(description) {
        this.descriptionPanel.classList.add('updated');

        setTimeout(() => {
            const isCompact = ['10', '11'].includes(this.currentActiveMarker?.dataset.info);
            this.descriptionContent.innerHTML = `
                <div class="didactic-description-title ${isCompact ? 'compact-title' : ''}">${description.title}</div>
                <div class="didactic-description-text ${isCompact ? 'compact-text' : ''}">${description.text}</div>
            `;
            this.descriptionPanel.classList.remove('updated');
        }, 100);
    }


    showDefaultMessage() {
        this.descriptionContent.innerHTML = `
            <div class="didactic-default-message">Pasa el cursor sobre los números para ver la información</div>
        `;
    }

    setActiveMarker(marker) {
        this.clearActiveMarker();
        this.currentActiveMarker = marker;
        marker.classList.add('active');
    }

    clearActiveMarker() {
        if (this.currentActiveMarker) {
            this.currentActiveMarker.classList.remove('active');
            this.currentActiveMarker = null;
        }
    }

    addPulseEffect() {
        const markers = document.querySelectorAll('.didactic-marker');
        markers.forEach(marker => {
            marker.classList.add('pulse');
        });
    }

    // Método público para actualizar descripciones
    updateDescriptions(newDescriptions) {
        this.descriptions = { ...this.descriptions, ...newDescriptions };
    }

    // Método público para añadir nuevos marcadores
    addMarker(id, position, number, description) {
        const container = document.getElementById('didacticImageContainer');
        const marker = document.createElement('div');
        
        marker.className = 'didactic-marker pulse';
        marker.id = `didacticMarker${id}`;
        marker.dataset.info = id;
        marker.style.top = position.top;
        marker.style.left = position.left;
        marker.textContent = number;
        
        container.appendChild(marker);
        
        this.descriptions[id] = description;
        
        // Añadir event listeners al nuevo marcador
        marker.addEventListener('mouseenter', (e) => this.handleMarkerHover(e));
        marker.addEventListener('mouseleave', (e) => this.handleMarkerLeave(e));
        marker.addEventListener('click', (e) => this.handleMarkerClick(e));
    }
}

// Inicializar el componente cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    window.didacticImageInteractive = new DidacticImageInteractive();
});

// Ejemplo de uso de la API pública:
// window.didacticImageInteractive.updateDescriptions({
//     '1': { title: 'Nuevo Título', text: 'Nueva descripción' }
// });

// window.didacticImageInteractive.addMarker('6', 
//     { top: '50%', left: '50%' }, 
//     '6', 
//     { title: 'Nuevo Punto', text: 'Nueva descripción del punto 6' }
// );