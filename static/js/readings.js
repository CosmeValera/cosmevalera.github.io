function initializeReadingNavigation() {
    const readingCards = document.querySelectorAll('.reading-card-navigation');
    
    readingCards.forEach(card => {
        const navSquares = card.querySelectorAll('.nav-square');
        const contentSections = card.querySelectorAll('.content-section');
        
        navSquares.forEach(square => {
            square.addEventListener('click', function(e) {
                // Prevent the click from bubbling up to the parent card
                e.stopPropagation();
                
                const targetContent = this.getAttribute('data-content');
                
                // Remove active class from all squares and sections
                navSquares.forEach(sq => sq.classList.remove('active'));
                contentSections.forEach(section => section.classList.remove('active'));
                
                // Add active class to clicked square and corresponding section
                this.classList.add('active');
                const targetSection = card.querySelector(`#${targetContent}`);
                if (targetSection) {
                    targetSection.classList.add('active');
                }
            });
        });
    });
}

// Quick View functionality for readings
function handleReadingsQuickView() {
    const quickViewButton = document.querySelector('#readings-quick-view-button');
    if (!quickViewButton) return;

    quickViewButton.addEventListener('click', () => {
        const readingCards = document.querySelectorAll('.reading-card');
        const isActive = quickViewButton.classList.contains('active');
        
        if (isActive) {
            // Deactivate Quick View
            quickViewButton.classList.remove('active');
            readingCards.forEach((card) => {
                card.classList.remove('hovered');
            });
        } else {
            // Activate Quick View
            quickViewButton.classList.add('active');
            readingCards.forEach((card) => {
                card.classList.add('hovered');
            });
        }
    });
}


////////////////////
/////   MAIN   /////
document.addEventListener('DOMContentLoaded', function() {
    // Initialize navigation for reading cards
    initializeReadingNavigation();
    
    // Initialize quick view functionality
    handleReadingsQuickView();
});
