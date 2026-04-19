(function() {
    var sections = document.querySelectorAll('.reveal-section');
    if (!sections.length) return;

    // Only apply scroll-reveal on desktop (>= 1024px)
    var isDesktop = window.matchMedia('(min-width: 1024px)').matches;
    if (!isDesktop) {
        sections.forEach(function(s) { s.classList.add('is-visible'); });
        return;
    }

    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(function(s) { observer.observe(s); });

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
