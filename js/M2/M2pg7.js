const acabadosApp = {
    init() {
    this.bindEvents();
    this.animateRoughnessBars();
    },

    bindEvents() {
    const tabs = document.querySelectorAll('.acabados-container .acabados-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => this.switchTab(e.target.dataset.tab));
    });
    },

    switchTab(tabId) {
    // Remove active class from all tabs and cards
    const allTabs = document.querySelectorAll('.acabados-container .acabados-tab');
    const allCards = document.querySelectorAll('.acabados-container .acabados-card');
    
    allTabs.forEach(tab => tab.classList.remove('active'));
    allCards.forEach(card => card.classList.remove('active'));
    
    // Add active class to selected tab and card
    const selectedTab = document.querySelector(`[data-tab="${tabId}"]`);
    const selectedCard = document.getElementById(tabId);
    
    if (selectedTab) selectedTab.classList.add('active');
    if (selectedCard) selectedCard.classList.add('active');
    },

    animateRoughnessBars() {
    const bars = document.querySelectorAll('.acabados-container .acabados-roughness-fill');
    bars.forEach((bar, index) => {
        const widths = ['5%', '35%', '85%'];
        bar.style.width = '0%';
        setTimeout(() => {
        bar.style.width = widths[index];
        }, 200 * (index + 1));
    });
    }
};

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
    acabadosApp.init();
    // Start animation after a brief delay for better visual effect
    setTimeout(() => acabadosApp.animateRoughnessBars(), 500);
    });
} else {
    acabadosApp.init();
    // Start animation immediately if DOM is already loaded
    setTimeout(() => acabadosApp.animateRoughnessBars(), 500);
}