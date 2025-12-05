function attachHoverToPreviewInPhone() {
    // Only run on mobile (max-width: 767px)
    if (!window.matchMedia('(max-width: 767px)').matches) {
        return;
    }
    
    const cards = Array.from(document.querySelectorAll('.blog-card'));
    const previews = Array.from(document.querySelectorAll('.blog-card-cover-preview-down'));
    
    let isAtBottom = false; // Track bottom state to prevent glitching
    let ticking = false; // For requestAnimationFrame throttling
    
    function updatePreviewVisibility() {
        /////////////////////
        // CASE: LAST CARD //
        /////////////////////
        const scrollBottom = window.innerHeight + window.scrollY;
        const docHeight = document.documentElement.scrollHeight;
        const distanceFromBottom = docHeight - scrollBottom;
        
        // Anti-glitch logic: use different thresholds for entering vs exiting bottom state
        if (!isAtBottom && distanceFromBottom < 80) {
            // Entering bottom state
            isAtBottom = true;
        } else if (isAtBottom && distanceFromBottom > 120) {
            // Exiting bottom state (higher threshold to prevent bounce glitch)
            isAtBottom = false;
        }
        
        // If we're in bottom state, show last card's preview
        if (isAtBottom) {
            previews.forEach((preview, idx) => {
                if (idx === previews.length - 1) {
                    preview.classList.add('show-preview');
                } else {
                    preview.classList.remove('show-preview');
                }
            });
            ticking = false;
            return;
        }
        
        ///////////////////////////////////////////
        // CASE: DEFAULT (ANY CARD BUT LAST ONE) //
        ///////////////////////////////////////////
        const viewportCenter = window.innerHeight / 2;
        let minDistance = Infinity;
        let centerCard = null;

        cards.forEach((card, idx) => {
            const rect = card.getBoundingClientRect();
            const cardCenter = rect.top + rect.height / 2;
            const distance = Math.abs(cardCenter - viewportCenter);

            if (distance < minDistance) {
                minDistance = distance;
                centerCard = idx;
            }
        });

        previews.forEach((preview, idx) => {
            if (idx === centerCard) {
                preview.classList.add('show-preview');
            } else {
                preview.classList.remove('show-preview');
            }
        });
        
        ticking = false;
    }

    function onScroll() {
        if (!ticking) {
            window.requestAnimationFrame(updatePreviewVisibility);
            ticking = true;
        }
    }

    // Initial call and on scroll/resize
    updatePreviewVisibility();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
}

function markLastRowCardsInDesktop() {
    // Only run on desktop (min-width: 768px)
    if (!window.matchMedia('(min-width: 768px)').matches) {
        return;
    }
    
    const cards = Array.from(document.querySelectorAll('.blog-card'));
    const total = cards.length;

    // First remove the class from all cards
    cards.forEach(card => card.classList.remove('preview-up'));
    
    // Even number: add class to last two cards
    if (total % 2 === 0) {
        cards[total - 1].classList.add('preview-up');
        cards[total - 2].classList.add('preview-up');
    } else {
        // Odd number: add class to only the last card
        cards[total - 1].classList.add('preview-up');
    }
}

function initializeTabletLayout() {
    // Only run on tablet (min-width: 576px and max-width: 767px)
    if (!window.matchMedia('(min-width: 576px) and (max-width: 767px)').matches) {
        return;
    }
    
    // Tablet layout is static, no JavaScript interaction needed
    // The layout is handled entirely by CSS
    // This function exists for potential future tablet-specific interactions
    
    const cards = Array.from(document.querySelectorAll('.blog-card'));
    
    // Ensure all cards have proper tablet structure
    cards.forEach(card => {
        const tabletWrapper = card.querySelector('.blog-card-tablet-wrapper');
        const tabletContent = card.querySelector('.blog-card-tablet-content');
        const tabletPreview = card.querySelector('.blog-card-cover-preview-tablet');
        
        // Verify tablet structure exists
        if (!tabletWrapper || !tabletContent || !tabletPreview) {
            console.warn('Tablet layout structure missing for card:', card);
        }
    });
}

