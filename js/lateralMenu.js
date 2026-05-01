const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const mobileMenuIcon = mobileMenuToggle ? mobileMenuToggle.querySelector('i') : null;
const lateralMenuPill = document.querySelector('.lateral-menu-pill');

// Toggle menu visibility when FAB button is clicked
function toggleMobileMenu() {
    if (!mobileMenuToggle || !lateralMenuPill) return;

    mobileMenuToggle.classList.toggle('active');
    lateralMenuPill.classList.toggle('active');
    
    // Toggle icon
    if (mobileMenuIcon) {
        if (mobileMenuToggle.classList.contains('active')) {
            mobileMenuIcon.classList.remove('fa-bars');
            mobileMenuIcon.classList.add('fa-times');
        } else {
            mobileMenuIcon.classList.remove('fa-times');
            mobileMenuIcon.classList.add('fa-bars');
        }
    }
}

// Handle screen resize
function handleResize() {
    if (window.innerWidth >= 768) { // $break-medium
        // Remove active states when transitioning to desktop
        if (lateralMenuPill) lateralMenuPill.classList.remove('active');
        if (mobileMenuToggle) {
            mobileMenuToggle.classList.remove('active');
            if (mobileMenuIcon) {
                mobileMenuIcon.classList.remove('fa-times');
                mobileMenuIcon.classList.add('fa-bars');
            }
        }
    }
}

// Close menu when clicking outside
function handleClickOutside(event) {
    if (!lateralMenuPill || !mobileMenuToggle) return;
    
    const isClickInsideMenu = lateralMenuPill.contains(event.target);
    const isClickOnToggle = mobileMenuToggle.contains(event.target);
    
    if (!isClickInsideMenu && !isClickOnToggle && lateralMenuPill.classList.contains('active')) {
        toggleMobileMenu();
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    }
    
    window.addEventListener('resize', handleResize);
    document.addEventListener('click', handleClickOutside);
});