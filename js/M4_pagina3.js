class CustomAudioPlayer {
    constructor() {
        this.audioPlayer = document.getElementById('audioPlayer');
        this.audioToggle = document.getElementById('audioToggle');
        this.audioControls = document.getElementById('audioControls');
        this.playPauseBtn = document.getElementById('playPauseBtn');
        this.volumeToggle = document.getElementById('volumeToggle');
        this.speedBtn = document.getElementById('speedBtn');
        this.progressBar = document.getElementById('progressBar');
        this.progressFill = document.getElementById('progressFill');
        this.volumeSlider = document.getElementById('volumeSlider');
        this.volumeFill = document.getElementById('volumeFill');
        this.currentTimeDisplay = document.getElementById('currentTime');
        this.durationDisplay = document.getElementById('duration');
        this.speedDisplay = document.getElementById('speedDisplay');
        this.audioInfo = document.getElementById('audioInfo');

        this.isControlsVisible = false;
        this.currentSpeed = 1;
        this.speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];
        this.speedIndex = 2; // 1x por defecto

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.audioPlayer.volume = 0.8;
        this.updateVolumeDisplay();

        // Auto-play si está configurado
        if (this.audioPlayer.hasAttribute('autoplay')) {
            this.audioPlayer.play().catch(e => {
                console.log('Autoplay bloqueado:', e);
            });
        }
    }

    setupEventListeners() {
        // Toggle de controles
        this.audioToggle.addEventListener('click', () => this.toggleControls());

        // Cerrar controles al hacer clic fuera
        document.addEventListener('click', (e) => this.handleOutsideClick(e));

        // Controles de reproducción
        this.playPauseBtn.addEventListener('click', () => this.togglePlayPause());
        this.audioToggle.addEventListener('dblclick', () => this.togglePlayPause());

        // Control de volumen
        this.volumeToggle.addEventListener('click', () => this.toggleMute());
        this.volumeSlider.addEventListener('click', (e) => this.setVolume(e));

        // Control de velocidad
        this.speedBtn.addEventListener('click', () => this.cycleSpeed());

        // Barra de progreso
        this.progressBar.addEventListener('click', (e) => this.setProgress(e));

        // Eventos del audio
        this.audioPlayer.addEventListener('loadedmetadata', () => this.onLoadedMetadata());
        this.audioPlayer.addEventListener('timeupdate', () => this.onTimeUpdate());
        this.audioPlayer.addEventListener('play', () => this.onPlay());
        this.audioPlayer.addEventListener('pause', () => this.onPause());
        this.audioPlayer.addEventListener('ended', () => this.onEnded());
        this.audioPlayer.addEventListener('loadstart', () => this.onLoadStart());
        this.audioPlayer.addEventListener('canplay', () => this.onCanPlay());
    }

    onLoadedMetadata() {
        // Mostrar la duración total cuando se cargan los metadatos
        this.durationDisplay.textContent = this.formatTime(this.audioPlayer.duration);
        this.updateVolumeIcon();
    }

    onLoadStart() {
        // Mostrar estado de carga
        this.audioInfo.textContent = 'Cargando...';
        this.durationDisplay.textContent = '0:00';
    }

    onCanPlay() {
        // Limpiar mensaje de carga cuando esté listo para reproducir
        this.audioInfo.textContent = '';
        // Asegurar que la duración se muestre correctamente
        if (this.audioPlayer.duration && !isNaN(this.audioPlayer.duration)) {
            this.durationDisplay.textContent = this.formatTime(this.audioPlayer.duration);
        }
    }

    toggleControls() {
        this.isControlsVisible = !this.isControlsVisible;
        this.audioControls.classList.toggle('show', this.isControlsVisible);
    }

    handleOutsideClick(e) {
        if (!this.audioToggle.contains(e.target) && !this.audioControls.contains(e.target)) {
            this.isControlsVisible = false;
            this.audioControls.classList.remove('show');
        }
    }

    togglePlayPause() {
        if (this.audioPlayer.paused) {
            this.audioPlayer.play();
        } else {
            this.audioPlayer.pause();
        }
    }

    toggleMute() {
        this.audioPlayer.muted = !this.audioPlayer.muted;
        this.updateVolumeIcon();
    }

    setVolume(e) {
        const rect = this.volumeSlider.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const volume = Math.max(0, Math.min(1, clickX / rect.width));
        this.audioPlayer.volume = volume;
        this.audioPlayer.muted = false;
        this.updateVolumeDisplay();
        this.updateVolumeIcon();
    }

    cycleSpeed() {
        this.speedIndex = (this.speedIndex + 1) % this.speeds.length;
        this.currentSpeed = this.speeds[this.speedIndex];
        this.audioPlayer.playbackRate = this.currentSpeed;
        this.speedDisplay.textContent = this.currentSpeed + 'x';
    }

    setProgress(e) {
        const rect = this.progressBar.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const percentage = clickX / rect.width;
        const newTime = percentage * this.audioPlayer.duration;
        this.audioPlayer.currentTime = newTime;
    }

    updateVolumeDisplay() {
        const volume = this.audioPlayer.muted ? 0 : this.audioPlayer.volume;
        this.volumeFill.style.width = (volume * 100) + '%';
    }

    updateVolumeIcon() {
        const volumeIcon = document.getElementById('volumeIcon');
        const muteIcon = document.getElementById('muteIcon');

        if (this.audioPlayer.muted || this.audioPlayer.volume === 0) {
            volumeIcon.style.display = 'none';
            muteIcon.style.display = 'block';
        } else {
            volumeIcon.style.display = 'block';
            muteIcon.style.display = 'none';
        }
    }

    formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';

        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return mins + ':' + (secs < 10 ? '0' : '') + secs;
    }

    onTimeUpdate() {
        const progress = (this.audioPlayer.currentTime / this.audioPlayer.duration) * 100;
        this.progressFill.style.width = progress + '%';
        this.currentTimeDisplay.textContent = this.formatTime(this.audioPlayer.currentTime);
    }

    onPlay() {
        // Iconos del botón principal
        document.getElementById('togglePlayIcon').style.display = 'none';
        document.getElementById('togglePauseIcon').style.display = 'block';

        // Iconos del botón de control
        document.getElementById('playIcon').style.display = 'none';
        document.getElementById('pauseIcon').style.display = 'block';

        this.audioToggle.classList.add('playing');
    }

    onPause() {
        // Iconos del botón principal
        document.getElementById('togglePlayIcon').style.display = 'block';
        document.getElementById('togglePauseIcon').style.display = 'none';

        // Iconos del botón de control
        document.getElementById('playIcon').style.display = 'block';
        document.getElementById('pauseIcon').style.display = 'none';

        this.audioToggle.classList.remove('playing');
    }

    onEnded() {
        this.onPause();
        this.progressFill.style.width = '0%';
        this.currentTimeDisplay.textContent = '0:00';
    }
}

