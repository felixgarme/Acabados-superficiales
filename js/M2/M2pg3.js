// surface-finishes.js

let currentActiveWindow = null;

function showSection(section) {
  const contentArea = document.getElementById('content-area');
  const infoPanel = document.getElementById('info-panel');

  if (!contentArea || !infoPanel) {
    console.warn('Elementos necesarios (content-area o info-panel) no encontrados en el DOM.');
    return;
  }

  // Quitar la clase active de todas las ventanas
  document.querySelectorAll('.sfc-window').forEach(win => {
    win.classList.remove('active');
  });

  // Añadir la clase active a la ventana seleccionada (si existe)
  const activeWindow = document.getElementById(`window-${section}`);
  if (activeWindow) {
    activeWindow.classList.add('active');
    currentActiveWindow = section;
  } else {
    currentActiveWindow = null;
  }

  // Actualizar contenido según la sección
  switch (section) {
    case 'n1-n4':
    contentArea.innerHTML = `
        <h3 class="sfc-content-title">Rugosidades N1-N4 (Alta Precisión)</h3>
        <img src="../assets/images/M2pg3A.png" alt="Muestras de rugosidad N1-N4" class="sfc-sample-image">
        <div class="sfc-image-description">
        En esta imagen se aprecian rugosidades desde 0.012 μm hasta 0.1 μm, obtenidas por procesos de rectificado y planeado. Estos acabados representan los niveles más finos de rugosidad superficial, utilizados en aplicaciones de alta precisión.
        </div>
    `;
    break;

    case 'n5-n8':
    contentArea.innerHTML = `
        <h3 class="sfc-content-title">Rugosidades N5-N8 (Precisión Estándar)</h3>
        <img src="../assets/images/M2pg3B.png" alt="Muestras de rugosidad N5-N8" class="sfc-sample-image">
        <div class="sfc-image-description">
        En esta imagen se puede apreciar el aspecto visual de las rugosidades (Ra) desde 0.1 μm a 3.2 μm, conseguidas por operaciones de mandrinado y rectificado. Estos niveles son comunes en aplicaciones industriales estándar.
        </div>
    `;
    break;


    case 'info':
      contentArea.innerHTML = `
        <h3 class="sfc-content-title">Información Técnica Detallada</h3>
        <div style="text-align: left; max-width: 600px; line-height: 1.6; color: #444;">
          <h4 style="color: #031795; margin-top: 30px;">Métodos de Medición</h4>
          <p>La rugosidad superficial se mide utilizando perfilómetros de contacto o sistemas ópticos sin contacto. El parámetro Ra representa la media aritmética de las desviaciones del perfil.</p>
          
          <h4 style="color: #031795; margin-top: 30px;">Procesos de Manufactura</h4>
          <p><strong>Superacabado (N1):</strong> Proceso de abrasión controlada con piedras finas</p>
          <p><strong>Lapeado (N2):</strong> Proceso abrasivo con compuesto abrasivo líquido</p>
          <p><strong>Rectificado (N3-N4):</strong> Maquinado con rueda abrasiva</p>
          <p><strong>Torneado fino (N6):</strong> Mecanizado con herramientas de corte precisas</p>
          
          <h4 style="color: #031795; margin-top: 30px;">Consideraciones de Diseño</h4>
          <p>La selección del acabado superficial debe considerar la función de la pieza, el costo de manufactura y los requisitos de rendimiento. Acabados más finos requieren más tiempo y recursos.</p>
        </div>
      `;
      break;

    default:
      contentArea.innerHTML = `<p>Sección no encontrada.</p>`;
  }

  // Asegurar que el panel de info aparezca (reiniciar / aplicar clase)
  infoPanel.classList.remove('active');
  setTimeout(() => {
    infoPanel.classList.add('active');
  }, 300);

  // Añadir listeners a los ítems de rugosidad recién creados
  addRoughnessItemListeners();
}

function addRoughnessItemListeners() {
  const roughnessItems = document.querySelectorAll('.sfc-roughness-item');

  if (!roughnessItems || roughnessItems.length === 0) {
    return;
  }

  roughnessItems.forEach(item => {
    // Evitar añadir el mismo listener múltiples veces (comprobación simple)
    if (item.__sfcListenerAttached) return;
    item.__sfcListenerAttached = true;

    item.addEventListener('click', function (e) {
      e.stopPropagation(); // Evitar que el click burbujee a la ventana

      // Quitar la clase selected de todos los ítems de la misma sección
      const section = this.closest('.sfc-window-body') || document;
      section.querySelectorAll('.sfc-roughness-item').forEach(i => i.classList.remove('selected'));

      // Añadir selected al ítem clickeado
      this.classList.add('selected');

      // Extraer datos del ítem y actualizar detalles
      const level = this.dataset.level || '';
      const codeEl = this.querySelector('.sfc-roughness-code');
      const valueEl = this.querySelector('.sfc-roughness-value');
      const processEl = this.querySelector('.sfc-roughness-process');

      const code = codeEl ? codeEl.textContent.trim() : '';
      const value = valueEl ? valueEl.textContent.trim() : '';
      const process = processEl ? processEl.textContent.trim() : '';

      updateRoughnessDetails(level, code, value, process);
    });
  });
}

