document.addEventListener('DOMContentLoaded', function () {
  const btn = document.getElementById('theme-toggle');
  const brightClass = 'bright-theme';

  // Default is dark (no class), 'bright-theme' class enables light mode.
  // The sun/moon icon follows the class through CSS.

  function isBright() {
    return document.body.classList.contains(brightClass);
  }

  function setTheme(isBrightTheme) {
    document.body.classList.toggle(brightClass, isBrightTheme);
    btn.setAttribute('aria-pressed', String(isBrightTheme));
    localStorage.setItem('theme', isBrightTheme ? 'bright' : 'dark');
  }

  // Load preference
  const saved = localStorage.getItem('theme');
  // If saved is 'bright', set it. Otherwise default to dark.
  setTheme(saved === 'bright');

  btn.addEventListener('click', function () {
    setTheme(!isBright());
  });
});
