// Inicializacion de efectos visuales
document.addEventListener('DOMContentLoaded', function() {
  const symbolItems = document.querySelectorAll('.symbol-item');
  
  symbolItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      item.style.transition = 'all 0.5s ease';
      item.style.opacity = '1';
      item.style.transform = 'translateY(0)';
    }, index * 150);
  });
});