// Store original card positions and dimensions for absolute positioning on hover
const cardOriginalStates = new WeakMap();

function setupHoverEffect() {
  const blogCards = document.querySelectorAll('.blog-card');

  blogCards.forEach(card => {
    // Remove existing listeners to prevent duplicates on resize
    if (cardOriginalStates.has(card)) {
      const oldState = cardOriginalStates.get(card);
      card.removeEventListener('mouseenter', oldState.enterHandler);
      card.removeEventListener('mouseleave', oldState.leaveHandler);
    }

    const enterHandler = () => {
      if (window.innerWidth < 768) return; // Only apply on desktop

      const rect = card.getBoundingClientRect();

      // Store original computed styles to revert later, and current position
      cardOriginalStates.set(card, {
        originalPosition: card.style.position,
        originalTop: card.style.top,
        originalLeft: card.style.left,
        originalWidth: card.style.width,
        originalHeight: card.style.height,
        placeholder: null, // Will store the placeholder element
        enterHandler: enterHandler, // Store handlers for removal
        leaveHandler: leaveHandler
      });

      // Create a placeholder to maintain layout space
      const placeholder = document.createElement('div');
      placeholder.style.width = `${rect.width}px`;
      placeholder.style.height = `${rect.height}px`;
      placeholder.classList.add('blog-card-placeholder'); // Add class for potential styling
      card.parentNode.insertBefore(placeholder, card);
      cardOriginalStates.get(card).placeholder = placeholder;

      // Set card to absolute position, locking it in its current screen position
      card.style.position = 'absolute';
      card.style.top = `${rect.top + window.scrollY}px`;
      card.style.left = `${rect.left + window.scrollX}px`;
      card.style.width = `${rect.width}px`;
      card.style.height = `${rect.height}px`; // Maintain original height during transition start
      card.style.transition = 'height 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease'; // Ensure smooth transitions
      card.style.zIndex = '10'; // Ensure it's on top

      card.classList.add('is-hovered'); // Trigger CSS for expansion
    };

    const leaveHandler = () => {
      if (window.innerWidth < 768) return; // Only apply on desktop

      const state = cardOriginalStates.get(card);
      if (!state) return;

      // Revert card styles
      card.style.position = state.originalPosition;
      card.style.top = state.originalTop;
      card.style.left = state.originalLeft;
      card.style.width = state.originalWidth;
      card.style.height = state.originalHeight;
      card.style.transition = ''; // Remove inline transition to let CSS handle it
      card.style.zIndex = ''; // Revert z-index

      card.classList.remove('is-hovered'); // Remove expansion trigger

      // Remove placeholder
      if (state.placeholder && state.placeholder.parentNode) {
        state.placeholder.parentNode.removeChild(state.placeholder);
      }
      cardOriginalStates.delete(card); // Clean up state
    };

    card.addEventListener('mouseenter', enterHandler);
    card.addEventListener('mouseleave', leaveHandler);

    cardOriginalStates.set(card, { enterHandler, leaveHandler }); // Store handlers for removal
  });
}

// Initial setup on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  setupHoverEffect();
});

// Recalculate on window resize
window.addEventListener('resize', () => {
  setupHoverEffect();
});