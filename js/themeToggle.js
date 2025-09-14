document.addEventListener('DOMContentLoaded', function () {
  const btn = document.getElementById('theme-toggle');
  const text = btn.querySelector('.theme-toggle-text');
  const icon = btn.querySelector('i');
  const darkClass = 'dark-theme';
  const darkLabel = 'Dark';
  const lightLabel = 'Light';

  function setTheme(isDark) {
    document.body.classList.toggle(darkClass, isDark);
    if (isDark) {
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
      text.textContent = lightLabel;
    } else {
      icon.classList.remove('fa-sun');
      icon.classList.add('fa-moon');
      text.textContent = darkLabel;
    }
  }

  // Load preference
  const saved = localStorage.getItem('theme');
  let isDark = saved === 'dark';
  setTheme(isDark);

  btn.addEventListener('click', function () {
    isDark = !document.body.classList.contains(darkClass);
    setTheme(isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
});
