document.addEventListener('DOMContentLoaded', () => {
  if (window.innerWidth >= 768) return; // Exit early if not mobile
  
  document.querySelectorAll('.blog-card').forEach(card => {
    const preview = card.querySelector('.blog-card-cover-preview');
    let timeoutId;
    
    // Use touch events for mobile instead of mouse events
    card.addEventListener('touchstart', () => {
      clearTimeout(timeoutId);
      preview.classList.remove('timeout');
      timeoutId = setTimeout(() => preview.classList.add('timeout'), 5000);
    });
    
    card.addEventListener('touchend', () => {
      clearTimeout(timeoutId);
      preview.classList.add('timeout');
    });
    
    // Keep mouse events as fallback for devices that support both
    card.addEventListener('mouseenter', () => {
      clearTimeout(timeoutId);
      preview.classList.remove('timeout');
      timeoutId = setTimeout(() => preview.classList.add('timeout'), 5000);
    });
    
    card.addEventListener('mouseleave', () => {
      clearTimeout(timeoutId);
      preview.classList.add('timeout');
    });
  });
});