// Site-wide behaviour: header state, mobile menu, theme toggle and
// scroll-reveal animations.
(function () {
  var root = document.documentElement;

  // ----- Header: solid background once the page has scrolled -----
  var header = document.querySelector('[data-header]');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // ----- Mobile menu -----
  var menuToggle = document.querySelector('[data-menu-toggle]');
  var menu = document.querySelector('[data-mobile-menu]');
  if (menuToggle && menu) {
    var setMenu = function (open) {
      menu.hidden = !open;
      menuToggle.setAttribute('aria-expanded', String(open));
      menuToggle.setAttribute('aria-label', open ? menuToggle.dataset.labelClose : menuToggle.dataset.labelOpen);
      document.body.classList.toggle('menu-open', open);
      if (header) header.classList.toggle('menu-open', open);
    };

    menuToggle.addEventListener('click', function () {
      setMenu(menu.hidden);
    });

    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !menu.hidden) {
        setMenu(false);
        menuToggle.focus();
      }
    });

    // Growing past the mobile breakpoint with the menu open would strand the
    // scroll lock, so close it.
    window.matchMedia('(min-width: 768px)').addEventListener('change', function (e) {
      if (e.matches) setMenu(false);
    });
  }

  // ----- Theme toggle -----
  var themeColors = { dark: '#0b0c0a', light: '#f4f3ec' };

  function applyThemeColor(theme) {
    document.querySelectorAll('meta[name="theme-color"]').forEach(function (meta) {
      meta.setAttribute('content', themeColors[theme]);
    });
  }

  applyThemeColor(root.getAttribute('data-theme') || 'dark');

  document.querySelectorAll('[data-theme-toggle]').forEach(function (button) {
    button.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      root.setAttribute('data-theme', next);
      applyThemeColor(next);
      try {
        // 'bright' is the value earlier versions of the site stored.
        localStorage.setItem('theme', next === 'light' ? 'bright' : 'dark');
      } catch (e) {}
    });
  });

  // ----- Scroll reveal -----
  var revealables = document.querySelectorAll('[data-reveal]');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!('IntersectionObserver' in window) || reduceMotion) {
    revealables.forEach(function (el) {
      el.classList.add('is-revealed');
    });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    // Elements entering together cascade in instead of popping at once.
    var batch = entries.filter(function (entry) {
      return entry.isIntersecting;
    });
    batch.forEach(function (entry, i) {
      entry.target.style.setProperty('--reveal-delay', Math.min(i, 6) * 70 + 'ms');
      entry.target.classList.add('is-revealed');
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

  revealables.forEach(function (el) {
    observer.observe(el);
  });
})();
