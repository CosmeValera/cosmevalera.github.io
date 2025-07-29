function clickFilterToggleButton() {
    const filterToggleButton = document.querySelector('.filter-toggle-button');
    const filterDropdown = document.querySelector('.filter-dropdown');
    const filterIcon = document.querySelector('.filter-icon');
    const closeIcon = document.querySelector('.close-icon');

    filterToggleButton.addEventListener('click', () => {
        filterDropdown.classList.toggle('show'); // Toggle the "show" class to display/hide filters

        // Toggle the "no-show" class on the icons to switch between filter and close icons
        filterIcon.classList.toggle('no-show');
        closeIcon.classList.toggle('no-show');
    });
}

function clickToggleHoverButton() {
    const toggleHoverButton = document.querySelector('.toggle-hover-button');
    const projectCards = document.querySelectorAll('.project-card');
    const eyeOpenIcon = toggleHoverButton.querySelector('.fa-eye');
    const eyeClosedIcon = toggleHoverButton.querySelector('.fa-eye-slash');
    
    toggleHoverButton.addEventListener('click', () => {
        projectCards.forEach((card) => {
            card.classList.toggle('hovered'); // Toggle hover effect on each card
        });

        // Toggle the "no-show" class on the icons to switch between eyeOpen and eyeClosed icons
        eyeOpenIcon.classList.toggle('no-show');
        eyeClosedIcon.classList.toggle('no-show');
    });
}

function clickFilterRendersCards() {
    const JAVA_FILTER_VALUE = "Java";
    const JAVASCRIPT_FILTER_VALUE = "JavaScript";

    const filterButtons = document.querySelectorAll(".filter-button");
    const projectCards = document.querySelectorAll(".project-card");
    
    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const selectedFilter = button.getAttribute("data-filter");
            const isCurrentlySelected = button.classList.contains("selected-filter");

            if (isCurrentlySelected) {
                // If clicking on already selected filter, remove selection (show all)
                button.classList.remove("selected-filter");
                
                // Show all cards
                projectCards.forEach((card) => {
                    card.style.display = "block";
                    card.classList.remove("animate__animated");
                });
            } else {
                // Remove selected class from all other buttons
                filterButtons.forEach((btn) => {
                    btn.classList.remove("selected-filter");
                });
                
                // Add selected class to clicked button
                button.classList.add("selected-filter");
                
                // Filter cards based on selected filter
                const visibleCards = Array.from(projectCards).filter((card) => {
                    const cardTechnology = card.querySelector(".card-technology").textContent;
                    return cardTechnology.includes(selectedFilter) &&
                        !(selectedFilter === JAVA_FILTER_VALUE && cardTechnology.includes(JAVASCRIPT_FILTER_VALUE));
                });

                // Display the filtered cards
                projectCards.forEach((card) => {
                    if (!visibleCards.includes(card)) {
                        card.style.display = "none";
                    } else {
                        card.style.display = "block";
                        card.classList.remove("animate__animated");
                    }
                });
            }
        });
    });
}

//////////
// MAIN //
//////////
document.addEventListener("DOMContentLoaded", function () {

    clickFilterToggleButton() // PHONE: Makes 'Filter' buttons appear
    
    clickToggleHoverButton()  // PHONE: Makes 'Quick View' button appear 

    clickFilterRendersCards() // REACT, ANGULAR, NODE ...

});
