class CursoAcabados {
  constructor() {
    this.currentStep = 1;
    this.init();
  }

  init() {
    this.bindEvents();
    this.startStepAnimation();
  }

  bindEvents() {
    // Modal
    const btnTabla = document.getElementById('btn-tabla');
    const btnCerrarModal = document.getElementById('btn-cerrar-modal');
    const modalOverlay = document.getElementById('modal-tabla');

    btnTabla.addEventListener('click', () => this.openModal());
    btnCerrarModal.addEventListener('click', () => this.closeModal());
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) this.closeModal();
    });

    // Simulación
    const btnSimulacion = document.getElementById('btn-simulacion');
    btnSimulacion.addEventListener('click', () => this.startSimulation());

    // Factor cards hover
    const factorCards = document.querySelectorAll('.factor-card');
    factorCards.forEach(card => {
      card.addEventListener('click', () => this.showFactorInfo(card));
    });

    // Step cards
    const stepCards = document.querySelectorAll('.step-card');
    stepCards.forEach(card => {
      card.addEventListener('click', () => this.activateStep(card));
    });
  }

  openModal() {
    const modal = document.getElementById('modal-tabla');
    modal.style.display = 'flex';
  }

  closeModal() {
    const modal = document.getElementById('modal-tabla');
    modal.style.display = 'none';
  }

  startSimulation() {
    const btn = document.getElementById('btn-simulacion');
    const originalText = btn.textContent;
    
    btn.textContent = 'Simulando...';
    btn.disabled = true;
    
    // Animate through steps
    this.animateSteps();
    
    setTimeout(() => {
      btn.textContent = originalText;
      btn.disabled = false;
      this.showResult();
    }, 3000);
  }

  animateSteps() {
    const steps = document.querySelectorAll('.step-card');
    let delay = 0;

    steps.forEach((step, index) => {
      setTimeout(() => {
        steps.forEach(s => s.classList.remove('active'));
        step.classList.add('active');
        step.style.transform = 'scale(1.02)';
        setTimeout(() => {
          step.style.transform = 'scale(1)';
        }, 300);
      }, delay);
      delay += 1000;
    });
  }

  showFactorInfo(card) {
    const factor = card.dataset.factor;
    const info = this.getFactorInfo(factor);
    
    // Remove previous highlights
    document.querySelectorAll('.factor-card').forEach(c => 
      c.classList.remove('highlighted'));
    
    card.classList.add('highlighted');
    
    // Show brief animation
    card.style.transform = 'scale(1.05)';
    setTimeout(() => {
      card.style.transform = 'scale(1)';
    }, 200);
  }

  getFactorInfo(factor) {
    const info = {
      velocidad: 'La velocidad de corte afecta directamente la rugosidad superficial',
      avance: 'El avance determina la distancia entre surcos consecutivos',
      geometria: 'El ángulo y radio de la herramienta influyen en el acabado',
      estado: 'Las vibraciones y holguras generan irregularidades'
    };
    return info[factor] || 'Información del factor';
  }

  activateStep(card) {
    const stepNumber = parseInt(card.dataset.step);
    this.currentStep = stepNumber;
    
    document.querySelectorAll('.step-card').forEach(s => 
      s.classList.remove('active'));
    card.classList.add('active');
  }

  startStepAnimation() {
    setInterval(() => {
      this.currentStep = (this.currentStep % 3) + 1;
      this.activateStepByNumber(this.currentStep);
    }, 5000);
  }

  activateStepByNumber(stepNumber) {
    const targetStep = document.querySelector(`[data-step="${stepNumber}"]`);
    if (targetStep) {
      document.querySelectorAll('.step-card').forEach(s => 
        s.classList.remove('active'));
      targetStep.classList.add('active');
    }
  }

  showResult() {
    const resultMessage = 'Simulación completada. Clase ISO estimada: N7 (Ra ≈ 1.6 μm)';
    
    // Create temporary result display
    const resultDiv = document.createElement('div');
    resultDiv.className = 'result-notification';
    resultDiv.textContent = resultMessage;
    resultDiv.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #031795;
      color: white;
      padding: 10px;
      border-radius: 6px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      z-index: 1001;
      transform: translateX(100%);
      transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(resultDiv);
    
    setTimeout(() => {
      resultDiv.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
      resultDiv.style.transform = 'translateX(100%)';
      setTimeout(() => {
        document.body.removeChild(resultDiv);
      }, 300);
    }, 3000);
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new CursoAcabados();
});