document.addEventListener('DOMContentLoaded', function () {
  const btn = document.getElementById('theme-toggle');
  const icon = btn.querySelector('i');
  const brightClass = 'bright-theme';
  
  // Default is dark (no class), 'bright-theme' class enables light mode
  
  function isBright() {
    return document.body.classList.contains(brightClass);
  }

  function setTheme(isBrightTheme) {
    if (isBrightTheme) {
      document.body.classList.add(brightClass);
      icon.className = 'fas fa-moon'; // Show moon when in bright mode (to switch to dark)
      localStorage.setItem('theme', 'bright');
    } else {
      document.body.classList.remove(brightClass);
      icon.className = 'fas fa-sun'; // Show sun when in dark mode (to switch to bright)
      localStorage.setItem('theme', 'dark');
    }
  }

  // Load preference
  const saved = localStorage.getItem('theme');
  // If saved is 'bright', set it. Otherwise default to dark.
  setTheme(saved === 'bright');

  btn.addEventListener('click', function () {
    setTheme(!isBright());
  });
});
