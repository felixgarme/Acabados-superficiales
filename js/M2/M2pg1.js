// Funciones interactivas
function highlightGrades() {
    const rows = document.querySelectorAll('#tableBody tr');
    rows.forEach((row, index) => {
        setTimeout(() => {
            row.classList.add('highlight-row');
            setTimeout(() => {
                row.classList.remove('highlight-row');
            }, 1500);
        }, index * 200);
    });
}

function showConversion() {
    const rows = document.querySelectorAll('#tableBody tr');
    rows.forEach((row, index) => {
        const raMicro = parseFloat(row.cells[3].textContent);
        const raInch = parseFloat(row.cells[1].textContent);
        const conversion = (raMicro * 39.37).toFixed(2);
        
        setTimeout(() => {
            if (Math.abs(conversion - raInch) < 1) {
                row.style.backgroundColor = '#d4edda';
                row.style.borderLeft = '4px solid #28a745';
            } else {
                row.style.backgroundColor = '#fff3cd';
                row.style.borderLeft = '4px solid #ffc107';
            }
        }, index * 150);
    });
}

function resetTable() {
    const rows = document.querySelectorAll('#tableBody tr');
    rows.forEach(row => {
        row.classList.remove('highlight-row');
        row.style.backgroundColor = '';
        row.style.borderLeft = '';
    });
}

function convertUnits() {
    const value = parseFloat(document.getElementById('inputValue').value);
    const fromUnit = document.getElementById('fromUnit').value;
    const resultDiv = document.getElementById('calcResult');
    
    if (isNaN(value) || value < 0) {
        resultDiv.innerHTML = 'Por favor, ingrese un valor válido';
        resultDiv.style.display = 'block';
        return;
    }
    
    let result;
    if (fromUnit === 'um') {
        result = value * 39.37;
        resultDiv.innerHTML = `${value} μm = <strong>${result.toFixed(2)} μin</strong>`;
    } else {
        result = value / 39.37;
        resultDiv.innerHTML = `${value} μin = <strong>${result.toFixed(4)} μm</strong>`;
    }
    
    resultDiv.style.display = 'block';
    resultDiv.classList.add('fade-in');
}

// Efectos de entrada
document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

// Enter key para calculadora
document.getElementById('inputValue').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        convertUnits();
    }
});