// Inicializar el reproductor cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new CustomAudioPlayer();
});

function playAudioForSection(sectionName) {
    const audioPlayer = document.getElementById('audioPlayer');
    const audioSource = audioPlayer.querySelector('source');

    // Mapeo de secciones a archivos de audio
    const audioMap = {
        'theory': '../assets/audio/Mod1_pag4.wav',
        'case': '../assets/audio/Mod1_pag4_2.wav',
        'analysis': '../assets/audio/Mod1_pag4_3.wav',
        'quiz': '../assets/audio/Mod1_pag4_4.wav'
    };

    // Verificar si existe audio para la sección
    if (audioMap[sectionName]) {
        // Pausar el audio actual
        audioPlayer.pause();

        // Cambiar la fuente del audio
        audioSource.src = audioMap[sectionName];

        // Recargar el audio con la nueva fuente
        audioPlayer.load();

        // Reproducir el nuevo audio
        audioPlayer.play().catch(e => {
            console.log('Error al reproducir audio:', e);
        });
    }
}

let currentSection = 'theory';
let currentQuestion = 1;
let correctAnswers = 0;

function showSection(section) {
    // Ocultar todas las secciones
    document.querySelectorAll('.content-section').forEach(s => {
        s.classList.remove('active');
    });

    // Mostrar sección seleccionada
    document.getElementById(section).classList.add('active');
    playAudioForSection(section);

    // Actualizar navegación
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    currentSection = section;

    // Si es la sección de evaluación, reiniciar el quiz
    if (section === 'quiz') {
        resetQuiz();
    }

    updateProgress();
}

