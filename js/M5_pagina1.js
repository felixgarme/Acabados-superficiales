document.addEventListener('DOMContentLoaded', () => {
    const codeBoxes = document.querySelectorAll('.code-box');
    const codeDescription = document.querySelector('.code-description');
    const typeCards = document.querySelectorAll('.type-card');
    const modal = document.getElementById('typeModal');
    const modalCloseBtn = document.querySelector('.modal-close-btn');
    const modalImage = document.getElementById('modalImage');
    const modalCode = document.getElementById('modalCode');
    const modalDescription = document.getElementById('modalDescription');

    const codeExplanations = [
        "<b>Tipo de Rodamiento:</b> </br> El primer dígito '6' corresponde a un Rodamiento Rígido de Bolas de una hilera, el tipo más común.",
        "<b>Serie de Dimensiones:</b> </br> El segundo dígito '2' indica la serie de dimensiones (relación entre diámetro exterior, anchura y diámetro interior).",
        "<b>Diámetro Interior (Código 1):</b> </br> Los dos últimos dígitos (en este caso, 62) multiplicados por 5 dan el diámetro interior en mm para rodamientos con diámetro de 20mm o más. Aquí, sería un código específico.",
        "<b>Diámetro Interior (Código 2):</b> </br> El código '22' indica un diámetro interior de 22 * 5 = 110 mm.",
        "<b>Sufijos:</b> </br> Los caracteres después de la designación básica indican diseños especiales, materiales o lubricantes. Este '2' podría ser un sufijo."
    ];

    // Interactividad mejorada para code boxes
    codeBoxes.forEach((box, index) => {
        box.addEventListener('click', () => {
            // Quitar clase activa de todas
            codeBoxes.forEach(b => b.classList.remove('active'));

            // Activar la que fue clickeada
            box.classList.add('active');

            // Mostrar descripción con animación
            codeDescription.innerHTML = `<p>${codeExplanations[index]}</p>`;
            codeDescription.classList.add('visible');
        });
    });

    // Funcionalidad del modal mejorada
    typeCards.forEach(card => {
        card.addEventListener('click', () => {
            const identifier = card.querySelector('.type-identifier').textContent.trim();
            const description = card.querySelector('.type-description').textContent.trim();

            modalImage.src = `../assets/images/M1_pagina1/${identifier}.png`;
            modalImage.style.display = 'block';
            modalImage.onerror = () => {
                modalImage.style.display = 'none';
            };

            modalCode.textContent = `Tipo: ${identifier}`;
            modalDescription.textContent = description;

            modal.classList.add('active');
        });
    });

    const closeModal = () => {
        modal.classList.remove('active');
    };

    modalCloseBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Cerrar modal con tecla Escape
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
});