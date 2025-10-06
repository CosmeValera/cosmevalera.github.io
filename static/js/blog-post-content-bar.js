document.addEventListener('DOMContentLoaded', function () {
    const postContent = document.querySelector('.post-content');
    const tocContainer = document.querySelector('.toc-mobile');
    const tocList = tocContainer ? tocContainer.querySelector('.toc-list') : null;
    const progressBar = tocContainer ? tocContainer.querySelector('.reading-progress') : null;
    const tocHeaderBtn = tocContainer ? tocContainer.querySelector('.toc-header') : null;
  
    // Build TOC from h4 headings
    if (postContent && tocList) {
      const headings = Array.from(postContent.querySelectorAll('h4'));
      headings.forEach(function (h, index) {
        if (!h.id) {
          h.id = 'section-' + (index + 1);
        }
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = '#' + h.id;
        a.textContent = h.textContent || ('Section ' + (index + 1));
        li.appendChild(a);
        tocList.appendChild(li);
      });
    }
  
    // Progress based on reading the post content only
    function updateProgress() {
      if (!postContent || !progressBar) return;
  
      const rect = postContent.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
  
      // Distance from top of document to top/bottom of content
      const contentTop = window.pageYOffset + rect.top;
      const contentHeight = postContent.offsetHeight;
      const contentBottom = contentTop + contentHeight;
  
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
  
      // Amount read within content area
      const read = Math.min(Math.max(scrollY + viewportHeight - contentTop, 0), contentHeight);
      const percent = (read / contentHeight) * 100;
      progressBar.style.width = Math.max(0, Math.min(100, percent)) + '%';
    }
  
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    updateProgress();
  
    // Toggle behavior
    if (tocContainer && tocHeaderBtn) {
      tocHeaderBtn.addEventListener('click', function () {
        const isCollapsed = tocContainer.hasAttribute('data-collapsed');
        if (isCollapsed) {
          tocContainer.removeAttribute('data-collapsed');
          tocHeaderBtn.setAttribute('aria-expanded', 'true');
        } else {
          tocContainer.setAttribute('data-collapsed', '');
          tocHeaderBtn.setAttribute('aria-expanded', 'false');
        }
      });
    }
  });