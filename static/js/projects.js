// Filter functionality
function handleFilter() {
    // Helper functions
    function toggleModal(isOpen) {
        const action = isOpen ? 'add' : 'remove';
        filterModal.classList[action]('show');
        filterButton.classList[action]('active');
    }

    function removeAnimations() {
        document.querySelectorAll('.project-card').forEach(card => {
            const column = card.closest('.col-12');
            if (column) {
                column.classList.remove('animate__animated');
            }
        });
    }

    function filterProjects(selectedFilter) {
        const JAVA_FILTER_VALUE = "Java";
        const JAVASCRIPT_FILTER_VALUE = "JavaScript";
        const DEVOPS_FILTER_VALUE = "DevOps";
        const projectCards = document.querySelectorAll('.project-card');
        
        // Show all projects if no filter selected
        if (!selectedFilter) {
            projectCards.forEach(card => {
                const column = card.closest('.col-12');
                if (column) column.style.display = 'flex';
            });
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
            
            const column = card.closest('.col-12');
            if (column) {
                column.style.display = matches ? 'flex' : 'none';
            }
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
            removeAnimations(); // Remove animations on filter click
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
            // Close modal after selection on mobile
            toggleModal(false);
        });
    });
}

function clickFilterRendersCards() {
    const JAVA_FILTER_VALUE = "Java";
    const JAVASCRIPT_FILTER_VALUE = "JavaScript";
    const DEVOPS_FILTER_VALUE = "DevOps";

    const filterButtons = document.querySelectorAll(".filter-button");
    const projectCards = document.querySelectorAll(".project-card");

    function removeAnimations() {
        document.querySelectorAll('.project-card').forEach(card => {
            const column = card.closest('.col-12');
            if (column) {
                column.classList.remove('animate__animated');
            }
        });
    }
    
    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
          removeAnimations(); // Remove animations on filter click
          const selectedFilter = button.getAttribute("data-filter");
          const isCurrentlySelected = button.classList.contains("selected-filter");

            if (isCurrentlySelected) {
                // If clicking on already selected filter, remove selection (show all)
                button.classList.remove("selected-filter");
                
                // Show all cards
                projectCards.forEach((card) => {
                    const column = card.closest('.col-12');
                    if (column) column.style.display = "flex";
                });
            } else {
                // Remove selected class from all other buttons
                filterButtons.forEach((btn) => {
                    btn.classList.remove("selected-filter");
                });
                
                // Add selected class to clicked button
                button.classList.add("selected-filter");
                
                // Filter cards based on selected filter
                projectCards.forEach((card) => {
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

                    const column = card.closest('.col-12');
                    if (column) {
                        column.style.display = matches ? "flex" : "none";
                    }
                });
            }
        });
    });
}

function initCardClicks() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // If the click was on a button or link inside the card, let it handle the click
            if (e.target.closest('.card-button') || e.target.closest('a')) {
                return;
            }
            
            const demoBtn = card.querySelector('.demo-btn');
            const githubBtn = card.querySelector('.github-btn');
            
            if (demoBtn) {
                window.open(demoBtn.href, '_blank');
            } else if (githubBtn) {
                window.open(githubBtn.href, '_blank');
            }
        });
    });
}

//////////
// MAIN //
//////////
document.addEventListener("DOMContentLoaded", function () {

    handleFilter();           // PHONE: FILTER BUTTON

    clickFilterRendersCards() // REACT, ANGULAR, NODE ...

    initCardClicks();         // CARD CLICK REDIRECT
});