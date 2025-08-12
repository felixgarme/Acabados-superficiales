const sfModule = (function() {
  let currentView = 'general';
  
  const detailsContent = {
    iso: {
      title: 'Normas ISO para Acabados Superficiales',
      content: `
        <p><strong>ISO 1302:</strong> Especifica las reglas para la indicación de los estados superficiales en los dibujos técnicos utilizando símbolos gráficos.</p>
        <p><strong>ISO 21920:</strong> Define los términos, definiciones y parámetros de superficie para la especificación de texturas superficiales.</p>
        <ul style="margin: 8px 0; padding-left: 20px;">
          <li>Establece métodos de medición estandarizados</li>
          <li>Define parámetros de rugosidad (Ra, Rz, Rq)</li>
          <li>Especifica longitudes de muestreo</li>
          <li>Proporciona clasificación por números de clase N1-N12</li>
        </ul>
      `
    },
    symbol: {
      title: 'Análisis del Símbolo de Rugosidad',
      content: `
        <p>El símbolo básico consiste en dos líneas inclinadas que forman un ángulo de 60°, similares a una marca de verificación.</p>
        <p><strong>Componentes del símbolo:</strong></p>
        <ul style="margin: 8px 0; padding-left: 20px;">
          <li><strong>Línea horizontal superior:</strong> Contiene el valor de rugosidad Ra</li>
          <li><strong>Posiciones específicas:</strong> Cada letra tiene una ubicación definida</li>
          <li><strong>Información técnica:</strong> Incluye proceso, dirección y tolerancias</li>
          <li><strong>Flexibilidad:</strong> Permite omitir información no requerida</li>
        </ul>
        <p>La correcta interpretación garantiza la calidad del producto final.</p>
      `
    }
  };

  function showDetails(type) {
    const panel = document.getElementById('detailsPanel');
    const title = document.getElementById('detailsTitle');
    const content = document.getElementById('detailsContent');
    
    if (detailsContent[type]) {
      // Preparar animación
      panel.classList.remove('fade-out');
      panel.classList.add('active', 'fade-in');
      
      // Añadir contenido con un pequeño delay para sincronizar con la animación
      setTimeout(() => {
        title.textContent = detailsContent[type].title;
        content.innerHTML = detailsContent[type].content;
      }, 150);

      currentView = type;
    }
  }

  function resetView() {
    const panel = document.getElementById('detailsPanel');
    
    // Animación de salida
    panel.classList.remove('fade-in');
    panel.classList.add('fade-out');

    // Esperar a que termine la animación para ocultar
    setTimeout(() => {
      panel.classList.remove('active');
      panel.classList.remove('fade-out');
    }, 300);
    
    // Quitar selección
    document.querySelectorAll('.sf-legend-item').forEach(item => {
      item.classList.remove('active');
    });
    
    currentView = 'general';
  }

  function highlightParameter(param) {
    document.querySelectorAll('.sf-legend-item').forEach(item => {
      item.classList.remove('active');
    });
    const selectedItem = document.querySelector(`[data-param="${param}"]`);
    if (selectedItem) {
      selectedItem.classList.add('active');
    }
  }

  function init() {
    document.querySelectorAll('.sf-legend-item').forEach(item => {
      item.addEventListener('click', function() {
        const param = this.getAttribute('data-param');
        highlightParameter(param);
      });
    });

    document.querySelectorAll('.sf-label').forEach(label => {
      label.addEventListener('click', function() {
        const param = this.querySelector('text').textContent;
        highlightParameter(param);
      });
    });
  }

  return {
    init,
    showDetails,
    resetView
  };
})();

function showDetails(type) {
  sfModule.showDetails(type);
}

function resetView() {
  sfModule.resetView();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', sfModule.init);
} else {
  sfModule.init();
}
