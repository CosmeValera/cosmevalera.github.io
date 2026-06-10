(function() {
    // Hide scroll indicator on first scroll
    var indicator = document.querySelector('.scroll-indicator');
    if (indicator) {
        var hidden = false;
        window.addEventListener('scroll', function() {
            if (!hidden && window.scrollY > 80) {
                hidden = true;
                indicator.classList.add('is-hidden');
            }
        }, { passive: true });
    }
})();
