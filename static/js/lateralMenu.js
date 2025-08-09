const fabButton = document.querySelector('.fab-button');
const fabButtonIcon = document.querySelector('.fab-button-i');

const lateralMenu = document.querySelector('.lateral-menu');
const menuNavItems = lateralMenu.querySelectorAll('.menu-item-container');

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

// Initialize
document.addEventListener('DOMContentLoaded', () => {

    // Add resize and click handlers
    window.addEventListener('resize', handleResize);
    fabButton.addEventListener('click', toggleMobileMenu);

});