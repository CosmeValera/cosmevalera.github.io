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
    // Helper functions
    function toggleModal(isOpen) {
        const action = isOpen ? 'add' : 'remove';
        filterModal.classList[action]('show');
        filterButton.classList[action]('active');
    }

    function filterProjects(selectedFilter) {
        const JAVA_FILTER_VALUE = "Java";
        const JAVASCRIPT_FILTER_VALUE = "JavaScript";
        const DEVOPS_FILTER_VALUE = "DevOps";
        const projectCards = document.querySelectorAll('.project-card');
        
        // Show all projects if no filter selected
        if (!selectedFilter) {
            projectCards.forEach(card => card.style.display = 'block');
            return;
        }
        
        // Filter projects
        projectCards.forEach(card => {
            const cardTechnology = card.querySelector(".card-technology").textContent;
            let matches = false;

            switch (selectedFilter) {
                case DEVOPS_FILTER_VALUE:
                    matches = cardTechnology.includes('K8s');
                    break;
                case JAVA_FILTER_VALUE:
                    // Show Java projects but exclude those that also have JavaScript
                    matches = cardTechnology.includes(JAVA_FILTER_VALUE) && 
                           !cardTechnology.includes(JAVASCRIPT_FILTER_VALUE);
                    break;
                case JAVASCRIPT_FILTER_VALUE:
                    matches = cardTechnology.includes(JAVASCRIPT_FILTER_VALUE);
                    break;
                default:
                    // For any other filter, do a simple includes check
                    matches = cardTechnology.includes(selectedFilter);
                    break;
            }
            
            card.style.display = matches ? 'block' : 'none';
        });
    }

    // Remove animations from all cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.classList.remove('animate__animated');
    });

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
        if (filterModal.classList.contains('show') && 
            !filterModal.contains(e.target) && 
            !e.target.closest('.lateral-menu-container .fab-button') && 
            !e.target.closest('#quick-view-button')) {
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
                filterProjects(); // Show all
            } else {
                filterModalOptions.forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');
                filterProjects(selectedFilter);
            }
        });
    });
}

function clickFilterRendersCards() {
    const JAVA_FILTER_VALUE = "Java";
    const JAVASCRIPT_FILTER_VALUE = "JavaScript";
    const DEVOPS_FILTER_VALUE = "DevOps";

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
                    
                    switch (selectedFilter) {
                        case DEVOPS_FILTER_VALUE:
                            return cardTechnology.includes('K8s');
                        case JAVA_FILTER_VALUE:
                            // Show Java projects but exclude those that also have JavaScript
                            return cardTechnology.includes(JAVA_FILTER_VALUE) && 
                                !cardTechnology.includes(JAVASCRIPT_FILTER_VALUE);
                        case JAVASCRIPT_FILTER_VALUE:
                            return cardTechnology.includes(JAVASCRIPT_FILTER_VALUE);
                        default:
                            // For any other filter, do a simple includes check
                            return cardTechnology.includes(selectedFilter);
                    }
                });

                // Display the filtered cards
                projectCards.forEach((card) => {
                    if (!visibleCards.includes(card)) {
                        card.style.display = "none";
                    } else {
                        card.style.display = "block";
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

    handleQuickView();        // PHONE: QUICK VIEW BUTTON
    handleFilter();           // PHONE: FILTER BUTTON

    clickFilterRendersCards() // REACT, ANGULAR, NODE ...

});