// Filter functionality
function handleFilter() {
    // Helper functions
    function toggleModal(isOpen) {
        const action = isOpen ? 'add' : 'remove';
        filterModal.classList[action]('show');
        filterButton.classList[action]('active');
    }

    function filterBlogPosts(selectedFilter) {
        const blogCards = document.querySelectorAll('.blog-card');
        
        // Show all posts if no filter selected
        if (!selectedFilter) {
            blogCards.forEach(card => {
                card.style.display = 'flex';
            });
            return;
        }
        
        // Filter posts
        blogCards.forEach(card => {
            // Get all tags from the card
            const tags = Array.from(card.querySelectorAll('.blog-card-tag'))
                .map(tag => tag.textContent.trim().toLowerCase());
            
            // Normalize selected filter
            const filter = selectedFilter.toLowerCase();
            
            let matches = false;
            
            matches = tags.some(tagText => {
                // Simple normalization: remove spaces, lowercase
                const normalizedTag = tagText.replace(/\s+/g, '-').toLowerCase();
                return normalizedTag === filter || normalizedTag.includes(filter);
            });
            
            if (!matches) {
                if (card.classList.contains(`tag-${filter}`)) {
                    matches = true;
                }
                // Also check for "beginner" if filter is "for-beginners"
                if (filter === 'for-beginners' && (card.classList.contains('tag-beginner') || card.classList.contains('tag-for-beginners'))) {
                    matches = true;
                }
                
                // Check if the card has the specific icon wrapper
                if (filter === 'recommended' && card.querySelector('.blog-card-recommended')) {
                    matches = true;
                }
                if (filter === 'for-beginners' && card.querySelector('.blog-card-for-beginners')) {
                    matches = true;
                }
            }

            card.style.display = matches ? 'flex' : 'none';
        });
    }

    //////////////////////////
    // MAIN FILTER FUNCTION //
    //////////////////////////
    const filterButton = document.querySelector('#filter-menu-button');
    const filterModal = document.querySelector('#filter-modal');
    const filterModalClose = document.querySelector('#filter-modal-close');
    const filterModalOptions = document.querySelectorAll('.filter-modal-option');
    
    if (!filterButton || !filterModal) return;

    // Event listeners
    filterButton.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleModal(!filterModal.classList.contains('show'));
    });

    filterModalClose.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleModal(false);
    });

    document.addEventListener('click', (e) => {
        const modalContent = filterModal.querySelector('.filter-modal-content');
        if (filterModal.classList.contains('show') && 
            modalContent && !modalContent.contains(e.target) && 
            !e.target.closest('.mobile-filter-button-container')) {
            toggleModal(false);
        }
    });

    filterModalOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            e.stopPropagation();
            const selectedFilter = option.getAttribute('data-filter');
            const isSelected = option.classList.contains('selected');

            if (isSelected) {
                option.classList.remove('selected');
                filterBlogPosts(); // Show all
            } else {
                filterModalOptions.forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');
                filterBlogPosts(selectedFilter);
            }
            // Close modal after selection on mobile
            toggleModal(false);
        });
    });
}

function clickFilterRendersCards() {
    const filterButtons = document.querySelectorAll(".filter-button");
    const blogCards = document.querySelectorAll(".blog-card");

    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
          const selectedFilter = button.getAttribute("data-filter");
          const isCurrentlySelected = button.classList.contains("selected-filter");

            if (isCurrentlySelected) {
                // If clicking on already selected filter, remove selection (show all)
                button.classList.remove("selected-filter");
                
                // Show all cards
                blogCards.forEach((card) => {
                    card.style.display = "flex";
                });
            } else {
                // Remove selected class from all other buttons
                filterButtons.forEach((btn) => {
                    btn.classList.remove("selected-filter");
                });
                
                // Add selected class to clicked button
                button.classList.add("selected-filter");
                
                // Filter cards based on selected filter
                blogCards.forEach((card) => {
                    // Logic duplicated from handleFilter - ideally should be shared but keeping it simple
                    const tags = Array.from(card.querySelectorAll('.blog-card-tag'))
                        .map(tag => tag.textContent.trim().toLowerCase());
                    
                    const filter = selectedFilter.toLowerCase();
                    let matches = false;
                    
                    matches = tags.some(tagText => {
                        const normalizedTag = tagText.replace(/\s+/g, '-').toLowerCase();
                        return normalizedTag === filter || normalizedTag.includes(filter);
                    });
                    
                    if (!matches) {
                        if (card.classList.contains(`tag-${filter}`)) {
                            matches = true;
                        }
                        if (filter === 'for-beginners' && (card.classList.contains('tag-beginner') || card.classList.contains('tag-for-beginners'))) {
                            matches = true;
                        }
                        if (filter === 'recommended' && card.querySelector('.blog-card-recommended')) {
                            matches = true;
                        }
                        if (filter === 'for-beginners' && card.querySelector('.blog-card-for-beginners')) {
                            matches = true;
                        }
                    }

                    card.style.display = matches ? "flex" : "none";
                });
            }
        });
    });
}

//////////
// MAIN //
//////////
document.addEventListener('DOMContentLoaded', function () {

    attachHoverToPreviewInPhone();  // PHONE:   hover is attached to scroll

    markLastRowCardsInDesktop();    // DESKTOP: mark last cards to show preview up

    initializeTabletLayout();       // TABLET:  static layout with image on right

    handleFilter();                 // PHONE: FILTER BUTTON

    clickFilterRendersCards();      // DESKTOP: FILTER BUTTONS

});