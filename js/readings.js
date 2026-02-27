// Reading card expand/collapse functionality
function initializeReadingCards() {
    const readingCards = document.querySelectorAll('.reading-card');
    
    readingCards.forEach(card => {
        const readMoreBtn = card.querySelector('.read-more-btn');
        const expandedContent = card.querySelector('.reading-expanded-content');
        const readMoreText = card.querySelector('.read-more-text');
        const title = card.querySelector('.reading-title');
        const description = card.querySelector('.reading-description');
        
        if (readMoreBtn && expandedContent) {
            readMoreBtn.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Toggle expanded state
                const isExpanded = expandedContent.classList.contains('show');
                
                if (isExpanded) {
                    // Collapse
                    expandedContent.classList.remove('show');
                    readMoreBtn.classList.remove('expanded');
                    readMoreText.textContent = 'Show more';
                    if (title) title.classList.remove('expanded');
                    if (description) description.classList.remove('expanded');
                } else {
                    // Expand
                    expandedContent.classList.add('show');
                    readMoreBtn.classList.add('expanded');
                    readMoreText.textContent = 'Show less';
                    if (title) title.classList.add('expanded');
                    if (description) description.classList.add('expanded');
                }
            });
        }
    });
}

// Search functionality for readings
function initializeReadingSearch() {
    const searchInput = document.getElementById('search-input');
    if (!searchInput) return;
    
    const readingCards = document.querySelectorAll('.reading-card');
    
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase().trim();
        
        readingCards.forEach(card => {
            const title = card.querySelector('.reading-title')?.textContent.toLowerCase() || '';
            const author = card.querySelector('.reading-author')?.textContent.toLowerCase() || '';
            const description = card.querySelector('.reading-description')?.textContent.toLowerCase() || '';
            
            const matches = title.includes(searchTerm) || 
                          author.includes(searchTerm) || 
                          description.includes(searchTerm);
            
            if (matches || searchTerm === '') {
                card.style.display = '';
                // Add animation
                card.style.animation = 'fadeIn 0.3s ease';
            } else {
                card.style.display = 'none';
            }
        });
        
        // Update book counter if it exists
        updateBookCounter(searchTerm);
    });
}

// Update book counter based on visible cards
function updateBookCounter(searchTerm = '') {
    const counter = document.querySelector('.counter-number');
    const counterContainer = document.querySelector('.book-counter');
    if (!counter || !counterContainer) return;
    
    const visibleCards = document.querySelectorAll('.reading-card:not([style*="display: none"])');
    const totalBooks = document.querySelectorAll('.reading-card').length;
    
    if (searchTerm) {
        counter.textContent = visibleCards.length;
        counterContainer.innerHTML = `<span class="counter-number">${visibleCards.length}</span> books`;
    } else {
        counter.textContent = totalBooks;
        counterContainer.innerHTML = `<span class="counter-number">${totalBooks}</span> books and counting`;
    }
}

// Quick View functionality for readings (if needed)
function handleReadingsQuickView() {
    const quickViewButton = document.querySelector('#readings-quick-view-button');
    if (!quickViewButton) return;

    quickViewButton.addEventListener('click', () => {
        const readingCards = document.querySelectorAll('.reading-card');
        const isActive = quickViewButton.classList.contains('active');
        
        if (isActive) {
            // Deactivate Quick View - collapse all cards
            quickViewButton.classList.remove('active');
            readingCards.forEach(card => {
                const expandedContent = card.querySelector('.reading-expanded-content');
                const readMoreBtn = card.querySelector('.read-more-btn');
                const readMoreText = card.querySelector('.read-more-text');
                const title = card.querySelector('.reading-title');
                const description = card.querySelector('.reading-description');
                
                if (expandedContent && expandedContent.classList.contains('show')) {
                    expandedContent.classList.remove('show');
                    readMoreBtn.classList.remove('expanded');
                    readMoreText.textContent = 'Read more';
                    if (title) title.classList.remove('expanded');
                    if (description) description.classList.remove('expanded');
                }
            });
        } else {
            // Activate Quick View - expand all cards
            quickViewButton.classList.add('active');
            readingCards.forEach(card => {
                const expandedContent = card.querySelector('.reading-expanded-content');
                const readMoreBtn = card.querySelector('.read-more-btn');
                const readMoreText = card.querySelector('.read-more-text');
                const title = card.querySelector('.reading-title');
                const description = card.querySelector('.reading-description');
                
                if (expandedContent && !expandedContent.classList.contains('show')) {
                    expandedContent.classList.add('show');
                    readMoreBtn.classList.add('expanded');
                    readMoreText.textContent = 'Show less';
                    if (title) title.classList.add('expanded');
                    if (description) description.classList.add('expanded');
                }
            });
        }
    });
}

// Add CSS for fade in animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

////////////////////
/////   MAIN   /////
document.addEventListener('DOMContentLoaded', function() {
    // Initialize reading card expand/collapse
    initializeReadingCards();
    
    // Initialize search functionality
    initializeReadingSearch();
    
    // Initialize quick view functionality (if button exists)
    handleReadingsQuickView();
});
