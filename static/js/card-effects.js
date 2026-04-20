// Card Spotlight Glow Effect
// Tracks mouse position and creates a radial glow that follows the cursor
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var selectors = '.project-card, .home-project-card, .home-post-card';

  function handleMove(e) {
    var rect = this.getBoundingClientRect();
    this.style.setProperty('--mouse-x', (e.clientX - rect.left) + 'px');
    this.style.setProperty('--mouse-y', (e.clientY - rect.top) + 'px');
  }

  function init() {
    var cards = document.querySelectorAll(selectors);
    cards.forEach(function (card) {
      card.addEventListener('mousemove', handleMove);
    });
  }

  document.addEventListener('DOMContentLoaded', init);
})();
