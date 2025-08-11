const lambda = 3; // Tasa media de llamadas por hora para los ejemplos principales

// --- Funciones de Dibujo (para los ejemplos principales) ---
function drawExponentialPDF(canvas, shadeRange = null) {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const width = canvas.width;
    const height = canvas.height;
    const padding = 30;

    const maxX = 1.5;
    const scaleX = (val) => padding + (val / maxX) * (width - 2 * padding);
    const maxY = lambda * 1.1;
    const scaleY = (val) => height - padding - (val / maxY) * (height - 2 * padding);

    ctx.beginPath();
    ctx.strokeStyle = '#7f8c8d';
    ctx.lineWidth = 2;
    ctx.moveTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = '#3498db';
    ctx.lineWidth = 3;
    for (let i = 0; i < width - padding; i++) {
        const xVal = (i - padding) * maxX / (width - 2 * padding);
        if (xVal >= 0) {
            const yVal = lambda * Math.exp(-lambda * xVal);
            if (i === padding) {
                ctx.moveTo(scaleX(xVal), scaleY(yVal));
            } else {
                ctx.lineTo(scaleX(xVal), scaleY(yVal));
            }
        }
    }
    ctx.stroke();

    if (shadeRange) {
        ctx.beginPath();
        ctx.fillStyle = 'rgba(52, 152, 219, 0.4)';
        ctx.moveTo(scaleX(shadeRange[0]), scaleY(0));
        for (let x = shadeRange[0]; x <= shadeRange[1]; x += 0.001) {
            ctx.lineTo(scaleX(x), scaleY(lambda * Math.exp(-lambda * x)));
        }
        ctx.lineTo(scaleX(shadeRange[1]), scaleY(0));
        ctx.closePath();
        ctx.fill();

        ctx.strokeStyle = '#c0392b';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(scaleX(shadeRange[0]), scaleY(0));
        ctx.lineTo(scaleX(shadeRange[0]), scaleY(lambda * Math.exp(-lambda * shadeRange[0])));
        ctx.moveTo(scaleX(shadeRange[1]), scaleY(0));
        ctx.lineTo(scaleX(shadeRange[1]), scaleY(lambda * Math.exp(-lambda * shadeRange[1])));
        ctx.stroke();
    }

    ctx.fillStyle = '#34495e';
    ctx.font = '12px "Inter", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Tiempo (horas)', width / 2, height - 10);
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    ctx.fillText('Probabilidad', 15, height / 2);

    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText('0', scaleX(0), height - padding + 5);
    ctx.fillText('0.25', scaleX(0.25), height - padding + 5);
    ctx.fillText('0.5', scaleX(0.5), height - padding + 5);
    ctx.fillText('0.75', scaleX(0.75), height - padding + 5);
    ctx.fillText('1', scaleX(1), height - padding + 5);
}

function drawExponentialCDF(canvas, highlightX = null) {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const width = canvas.width;
    const height = canvas.height;
    const padding = 30;

    const maxX = 1.5;
    const scaleX = (val) => padding + (val / maxX) * (width - 2 * padding);
    const scaleY = (val) => height - padding - val * (height - 2 * padding);

    ctx.beginPath();
    ctx.strokeStyle = '#7f8c8d';
    ctx.lineWidth = 2;
    ctx.moveTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = '#27ae60';
    ctx.lineWidth = 3;
    for (let i = 0; i < width - padding; i++) {
        const xVal = (i - padding) * maxX / (width - 2 * padding);
        if (xVal >= 0) {
            const yVal = 1 - Math.exp(-lambda * xVal);
            if (i === padding) {
                ctx.moveTo(scaleX(xVal), scaleY(yVal));
            } else {
                ctx.lineTo(scaleX(xVal), scaleY(yVal));
            }
        }
    }
    ctx.stroke();

    if (highlightX !== null) {
        const cdfValue = 1 - Math.exp(-lambda * highlightX);
        const xCoord = scaleX(highlightX);
        const yCoord = scaleY(cdfValue);

        ctx.strokeStyle = '#c0392b';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(xCoord, scaleY(0));
        ctx.lineTo(xCoord, yCoord);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(padding, yCoord);
        ctx.lineTo(xCoord, yCoord);
        ctx.stroke();

        ctx.fillStyle = '#c0392b';
        ctx.beginPath();
        ctx.arc(xCoord, yCoord, 5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#2c3e50';
        ctx.font = '14px "Inter", sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(`F(${highlightX.toFixed(2)}) = ${cdfValue.toFixed(4)}`, xCoord + 10, yCoord - 10);
    }

    ctx.fillStyle = '#34495e';
    ctx.font = '12px "Inter", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Tiempo (horas)', width / 2, height - 10);
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    ctx.fillText('Probabilidad Acumulada', 15, height / 2);

    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText('0', scaleX(0), height - padding + 5);
    ctx.fillText('0.25', scaleX(0.25), height - padding + 5);
    ctx.fillText('0.5', scaleX(0.5), height - padding + 5);
    ctx.fillText('0.75', scaleX(0.75), height - padding + 5);
    ctx.fillText('1', scaleX(1), height - padding + 5);

    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    ctx.fillText('0.0', padding - 5, scaleY(0));
    ctx.fillText('0.5', padding - 5, scaleY(0.5));
    ctx.fillText('1.0', padding - 5, scaleY(1));
}

