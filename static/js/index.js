(function() {
    // Hide scroll indicator on first scroll
    var indicator = document.querySelector('.scroll-indicator');
    if (indicator) {
        var hideIndicator = function() {
            if (window.scrollY > 80) {
                indicator.classList.add('is-hidden');
                window.removeEventListener('scroll', hideIndicator);
            }
        };
        window.addEventListener('scroll', hideIndicator, { passive: true });
    }
})();
