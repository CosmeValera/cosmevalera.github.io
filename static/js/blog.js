function attachHoverToPreviewInPhone() {
    // Only run on mobile (max-width: 767px)
    if (window.matchMedia('(max-width: 767px)').matches) {
        const cards = Array.from(document.querySelectorAll('.blog-card'));
        const previews = Array.from(document.querySelectorAll('.blog-card-cover-preview'));
        
        function updatePreviewVisibility() {
            let minDistance = Infinity;
            let centerCard = null;
  
            const viewportCenter = window.innerHeight / 2;
  
            /////////////////////
            // CASE: LAST CARD //
            /////////////////////
            // Get the last card's bounding rect
            const lastCard = cards[cards.length - 1];
            const lastCardRect = lastCard.getBoundingClientRect();

            // Calculate a point one-third from the bottom (i.e., two-thirds from the top)
            const lastCardThird = lastCardRect.top + (lastCardRect.height * 2 / 3);
            if (lastCardThird > 0 && lastCardThird < window.innerHeight) {
                previews.forEach((preview, idx) => {
                    if (idx === previews.length - 1) {
                        preview.classList.add('show-preview');
                    } else {
                        preview.classList.remove('show-preview');
                    }
                });
                return;
            }
  
            ///////////////////////////////////////////
            // CASE: DEFAULT (ANY CARD BUT LAST ONE) //
            ///////////////////////////////////////////
            // Otherwise, use center card logic
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