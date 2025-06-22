function attachHoverToPreviewInPhone() {
    // Only run on mobile (max-width: 767px)
    if (window.matchMedia('(max-width: 767px)').matches) {
        const cards = Array.from(document.querySelectorAll('.blog-card'));
        const previews = Array.from(document.querySelectorAll('.blog-card-cover-preview'));
        
        function updatePreviewVisibility() {
            let minDistance = Infinity;
            let centerCard = null;
  
            const viewportCenter = window.innerHeight / 2;
            const scrollBottom = window.innerHeight + window.scrollY;
            const docHeight = document.documentElement.scrollHeight;
  
            // If at (or very near) the bottom, show last card's preview
            if (Math.abs(scrollBottom - docHeight) < 2) {
                previews.forEach((preview, idx) => {
                    if (idx === previews.length - 1) {
                        preview.classList.add('show-preview');
                    } else {
                        preview.classList.remove('show-preview');
                    }
                });
                return;
            }
  
            cards.forEach((card, idx) => {
                const rect = card.getBoundingClientRect();
                const cardCenter = rect.top + rect.height / 2;
                const distance = Math.abs(cardCenter - viewportCenter);
  
                if (distance < minDistance) {
                    minDistance = distance;
                    centerCard = idx;
                }
            });
  
            previews.forEach((preview, idx) => {
                if (idx === centerCard) {
                    preview.classList.add('show-preview');
                } else {
                    preview.classList.remove('show-preview');
                }
            });
        }
  
        // Initial call and on scroll/resize
        updatePreviewVisibility();
        window.addEventListener('scroll', updatePreviewVisibility, { passive: true });
        window.addEventListener('resize', updatePreviewVisibility);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    attachHoverToPreviewInPhone();
});  