// Readings: live search over title, author, description and insights.
// "/" focuses the search box; Esc clears it.
(function () {
  var input = document.querySelector('[data-search]');
  var books = Array.from(document.querySelectorAll('[data-book]'));
  var status = document.querySelector('[data-search-status]');
  var empty = document.querySelector('[data-empty-state]');
  if (!input || !books.length) return;

  // Accent-insensitive, so "pequeno" finds "pequeño".
  function normalize(text) {
    return text.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  }

  var haystacks = books.map(function (book) {
    return normalize(book.textContent);
  });

  function filter() {
    var terms = normalize(input.value.trim()).split(/\s+/).filter(Boolean);
    var visible = 0;

    books.forEach(function (book, i) {
      var match = terms.every(function (term) {
        return haystacks[i].indexOf(term) !== -1;
      });
      book.classList.toggle('is-hidden', !match);
      if (match) visible++;
    });

    if (empty) empty.hidden = visible !== 0;
    if (status) status.textContent = terms.length ? visible + ' / ' + books.length : '';
  }

  input.addEventListener('input', filter);

  input.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      input.value = '';
      filter();
      input.blur();
    }
  });

  document.addEventListener('keydown', function (e) {
    var el = document.activeElement;
    var typing = el && (/^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName) || el.isContentEditable);
    if (e.key === '/' && !typing && !e.metaKey && !e.ctrlKey) {
      e.preventDefault();
      input.focus();
    }
  });
})();
