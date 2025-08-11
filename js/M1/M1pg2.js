// ==================== SIMULACIÓN DE LANZAMIENTOS DE DADO ====================
const rollDieBtn = document.getElementById('rollDieBtn');
const roll10TimesBtn = document.getElementById('roll10TimesBtn');
const roll100TimesBtn = document.getElementById('roll100TimesBtn');
const resetRollsBtn = document.getElementById('resetRollsBtn');
const rollResultsDiv = document.getElementById('rollResults');
const frequencyChartDiv = document.getElementById('frequencyChart');
const totalRollsSpan = document.getElementById('totalRolls');
const mostFrequentSpan = document.getElementById('mostFrequent');
const leastFrequentSpan = document.getElementById('leastFrequent');

let rollCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
let totalRolls = 0;

function rollDie() {
  const result = Math.floor(Math.random() * 6) + 1;
  rollCounts[result]++;
  totalRolls++;
  updateRollDisplay(result);
  updateFrequencyChart();
  updateStats();
}

function updateRollDisplay(newRoll) {
  // Clear initial message if present
  if (rollResultsDiv.querySelector('p')) {
    rollResultsDiv.innerHTML = '';
  }
  const dieFace = document.createElement('span');
  dieFace.className = 'die-face';
  dieFace.textContent = newRoll;
  rollResultsDiv.appendChild(dieFace);

  // Limit the number of displayed die faces for performance/readability
  if (rollResultsDiv.children.length > 20) {
    rollResultsDiv.removeChild(rollResultsDiv.children[0]);
  }
  totalRollsSpan.textContent = totalRolls;
}

function updateFrequencyChart() {
  frequencyChartDiv.innerHTML = ''; // Clear previous bars
  const maxCount = Math.max(...Object.values(rollCounts));

  for (let i = 1; i <= 6; i++) {
    const barItem = document.createElement('div');
    barItem.className = 'bar-chart-item';

    const barHeight = maxCount > 0 ? (rollCounts[i] / maxCount) * 100 : 0;
    const bar = document.createElement('div');
    bar.className = 'bar';
    bar.style.height = `${barHeight}px`;

    const label = document.createElement('span');
    label.className = 'bar-label';
    label.textContent = `${i} (${((rollCounts[i] / totalRolls) * 100 || 0).toFixed(1)}%)`;

    barItem.appendChild(bar);
    barItem.appendChild(label);
    frequencyChartDiv.appendChild(barItem);
  }
}

function updateStats() {
  if (totalRolls === 0) {
    mostFrequentSpan.textContent = '-';
    leastFrequentSpan.textContent = '-';
    return;
  }

  let maxCount = 0;
  let minCount = totalRolls;
  let mostFrequent = [];
  let leastFrequent = [];

  // Find max and min counts
  for (let i = 1; i <= 6; i++) {
    if (rollCounts[i] > maxCount) {
      maxCount = rollCounts[i];
    }
    if (rollCounts[i] < minCount) {
      minCount = rollCounts[i];
    }
  }

  // Find all faces with max and min counts
  for (let i = 1; i <= 6; i++) {
    if (rollCounts[i] === maxCount) {
      mostFrequent.push(i);
    }
    if (rollCounts[i] === minCount) {
      leastFrequent.push(i);
    }
  }

  mostFrequentSpan.textContent = mostFrequent.join(', ') + ` (${maxCount} veces)`;
  leastFrequentSpan.textContent = leastFrequent.join(', ') + ` (${minCount} veces)`;
}

function resetRolls() {
  rollCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
  totalRolls = 0;
  rollResultsDiv.innerHTML = '<p>¡Lanza el dado para empezar!</p>';
  totalRollsSpan.textContent = totalRolls;
  updateFrequencyChart();
  updateStats();
}

// Event listeners para el dado
rollDieBtn.addEventListener('click', rollDie);
roll10TimesBtn.addEventListener('click', () => {
  for (let i = 0; i < 10; i++) {
    rollDie();
  }
});
roll100TimesBtn.addEventListener('click', () => {
  for (let i = 0; i < 100; i++) {
    rollDie();
  }
});
resetRollsBtn.addEventListener('click', resetRolls);

// ==================== VALIDACIÓN DE PROBABILIDADES ====================
const p1Input = document.getElementById('p1');
const p2Input = document.getElementById('p2');
const p3Input = document.getElementById('p3');
const p1Validation = document.getElementById('p1Validation');
const p2Validation = document.getElementById('p2Validation');
const p3Validation = document.getElementById('p3Validation');
const sumProbabilitiesSpan = document.getElementById('sumProbabilities');
const sumValidationDiv = document.getElementById('sumValidation');

function validateProbabilities() {
  let p1 = parseFloat(p1Input.value);
  let p2 = parseFloat(p2Input.value);
  let p3 = parseFloat(p3Input.value);

  // Validate individual probabilities
  function validateSingleProb(value, validationSpan) {
    if (isNaN(value) || value < 0 || value > 1) {
      validationSpan.textContent = 'Debe ser entre 0 y 1';
      validationSpan.className = 'validation-message';
      return false;
    } else {
      validationSpan.textContent = '✓ OK';
      validationSpan.className = 'validation-message valid';
      return true;
    }
  }

  const p1Valid = validateSingleProb(p1, p1Validation);
  const p2Valid = validateSingleProb(p2, p2Validation);
  const p3Valid = validateSingleProb(p3, p3Validation);

  // Validate sum
  let sum = 0;
  if (!isNaN(p1)) sum += p1;
  if (!isNaN(p2)) sum += p2;
  if (!isNaN(p3)) sum += p3;

  sumProbabilitiesSpan.textContent = sum.toFixed(2);

  if (p1Valid && p2Valid && p3Valid) {
    if (Math.abs(sum - 1) < 0.001) {
      sumValidationDiv.textContent = '✓ ¡Suma Correcta (igual a 1)!';
      sumValidationDiv.className = 'validation-message valid';
    } else {
      sumValidationDiv.textContent = `✗ La suma es ${sum.toFixed(2)}, debe ser 1`;
      sumValidationDiv.className = 'validation-message';
    }
  } else {
    sumValidationDiv.textContent = '✗ Corrige las probabilidades individuales primero.';
    sumValidationDiv.className = 'validation-message';
  }
}

// Event listeners para validación de probabilidades
p1Input.addEventListener('input', validateProbabilities);
p2Input.addEventListener('input', validateProbabilities);
p3Input.addEventListener('input', validateProbabilities);

// Inicialización
window.addEventListener('load', function() {
  validateProbabilities();
  updateFrequencyChart();
  updateStats();
});