function updateRoughnessDetails(level, code, value, process) {
  const contentArea = document.getElementById('content-area');

  if (!contentArea) return;

  const applications = {
    'N1': 'Superficies ópticas de alta precisión, lentes, espejos',
    'N2': 'Instrumentos de medición, superficies de referencia',
    'N3': 'Cojinetes de precisión, válvulas hidráulicas',
    'N4': 'Componentes de motor, superficies de sellado',
    'N5': 'Ejes de transmisión, componentes mecánicos',
    'N6': 'Superficies de contacto general, bases de máquinas',
    'N7': 'Componentes estructurales, superficies no críticas',
    'N8': 'Aplicaciones generales, superficies rugosas'
  };

  const cleanProcess = process ? process.replace(/[()]/g, '') : '';

  const suitabilityText = (lvl => {
    if (!lvl) return 'Aplicaciones industriales diversas';
    if (lvl.includes('1') || lvl.includes('2')) return 'máxima precisión y acabado óptico';
    if (lvl.includes('3') || lvl.includes('4')) return 'alta precisión y buen sellado';
    if (lvl.includes('5') || lvl.includes('6')) return 'precisión estándar y buen funcionamiento';
    return 'tolerancias generales y funcionalidad básica';
  })(level);

  contentArea.innerHTML = `
    <div style="text-align: center;">
      <h3 class="sfc-content-title">Rugosidad ${code} Seleccionada</h3>
      <div style="background: linear-gradient(135deg, #031795, #0066cc); color: white; border-radius: 15px; padding: 30px; margin: 20px 0; box-shadow: 0 10px 30px rgba(3,23,149,0.3);">
        <div style="font-size: 3rem; font-weight: bold; margin-bottom: 10px;">${code}</div>
        <div style="font-size: 1.5rem; margin-bottom: 10px;">${value}</div>
        <div style="font-size: 1.1rem; opacity: 0.9;">${cleanProcess}</div>
      </div>
      
      <div style="background: white; border-radius: 12px; padding: 25px; margin: 20px 0; box-shadow: 0 5px 15px rgba(0,0,0,0.1); text-align: left;">
        <h4 style="color: #031795; margin-bottom: 15px; font-size: 1.3rem;">Aplicaciones Típicas</h4>
        <p style="font-size: 1rem; line-height: 1.6; color: #444; margin: 0;">${applications[level] || 'Aplicaciones industriales diversas'}</p>
      </div>
      
      <div style="background: #f8f9ff; border-radius: 12px; padding: 20px; margin: 20px 0; border-left: 5px solid #031795;">
        <h4 style="color: #031795; margin-bottom: 10px;">Información Técnica</h4>
        <p style="font-size: 0.95rem; line-height: 1.5; color: #666; margin: 0;">
          Este nivel de rugosidad se consigue mediante ${cleanProcess} y es adecuado para aplicaciones que requieren ${suitabilityText}.
        </p>
      </div>
    </div>
  `;
}

// Inicializar listeners al cargarse la página
document.addEventListener('DOMContentLoaded', function () {
  // Añadir listeners a los items ya presentes
  addRoughnessItemListeners();

  // Efectos hover en las ventanas
  const windows = document.querySelectorAll('.sfc-window');
  windows.forEach(el => {
    el.addEventListener('mouseenter', function () {
      if (!this.classList.contains('active')) {
        this.style.transform = 'translateY(-3px) scale(1.02)';
      }
    });

    el.addEventListener('mouseleave', function () {
      if (!this.classList.contains('active')) {
        this.style.transform = '';
      }
    });
  });

  // Comportamiento responsive: cambiar dirección flex según ancho
  const handleResize = function () {
    const course = document.querySelector('.surface-finishes-course');
    if (!course) return;
    if (window.innerWidth <= 1024) {
      course.style.flexDirection = 'column';
    } else {
      course.style.flexDirection = 'row';
    }
  };

  // Ejecutar una vez para ajustar el layout inicial
  handleResize();

  window.addEventListener('resize', handleResize);
});
