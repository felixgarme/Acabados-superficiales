// ====================
// INTERACTIVO 1: DISTRIBUCIÓN NORMAL BÁSICA
// ====================

// Canvas y contexto
const canvas = document.getElementById('normalDistributionCanvas');
const ctx = canvas.getContext('2d');

// Sliders y displays
const meanSlider = document.getElementById('meanSlider');
const stdDevSlider = document.getElementById('stdDevSlider');
const meanValueDisplay = document.getElementById('meanValue');
const stdDevValueDisplay = document.getElementById('stdDevValue');

// Inicialización
let mean = parseFloat(meanSlider.value);
let stdDev = parseFloat(stdDevSlider.value);

// ====================
// Font sizing responsivo (mejorado para móvil)
// ====================
let normalFont = '16px Arial';
let histogramFont = '12px Arial';
let gaussianFont = '14px Arial';

function px(fontStr, fallback = 12) {
  const m = String(fontStr).match(/(\d+)px/);
  return m ? parseInt(m[1], 10) : fallback;
}

function updateFontSizes() {
  const w = window.innerWidth || document.documentElement.clientWidth || 900;
  const dpr = window.devicePixelRatio || 1;

  // Tamaños base pensados para legibilidad en móvil:
  // móvil (<480) -> aumentar bastante
  // tablet (480-1024) -> tamaño intermedio
  // desktop (>1024) -> tamaño grande
  if (w < 480) {
    // en móvil hacemos las fuentes mayores (más legibles)
    normalFont = `${Math.round(22 * dpr)}px Arial`;     // ej. 22px * dpr
    histogramFont = `${Math.round(18 * dpr)}px Arial`;
    gaussianFont = `${Math.round(18 * dpr)}px Arial`;
  } else if (w < 1024) {
    normalFont = `${Math.round(24 * dpr)}px Arial`;
    histogramFont = `${Math.round(14 * dpr)}px Arial`;
    gaussianFont = `${Math.round(16 * dpr)}px Arial`;
  } else {
    normalFont = `${Math.round(30 * dpr)}px Arial`;
    histogramFont = `${Math.round(20 * dpr)}px Arial`;
    gaussianFont = `${Math.round(20 * dpr)}px Arial`;
  }

  // Ajuste adicional si el canvas es muy pequeño en ancho:
  const cw = canvas.width || 600;
  if (cw < 380) {
    const factor = Math.min(1.3, Math.max(0.9, cw / 600));
    const nf = Math.max(12, Math.round(px(normalFont) * factor));
    const hf = Math.max(10, Math.round(px(histogramFont) * factor));
    const gf = Math.max(10, Math.round(px(gaussianFont) * factor));
    normalFont = `${nf}px Arial`;
    histogramFont = `${hf}px Arial`;
    gaussianFont = `${gf}px Arial`;
  }
}

// Inicializar fonts
updateFontSizes();

// ====================
// DIBUJO: Distribución Normal
// ====================
function drawNormalDistribution() {
  if (!ctx) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Eje X
  ctx.beginPath();
  ctx.moveTo(0, canvas.height - 30);
  ctx.lineTo(canvas.width, canvas.height - 30);
  ctx.strokeStyle = '#7f8c8d';
  ctx.lineWidth = 1;
  ctx.stroke();

  // Línea vertical en la media
  const xMean = (mean + 150) * (canvas.width / 300);
  ctx.beginPath();
  ctx.moveTo(xMean, canvas.height - 30);
  ctx.lineTo(xMean, 0);
  ctx.strokeStyle = '#95a5a6';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Curva normal
  ctx.beginPath();
  const normConst = 1 / (stdDev * Math.sqrt(2 * Math.PI));
  const heightScale = (canvas.height - 50) * 100;
  for (let i = 0; i < canvas.width; i++) {
    const x = (i / canvas.width) * 300 - 150;
    const y = normConst * Math.exp(-Math.pow(x - mean, 2) / (2 * Math.pow(stdDev, 2)));
    const scaledY = canvas.height - 30 - (y * heightScale);
    i === 0 ? ctx.moveTo(i, scaledY) : ctx.lineTo(i, scaledY);
  }
  ctx.strokeStyle = '#3498db';
  ctx.lineWidth = 3;
  ctx.stroke();

  // Texto informativo (usar fuente calculada)
  ctx.fillStyle = '#2c3e50';
  ctx.font = normalFont;

  // Calcular posiciones de texto en función del tamaño de la fuente para evitar superposición
  const nf = px(normalFont);
  const topY = Math.max(nf + 6, 20);
  const bottomY = canvas.height - 8;

  ctx.fillText(`N(${mean}, ${stdDev})`, Math.min(xMean + 10, canvas.width - Math.max(80, nf * 4)), topY);
  ctx.fillText(`μ = ${mean}`, Math.max(xMean - 15, 4), bottomY);
}

