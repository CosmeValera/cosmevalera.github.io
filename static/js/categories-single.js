function attachHoverToPreviewInPhone() {
  // Only run on mobile (max-width: 767px)
  if (!window.matchMedia('(max-width: 767px)').matches) {
      return;
  }
  
  const cards = Array.from(document.querySelectorAll('.reading-card'));
  const overlays = Array.from(document.querySelectorAll('.reading-card-overlay'));
  
  let isAtBottom = false; // Track bottom state to prevent glitching
  
  function updatePreviewVisibility() {
      /////////////////////
      // CASE: LAST CARD //
      /////////////////////
      const scrollBottom = window.innerHeight + window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const distanceFromBottom = docHeight - scrollBottom;
      
      // Anti-glitch logic: use different thresholds for entering vs exiting bottom state
      if (!isAtBottom && distanceFromBottom < 80) {
          // Entering bottom state
          isAtBottom = true;
      } else if (isAtBottom && distanceFromBottom > 120) {
          // Exiting bottom state (higher threshold to prevent bounce glitch)
          isAtBottom = false;
      }
      
      // If we're in bottom state, show last card's overlay
      if (isAtBottom) {
          overlays.forEach((overlay, idx) => {
              if (idx === overlays.length - 1) {
                  overlay.style.opacity = '1';
              } else {
                  overlay.style.opacity = '0';
              }
          });
          return;
      }
      
      ///////////////////////////////////////////
      // CASE: DEFAULT (ANY CARD BUT LAST ONE) //
      ///////////////////////////////////////////
      const viewportCenter = window.innerHeight / 2;
      let minDistance = Infinity;
      let centerCard = null;

      cards.forEach((card, idx) => {
          const rect = card.getBoundingClientRect();
          const cardCenter = rect.top + rect.height / 2;
          const distance = Math.abs(cardCenter - viewportCenter);

          if (distance < minDistance) {
              minDistance = distance;
              centerCard = idx;
          }
      });

      overlays.forEach((overlay, idx) => {
          if (idx === centerCard) {
              overlay.style.opacity = '1';
          } else {
              overlay.style.opacity = '0';
          }
      });
  }

  // Initial call and on scroll/resize
  updatePreviewVisibility();
  window.addEventListener('scroll', updatePreviewVisibility, { passive: true });
  window.addEventListener('resize', updatePreviewVisibility);
}

function markLastRowCardsInDesktop() {
  // Only run on desktop (min-width: 768px)
  if (!window.matchMedia('(min-width: 768px)').matches) {
      return;
  }
  
  const cards = Array.from(document.querySelectorAll('.reading-card'));

  // First remove the class from all cards
  cards.forEach(card => card.classList.remove('preview-up'));
  
  // If there's more than one, add '.preview-up' to the last card
  if (cards.length > 1) {
    cards[cards.length - 1].classList.add('preview-up');
  }
}

//////////
// MAIN //
//////////
document.addEventListener('DOMContentLoaded', function () {
  attachHoverToPreviewInPhone();  // PHONE: hover is attached to scroll
  markLastRowCardsInDesktop();    // DESKTOP: mark last card to show preview up
});
