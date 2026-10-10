function initPhonePreviewHighlight() {
  if (!window.matchMedia('(max-width: 575px)').matches) return;

  const cards = Array.from(document.querySelectorAll('.blog-card'));
  if (!cards.length) return;

  let activeCard = null;
  let ticking = false;

  function setActive(nextCard) {
    if (nextCard === activeCard) return;

    if (activeCard) {
      const oldPreview = activeCard.querySelector('.blog-card-cover-preview-down');
      if (oldPreview) oldPreview.classList.remove('show-preview');
    }

    activeCard = nextCard;

    if (activeCard) {
      const newPreview = activeCard.querySelector('.blog-card-cover-preview-down');
      if (newPreview) newPreview.classList.add('show-preview');
    }
  }

  function updateActiveCard() {
    ticking = false;

    const viewportCenter = window.innerHeight / 2;
    let closestCard = null;
    let closestDistance = Infinity;

    cards.forEach(function(card) {
      if (card.offsetParent === null) return;

      const rect = card.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;

      const cardCenter = rect.top + rect.height / 2;
      const distance = Math.abs(cardCenter - viewportCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestCard = card;
      }
    });

    setActive(closestCard || cards.find(function(card) {
      return card.offsetParent !== null;
    }) || null);
  }

  function requestUpdate() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(updateActiveCard);
  }

  requestUpdate();
  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate);
}

function markLastRowCardsInDesktop() {
  if (!window.matchMedia('(min-width: 768px)').matches) return;

  const cards = Array.from(document.querySelectorAll('.blog-card'))
    .filter(function(card) { return card.offsetParent !== null; });

  cards.forEach(function(card) { card.classList.remove('preview-up'); });

  if (!cards.length) return;

  if (cards.length % 2 === 0) {
    cards[cards.length - 1].classList.add('preview-up');
    cards[cards.length - 2].classList.add('preview-up');
  } else {
    cards[cards.length - 1].classList.add('preview-up');
  }
}

function getCardTags(card) {
  return Array.from(card.querySelectorAll('.blog-card-tag'))
    .map(function(tag) {
      return tag.getAttribute('data-filter') || tag.textContent.trim().toLowerCase();
    });
}

function cardMatchesFilter(card, selectedFilter) {
  if (!selectedFilter) return true;

  const filter = selectedFilter.toLowerCase();
  const tags = getCardTags(card);

  if (tags.some(function(tag) { return tag === filter || tag.includes(filter); })) {
    return true;
  }

  if (card.classList.contains('tag-' + filter)) return true;
  if (filter === 'recommended' && card.querySelector('.blog-card-recommended')) return true;
  if (filter === 'for-beginners' && card.querySelector('.blog-card-for-beginners')) return true;

  return filter === 'for-beginners' &&
    (card.classList.contains('tag-beginner') || card.classList.contains('tag-for-beginners'));
}

function initBlogFilters() {
  const cards = Array.from(document.querySelectorAll('.blog-card'));
  const mobileButton = document.querySelector('#filter-menu-button');
  const modal = document.querySelector('#filter-modal');
  const modalClose = document.querySelector('#filter-modal-close');
  const modalOptions = Array.from(document.querySelectorAll('.filter-modal-option'));
  const desktopButtons = Array.from(document.querySelectorAll('.filter-button'));

  function applyFilter(selectedFilter) {
    cards.forEach(function(card) {
      card.style.display = cardMatchesFilter(card, selectedFilter) ? 'flex' : 'none';
    });

    markLastRowCardsInDesktop();
  }

  function closeModal() {
    if (!modal || !mobileButton) return;
    modal.classList.remove('show');
    mobileButton.classList.remove('active');
  }

  function toggleModal() {
    if (!modal || !mobileButton) return;
    const isOpen = modal.classList.toggle('show');
    mobileButton.classList.toggle('active', isOpen);
  }

  function setSelected(buttons, selectedButton, selectedFilter) {
    const wasSelected = selectedButton.classList.contains('selected') ||
      selectedButton.classList.contains('selected-filter');

    buttons.forEach(function(button) {
      button.classList.remove('selected', 'selected-filter');
    });

    if (wasSelected) {
      applyFilter();
      return;
    }

    selectedButton.classList.add(
      selectedButton.classList.contains('filter-button') ? 'selected-filter' : 'selected'
    );
    applyFilter(selectedFilter);
  }

  if (mobileButton && modal) {
    mobileButton.addEventListener('click', function(event) {
      event.stopPropagation();
      toggleModal();
    });

    if (modalClose) {
      modalClose.addEventListener('click', function(event) {
        event.stopPropagation();
        closeModal();
      });
    }

    document.addEventListener('click', function(event) {
      const modalContent = modal.querySelector('.filter-modal-content');
      if (modal.classList.contains('show') &&
        modalContent &&
        !modalContent.contains(event.target) &&
        !event.target.closest('.mobile-filter-button-container')) {
        closeModal();
      }
    });

    modalOptions.forEach(function(option) {
      option.addEventListener('click', function(event) {
        event.stopPropagation();
        setSelected(modalOptions, option, option.getAttribute('data-filter'));
        closeModal();
      });
    });

    document.querySelectorAll('.filter-modal-navigation-link').forEach(function(link) {
      link.addEventListener('click', closeModal);
    });
  }

  desktopButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      setSelected(desktopButtons, button, button.getAttribute('data-filter'));
    });
  });
}

function managePreviewHintAnimation() {
  if (!window.matchMedia('(min-width: 768px) and (hover: hover) and (pointer: fine)').matches) {
    return;
  }

  const cards = Array.from(document.querySelectorAll('.blog-card'));
  let hoverCount = 0;
  const hoverThreshold = 2;

  function onCardHover() {
    hoverCount++;

    if (hoverCount < hoverThreshold) return;

    document.body.classList.add('user-has-interacted');
    cards.forEach(function(card) {
      card.removeEventListener('mouseenter', onCardHover);
    });
  }

  cards.forEach(function(card) {
    card.addEventListener('mouseenter', onCardHover);
  });
}

function initBlogPage() {
  initPhonePreviewHighlight();
  markLastRowCardsInDesktop();
  initBlogFilters();
  managePreviewHintAnimation();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initBlogPage);
} else {
  initBlogPage();
}
