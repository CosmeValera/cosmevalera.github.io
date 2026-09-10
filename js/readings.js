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
    
    const readingCards = Array.from(document.querySelectorAll('.reading-card')).map(card => ({
        element: card,
        searchableText: [
            card.querySelector('.reading-title')?.textContent || '',
            card.querySelector('.reading-author')?.textContent || '',
            card.querySelector('.reading-description')?.textContent || ''
        ].join(' ').toLowerCase()
    }));
    const totalBooks = readingCards.length;
    let queued = false;
    let pendingSearchTerm = '';
    
    function applySearch() {
        queued = false;
        let visibleCount = 0;
        
        readingCards.forEach(card => {
            const matches = pendingSearchTerm === '' || card.searchableText.includes(pendingSearchTerm);
            card.element.classList.toggle('is-hidden', !matches);

            if (matches) {
                visibleCount++;
            }
        });
        
        updateBookCounter(pendingSearchTerm, visibleCount, totalBooks);
    }

    searchInput.addEventListener('input', function(e) {
        pendingSearchTerm = e.target.value.toLowerCase().trim();

        if (!queued) {
            queued = true;
            window.requestAnimationFrame(applySearch);
        }
    });
}

// Update book counter based on visible cards
function updateBookCounter(searchTerm = '', visibleCount, totalBooks) {
    const counter = document.querySelector('.counter-number');
    const counterContainer = document.querySelector('.book-counter');
    if (!counter || !counterContainer) return;
    
    if (searchTerm) {
        counter.textContent = visibleCount;
    } else {
        counter.textContent = totalBooks;
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