function updateProgress() {
    const sections = ['theory', 'case', 'analysis', 'quiz'];
    const currentIndex = sections.indexOf(currentSection);
    const progress = ((currentIndex + 1) / sections.length) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
}

function expandCard(card) {
    card.style.transform = 'scale(1.05)';
    card.style.background = 'rgba(255, 255, 255, 0.2)';

    setTimeout(() => {
        card.style.transform = 'scale(1)';
        card.style.background = 'rgba(255, 255, 255, 0.1)';
    }, 300);
}

function selectAnswer(option, isCorrect) {
    // Deshabilitar todas las opciones
    const options = option.parentNode.querySelectorAll('.quiz-option');
    options.forEach(opt => {
        opt.style.pointerEvents = 'none';
        if (opt === option) {
            opt.classList.add(isCorrect ? 'correct' : 'incorrect');
        } else if (opt.onclick.toString().includes('true')) {
            opt.classList.add('correct');
        }
    });

    if (isCorrect) {
        correctAnswers++;
    }

    document.getElementById('nextBtn').style.display = 'inline-block';
}

function nextQuestion() {
    currentQuestion++;

    if (currentQuestion <= 3) {
        // Mostrar siguiente pregunta
        loadQuestion(currentQuestion);
    } else {
        // Mostrar resultados
        showResults();
    }
}

function showResults() {
    const percentage = (correctAnswers / 3) * 100;
    document.getElementById('scoreText').textContent = correctAnswers;

    let message = "";
    if (percentage === 100) {
        message = "¡Excelente! Dominas completamente los conceptos del ATS.";
    } else if (percentage >= 66) {
        message = "¡Muy bien! Tienes un buen entendimiento del ATS.";
    } else {
        message = "Considera revisar los conceptos del ATS nuevamente.";
    }

    document.getElementById('finalMessage').textContent = message;
    document.getElementById('results').style.display = 'block';
    document.getElementById('nextBtn').style.display = 'none';

    // Ocultar la pregunta actual
    document.getElementById('question1').style.display = 'none';
    document.querySelector('.quiz-options').style.display = 'none';
}

function resetQuiz() {
    currentQuestion = 1;
    correctAnswers = 0;

    // Mostrar elementos del quiz
    document.getElementById('question1').style.display = 'block';
    document.querySelector('.quiz-options').style.display = 'grid';
    document.getElementById('results').style.display = 'none';
    document.getElementById('nextBtn').style.display = 'none';

    // Cargar primera pregunta
    loadQuestion(1);
}

function loadQuestion(questionNum) {
    const questions = [
        {
            q: "1. ¿Cuál es el primer paso en un Análisis de Trabajo Seguro?",
            options: [
                { text: "Identificar los riesgos existentes", correct: false },
                { text: "Seleccionar la tarea a analizar", correct: true },
                { text: "Definir los controles necesarios", correct: false },
                { text: "Evaluar la eficiencia del proceso", correct: false }
            ]
        },
        {
            q: "2. ¿Cuál es el principal riesgo identificado en la operación con esmeril?",
            options: [
                { text: "Laceraciones en manos y pies", correct: true },
                { text: "Ruido excesivo", correct: false },
                { text: "Temperaturas elevadas", correct: false },
                { text: "Espacios confinados", correct: false }
            ]
        },
        {
            q: "3. ¿Qué tipo de control se implementa con el sistema de extracción de polvo?",
            options: [
                { text: "Control administrativo", correct: false },
                { text: "Control de ingeniería", correct: true },
                { text: "Equipo de protección personal", correct: false },
                { text: "Control de eliminación", correct: false }
            ]
        }
    ];

    if (questionNum <= questions.length) {
        const question = questions[questionNum - 1];
        document.getElementById('question1').textContent = question.q;

        const optionsContainer = document.querySelector('.quiz-options');
        optionsContainer.innerHTML = '';

        question.options.forEach(option => {
            const div = document.createElement('div');
            div.className = 'quiz-option';
            div.textContent = option.text;
            div.onclick = () => selectAnswer(div, option.correct);
            optionsContainer.appendChild(div);
        });

        document.getElementById('nextBtn').style.display = 'none';
    }
}

// Inicializar
updateProgress();