// --- Lógica del Ejemplo 1 (PDF) ---
const startPdfCalcBtn = document.getElementById('startPdfCalcBtn');
const pdfStepsDiv = document.getElementById('pdfSteps');
const pdfCanvas = document.getElementById('pdfCanvas');
let pdfStepIndex = 0;
let isPdfAnimating = false;

const pdfCalculationSteps = [
    {
        text: "<strong>Paso 1:</strong> Convertimos los minutos a horas, ya que la tasa ($\lambda$) está en llamadas por hora.",
        formula: "$10 \text{ min} = \frac{1}{6} \text{ h} \quad \text{y} \quad 20 \text{ min} = \frac{1}{3} \text{ h}$",
        graph: { range: [1/6, 1/3] }
    },
    {
        text: "<strong>Paso 2:</strong> Para encontrar la probabilidad entre dos puntos en una distribución continua, integramos la función de densidad de probabilidad (PDF) sobre ese intervalo.",
        formula: "$P\left(\frac{1}{6} < x < \frac{1}{3}\right) = \int_{\frac{1}{6}}^{\frac{1}{3}} \lambda e^{-\lambda x} \, dx = \int_{\frac{1}{6}}^{\frac{1}{3}} 3e^{-3x} \, dx$",
        graph: { range: [1/6, 1/3] }
    },
    {
        text: "<strong>Paso 3:</strong> Resolvemos la integral. La integral de $e^{ax}$ es $\frac{1}{a}e^{ax}$.",
        formula: "$= \left[ -e^{-3x} \right]_{\frac{1}{6}}^{\frac{1}{3}}$",
        graph: { range: [1/6, 1/3] }
    },
    {
        text: "<strong>Paso 4:</strong> Evaluamos la integral definida en los límites superior e inferior.",
        formula: "$= -e^{-3 \cdot \left(\frac{1}{3}\right)} - (-e^{-3 \cdot \left(\frac{1}{6}\right)}) = -e^{-1} + e^{-0.5}$",
        graph: { range: [1/6, 1/3] }
    },
    {
        text: "<strong>Paso 5:</strong> Calculamos los valores numéricos.",
        formula: "$= 0.6065 - 0.3679 = 0.2386$", // Adjusted values for more precision
        graph: { range: [1/6, 1/3] }
    },
    {
        text: "<strong>Resultado Final:</strong> La probabilidad de recibir una llamada entre 10 y 20 minutos es del 23.86%.",
        formula: "$= 0.2386 \quad \Rightarrow \quad \textbf{23.86\%}$",
        graph: { range: [1/6, 1/3] }
    }
];

startPdfCalcBtn.addEventListener('click', () => {
    if (!isPdfAnimating) {
        pdfStepsDiv.innerHTML = '';
        pdfStepIndex = 0;
        isPdfAnimating = true;
        drawExponentialPDF(pdfCanvas, null); // Clear shading initially
        showNextPdfStep();
    }
});

