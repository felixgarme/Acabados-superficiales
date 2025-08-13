document.addEventListener('DOMContentLoaded', function() {
  const cards = document.querySelectorAll('.sf-factor-card');
  const expandAllBtn = document.getElementById('sf-expand-all');
  const collapseAllBtn = document.getElementById('sf-collapse-all');
  const progressBar = document.getElementById('sf-progress');
  const progressText = document.getElementById('sf-progress-percent');
  
  let viewedCards = new Set();
  
  function updateProgress() {
    const progress = (viewedCards.size / cards.length) * 100;
    progressBar.style.width = progress + '%';
    progressText.textContent = Math.round(progress) + '%';
  }
  
  function toggleCard(card) {
    const content = card.querySelector('.sf-card-content');
    const toggleBtn = card.querySelector('.sf-toggle-btn');
    const toggleIcon = card.querySelector('.sf-toggle-icon');
    const isExpanded = content.classList.contains('sf-expanded');
    
    if (isExpanded) {
      content.classList.remove('sf-expanded');
      toggleBtn.setAttribute('aria-expanded', 'false');
      toggleIcon.textContent = '+';
    } else {
      content.classList.add('sf-expanded');
      toggleBtn.setAttribute('aria-expanded', 'true');
      toggleIcon.textContent = '−';
      
      if (!viewedCards.has(card)) {
        viewedCards.add(card);
        card.classList.add('sf-viewed');
        updateProgress();
      }
    }
  }
  
  function expandAllCards() {
    cards.forEach(card => {
      const content = card.querySelector('.sf-card-content');
      const toggleBtn = card.querySelector('.sf-toggle-btn');
      const toggleIcon = card.querySelector('.sf-toggle-icon');
      
      content.classList.add('sf-expanded');
      toggleBtn.setAttribute('aria-expanded', 'true');
      toggleIcon.textContent = '−';
      
      if (!viewedCards.has(card)) {
        viewedCards.add(card);
        card.classList.add('sf-viewed');
      }
    });
    updateProgress();
  }
  
  function collapseAllCards() {
    cards.forEach(card => {
      const content = card.querySelector('.sf-card-content');
      const toggleBtn = card.querySelector('.sf-toggle-btn');
      const toggleIcon = card.querySelector('.sf-toggle-icon');
      
      content.classList.remove('sf-expanded');
      toggleBtn.setAttribute('aria-expanded', 'false');
      toggleIcon.textContent = '+';
    });
  }
  
  cards.forEach(card => {
    const header = card.querySelector('.sf-card-header');
    header.addEventListener('click', () => toggleCard(card));
    
    const toggleBtn = card.querySelector('.sf-toggle-btn');
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleCard(card);
    });
  });
  
  expandAllBtn.addEventListener('click', expandAllCards);
  collapseAllBtn.addEventListener('click', collapseAllCards);
  
  updateProgress();
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, {
    threshold: 0.1
  });
  
  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
  });
});