// Eventos interactivos (mismos nombres y comportamiento)
meanSlider.addEventListener('input', () => {
  mean = parseFloat(meanSlider.value);
  meanValueDisplay.textContent = mean;
  drawNormalDistribution();
});

stdDevSlider.addEventListener('input', () => {
  stdDev = parseFloat(stdDevSlider.value);
  stdDevValueDisplay.textContent = stdDev;
  drawNormalDistribution();
});

// ====================
// INTERACTIVO 2: HISTOGRAMA CON CAMPANA ADAPTATIVA
// ====================
const histogramCanvas = document.getElementById('histogramCanvas');
const histogramCtx = histogramCanvas.getContext('2d');
const gaussianCanvas = document.getElementById('gaussianCanvas');
const gaussianCtx = gaussianCanvas.getContext('2d');

// Controles
const dataPointsSlider = document.getElementById('dataPointsSlider');
const binsSlider = document.getElementById('binsSlider');
const distributionMeanSlider = document.getElementById('distributionMeanSlider');
const distributionStdSlider = document.getElementById('distributionStdSlider');

// Displays
const dataPointsValue = document.getElementById('dataPointsValue');
const binsValue = document.getElementById('binsValue');
const distributionMeanValue = document.getElementById('distributionMeanValue');
const distributionStdValue = document.getElementById('distributionStdValue');
const calculatedMean = document.getElementById('calculatedMean');
const calculatedStd = document.getElementById('calculatedStd');

// Variables iniciales
let dataPoints = parseInt(dataPointsSlider.value);
let numBins = parseInt(binsSlider.value);
let dataMean = parseFloat(distributionMeanSlider.value);
let dataStd = parseFloat(distributionStdSlider.value);

// Genera datos normales (Box-Muller)
function generateNormalData(n, mean, std) {
  const data = [];
  for (let i = 0; i < n; i++) {
    const u1 = Math.random();
    const u2 = Math.random();
    const z0 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    data.push(z0 * std + mean);
  }
  return data;
}

function calculateStats(data) {
  const n = data.length;
  const mean = data.reduce((s, v) => s + v, 0) / n;
  const variance = data.reduce((s, v) => s + Math.pow(v - mean, 2), 0) / n;
  return { mean, std: Math.sqrt(variance) };
}

function createHistogram(data, bins) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const binWidth = (max - min) / bins || 1;
  const histogram = new Array(bins).fill(0);
  const binEdges = Array.from({ length: bins + 1 }, (_, i) => min + i * binWidth);

  data.forEach(value => {
    const binIndex = Math.min(Math.floor((value - min) / binWidth), bins - 1);
    histogram[binIndex]++;
  });

  return { histogram, binEdges, binWidth };
}

function drawHistogram() {
  // actualizar fonts antes de dibujar
  updateFontSizes();

  const data = generateNormalData(dataPoints, dataMean, dataStd);
  const stats = calculateStats(data);
  const { histogram, binEdges } = createHistogram(data, numBins);

  // Actualizar UI
  calculatedMean.textContent = stats.mean.toFixed(2);
  calculatedStd.textContent = stats.std.toFixed(2);

  // Limpiar y preparar
  histogramCtx.clearRect(0, 0, histogramCanvas.width, histogramCanvas.height);
  const maxCount = Math.max(...histogram, 1);
  const barWidth = histogramCanvas.width / numBins;
  const maxBarHeight = histogramCanvas.height - 40;

  histogramCtx.fillStyle = '#3498db';
  histogramCtx.strokeStyle = '#2980b9';
  histogramCtx.lineWidth = 1;

  for (let i = 0; i < histogram.length; i++) {
    const barHeight = (histogram[i] / maxCount) * maxBarHeight;
    const x = i * barWidth;
    const y = histogramCanvas.height - 30 - barHeight;
    histogramCtx.fillRect(x, y, barWidth - 2, barHeight);
    histogramCtx.strokeRect(x, y, barWidth - 2, barHeight);
  }

  // Eje X
  histogramCtx.beginPath();
  histogramCtx.moveTo(0, histogramCanvas.height - 30);
  histogramCtx.lineTo(histogramCanvas.width, histogramCanvas.height - 30);
  histogramCtx.strokeStyle = '#7f8c8d';
  histogramCtx.lineWidth = 2;
  histogramCtx.stroke();

  // Etiquetas eje X (hasta ~6 marcas) - usar fuente calculada
  histogramCtx.fillStyle = '#2c3e50';
  histogramCtx.font = histogramFont;
  histogramCtx.textAlign = 'center';
  const step = Math.max(1, Math.ceil(numBins / 5));
  const hf = px(histogramFont);
  const labelY = histogramCanvas.height - Math.max(8, Math.round(hf / 2));
  for (let i = 0; i <= numBins; i += step) {
    const x = (i / numBins) * histogramCanvas.width;
    const value = binEdges[i];
    if (value !== undefined) histogramCtx.fillText(value.toFixed(1), x, labelY);
  }

  drawAdaptiveGaussian(stats.mean, stats.std, binEdges[0], binEdges[binEdges.length - 1]);
}