function showNextPdfStep() {
    if (pdfStepIndex < pdfCalculationSteps.length) {
        const step = pdfCalculationSteps[pdfStepIndex];
        const stepElement = document.createElement('div');
        stepElement.className = 'step-container';
        stepElement.innerHTML = `<p>${step.text}</p>${step.formula ? `<div class="formula">${step.formula}</div>` : ''}`;
        pdfStepsDiv.appendChild(stepElement);
        setTimeout(() => {
            stepElement.classList.add('active');
        }, 50);

        if (step.graph && step.graph.range) {
            drawExponentialPDF(pdfCanvas, step.graph.range);
        } else {
            drawExponentialPDF(pdfCanvas, null);
        }
        
pdfStepIndex++;
        setTimeout(showNextPdfStep, 4000); // Pausa de 4 segundos
    } else {
        isPdfAnimating = false;
    }
}

// --- Lógica del Ejemplo 2 (CDF) ---
const startCdfCalcBtn = document.getElementById('startCdfCalcBtn');
const cdfStepsDiv = document.getElementById('cdfSteps');
const cdfCanvas = document.getElementById('cdfCanvas');
let cdfStepIndex = 0;
let isCdfAnimating = false;

const cdfCalculationSteps = [
    {
        text: "<strong>Paso 1:</strong> Convertimos los 15 minutos a horas.",
        formula: "$15 \text{ min} = \frac{1}{4} \text{ h}$",
        graph: { highlightX: 1/4 }
    },
    {
        text: "<strong>Paso 2:</strong> Aplicamos la fórmula de la Función de Distribución Acumulada (CDF) para la distribución exponencial: $F(x) = 1 - e^{-\lambda x}$.",
        formula: "$F\left(\frac{1}{4}\right) = 1 - e^{-3 \cdot \left(\frac{1}{4}\right)}$",
        graph: { highlightX: 1/4 }
    },
    {
        text: "<strong>Paso 3:</strong> Realizamos la multiplicación en el exponente.",
        formula: "$= 1 - e^{-0.75}$",
        graph: { highlightX: 1/4 }
    },
    {
        text: "<strong>Paso 4:</strong> Calculamos el valor de $e^{-0.75}$.",
        formula: "$= 1 - 0.4724$",
        graph: { highlightX: 1/4 }
    },
    {
        text: "<strong>Resultado Final:</strong> La probabilidad de recibir una llamada en los primeros 15 minutos es del 52.76%.",
        formula: "$= 0.5276 \quad \Rightarrow \quad \textbf{52.76\%}$",
        graph: { highlightX: 1/4 }
    }
];

startCdfCalcBtn.addEventListener('click', () => {
    if (!isCdfAnimating) {
        cdfStepsDiv.innerHTML = '';
        cdfStepIndex = 0;
        isCdfAnimating = true;
        drawExponentialCDF(cdfCanvas, null); // Clear highlight initially
        showNextCdfStep();
    }
});

function showNextCdfStep() {
    if (cdfStepIndex < cdfCalculationSteps.length) {
        const step = cdfCalculationSteps[cdfStepIndex];
        const stepElement = document.createElement('div');
        stepElement.className = 'step-container';
        stepElement.innerHTML = `<p>${step.text}</p>${step.formula ? `<div class="formula">${step.formula}</div>` : ''}`;
        cdfStepsDiv.appendChild(stepElement);
        setTimeout(() => {
            stepElement.classList.add('active');
        }, 50);

        if (step.graph && step.graph.highlightX !== null) {
            drawExponentialCDF(cdfCanvas, step.graph.highlightX);
        } else {
            drawExponentialCDF(cdfCanvas, null);
        }
        
cdfStepIndex++;
        setTimeout(showNextCdfStep, 4000); // Pausa de 4 segundos
    } else {
        isCdfAnimating = false;
    }
}

// --- Sección: Visualización de la Distribución Exponencial (PDF) ---
const lambdaComparisonCanvasPDF = document.getElementById('lambdaComparisonCanvasPDF');
const ctxLambdaComparisonPDF = lambdaComparisonCanvasPDF.getContext('2d');
const customLambdaSliderPDF = document.getElementById('customLambdaSliderPDF');
const customLambdaValueDisplayPDF = document.getElementById('customLambdaValuePDF');

