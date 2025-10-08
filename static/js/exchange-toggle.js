// Exchange Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all exchange toggles
    const exchangeToggles = document.querySelectorAll('.exchange-toggle');
    
    exchangeToggles.forEach(toggle => {
        const container = toggle.closest('.exchange-toggle-container');
        const options = toggle.querySelectorAll('.toggle-option');
        const imageSets = container.querySelectorAll('.image-set');
        
        // Set initial state (21Bitcoin active by default)
        options.forEach((option, index) => {
            if (index === 0) {
                option.classList.add('active');
            } else {
                option.classList.remove('active');
            }
        });
        
        imageSets.forEach((imageSet, index) => {
            if (index === 0) {
                imageSet.classList.add('active');
            } else {
                imageSet.classList.remove('active');
            }
        });
        
        // Add click event listeners
        options.forEach((option, index) => {
            option.addEventListener('click', function() {
                // Remove active class from all options
                options.forEach(opt => opt.classList.remove('active'));
                // Add active class to clicked option
                option.classList.add('active');
                
                // Hide all image sets
                imageSets.forEach(set => set.classList.remove('active'));
                // Show corresponding image set
                if (imageSets[index]) {
                    imageSets[index].classList.add('active');
                }
            });
        });
    });
});
