document.addEventListener('DOMContentLoaded', function () {
    const postContent = document.querySelector('.post-content');
    const tocContainer = document.querySelector('.toc-mobile');
    const tocList = tocContainer ? tocContainer.querySelector('.toc-list') : null;
    const progressBar = tocContainer ? tocContainer.querySelector('.reading-progress') : null;
    const tocHeaderBtn = tocContainer ? tocContainer.querySelector('.toc-header') : null;
    
    let headings = [];
    let tocLinks = [];
  
    // Build TOC from h4 headings
    if (postContent && tocList) {
      headings = Array.from(postContent.querySelectorAll('h4'));
      
      if (headings.length === 0) {
        // Hide TOC if no headings found
        if (tocContainer) {
          tocContainer.style.display = 'none';
        }
        return;
      }
      
      headings.forEach(function (h, index) {
        if (!h.id) {
          h.id = 'section-' + (index + 1);
        }
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = '#' + h.id;
        a.textContent = h.textContent || ('Section ' + (index + 1));
        a.addEventListener('click', function(e) {
          e.preventDefault();
          
          // Close TOC first on mobile, then scroll
          if (window.innerWidth < 768) {
            tocContainer.setAttribute('data-collapsed', '');
            tocHeaderBtn.setAttribute('aria-expanded', 'false');
            
            // Wait a bit for the TOC to collapse, then scroll
            setTimeout(() => {
              smoothScrollTo(h);
            }, 100);
          } else {
            smoothScrollTo(h);
          }
        });
        li.appendChild(a);
        tocList.appendChild(li);
        tocLinks.push(a);
      });
    }
  
    // Smooth scroll function
    function smoothScrollTo(element) {
      // Get the TOC height to account for sticky positioning
      const tocHeight = tocContainer ? tocContainer.offsetHeight : 0;
      const elementTop = element.getBoundingClientRect().top + window.pageYOffset - tocHeight - 20;
      
      window.scrollTo({
        top: elementTop,
        behavior: 'smooth'
      });
    }
  
    // Update active section based on scroll position
    function updateActiveSection() {
      if (headings.length === 0) return;
      
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const viewportCenter = scrollY + viewportHeight / 2;
      
      let activeHeading = null;
      let minDistance = Infinity;
      
      headings.forEach(function(heading) {
        const headingTop = heading.getBoundingClientRect().top + scrollY;
        const distance = Math.abs(viewportCenter - headingTop);
        
        if (distance < minDistance && headingTop <= viewportCenter + 100) {
          minDistance = distance;
          activeHeading = heading;
        }
      });
      
      // Update active states
      tocLinks.forEach(function(link) {
        link.classList.remove('active');
      });
      
      if (activeHeading) {
        const activeLink = tocLinks.find(link => link.getAttribute('href') === '#' + activeHeading.id);
        if (activeLink) {
          activeLink.classList.add('active');
        }
      }
    }
  
    // Enhanced progress calculation
    function updateProgress() {
      if (!postContent || !progressBar) return;
  
      const rect = postContent.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
  
      // Distance from top of document to top/bottom of content
      const contentTop = window.pageYOffset + rect.top;
      const contentHeight = postContent.offsetHeight;
      const contentBottom = contentTop + contentHeight;
  
      // Calculate progress more accurately
      const scrollProgress = scrollY - contentTop;
      const maxScroll = contentHeight - viewportHeight;
      const percent = Math.max(0, Math.min(100, (scrollProgress / maxScroll) * 100));
      
      progressBar.style.width = percent + '%';
      
      // Add a subtle glow effect when near completion
      if (percent > 90) {
        progressBar.style.boxShadow = '0 2px 12px rgba(79, 245, 245, 0.5)';
      } else {
        progressBar.style.boxShadow = '0 2px 8px rgba(79, 245, 245, 0.3)';
      }
    }
  
    // Instant scroll handler for immediate progress updates
    function handleScroll() {
      updateProgress();
      updateActiveSection();
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', function() {
      updateProgress();
      updateActiveSection();
    });
    
    // Initial updates
    updateProgress();
    updateActiveSection();
  
    // Enhanced toggle behavior with animation
    if (tocContainer && tocHeaderBtn) {
      tocHeaderBtn.addEventListener('click', function (e) {
        e.stopPropagation(); // Prevent event from bubbling up
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

    // Close TOC when clicking outside
    document.addEventListener('click', function (e) {
      if (tocContainer && !tocContainer.contains(e.target)) {
        // Clicked outside the TOC, close it if it's open
        if (!tocContainer.hasAttribute('data-collapsed')) {
          tocContainer.setAttribute('data-collapsed', '');
          tocHeaderBtn.setAttribute('aria-expanded', 'false');
        }
      }
    });
    
    // Add keyboard navigation support
    if (tocContainer) {
      tocContainer.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          tocHeaderBtn.click();
        }
      });
    }
  });