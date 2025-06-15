document.addEventListener('DOMContentLoaded', () => {
  if (window.innerWidth >= 768) return; // Exit early if not mobile
  
  document.querySelectorAll('.blog-card').forEach(card => {
    const preview = card.querySelector('.blog-card-cover-preview');
    let timeoutId;
    
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