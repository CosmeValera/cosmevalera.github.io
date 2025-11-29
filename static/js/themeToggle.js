document.addEventListener('DOMContentLoaded', function () {
  const btn = document.getElementById('theme-toggle');
  const text = btn.querySelector('.theme-toggle-text');
  const icon = btn.querySelector('i');
  const darkClass = 'dark-theme';
  const brightClass = 'bright-theme';
  
  const themes = {
    light: { label: 'Light', icon: 'fa-sun' },
    dark: { label: 'Dark', icon: 'fa-moon' },
    bright: { label: 'Bright', icon: 'fa-star' }
  };

  function getCurrentTheme() {
    if (document.body.classList.contains(darkClass)) {
      return 'dark';
    } else if (document.body.classList.contains(brightClass)) {
      return 'bright';
    }
    return 'light';
  }

  function setTheme(theme) {
    // Remove all theme classes
    document.body.classList.remove(darkClass, brightClass);
    
    // Add appropriate class
    if (theme === 'dark') {
      document.body.classList.add(darkClass);
    } else if (theme === 'bright') {
      document.body.classList.add(brightClass);
    }
    
    // Update icon and text
    const themeConfig = themes[theme];
    icon.className = 'fa ' + themeConfig.icon;
    text.textContent = themeConfig.label;
    
    // Save to localStorage
    localStorage.setItem('theme', theme);
  }

  function getNextTheme(currentTheme) {
    const themeOrder = ['light', 'dark', 'bright'];
    const currentIndex = themeOrder.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themeOrder.length;
    return themeOrder[nextIndex];
  }

  // Load preference
  const saved = localStorage.getItem('theme') || 'dark';
  setTheme(saved);

  btn.addEventListener('click', function () {
    const currentTheme = getCurrentTheme();
    const nextTheme = getNextTheme(currentTheme);
    setTheme(nextTheme);
  });
});
