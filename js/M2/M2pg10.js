let currentSlide = 0;
const totalSlides = 4;

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  updateCarousel();
}

function previousSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  updateCarousel();
}

function goToSlide(index) {
  currentSlide = index;
  updateCarousel();
}

function updateCarousel() {
  const slides = document.getElementById('carouselSlides');
  const indicators = document.querySelectorAll('.indicator');
  
  slides.style.transform = `translateX(-${currentSlide * 100}%)`;
  
  indicators.forEach((indicator, index) => {
    indicator.classList.toggle('active', index === currentSlide);
  });
}

function showInfo(type) {
  const popup = document.getElementById('infoPopup');
  const overlay = document.getElementById('popupOverlay');
  const content = document.getElementById('popupContent');
  
  let infoContent = '';
  
  switch(type) {
    case 'iso':
      infoContent = `
        <h3 style="color: #031795; margin: 0 0 5px 0;">Norma ISO 1302</h3>
        <p><strong>Características principales:</strong></p>
        <ul>
          <li>Símbolo triangular estándar</li>
          <li>Valores numéricos de rugosidad</li>
          <li>Modificadores específicos</li>
          <li>Método de medición definido</li>
          <li>Aplicación internacional</li>
        </ul>
      `;
      break;
    case 'ansi':
      infoContent = `
        <h3 style="color: #031795; margin: 0 0 5px 0;">Norma ANSI Y14.36</h3>
        <p><strong>Características principales:</strong></p>
        <ul>
          <li>Símbolo de media onda</li>
          <li>Estándar americano</li>
          <li>Colocación específica</li>
          <li>Línea de referencia</li>
          <li>Sistema de acotado</li>
        </ul>
      `;
      break;
    case 'rugosidad':
      infoContent = `
        <h3 style="color: #031795; margin: 0 0 5px 0;">Rugosidad Ra</h3>
        <p><strong>Definición y medición:</strong></p>
        <ul>
          <li>Rugosidad promedio aritmética</li>
          <li>Parámetro más utilizado</li>
          <li>Unidades en micrómetros</li>
          <li>Medición con perfilómetro</li>
          <li>Valores típicos según aplicación</li>
        </ul>
      `;
      break;
    case 'ejemplos':
      infoContent = `
        <h3 style="color: #031795; margin: 0 0 5px 0;">Ejemplos Prácticos</h3>
        <p><strong>Aplicaciones comunes:</strong></p>
        <ul>
          <li>Superficies de contacto: Ra 0.8 - 1.6</li>
          <li>Superficies funcionales: Ra 3.2 - 6.3</li>
          <li>Superficies no funcionales: Ra 12.5</li>
          <li>Ubicación en planos técnicos</li>
          <li>Interpretación de símbolos</li>
        </ul>
      `;
      break;
  }
  
  content.innerHTML = infoContent;
  popup.style.display = 'block';
  overlay.style.display = 'block';
}

function closePopup() {
  document.getElementById('infoPopup').style.display = 'none';
  document.getElementById('popupOverlay').style.display = 'none';
}

// Auto-play carousel
setInterval(() => {
  nextSlide();
}, 5000);

// Touch/swipe support for mobile
let startX = 0;
let endX = 0;

document.getElementById('carouselSlides').addEventListener('touchstart', function(e) {
  startX = e.touches[0].clientX;
});

document.getElementById('carouselSlides').addEventListener('touchend', function(e) {
  endX = e.changedTouches[0].clientX;
  handleSwipe();
});

function handleSwipe() {
  const difference = startX - endX;
  if (Math.abs(difference) > 50) {
    if (difference > 0) {
      nextSlide();
    } else {
      previousSlide();
    }
  }
}