function drawLambdaComparisonGraphPDF(customLambda) {
    ctxLambdaComparisonPDF.clearRect(0, 0, lambdaComparisonCanvasPDF.width, lambdaComparisonCanvasPDF.height);

    const width = lambdaComparisonCanvasPDF.width;
    const height = lambdaComparisonCanvasPDF.height;
    const padding = 40; // Increased padding for labels

    const maxX = 5.0; // Time in hours
    const scaleX = (val) => padding + (val / maxX) * (width - 2 * padding);
    const maxY = 2.5; // Max density value (for lambda=2.0 at x=0)
    const scaleY = (val) => height - padding - (val / maxY) * (height - 2 * padding);

    // Dibujar ejes
    ctxLambdaComparisonPDF.beginPath();
    ctxLambdaComparisonPDF.strokeStyle = '#7f8c8d';
    ctxLambdaComparisonPDF.lineWidth = 2;
    ctxLambdaComparisonPDF.moveTo(padding, height - padding);
    ctxLambdaComparisonPDF.lineTo(width - padding, height - padding); // Eje X
    ctxLambdaComparisonPDF.moveTo(padding, padding);
    ctxLambdaComparisonPDF.lineTo(padding, height - padding); // Eje Y
    ctxLambdaComparisonPDF.stroke();

    // Dibujar curvas para diferentes lambdas
    const lambdasToDrawPDF = [
        { value: 0.5, color: '#e74c3c', label: 'λ = 0.5 (roja)' }, // Red
        { value: 1.0, color: '#e67e22', label: 'λ = 1.0 (naranja)' }, // Orange
        { value: 2.0, color: '#27ae60', label: 'λ = 2.0 (verde)' }  // Green
    ];

    // Add custom lambda if it's not one of the fixed ones
    const customLambdaFixedPDF = parseFloat(customLambda).toFixed(1);
    if (!lambdasToDrawPDF.some(l => l.value.toFixed(1) === customLambdaFixedPDF)) {
         lambdasToDrawPDF.push({ value: customLambda, color: '#3498db', label: `λ = ${customLambda.toFixed(1)} (personalizada)` }); // Blue
    }


    lambdasToDrawPDF.forEach(l => {
        ctxLambdaComparisonPDF.beginPath();
        ctxLambdaComparisonPDF.strokeStyle = l.color;
        ctxLambdaComparisonPDF.lineWidth = 3;
        for (let i = 0; i < width - padding; i++) {
            const xVal = (i - padding) * maxX / (width - 2 * padding);
            if (xVal >= 0) {
                const yVal = l.value * Math.exp(-l.value * xVal);
                if (i === padding) {
                    ctxLambdaComparisonPDF.moveTo(scaleX(xVal), scaleY(yVal));
                } else {
                    ctxLambdaComparisonPDF.lineTo(scaleX(xVal), scaleY(yVal));
                }
            }
        }
        ctxLambdaComparisonPDF.stroke();
    });

    // Etiquetas de los ejes
    ctxLambdaComparisonPDF.fillStyle = '#34495e';
    ctxLambdaComparisonPDF.font = '14px "Inter", sans-serif';
    ctxLambdaComparisonPDF.textAlign = 'center';
    ctxLambdaComparisonPDF.fillText('Tiempo (t)', width / 2, height - 10);
    ctxLambdaComparisonPDF.textAlign = 'right';
    ctxLambdaComparisonPDF.textBaseline = 'middle';
    ctxLambdaComparisonPDF.fillText('Densidad f(t)', 25, height / 2);

    // Etiquetas numéricas en el eje X
    ctxLambdaComparisonPDF.textAlign = 'center';
    ctxLambdaComparisonPDF.textBaseline = 'top';
    for (let i = 0; i <= maxX; i += 1) {
        ctxLambdaComparisonPDF.fillText(i, scaleX(i), height - padding + 5);
    }

    // Etiquetas numéricas en el eje Y
    ctxLambdaComparisonPDF.textAlign = 'right';
    ctxLambdaComparisonPDF.textBaseline = 'middle';
    for (let i = 0; i <= maxY; i += 0.5) {
        ctxLambdaComparisonPDF.fillText(i.toFixed(1), padding - 5, scaleY(i));
    }
}

customLambdaSliderPDF.addEventListener('input', () => {
    const currentLambda = parseFloat(customLambdaSliderPDF.value);
    customLambdaValueDisplayPDF.textContent = currentLambda.toFixed(1);
    drawLambdaComparisonGraphPDF(currentLambda);
});

// --- Sección: Visualización de la Distribución Exponencial (CDF) ---
const lambdaComparisonCanvasCDF = document.getElementById('lambdaComparisonCanvasCDF');
const ctxLambdaComparisonCDF = lambdaComparisonCanvasCDF.getContext('2d');
const customLambdaSliderCDF = document.getElementById('customLambdaSliderCDF');
const customLambdaValueDisplayCDF = document.getElementById('customLambdaValueCDF');

