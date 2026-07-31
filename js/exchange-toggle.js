// Exchange Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all exchange toggles
    const exchangeToggles = document.querySelectorAll('.exchange-toggle');
    
    exchangeToggles.forEach(toggle => {
        const container = toggle.closest('.exchange-toggle-container');
        const options = toggle.querySelectorAll('.toggle-option');
        const exchangeContents = container.querySelectorAll('.exchange-content');
        
        // Set initial state (21Bitcoin active by default)
        options.forEach((option, index) => {
            if (index === 0) {
                option.classList.add('active');
            } else {
                option.classList.remove('active');
            }
        });
        
        exchangeContents.forEach((content, index) => {
            if (index === 0) {
                content.classList.add('active');
            } else {
                content.classList.remove('active');
            }
        });
        
        // Add click event listeners
        options.forEach((option, index) => {
            option.addEventListener('click', function() {
                // Remove active class from all options
                options.forEach(opt => opt.classList.remove('active'));
                // Add active class to clicked option
                option.classList.add('active');
                
                // Hide all exchange contents
                exchangeContents.forEach(content => content.classList.remove('active'));
                // Show corresponding exchange content
                if (exchangeContents[index]) {
                    exchangeContents[index].classList.add('active');
                }
            });
        });
    });
});