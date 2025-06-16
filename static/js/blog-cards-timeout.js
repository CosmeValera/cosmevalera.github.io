// Function to equalize blog card heights on desktop
function equalizeBlogCardHeights() {
  const blogCardsContainer = document.querySelector('.blog-cards');
  if (!blogCardsContainer) return; // Exit if container not found

  const blogCards = Array.from(blogCardsContainer.querySelectorAll('.blog-card'));

  // Apply height equalization only on desktop view (md breakpoint or wider)
  if (window.innerWidth >= 768) {
    // Reset min-height for all cards to auto before recalculating
    blogCards.forEach(card => {
      card.style.minHeight = 'auto';
    });

    // Iterate through cards in pairs (for a 2-column grid)
    for (let i = 0; i < blogCards.length; i += 2) {
      const card1 = blogCards[i];
      const card2 = blogCards[i + 1]; // Will be undefined if it's an odd number of cards

      if (card1) {
        let maxHeight = card1.offsetHeight; // Get height of the first card in the pair

        if (card2) { // If there's a second card in the pair
          maxHeight = Math.max(maxHeight, card2.offsetHeight); // Compare and get the max height
        }

        // Apply the calculated max height as min-height to both cards in the pair
        card1.style.minHeight = `${maxHeight}px`;
        if (card2) {
          card2.style.minHeight = `${maxHeight}px`;
        }
      }
    }
  } else {
    // If not on desktop, ensure cards revert to their natural height
    blogCards.forEach(card => {
      card.style.minHeight = 'auto';
    });
  }
}

// Initial setup on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  equalizeBlogCardHeights();
});

// Recalculate on window resize
window.addEventListener('resize', () => {
  equalizeBlogCardHeights();
});