function drawLambdaComparisonGraphCDF(customLambda) {
    ctxLambdaComparisonCDF.clearRect(0, 0, lambdaComparisonCanvasCDF.width, lambdaComparisonCanvasCDF.height);

    const width = lambdaComparisonCanvasCDF.width;
    const height = lambdaComparisonCanvasCDF.height;
    const padding = 40; // Increased padding for labels

    const maxX = 5.0; // Time in hours
    const scaleX = (val) => padding + (val / maxX) * (width - 2 * padding);
    const scaleY = (val) => height - padding - val * (height - 2 * padding); // Probabilidad de 0 a 1

    // Dibujar ejes
    ctxLambdaComparisonCDF.beginPath();
    ctxLambdaComparisonCDF.strokeStyle = '#7f8c8d';
    ctxLambdaComparisonCDF.lineWidth = 2;
    ctxLambdaComparisonCDF.moveTo(padding, height - padding);
    ctxLambdaComparisonCDF.lineTo(width - padding, height - padding); // Eje X
    ctxLambdaComparisonCDF.moveTo(padding, padding);
    ctxLambdaComparisonCDF.lineTo(padding, height - padding); // Eje Y
    ctxLambdaComparisonCDF.stroke();

    // Dibujar curvas para diferentes lambdas
    const lambdasToDrawCDF = [
        { value: 0.5, color: '#e74c3c', label: 'λ = 0.5 (roja)' }, // Red
        { value: 1.0, color: '#e67e22', label: 'λ = 1.0 (naranja)' }, // Orange
        { value: 2.0, color: '#27ae60', label: 'λ = 2.0 (verde)' }  // Green
    ];

    // Add custom lambda if it's not one of the fixed ones
    const customLambdaFixedCDF = parseFloat(customLambda).toFixed(1);
    if (!lambdasToDrawCDF.some(l => l.value.toFixed(1) === customLambdaFixedCDF)) {
         lambdasToDrawCDF.push({ value: customLambda, color: '#3498db', label: `λ = ${customLambda.toFixed(1)} (personalizada)` }); // Blue
    }

    lambdasToDrawCDF.forEach(l => {
        ctxLambdaComparisonCDF.beginPath();
        ctxLambdaComparisonCDF.strokeStyle = l.color;
        ctxLambdaComparisonCDF.lineWidth = 3;
        for (let i = 0; i < width - padding; i++) {
            const xVal = (i - padding) * maxX / (width - 2 * padding);
            if (xVal >= 0) {
                const yVal = 1 - Math.exp(-l.value * xVal);
                if (i === padding) {
                    ctxLambdaComparisonCDF.moveTo(scaleX(xVal), scaleY(yVal));
                } else {
                    ctxLambdaComparisonCDF.lineTo(scaleX(xVal), scaleY(yVal));
                }
            }
        }
        ctxLambdaComparisonCDF.stroke();
    });

    // Etiquetas de los ejes
    ctxLambdaComparisonCDF.fillStyle = '#34495e';
    ctxLambdaComparisonCDF.font = '14px "Inter", sans-serif';
    ctxLambdaComparisonCDF.textAlign = 'center';
    ctxLambdaComparisonCDF.fillText('Tiempo (t)', width / 2, height - 10);
    ctxLambdaComparisonCDF.textAlign = 'right';
    ctxLambdaComparisonCDF.textBaseline = 'middle';
    ctxLambdaComparisonCDF.fillText('Probabilidad F(t)', 25, height / 2);

    // Etiquetas numéricas en el eje X
    ctxLambdaComparisonCDF.textAlign = 'center';
    ctxLambdaComparisonCDF.textBaseline = 'top';
    for (let i = 0; i <= maxX; i += 1) {
        ctxLambdaComparisonPDF.fillText(i, scaleX(i), height - padding + 5);
    }

    // Etiquetas numéricas en el eje Y
    ctxLambdaComparisonCDF.textAlign = 'right';
    ctxLambdaComparisonCDF.textBaseline = 'middle';
    for (let i = 0; i <= 1; i += 0.2) {
        ctxLambdaComparisonCDF.fillText(i.toFixed(1), padding - 5, scaleY(i));
    }
}

