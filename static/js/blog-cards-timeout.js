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

// Function to manage the mobile blog card preview timeout
const cardHandlers = new WeakMap(); // To store event handlers per card

function setupMobileBlogCardTimeout() {
  document.querySelectorAll('.blog-card').forEach(card => {
    const preview = card.querySelector('.blog-card-cover-preview');
    if (!preview) return;

    // Get current handlers for this card, or initialize
    let handlers = cardHandlers.get(card);
    if (!handlers) {
      handlers = {};
      cardHandlers.set(card, handlers);
    }

    // Always clear any existing timeout for this card
    if (handlers.timeoutId) {
      clearTimeout(handlers.timeoutId);
      handlers.timeoutId = null;
    }
    preview.classList.remove('timeout'); // Ensure it's not hidden if switching from mobile to desktop

    // Define handlers once per card
    if (!handlers.handleEnter) {
      handlers.handleEnter = () => {
        clearTimeout(handlers.timeoutId);
        preview.classList.remove('timeout');
        handlers.timeoutId = setTimeout(() => preview.classList.add('timeout'), 30000);
      };
      handlers.handleLeave = () => {
        clearTimeout(handlers.timeoutId);
        preview.classList.add('timeout');
      };
    }

    // Remove previous listeners if they exist
    if (handlers.listenersAttached) {
      card.removeEventListener('touchstart', handlers.handleEnter);
      card.removeEventListener('touchend', handlers.handleLeave);
      card.removeEventListener('mouseenter', handlers.handleEnter);
      card.removeEventListener('mouseleave', handlers.handleLeave);
    }

    if (window.innerWidth < 768) {
      // Add listeners for mobile
      card.addEventListener('touchstart', handlers.handleEnter);
      card.addEventListener('touchend', handlers.handleLeave);
      card.addEventListener('mouseenter', handlers.handleEnter); // Keep mouse for hybrid devices
      card.addEventListener('mouseleave', handlers.handleLeave); // Keep mouse for hybrid devices
      handlers.listenersAttached = true;
    } else {
      // If desktop, ensure no timeout class and no active listeners
      handlers.listenersAttached = false;
    }
  });
}

// Initial setup on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  setupMobileBlogCardTimeout();
  equalizeBlogCardHeights();
});

// Recalculate on window resize
window.addEventListener('resize', () => {
  setupMobileBlogCardTimeout();
  equalizeBlogCardHeights();
});