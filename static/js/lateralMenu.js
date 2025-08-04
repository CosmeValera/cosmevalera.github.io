const fabButton = document.querySelector('.fab-button');
const fabButtonIcon = document.querySelector('.fab-button-i');

const lateralMenu = document.querySelector('.lateral-menu');
const menuNavItems = lateralMenu.querySelectorAll('.menu-item-container');

// Toggle menu visibility when FAB button is clicked
function initializeDesktopMenu() {
    if (window.innerWidth >= 768) { // $break-medium
        // No animation on desktop - just ensure visibility
        menuNavItems.forEach((item) => {
            item.style.opacity = '1';
            item.style.transform = 'none';
        });
    }
}

// Handle screen resize
function handleResize() {
    if (window.innerWidth >= 768) { // $break-medium
        // Remove active states when transitioning to desktop
        lateralMenu.classList.remove('active');
        fabButton.classList.remove('active');
        fabButtonIcon.classList.remove('fa-times');
        fabButtonIcon.classList.add('fa-bars');
    }
}

// Toggle menu visibility when FAB button is clicked
function toggleMobileMenu() {
    fabButton.classList.toggle('active');
    lateralMenu.classList.toggle('active');
    fabButtonIcon.classList.toggle('fa-bars');
    fabButtonIcon.classList.toggle('fa-times');
    
    if (lateralMenu.classList.contains('active')) {
        menuNavItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(20px)';
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, 100 * (index + 1));
        });
    }
}

function showActiveTooltip() {
    const activeTooltip = document.querySelector('.active-tooltip');
    if (!activeTooltip) return;

    // Get current path and check if tooltip has been shown
    const currentPath = window.location.pathname;
    const tooltipShownKey = `tooltipShown_${currentPath}`;
    const hasTooltipBeenShown = localStorage.getItem(tooltipShownKey);

    if (!hasTooltipBeenShown) {
        // Show tooltip
        activeTooltip.classList.remove('active-tooltip-show');
        void activeTooltip.offsetWidth; // Force reflow
        activeTooltip.classList.add('active-tooltip-show');
        
        // Remove the class after animation completes
        setTimeout(() => {
            activeTooltip.classList.remove('active-tooltip-show');
        }, 4000);

        // Store in localStorage that tooltip has been shown for this path
        localStorage.setItem(tooltipShownKey, 'true');
    }
}

// Quick View functionality
function handleQuickView() {
    const quickViewButton = document.querySelector('#quick-view-button');
    if (!quickViewButton) return;

    quickViewButton.addEventListener('click', () => {
        const projectCards = document.querySelectorAll('.project-card');
        const isActive = quickViewButton.classList.contains('active');
        
        if (isActive) {
            // Deactivate Quick View
            quickViewButton.classList.remove('active');
            projectCards.forEach((card) => {
                card.classList.remove('hovered');
            });
        } else {
            // Activate Quick View
            quickViewButton.classList.add('active');
            projectCards.forEach((card) => {
                card.classList.add('hovered');
            });
        }
    });
}

// Filter functionality
function handleFilter() {
    const filterButton = document.querySelector('#filter-menu-button');
    const filterModal = document.querySelector('#filter-modal');
    const filterModalClose = document.querySelector('#filter-modal-close');
    const filterModalOptions = document.querySelectorAll('.filter-modal-option');
    
    if (!filterButton || !filterModal) return;

    // Toggle modal (open/close)
    filterButton.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent event from bubbling up
        const isModalVisible = filterModal.classList.contains('show');
        if (isModalVisible) {
            filterModal.classList.remove('show');
            filterButton.classList.remove('active');
        } else {
            filterModal.classList.add('show');
            filterButton.classList.add('active');
        }
    });

    // Close modal with X button
    filterModalClose.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent event from bubbling up
        filterModal.classList.remove('show');
        filterButton.classList.remove('active');
    });

    // Prevent clicks inside modal from closing it
    filterModal.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // Close modal when clicking outside
    document.addEventListener('click', (e) => {
        // Check if modal is visible
        if (!filterModal.classList.contains('show')) return;
        
        // Check if click is outside the modal
        if (!filterModal.contains(e.target)) {
            // Check if click is on navigation menu or view button (don't close)
            const isNavigationClick = e.target.closest('.lateral-menu-container');
            const isViewButtonClick = e.target.closest('#quick-view-button');
            
            if (!isNavigationClick && !isViewButtonClick) {
                filterModal.classList.remove('show');
                filterButton.classList.remove('active');
            }
        }
    });

    // Handle filter options
    filterModalOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent event from bubbling up
            const selectedFilter = option.getAttribute('data-filter');
            const isCurrentlySelected = option.classList.contains('selected');

            if (isCurrentlySelected) {
                // Remove selection
                option.classList.remove('selected');
                showAllProjects();
            } else {
                // Remove selection from all other options
                filterModalOptions.forEach(opt => opt.classList.remove('selected'));
                // Add selection to clicked option
                option.classList.add('selected');
                filterProjects(selectedFilter);
            }
            
            // Don't close modal after selection - let user choose multiple or close manually
        });
    });
}

// Helper function to show all projects
function showAllProjects() {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.style.display = 'block';
    });
}

// Helper function to filter projects
function filterProjects(selectedFilter) {
    const JAVA_FILTER_VALUE = "Java";
    const JAVASCRIPT_FILTER_VALUE = "JavaScript";
    
    const projectCards = document.querySelectorAll('.project-card');
    
    const visibleCards = Array.from(projectCards).filter((card) => {
        const cardTechnology = card.querySelector(".card-technology").textContent;
        return cardTechnology.includes(selectedFilter) &&
            !(selectedFilter === JAVA_FILTER_VALUE && cardTechnology.includes(JAVASCRIPT_FILTER_VALUE));
    });

    // Display the filtered cards
    projectCards.forEach((card) => {
        if (!visibleCards.includes(card)) {
            card.style.display = 'none';
        } else {
            card.style.display = 'block';
        }
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeDesktopMenu();
    showActiveTooltip();
    
    // Add resize and click handlers
    window.addEventListener('resize', handleResize);
    fabButton.addEventListener('click', toggleMobileMenu);
    
    // Add handlers for new buttons
    handleQuickView();
    handleFilter();
    handleProjectsActions();
});