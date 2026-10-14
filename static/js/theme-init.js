// Runs synchronously in <head>, before first paint, so the page never flashes
// the wrong theme. A saved choice wins; otherwise follow the OS setting.
(function () {
  var root = document.documentElement;
  var saved = null;
  try {
    saved = localStorage.getItem('theme');
  } catch (e) {}

  var theme;
  if (saved === 'bright') theme = 'light';
  else if (saved === 'dark') theme = 'dark';
  else theme = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';

  root.setAttribute('data-theme', theme);
  // Lets the CSS gate scroll-reveal animations on JS being available.
  root.classList.add('js');
})();
