const fabButton = document.querySelector('.fab-button');
const fabButtonIcon = document.querySelector('.fab-button-i');

const lateralMenu = document.querySelector('.lateral-menu');
const menuNavItems = lateralMenu.querySelectorAll('.menu-item-container');

let lastScrollY = window.pageYOffset || document.documentElement.scrollTop;
let fabScrollUpDistance = 0; // Track accumulated scroll-up distance
let fabScrollUpStartTime = null; // Track when continuous scroll-up started
let fabScrollDownDistance = 0; // Track accumulated scroll-down distance
let fabScrollDownStartTime = null; // Track when continuous scroll-down started

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
    // Make FAB button more opaque when clicked
    // Reset scroll distances and timers, immediately switch to scrolling-up
    fabScrollUpDistance = 0;
    fabScrollUpStartTime = null;
    fabScrollDownDistance = 0;
    fabScrollDownStartTime = null;
    fabButton.classList.add('scrolling-up');
    fabButton.classList.remove('scrolling-down');
    
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

// Handle scroll direction for FAB button
function handleScroll() {
    if (!fabButton) return;
    
    const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;
    const isScrollingDown = currentScrollY > lastScrollY;
    
    // Update scroll direction class on FAB button
    if (isScrollingDown) {
        // Initialize start time if this is the first scroll-down frame
        if (fabScrollDownStartTime === null) {
            fabScrollDownStartTime = Date.now();
        }
        
        // Check if more than 2 seconds have passed since scroll-down started
        const timeElapsed = Date.now() - fabScrollDownStartTime;
        if (timeElapsed > 2000) {
            // Reset counter if more than 2 seconds have passed
            fabScrollDownDistance = 0;
            fabScrollDownStartTime = Date.now();
        }
        
        // Calculate scroll distance in this frame
        const scrollDistance = currentScrollY - lastScrollY;
        // Accumulate scroll-down distance
        fabScrollDownDistance += scrollDistance;
        
        // If scrolled down more than 100px within 2 seconds, switch immediately
        if (fabScrollDownDistance >= 100) {
            fabButton.classList.add('scrolling-down');
            fabButton.classList.remove('scrolling-up');
            // Reset counters after switching
            fabScrollDownDistance = 0;
            fabScrollDownStartTime = null;
            fabScrollUpDistance = 0;
            fabScrollUpStartTime = null;
        } else if (fabButton.classList.contains('scrolling-down')) {
            // Already scrolling-down, keep it that way
            fabButton.classList.add('scrolling-down');
            fabButton.classList.remove('scrolling-up');
        }
        // If still scrolling-up and distance < 100px, keep scrolling-up
    } else {
        // Initialize start time if this is the first scroll-up frame
        if (fabScrollUpStartTime === null) {
            fabScrollUpStartTime = Date.now();
        }
        
        // Check if more than 2 seconds have passed since scroll-up started
        const timeElapsed = Date.now() - fabScrollUpStartTime;
        if (timeElapsed > 2000) {
            // Reset counter if more than 2 seconds have passed
            fabScrollUpDistance = 0;
            fabScrollUpStartTime = Date.now();
        }
        
        // Calculate scroll distance in this frame
        const scrollDistance = lastScrollY - currentScrollY;
        // Accumulate scroll-up distance
        fabScrollUpDistance += scrollDistance;
        
        // If scrolled up more than 500px within 2 seconds, switch immediately
        if (fabScrollUpDistance >= 500) {
            fabButton.classList.add('scrolling-up');
            fabButton.classList.remove('scrolling-down');
            // Reset counters after switching
            fabScrollUpDistance = 0;
            fabScrollUpStartTime = null;
            fabScrollDownDistance = 0;
            fabScrollDownStartTime = null;
        } else if (fabButton.classList.contains('scrolling-up')) {
            // Already scrolling-up, keep it that way
            fabButton.classList.add('scrolling-up');
            fabButton.classList.remove('scrolling-down');
        }
        // If still scrolling-down and distance < 500px, keep scrolling-down
    }
    
    lastScrollY = currentScrollY;
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {

    // Add resize and click handlers
    window.addEventListener('resize', handleResize);
    fabButton.addEventListener('click', toggleMobileMenu);
    
    // Add scroll handler for FAB button translucency
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Set initial scroll direction
    handleScroll();

});