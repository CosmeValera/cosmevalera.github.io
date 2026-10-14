// Blog post enhancements: series navigation, table of contents (sticky aside
// on desktop, progress-ring button + bottom sheet on mobile), reading
// progress, heading anchors, code-block copy buttons and image lazy-loading.
(function () {
  var article = document.querySelector('article.post');
  var content = document.querySelector('.post-content');
  if (!article || !content) return;

  // ----- Series mode (?mode=series): prev/next follow the series -----
  if (new URLSearchParams(window.location.search).get('mode') === 'series') {
    document.querySelectorAll('.nav-normal').forEach(function (el) {
      el.hidden = true;
    });
    document.querySelectorAll('.nav-series').forEach(function (el) {
      el.hidden = false;
    });
  }

  // ----- Lazy-load every image after the first (the cover) -----
  content.querySelectorAll('img').forEach(function (img, i) {
    if (i > 0 && !img.hasAttribute('loading')) img.loading = 'lazy';
    img.decoding = 'async';
  });

  // ----- Headings: ids, anchors and the TOC -----
  // Posts write their section headings as raw <h4>.
  var headings = Array.from(content.querySelectorAll('h4'));
  var anchorLabel = article.dataset.anchorLabel || '#';

  function slugify(text) {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }

  var usedIds = {};
  headings.forEach(function (heading, i) {
    if (!heading.id) {
      var base = slugify(heading.textContent) || 'section-' + (i + 1);
      var id = base;
      var n = 2;
      while (usedIds[id] || document.getElementById(id)) id = base + '-' + n++;
      heading.id = id;
    }
    usedIds[heading.id] = true;

    var anchor = document.createElement('a');
    anchor.className = 'heading-anchor';
    anchor.href = '#' + heading.id;
    anchor.setAttribute('aria-label', anchorLabel);
    anchor.textContent = '#';
    heading.appendChild(anchor);
  });

  // TOC text: the heading without its anchor and difficulty badge.
  function headingLabel(heading) {
    var clone = heading.cloneNode(true);
    clone.querySelectorAll('.heading-anchor, .solid-principles-tag').forEach(function (el) {
      el.remove();
    });
    return clone.textContent.trim();
  }

  var tocLinks = [];
  var tocLists = document.querySelectorAll('[data-toc-list]');

  if (headings.length) {
    tocLists.forEach(function (list) {
      headings.forEach(function (heading) {
        var li = document.createElement('li');
        var a = document.createElement('a');
        a.href = '#' + heading.id;
        a.textContent = headingLabel(heading);
        a.dataset.target = heading.id;
        li.appendChild(a);
        list.appendChild(li);
        tocLinks.push(a);
      });
    });

    document.querySelectorAll('[data-toc-aside], [data-toc-fab]').forEach(function (el) {
      el.hidden = false;
    });
  }

  function setActiveHeading(id) {
    tocLinks.forEach(function (link) {
      var active = link.dataset.target === id;
      link.classList.toggle('is-active', active);
      if (active) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
  }

  // ----- On scroll: progress bar, progress ring and the active heading -----
  var bar = document.querySelector('[data-progress]');
  var ring = document.querySelector('[data-progress-ring]');
  var circumference = ring ? 2 * Math.PI * ring.r.baseVal.value : 0;
  var ticking = false;
  var activeId = null;

  if (ring) ring.style.strokeDasharray = String(circumference);

  function update() {
    ticking = false;
    var rect = content.getBoundingClientRect();
    var total = rect.height - window.innerHeight * 0.6;
    var progress = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 1;
    if (bar) bar.style.transform = 'scaleX(' + progress + ')';
    if (ring) ring.style.strokeDashoffset = String(circumference * (1 - progress));

    if (headings.length) {
      // The last heading that has crossed the top third of the viewport.
      var line = window.innerHeight * 0.3;
      var current = headings[0];
      headings.forEach(function (heading) {
        if (heading.getBoundingClientRect().top <= line) current = heading;
      });
      if (current.id !== activeId) {
        activeId = current.id;
        setActiveHeading(activeId);
      }
    }
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }, { passive: true });
  window.addEventListener('resize', update);
  update();

  // ----- Mobile TOC sheet -----
  var fab = document.querySelector('[data-toc-fab]');
  var sheet = document.querySelector('[data-toc-sheet]');

  if (fab && sheet) {
    var setSheet = function (open) {
      sheet.hidden = !open;
      fab.setAttribute('aria-expanded', String(open));
      document.body.classList.toggle('menu-open', open);
      if (open) {
        var active = sheet.querySelector('.toc-list a.is-active') || sheet.querySelector('.toc-list a');
        if (active) {
          active.scrollIntoView({ block: 'center' });
          active.focus({ preventScroll: true });
        }
      } else {
        fab.focus({ preventScroll: true });
      }
    };

    fab.addEventListener('click', function () {
      setSheet(true);
    });

    sheet.addEventListener('click', function (e) {
      if (e.target.closest('[data-toc-close]') || e.target.closest('.toc-list a')) setSheet(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !sheet.hidden) setSheet(false);
    });
  }

  // ----- Code blocks: language label + copy button -----
  var copyLabel = article.dataset.copyLabel || 'Copy';
  var copiedLabel = article.dataset.copiedLabel || 'Copied';

  content.querySelectorAll('pre').forEach(function (pre) {
    var wrapper = document.createElement('div');
    wrapper.className = 'code-block';
    pre.parentNode.insertBefore(wrapper, pre);
    wrapper.appendChild(pre);

    var barEl = document.createElement('div');
    barEl.className = 'code-block-bar';

    var lang = document.createElement('span');
    lang.textContent = pre.dataset.lang || (pre.querySelector('code') || pre).dataset.lang || 'code';
    barEl.appendChild(lang);

    if (navigator.clipboard) {
      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'copy-btn';
      button.textContent = copyLabel;
      button.addEventListener('click', function () {
        navigator.clipboard.writeText(pre.innerText.replace(/\n$/, '')).then(function () {
          button.textContent = copiedLabel;
          button.classList.add('is-copied');
          setTimeout(function () {
            button.textContent = copyLabel;
            button.classList.remove('is-copied');
          }, 1800);
        });
      });
      barEl.appendChild(button);
    }

    wrapper.appendChild(barEl);
  });
})();
