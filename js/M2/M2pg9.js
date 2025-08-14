document.addEventListener('DOMContentLoaded', function() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const contentSections = document.querySelectorAll('.content-section');
    
    function showSection(sectionId) {
        contentSections.forEach(section => {
            section.classList.remove('active');
        });
        
        navButtons.forEach(btn => {
            btn.classList.remove('active');
        });
        
        const targetSection = document.getElementById(sectionId);
        const targetButton = document.querySelector(`[data-section="${sectionId}"]`);
        
        if (targetSection) {
            targetSection.classList.add('active');
        }
        
        if (targetButton) {
            targetButton.classList.add('active');
        }
    }
    
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const sectionId = this.getAttribute('data-section');
            showSection(sectionId);
        });
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        const activeButton = document.querySelector('.nav-btn.active');
        const allButtons = Array.from(navButtons);
        const currentIndex = allButtons.indexOf(activeButton);
        
        if (e.key === 'ArrowLeft' && currentIndex > 0) {
            const prevButton = allButtons[currentIndex - 1];
            const sectionId = prevButton.getAttribute('data-section');
            showSection(sectionId);
        }
        
        if (e.key === 'ArrowRight' && currentIndex < allButtons.length - 1) {
            const nextButton = allButtons[currentIndex + 1];
            const sectionId = nextButton.getAttribute('data-section');
            showSection(sectionId);
        }
    });
    
    // Add smooth scrolling for better mobile experience
    function addSmoothScroll() {
        const container = document.querySelector('.acabados-container');
        if (container) {
            container.style.scrollBehavior = 'smooth';
        }
    }
    
    addSmoothScroll();
    
    // Touch gesture support for mobile
    let startX = 0;
    let startY = 0;
    
    document.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    });
    
    document.addEventListener('touchend', function(e) {
        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;
        const diffX = startX - endX;
        const diffY = startY - endY;
        
        // Only process horizontal swipes that are longer than vertical
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
            const activeButton = document.querySelector('.nav-btn.active');
            const allButtons = Array.from(navButtons);
            const currentIndex = allButtons.indexOf(activeButton);
            
            if (diffX > 0 && currentIndex < allButtons.length - 1) {
                // Swipe left - next section
                const nextButton = allButtons[currentIndex + 1];
                const sectionId = nextButton.getAttribute('data-section');
                showSection(sectionId);
            } else if (diffX < 0 && currentIndex > 0) {
                // Swipe right - previous section
                const prevButton = allButtons[currentIndex - 1];
                const sectionId = prevButton.getAttribute('data-section');
                showSection(sectionId);
            }
        }
    });
});