function drawAdaptiveGaussian(mean, std, minX, maxX) {
  // actualizar fonts por si cambió tamaño
  updateFontSizes();

  gaussianCtx.clearRect(0, 0, gaussianCanvas.width, gaussianCanvas.height);

  gaussianCtx.beginPath();
  gaussianCtx.strokeStyle = '#e74c3c';
  gaussianCtx.lineWidth = 3;

  const range = maxX - minX || 1;
  const maxY = 1 / (std * Math.sqrt(2 * Math.PI)) || 1;
  for (let i = 0; i < gaussianCanvas.width; i++) {
    const x = minX + (i / gaussianCanvas.width) * range;
    const y = (1 / (std * Math.sqrt(2 * Math.PI))) * Math.exp(-Math.pow(x - mean, 2) / (2 * Math.pow(std, 2)));
    const scaledY = gaussianCanvas.height - 20 - (y / maxY) * (gaussianCanvas.height - 40);
    i === 0 ? gaussianCtx.moveTo(i, scaledY) : gaussianCtx.lineTo(i, scaledY);
  }
  gaussianCtx.stroke();

  // Línea vertical en la media
  const xMean = ((mean - minX) / range) * gaussianCanvas.width;
  gaussianCtx.beginPath();
  gaussianCtx.moveTo(xMean, 0);
  gaussianCtx.lineTo(xMean, gaussianCanvas.height - 20);
  gaussianCtx.strokeStyle = '#c0392b';
  gaussianCtx.lineWidth = 2;
  gaussianCtx.stroke();

  // Etiqueta de la media (usar fuente responsiva)
  gaussianCtx.fillStyle = '#2c3e50';
  gaussianCtx.font = gaussianFont;
  gaussianCtx.textAlign = 'center';
  const gf = px(gaussianFont);
  const labelY = Math.min(Math.max(15, Math.round(gf * 1.1)), gaussianCanvas.height - 6);
  gaussianCtx.fillText(`μ = ${mean.toFixed(2)}`, Math.min(Math.max(xMean, 20), gaussianCanvas.width - 20), labelY);

  // Eje X
  gaussianCtx.beginPath();
  gaussianCtx.moveTo(0, gaussianCanvas.height - 20);
  gaussianCtx.lineTo(gaussianCanvas.width, gaussianCanvas.height - 20);
  gaussianCtx.strokeStyle = '#7f8c8d';
  gaussianCtx.lineWidth = 1;
  gaussianCtx.stroke();
}

// Listeners para controles del histograma
dataPointsSlider.addEventListener('input', () => {
  dataPoints = parseInt(dataPointsSlider.value);
  dataPointsValue.textContent = dataPoints;
  drawHistogram();
});

binsSlider.addEventListener('input', () => {
  numBins = parseInt(binsSlider.value);
  binsValue.textContent = numBins;
  drawHistogram();
});

distributionMeanSlider.addEventListener('input', () => {
  dataMean = parseFloat(distributionMeanSlider.value);
  distributionMeanValue.textContent = dataMean;
  drawHistogram();
});

distributionStdSlider.addEventListener('input', () => {
  dataStd = parseFloat(distributionStdSlider.value);
  distributionStdValue.textContent = dataStd;
  drawHistogram();
});

// Inicialización al cargar la ventana
window.addEventListener('load', () => {
  updateFontSizes();
  drawNormalDistribution();
  drawHistogram();
});

// Redibujar si se cambia tamaño
window.addEventListener('resize', () => {
  updateFontSizes();
  drawNormalDistribution();
  drawHistogram();
});
