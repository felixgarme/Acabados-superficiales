class SurfaceFinishCourse {
  constructor() {
    this.currentSymbol = 'basic';
    this.selectedItems = new Set();
    this.init();
  }

  init() {
    this.bindEvents();
    this.showSymbolType('basic');
  }

  bindEvents() {
    // Navigation buttons
    const navButtons = document.querySelectorAll('.sf-nav-btn');
    navButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const symbolType = e.target.dataset.symbol;
        this.handleNavigation(symbolType);
      });
    });

    // Symbol items
    const symbolItems = document.querySelectorAll('.sf-symbol-item');
    symbolItems.forEach(item => {
      item.addEventListener('click', (e) => {
        this.handleSymbolSelection(e.currentTarget);
      });
    });

    // Control buttons
    const quizBtn = document.getElementById('quiz-btn');
    const resetBtn = document.getElementById('reset-btn');
    
    if (quizBtn) {
      quizBtn.addEventListener('click', () => this.startQuiz());
    }
    
    if (resetBtn) {
      resetBtn.addEventListener('click', () => this.reset());
    }
  }

  handleNavigation(symbolType) {
    // Update active navigation button
    document.querySelectorAll('.sf-nav-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    document.querySelector(`[data-symbol="${symbolType}"]`).classList.add('active');
    
    this.currentSymbol = symbolType;
    this.showSymbolType(symbolType);
  }

  showSymbolType(type) {
    const items = document.querySelectorAll('.sf-symbol-item');
    
    items.forEach(item => {
      const itemType = item.dataset.type;
      if (type === 'basic') {
        item.style.display = 'block';
      } else {
        item.style.display = itemType === type ? 'block' : 'none';
      }
    });
  }

  handleSymbolSelection(item) {
    const itemType = item.dataset.type;
    
    if (this.selectedItems.has(itemType)) {
      this.selectedItems.delete(itemType);
      item.classList.remove('selected');
    } else {
      this.selectedItems.add(itemType);
      item.classList.add('selected');
    }
    
    this.updateSelectionFeedback();
  }

  updateSelectionFeedback() {
    const count = this.selectedItems.size;
    if (count > 0) {
      console.log(`Elementos seleccionados: ${count}`);
    }
  }

  startQuiz() {
    const questions = [
      'Los acabados superficiales se definen por las normas ISO 1302 y 21920',
      'El símbolo básico incluye información sobre rugosidad Ra',
      'La retirada de material se indica con un círculo',
      'El formato típico es Ra 0,8 N6'
    ];
    
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    
    const userAnswer = confirm(`Pregunta: ¿Es correcta esta afirmación?\n\n"${randomQuestion}"\n\nHaz clic en Aceptar si es VERDADERO o Cancelar si es FALSO`);
    
    let isCorrect = false;
    switch (randomQuestion) {
      case questions[0]:
      case questions[1]:
      case questions[3]:
        isCorrect = userAnswer === true;
        break;
      case questions[2]:
        isCorrect = userAnswer === false;
        break;
    }
    
    alert(isCorrect ? 'Correcto! Excelente conocimiento.' : 'Incorrecto. Revisa el material nuevamente.');
  }

  reset() {
    // Clear selections
    this.selectedItems.clear();
    document.querySelectorAll('.sf-symbol-item').forEach(item => {
      item.classList.remove('selected');
    });
    
    // Reset to basic view
    this.handleNavigation('basic');
    
    // Show all items
    document.querySelectorAll('.sf-symbol-item').forEach(item => {
      item.style.display = 'block';
    });
    
    console.log('Curso reiniciado');
  }

  // Public method to get current state
  getState() {
    return {
      currentSymbol: this.currentSymbol,
      selectedItems: Array.from(this.selectedItems)
    };
  }
}

// Initialize the course when the component loads
let surfaceFinishCourse;

function initSurfaceFinishCourse() {
  if (document.querySelector('.surface-finish-container')) {
    surfaceFinishCourse = new SurfaceFinishCourse();
  }
}

// Auto-initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSurfaceFinishCourse);
} else {
  initSurfaceFinishCourse();
}