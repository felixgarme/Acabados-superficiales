// Datos de especificaciones
const specifications = {
    'A': {
        title: 'Elevación',
        measurement: '3300 mm (130 in.)',
        description: 'Altura máxima a la que puede elevarse la carga. Esta medida es crucial para determinar si el montacargas puede trabajar en espacios con altura limitada o alcanzar estantes altos.',
        color: '#e74c3c'
    },
    'B': {
        title: 'Longitud de las Horquillas',
        measurement: '1220 mm (48 in.)',
        description: 'Longitud de las horquillas que soportan la carga. Determina el tamaño máximo de palet o carga que puede manejar el montacargas de manera segura.',
        color: '#2ecc71'
    },
    'C': {
        title: 'Ancho de las Horquillas',
        measurement: '180 mm (7.1 in.)',
        description: 'Ancho de cada horquilla individual. Debe ser compatible con las aberturas del palet o la base de la carga a transportar.',
        color: '#f39c12'
    },
    'D': {
        title: 'Espesor de las Horquillas',
        measurement: '88 mm (3.5 in.)',
        description: 'Grosor de las horquillas, que determina su resistencia y capacidad de carga. Un espesor adecuado es esencial para la seguridad operacional.',
        color: '#9b59b6'
    },
    'E': {
        title: 'Ángulo de Inclinación',
        measurement: '15° - 12°',
        description: 'Rango de inclinación hacia adelante y atrás del mástil. Permite ajustar la posición de la carga para mayor estabilidad y facilidad de manejo.',
        color: '#1abc9c'
    },
    'F': {
        title: 'Longitud Total',
        measurement: '4830 mm (190 in.)',
        description: 'Longitud total del montacargas desde la parte frontal hasta la trasera. Importante para calcular el espacio necesario para maniobras.',
        color: '#e67e22'
    },
    'G': {
        title: 'Ancho Total',
        measurement: '2600 mm (102 in.)',
        description: 'Ancho total del montacargas. Determina si puede pasar por pasillos, puertas y espacios de trabajo específicos.',
        color: '#34495e'
    },
    'H': {
        title: 'Altura Total',
        measurement: '3400 mm (137 in.)',
        description: 'Altura total del montacargas con el mástil bajado. Crucial para verificar que pueda operar bajo techos o estructuras con altura limitada.',
        color: '#c0392b'
    },
    'I': {
        title: 'Huella Delantera',
        measurement: '1905 mm (75 in.)',
        description: 'Distancia entre las ruedas delanteras. Afecta la estabilidad y capacidad de maniobra del montacargas.',
        color: '#27ae60'
    },
    'J': {
        title: 'Huella Trasera',
        measurement: '1925 mm (76 in.)',
        description: 'Distancia entre las ruedas traseras. Junto con la huella delantera, determina la estabilidad del vehículo.',
        color: '#8e44ad'
    },
    'K': {
        title: 'Distancia Entre Ejes',
        measurement: '3100 mm (122 in.)',
        description: 'Distancia entre el eje delantero y trasero. Afecta la capacidad de giro y la distribución del peso.',
        color: '#d35400'
    },
    'L': {
        title: 'Voladizo Delantero',
        measurement: '795 mm (31.3 in.)',
        description: 'Distancia desde el eje delantero hasta la parte frontal del montacargas. Importante para el cálculo del centro de gravedad.',
        color: '#16a085'
    },
    'M': {
        title: 'Distancia al Suelo',
        measurement: '320 mm (12.6 in.)',
        description: 'Altura libre desde el suelo hasta la parte más baja del chasis. Determina la capacidad para superar obstáculos.',
        color: '#2980b9'
    },
    'N': {
        title: 'Radio de Giro Mínimo',
        measurement: '4550 mm (179 in.)',
        description: 'Radio mínimo necesario para que el montacargas complete un giro de 360°. Crucial para determinar el espacio de maniobra requerido.',
        color: '#e91e63'
    }
};

// Elementos del DOM
const clickablePoints = document.querySelectorAll('.clickable-point');
const legendItems = document.querySelectorAll('.legend-item');
const infoDisplay = document.getElementById('info-display');
const defaultInfo = document.getElementById('default-info');

// Función para mostrar información
function showInfo(pointId) {
    const spec = specifications[pointId];
    if (!spec) return;

    // Ocultar info por defecto
    //defaultInfo.classList.remove('active');

    // Crear nueva tarjeta de información
    // infoDisplay.innerHTML = `
    //     <div class="info-card active">
    //         <h3>${spec.title}</h3>
    //         <div class="measurement" style="color: ${spec.color}">${spec.measurement}</div>
    //         <div class="description">${spec.description}</div>
    //     </div>
    // `;

    // Actualizar estados visuales
    updateActiveStates(pointId);
    // Expandir automáticamente la leyenda correspondiente
    const legendItem = document.querySelector(`.legend-item[data-point="${pointId}"]`);
    if (legendItem) {
        toggleExpand(legendItem);  // Activa el contenedor del item de leyenda
    }
}

// Función para actualizar estados activos
function updateActiveStates(pointId) {
    // Resetear todos los puntos
    clickablePoints.forEach(point => {
        point.classList.remove('active');
    });

    legendItems.forEach(item => {
        item.classList.remove('active');
    });

    // Activar todos los puntos con ese data-point
    const activePoints = document.querySelectorAll(`[data-point="${pointId}"]`);
    activePoints.forEach(point => {
        if (point.classList.contains('clickable-point')) {
            point.classList.add('active');
        }
    });

    // Activar todos los items de leyenda con ese data-point
    const legendItemsToActivate = document.querySelectorAll(`.legend-item[data-point="${pointId}"]`);
    legendItemsToActivate.forEach(item => {
        item.classList.add('active');
    });
    // Activar el punto seleccionado
    // const activePoint = document.querySelector(`[data-point="${pointId}"]`);
    // if (activePoint) {
    //     if (activePoint.classList.contains('clickable-point')) {
    //         activePoint.classList.add('active');
    //     }

    //     // Activar item de leyenda correspondiente
    //     const legendItem = document.querySelector(`.legend-item[data-point="${pointId}"]`);
    //     if (legendItem) {
    //         legendItem.classList.add('active');
    //     }
    // }
}

// Event listeners para puntos del diagrama
clickablePoints.forEach(point => {
    point.addEventListener('click', (e) => {
        const pointId = e.target.closest('.clickable-point').getAttribute('data-point');
        showInfo(pointId);
    });
});

// Event listeners para items de leyenda
legendItems.forEach(item => {
    item.addEventListener('click', (e) => {
        const pointId = e.currentTarget.getAttribute('data-point');
        showInfo(pointId);
    });
});

// Función para mostrar info por defecto
function showDefaultInfo() {
    defaultInfo.classList.add('active');
    infoDisplay.innerHTML = '';

    // Resetear estados activos
    clickablePoints.forEach(point => {
        point.classList.remove('active');
    });

    legendItems.forEach(item => {
        item.classList.remove('active');
    });
}

// Animación de entrada
window.addEventListener('load', () => {
    const cards = document.querySelectorAll('.info-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('active');
        }, index * 100);
    });
});
function toggleExpand(element) {
    const container = element.closest('.legend-container');
    if (!container) return;

    const allContainers = document.querySelectorAll('.legend-container');
    allContainers.forEach(cont => {
        if (cont !== container) {
            cont.classList.remove('expanded');
        }
    });

    // Solo expandir si no está ya expandido
    if (!container.classList.contains('expanded')) {
        container.classList.add('expanded');
    }
}