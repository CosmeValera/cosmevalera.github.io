function attachHoverToPreviewInPhone() {
    // Only run on mobile (max-width: 767px)
    if (!window.matchMedia('(max-width: 767px)').matches) {
        return;
    }

    const cards = Array.from(document.querySelectorAll('.blog-card'));
    if (!cards.length) return;

    const previewByCard = new Map(
        cards.map(card => [card, card.querySelector('.blog-card-cover-preview-down')])
    );
    const lastCard = cards[cards.length - 1];

    let centerCard = null;
    let bottomReached = false;

    function applyPreview() {
        const target = bottomReached ? lastCard : centerCard;
        previewByCard.forEach((preview, card) => {
            if (!preview) return;
            preview.classList.toggle('show-preview', card === target);
        });
    }

    // Viewport is collapsed to a horizontal line at the middle via rootMargin;
    // the card currently crossing that line is the "centered" one.
    const centerObserver = new IntersectionObserver((entries) => {
        for (const entry of entries) {
            if (entry.isIntersecting) centerCard = entry.target;
        }
        applyPreview();
    }, { rootMargin: '-50% 0px -50% 0px', threshold: 0 });

    cards.forEach(card => centerObserver.observe(card));

    // When the last card is mostly visible we're at the bottom of the list —
    // force its preview so the final item never gets skipped.
    const bottomObserver = new IntersectionObserver((entries) => {
        bottomReached = entries[0].intersectionRatio >= 0.9;
        applyPreview();
    }, { threshold: [0, 0.9, 1] });

    bottomObserver.observe(lastCard);
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
            // Get all tags from the card using data-filter attribute
            const tags = Array.from(card.querySelectorAll('.blog-card-tag'))
                .map(tag => tag.getAttribute('data-filter') || tag.textContent.trim().toLowerCase());
            
            // Normalize selected filter
            const filter = selectedFilter.toLowerCase();
            
            let matches = false;
            
            matches = tags.some(tagFilter => {
                // Use the data-filter value directly for comparison
                return tagFilter === filter || tagFilter.includes(filter);
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
    
    // Close modal when navigation links are clicked
    const navigationLinks = document.querySelectorAll('.filter-modal-navigation-link');
    navigationLinks.forEach(link => {
        link.addEventListener('click', () => {
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
                        .map(tag => tag.getAttribute('data-filter') || tag.textContent.trim().toLowerCase());
                    
                    const filter = selectedFilter.toLowerCase();
                    let matches = false;
                    
                    matches = tags.some(tagFilter => {
                        return tagFilter === filter || tagFilter.includes(filter);
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

function managePulseAnimation() {
    // Only relevant for desktop where hover exists
    if (!window.matchMedia('(min-width: 768px)').matches) return;

    const cards = document.querySelectorAll('.blog-card');
    let hoverCount = 0;
    const HOVER_THRESHOLD = 2; // Reduced threshold as per user preference (implied)

    function onCardHover() {
        hoverCount++;
        if (hoverCount >= HOVER_THRESHOLD) {
            document.body.classList.add('user-has-interacted');
            
            // Cleanup listeners since we are done
            cards.forEach(card => {
                card.removeEventListener('mouseenter', onCardHover);
            });
        }
    }

    cards.forEach(card => {
        card.addEventListener('mouseenter', onCardHover);
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

    managePulseAnimation();         // DESKTOP: HANDLE PULSE ANIMATION LOGIC
});