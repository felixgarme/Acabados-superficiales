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

    case 'n9-n12':
      contentArea.innerHTML = `
        <h3 class="sfc-content-title">Rugosidades N9-N12 (Desbaste y Rectificado Grueso)</h3>
        <img src="../assets/images/M2pg3C.png" alt="Valores de rugosidad N9-N12" style="width:100%; border:2px solid #a30085; border-radius:5px;">
        <div class="sfc-image-description">
          Valores de rugosidad según norma: <br>
          • <strong>N9:</strong> Ra 3,2–6,3 μm (refrentado, desbaste) <br>
          • <strong>N10:</strong> Ra 6,3–12,5 μm (rebarbado) <br>
          • <strong>N11:</strong> Ra 12,5–25 μm (rectificado grueso) <br>
          • <strong>N12:</strong> Ra 25–50 μm (desbaste manual) <br><br>
          Estos acabados son característicos de procesos de eliminación rápida de material y no requieren gran precisión superficial.
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

  // Asegurar que el panel de info aparezca
  infoPanel.classList.remove('active');
  setTimeout(() => {
    infoPanel.classList.add('active');
  }, 300);

  // Añadir listeners a los ítems de rugosidad recién creados
  addRoughnessItemListeners();
}

function addRoughnessItemListeners() {
  const roughnessItems = document.querySelectorAll('.sfc-roughness-item');
  if (!roughnessItems || roughnessItems.length === 0) return;

  roughnessItems.forEach(item => {
    if (item.__sfcListenerAttached) return;
    item.__sfcListenerAttached = true;

    item.addEventListener('click', function (e) {
      e.stopPropagation();

      const section = this.closest('.sfc-window-body') || document;
      section.querySelectorAll('.sfc-roughness-item').forEach(i => i.classList.remove('selected'));
      this.classList.add('selected');

      const code = this.querySelector('.sfc-roughness-code')?.textContent.trim() || '';
      const value = this.querySelector('.sfc-roughness-value')?.textContent.trim() || '';
      const process = this.querySelector('.sfc-roughness-process')?.textContent.trim() || '';
      const level = this.dataset.level || '';

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
    'N8': 'Aplicaciones generales, superficies rugosas',
    'N9': 'Refrentado y desbaste de piezas mecánicas',
    'N10': 'Eliminación de rebabas en componentes metálicos',
    'N11': 'Rectificado grueso para ajuste de medidas',
    'N12': 'Desbaste manual en preparación de superficies'
  };

  const cleanProcess = process ? process.replace(/[()]/g, '') : '';

  contentArea.innerHTML = `
    <div style="text-align: center;">
      <h3 class="sfc-content-title">Rugosidad ${code} Seleccionada</h3>
      <div style="background: linear-gradient(135deg, #031795, #0066cc); color: white; border-radius: 15px; padding: 30px; margin: 20px 0;">
        <div style="font-size: 3rem; font-weight: bold;">${code}</div>
        <div style="font-size: 1.5rem;">${value}</div>
        <div style="font-size: 1.1rem; opacity: 0.9;">${cleanProcess}</div>
      </div>
      <div style="background: white; border-radius: 12px; padding: 25px; margin: 20px 0;">
        <h4 style="color: #031795;">Aplicaciones Típicas</h4>
        <p>${applications[level] || 'Aplicaciones industriales diversas'}</p>
      </div>
    </div>
  `;
}

// Inicializar
document.addEventListener('DOMContentLoaded', function () {
  addRoughnessItemListeners();

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

  const handleResize = function () {
    const course = document.querySelector('.surface-finishes-course');
    if (!course) return;
    course.style.flexDirection = window.innerWidth <= 1024 ? 'column' : 'row';
  };

  handleResize();
  window.addEventListener('resize', handleResize);
});