customLambdaSliderCDF.addEventListener('input', () => {
    const currentLambda = parseFloat(customLambdaSliderCDF.value);
    customLambdaValueDisplayCDF.textContent = currentLambda.toFixed(1);
    drawLambdaComparisonGraphCDF(currentLambda);
});

// --- Nueva Sección: Ejercicio Interactivo ---
const exerciseCanvas = document.getElementById('exerciseCanvas');
const ctxExercise = exerciseCanvas.getContext('2d');
const startExerciseBtn = document.getElementById('startExerciseBtn');
const exerciseStepsDiv = document.getElementById('exerciseSteps');
let exerciseStepIndex = 0;
let isExerciseAnimating = false;
const lambdaExercise = 4; // Lambda específico para este ejercicio

function drawExponentialPDFExercise(canvas, shadeRange = null) {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const width = canvas.width;
    const height = canvas.height;
    const padding = 30;

    const maxX = 1.0; // Mostrar hasta 1.0 horas para este ejercicio
    const scaleX = (val) => padding + (val / maxX) * (width - 2 * padding);
    const maxY = lambdaExercise * 1.1; // Un poco más alto que el valor máximo en x=0
    const scaleY = (val) => height - padding - (val / maxY) * (height - 2 * padding);

    // Dibujar ejes
    ctx.beginPath();
    ctx.strokeStyle = '#7f8c8d';
    ctx.lineWidth = 2;
    ctx.moveTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding); // Eje X
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding); // Eje Y
    ctx.stroke();

    // Dibujar la curva de la PDF: f(x) = lambda * e^(-lambda * x)
    ctx.beginPath();
    ctx.strokeStyle = '#3498db';
    ctx.lineWidth = 3;
    for (let i = 0; i < width - padding; i++) {
        const xVal = (i - padding) * maxX / (width - 2 * padding);
        if (xVal >= 0) {
            const yVal = lambdaExercise * Math.exp(-lambdaExercise * xVal);
            if (i === padding) {
                ctx.moveTo(scaleX(xVal), scaleY(yVal));
            } else {
                ctx.lineTo(scaleX(xVal), scaleY(yVal));
            }
        }
    }
    ctx.stroke();

    // Sombreado del área (si se proporciona un rango)
    if (shadeRange) {
        ctx.beginPath();
        ctx.fillStyle = 'rgba(52, 152, 219, 0.4)';
        ctx.moveTo(scaleX(shadeRange[0]), scaleY(0));
        for (let x = shadeRange[0]; x <= shadeRange[1]; x += 0.001) {
            ctx.lineTo(scaleX(x), scaleY(lambdaExercise * Math.exp(-lambdaExercise * x)));
        }
        ctx.lineTo(scaleX(shadeRange[1]), scaleY(0));
        ctx.closePath();
        ctx.fill();

        // Dibujar líneas verticales en los límites del sombreado
        ctx.strokeStyle = '#c0392b';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(scaleX(shadeRange[0]), scaleY(0));
        ctx.lineTo(scaleX(shadeRange[0]), scaleY(lambdaExercise * Math.exp(-lambdaExercise * shadeRange[0])));
        ctx.moveTo(scaleX(shadeRange[1]), scaleY(0));
        ctx.lineTo(scaleX(shadeRange[1]), scaleY(lambdaExercise * Math.exp(-lambdaExercise * shadeRange[1])));
        ctx.stroke();
    }

    // Etiquetas de los ejes
    ctx.fillStyle = '#34495e';
    ctx.font = '12px "Inter", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Tiempo (horas)', width / 2, height - 10);
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    ctx.fillText('Probabilidad', 15, height / 2);

    // Etiquetas numéricas en el eje X
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText('0', scaleX(0), height - padding + 5);
    ctx.fillText('0.1', scaleX(0.1), height - padding + 5);
    ctx.fillText('0.2', scaleX(0.2), height - padding + 5);
    ctx.fillText('0.3', scaleX(0.3), height - padding + 5);
    ctx.fillText('0.4', scaleX(0.4), height - padding + 5);
    ctx.fillText('0.5', scaleX(0.5), height - padding + 5);
    ctx.fillText('0.6', scaleX(0.6), height - padding + 5);
    ctx.fillText('0.7', scaleX(0.7), height - padding + 5);
    ctx.fillText('0.8', scaleX(0.8), height - padding + 5);
    ctx.fillText('0.9', scaleX(0.9), height - padding + 5);
    ctx.fillText('1.0', scaleX(1.0), height - padding + 5);
}

