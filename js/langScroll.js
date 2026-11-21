// Keep the reading position when switching EN <-> ES. The two versions of a
// page differ in length, so the position travels as a fraction of the
// scrollable height rather than in pixels. Runs once per click and once per
// load: no scroll listeners.
(function () {
  const KEY = 'lang-switch-scroll';

  function maxScroll() {
    return document.documentElement.scrollHeight - window.innerHeight;
  }

  document.addEventListener('click', function (event) {
    const link = event.target.closest('.lang-switch');
    if (!link) return;
    const max = maxScroll();
    try {
      sessionStorage.setItem(KEY, JSON.stringify({
        path: new URL(link.href).pathname,
        ratio: max > 0 ? window.scrollY / max : 0,
      }));
    } catch (e) {}
  });

  function restore() {
    let saved;
    try {
      saved = JSON.parse(sessionStorage.getItem(KEY));
      sessionStorage.removeItem(KEY);
    } catch (e) {
      return;
    }
    if (!saved || saved.path !== location.pathname || !saved.ratio) return;
    // 'instant' overrides the site-wide scroll-behavior: smooth.
    window.scrollTo({ top: saved.ratio * maxScroll(), behavior: 'instant' });
  }

  // A prerendered page (see the speculation rules in base.html) has already
  // run this script before the click, so wait until it is actually shown.
  if (document.prerendering) {
    document.addEventListener('prerenderingchange', restore, { once: true });
  } else {
    restore();
  }
})();
