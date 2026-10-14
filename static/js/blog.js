// Blog index: filter the post grid by topic chip. The active filter is kept
// in the URL (?filter=bitcoin) so a filtered view can be shared or reloaded.
(function () {
  var grid = document.querySelector('[data-post-grid]');
  var chips = Array.from(document.querySelectorAll('.chip[data-filter]'));
  var status = document.querySelector('[data-filter-status]');
  if (!grid || !chips.length) return;

  var cards = Array.from(grid.querySelectorAll('.post-card'));
  var known = chips.map(function (chip) {
    return chip.dataset.filter;
  });

  function apply(filter, updateUrl) {
    if (known.indexOf(filter) === -1) filter = 'all';
    var visible = 0;

    cards.forEach(function (card) {
      var tags = (card.dataset.tags || '').split(' ');
      var show = filter === 'all' || tags.indexOf(filter) !== -1;
      card.classList.toggle('is-hidden', !show);
      if (show) visible++;
    });

    chips.forEach(function (chip) {
      var active = chip.dataset.filter === filter;
      chip.classList.toggle('is-active', active);
      chip.setAttribute('aria-pressed', String(active));
    });

    // The wide featured card only makes sense for the full list.
    if (filter === 'all') grid.removeAttribute('data-filtered');
    else grid.setAttribute('data-filtered', filter);

    if (status) status.textContent = visible + ' ' + (status.dataset.label || '');

    if (updateUrl) {
      var url = new URL(window.location.href);
      if (filter === 'all') url.searchParams.delete('filter');
      else url.searchParams.set('filter', filter);
      history.replaceState(null, '', url);
    }
  }

  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      apply(chip.dataset.filter, true);
    });
  });

  var initial = new URLSearchParams(window.location.search).get('filter');
  if (initial) apply(initial, false);
})();
