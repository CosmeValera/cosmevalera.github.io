const fabButton = document.querySelector('.fab-button');
const fabButtonIcon = document.querySelector('.fab-button-i');
const lateralMenu = document.querySelector('.lateral-menu');
const menuItems = document.querySelectorAll('.menu-item-container');

// Toggle menu visibility when FAB button is clicked
function initializeDesktopMenu() {
    if (window.innerWidth >= 768) { // $break-medium
        menuItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(20px)';
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, 100 * (index + 1));
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
        fabButtonIcon.classList.add('fa-ellipsis-v');
    }
}

// Toggle menu visibility when FAB button is clicked
function toggleMobileMenu() {
    fabButton.classList.toggle('active');
    lateralMenu.classList.toggle('active');
    fabButtonIcon.classList.toggle('fa-ellipsis-v');
    fabButtonIcon.classList.toggle('fa-times');
    
    if (lateralMenu.classList.contains('active')) {
        menuItems.forEach((item, index) => {
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

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeDesktopMenu();
    showActiveTooltip();
    
    // Add resize and click handlers
    window.addEventListener('resize', handleResize);
    fabButton.addEventListener('click', toggleMobileMenu);
});