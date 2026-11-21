function attachHoverToPreviewInPhone() {
  // Only run on mobile (max-width: 767px)
  if (!window.matchMedia('(max-width: 767px)').matches) {
      return;
  }
  
  const cards = Array.from(document.querySelectorAll('.blog-card'));
  const previews = Array.from(document.querySelectorAll('.blog-card-cover-preview-down'));
  
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
      
      // If we're in bottom state, show last card's preview
      if (isAtBottom) {
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

function initializeTabletLayout() {
    // Only run on tablet (min-width: 576px and max-width: 767px)
    if (!window.matchMedia('(min-width: 576px) and (max-width: 767px)').matches) {
        return;
    }
    
    // Tablet layout is static, no JavaScript interaction needed
    // The layout is handled entirely by CSS
    // This function exists for potential future tablet-specific interactions
    
    const cards = Array.from(document.querySelectorAll('.blog-card'));
    
    // Ensure all cards have proper tablet structure
    cards.forEach(card => {
        const tabletWrapper = card.querySelector('.blog-card-tablet-wrapper');
        const tabletContent = card.querySelector('.blog-card-tablet-content');
        const tabletPreview = card.querySelector('.blog-card-cover-preview-tablet');
        
        // Verify tablet structure exists
        if (!tabletWrapper || !tabletContent || !tabletPreview) {
            console.warn('Tablet layout structure missing for card:', card);
        }
    });
}

function initializeTagsSingleDesktop() {
    // Only run on desktop (min-width: 768px) for tags-single
    if (!window.matchMedia('(min-width: 768px)').matches) {
        return;
    }
    
    // Tags-single desktop uses tablet-style layout, no hover effects needed
    // Remove any preview-up classes that might interfere
    const cards = Array.from(document.querySelectorAll('.blog-card'));
    cards.forEach(card => {
        card.classList.remove('preview-up');
    });
}

//////////
// MAIN //
//////////
document.addEventListener('DOMContentLoaded', function () {

  attachHoverToPreviewInPhone();  // PHONE:   hover is attached to scroll

  initializeTabletLayout();       // TABLET:  static layout with image on right

  initializeTagsSingleDesktop();  // DESKTOP: tablet-style layout, no hover

});