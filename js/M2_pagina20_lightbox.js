// Lightbox para imágenes de modales elementInfo en M2_pagina2.html

document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('lightboxModal');
    const modalImg = document.getElementById('lightboxImg');
    const closeBtn = document.getElementById('lightboxClose');

    // Delegación: abrir lightbox al hacer click en imagen de modal-content
    document.body.addEventListener('click', function (e) {
        if (e.target.matches('.modal-content img')) {
            modal.style.display = 'flex';
            modalImg.src = e.target.src;
            document.body.style.overflow = 'hidden';
        }
    });

    closeBtn.addEventListener('click', function () {
        modal.style.display = 'none';
        modalImg.src = '';
        document.body.style.overflow = '';
    });

    // Cerrar lightbox al hacer click fuera de la imagen
    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            modalImg.src = '';
            document.body.style.overflow = '';
        }
    });
}); 