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

    initCardClicks();         // CARD CLICK REDIRECT
});