const exerciseCalculationSteps = [
    {
        text: "<strong>Paso 1:</strong> Convertimos los minutos a horas. La tasa ($\lambda$) es de 4 llamadas por hora.",
        formula: "$10 \text{ min} = \frac{1}{6} \text{ h} \quad \text{y} \quad 20 \text{ min} = \frac{1}{3} \text{ h}$",
        graph: { range: [1/6, 1/3] }
    },
    {
        text: "<strong>Paso 2:</strong> Para encontrar la probabilidad entre dos puntos, integramos la función de densidad de probabilidad (PDF) sobre el intervalo dado.",
        formula: "$P\left(\frac{1}{6} < x < \frac{1}{3}\right) = \int_{\frac{1}{6}}^{\frac{1}{3}} \lambda e^{-\lambda x} \, dx = \int_{\frac{1}{6}}^{\frac{1}{3}} 4e^{-4x} \, dx$",
        graph: { range: [1/6, 1/3] }
    },
    {
        text: "<strong>Paso 3:</strong> Resolvemos la integral. La integral de $e^{ax}$ es $\frac{1}{a}e^{ax}$.",
        formula: "$= \left[ -e^{-4x} \right]_{\frac{1}{6}}^{\frac{1}{3}}$",
        graph: { range: [1/6, 1/3] }
    },
    {
        text: "<strong>Paso 4:</strong> Evaluamos la integral definida en los límites superior e inferior.",
        formula: "$= -e^{-4 \cdot \left(\frac{1}{3}\right)} - (-e^{-4 \cdot \left(\frac{1}{6}\right)}) = -e^{-4/3} + e^{-2/3}$",
        graph: { range: [1/6, 1/3] }
    },
    {
        text: "<strong>Paso 5:</strong> Calculamos los valores numéricos.",
        formula: "$= 0.5134 - 0.2636 = 0.2498$", // Adjusted values for more precision
        graph: { range: [1/6, 1/3] }
    },
    {
        text: "<strong>Resultado Final:</strong> La probabilidad de recibir una llamada entre 10 y 20 minutos es del 24.98%.",
        formula: "$= 0.2498 \quad \Rightarrow \quad \textbf{24.98\%}$",
        graph: { range: [1/6, 1/3] }
    }
];

startExerciseBtn.addEventListener('click', () => {
    if (!isExerciseAnimating) {
        exerciseStepsDiv.innerHTML = '';
        exerciseStepIndex = 0;
        isExerciseAnimating = true;
        drawExponentialPDFExercise(exerciseCanvas, null); // Clear shading initially
        showNextExerciseStep();
    }
});

function showNextExerciseStep() {
    if (exerciseStepIndex < exerciseCalculationSteps.length) {
        const step = exerciseCalculationSteps[exerciseStepIndex];
        const stepElement = document.createElement('div');
        stepElement.className = 'step-container';
        stepElement.innerHTML = `<p>${step.text}</p>${step.formula ? `<div class="formula">${step.formula}</div>` : ''}`;
        exerciseStepsDiv.appendChild(stepElement);
        setTimeout(() => {
            stepElement.classList.add('active');
        }, 50);

        if (step.graph && step.graph.range) {
            drawExponentialPDFExercise(exerciseCanvas, step.graph.range);
        } else {
            drawExponentialPDFExercise(exerciseCanvas, null);
        }
        
exerciseStepIndex++;
        setTimeout(showNextExerciseStep, 4000); // Pausa de 4 segundos
    } else {
        isExerciseAnimating = false;
    }
}

// --- Inicialización ---
window.onload = function() {
    drawExponentialPDF(pdfCanvas, null); // Dibuja la PDF inicial sin sombreado
    drawExponentialCDF(cdfCanvas, null); // Dibuja la CDF inicial sin resaltado
    drawLambdaComparisonGraphPDF(parseFloat(customLambdaSliderPDF.value)); // Dibuja el gráfico de comparación de lambdas PDF
    drawLambdaComparisonGraphCDF(parseFloat(customLambdaSliderCDF.value)); // Dibuja el gráfico de comparación de lambdas CDF
    drawExponentialPDFExercise(exerciseCanvas, null); // Dibuja el gráfico del ejercicio inicial sin sombreado
};