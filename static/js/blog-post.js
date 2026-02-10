document.addEventListener('DOMContentLoaded', function () {
    // Check for Series Mode
    const urlParams = new URLSearchParams(window.location.search);
    const mode = urlParams.get('mode');
    if (mode === 'series') {
        const navNormal = document.querySelector('.nav-normal');
        const navSeries = document.querySelector('.nav-series');
        if (navSeries) {
            if (navNormal) navNormal.style.display = 'none';
            // Use 'contents' to allow children to participate in the parent flex container
            navSeries.style.display = 'contents'; 
        }
    }
    const postContent = document.querySelector('.post-content');
    const tocMobile = document.querySelector('.toc-mobile');
    const tocDesktop = document.querySelector('.toc-desktop');
    const tocHeaderBtn = tocMobile ? tocMobile.querySelector('.toc-header') : null;
    const tocListMobile = tocMobile ? tocMobile.querySelector('#toc-list-mobile') : null;
    const tocListDesktop = tocDesktop ? tocDesktop.querySelector('#toc-list-desktop') : null;
    const progressBar = tocMobile ? tocMobile.querySelector('.reading-progress') : null;
    const tocCloseBtn = tocMobile ? tocMobile.querySelector('.toc-close-icon') : null;
    
    let headings = [];
    let tocLinks = []; // Will contain links from both mobile and desktop TOC
    const isDesktop = window.innerWidth >= 768;
    let lastScrollY = window.pageYOffset || document.documentElement.scrollTop;
    let tocScrollUpDistance = 0; // Track accumulated scroll-up distance
    let tocScrollUpStartTime = null; // Track when continuous scroll-up started
    let tocScrollDownDistance = 0; // Track accumulated scroll-down distance
    let tocScrollDownStartTime = null; // Track when continuous scroll-down started
  
    // Build TOC from h4 headings
    if (postContent && (tocListMobile || tocListDesktop)) {
      headings = Array.from(postContent.querySelectorAll('h4'));
      
      if (headings.length === 0) {
        // Hide TOC if no headings found
        if (tocMobile) {
          tocMobile.style.display = 'none';
        }
        if (tocDesktop) {
          tocDesktop.style.display = 'none';
        }
        return;
      }
      
      // Helper function to create a TOC link
      function createTOCLink(h, index) {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = '#' + h.id;
        a.textContent = h.textContent || ('Section ' + (index + 1));
        a.addEventListener('click', function(e) {
          e.preventDefault();
          
          // Make TOC more opaque when clicked
          // Reset scroll distances and timers, remove scrolling-down class (default = scrolling-up)
          tocScrollUpDistance = 0;
          tocScrollUpStartTime = null;
          tocScrollDownDistance = 0;
          tocScrollDownStartTime = null;
          if (tocMobile && tocMobile.classList.contains('visible')) {
            tocMobile.classList.remove('scrolling-down');
          }
          
          // Close TOC on mobile/tablet (not desktop wide screens), then scroll
          if (window.innerWidth < 1200 && tocMobile) {
            tocMobile.setAttribute('data-collapsed', '');
            if (tocHeaderBtn) {
              tocHeaderBtn.setAttribute('aria-expanded', 'false');
            }
            
            setTimeout(() => {
              smoothScrollTo(h);
            }, 100);
          } else {
            smoothScrollTo(h);
          }
        });
        li.appendChild(a);
        tocLinks.push(a);
        return li;
      }
      
      headings.forEach(function (h, index) {
        if (!h.id) {
          h.id = 'section-' + (index + 1);
        }
        
        // Add to mobile TOC
        if (tocListMobile) {
          const liMobile = createTOCLink(h, index);
          tocListMobile.appendChild(liMobile);
        }
        
        // Add to desktop TOC
        if (tocListDesktop) {
          const liDesktop = createTOCLink(h, index);
          // The link already has a click handler from createTOCLink that works for both mobile and desktop
          // The link is already added to tocLinks array, so active state updates will work
          tocListDesktop.appendChild(liDesktop);
        }
      });
    }
  
    // Smooth scroll function
    function smoothScrollTo(element) {
      // Only account for TOC height on mobile (not desktop wide screens where TOC is on the left)
      const isWideScreen = window.innerWidth >= 1200;
      const tocHeight = isWideScreen ? 0 : (tocMobile ? tocMobile.offsetHeight : 0);
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
      
      // Update active states - remove from all links
      tocLinks.forEach(function(link) {
        link.classList.remove('active');
      });
      
      // Add active state to all links matching the active heading (both mobile and desktop)
      if (activeHeading) {
        const activeHref = '#' + activeHeading.id;
        tocLinks.forEach(function(link) {
          if (link.getAttribute('href') === activeHref) {
            link.classList.add('active');
          }
        });
        return;
      }
      
      // If no active heading, check if user has scrolled past content start
      // Only activate first element if scroll has passed the content offsetTop
      if (postContent && tocLinks.length > 0) {
        const contentOffsetTop = postContent.getBoundingClientRect().top + scrollY;
        const hasScrolledPastContent = scrollY >= contentOffsetTop;
        
        if (hasScrolledPastContent) {
          // Make the first desktop TOC link active (if present)
          if (typeof tocListDesktop !== 'undefined' && tocListDesktop) {
            const firstDesktopLink = tocListDesktop.querySelector('a');
            if (firstDesktopLink) {
              firstDesktopLink.classList.add('active');
            }
          }
          // Make the first mobile TOC link active (if present)
          if (typeof tocListMobile !== 'undefined' && tocListMobile) {
            const firstMobileLink = tocListMobile.querySelector('a');
            if (firstMobileLink) {
              firstMobileLink.classList.add('active');
            }
          }
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
  
      // Calculate progress more accurately
      const scrollProgress = scrollY - contentTop;
      const maxScroll = contentHeight - viewportHeight;
      const percent = Math.max(0, Math.min(100, (scrollProgress / maxScroll) * 100));
      
      // Map real progress so the visual bar starts at 3% immediately and grows from there
      // - 0% real -> 0% visual (no bar before any scroll)
      // - (0,100]% real -> [3%, 100%] visual
      const displayedPercent = percent === 0 ? 0 : Math.min(100, 3 + percent * 0.97);
      progressBar.style.width = displayedPercent + '%';
      
      // Add a subtle glow effect when near completion
      if (percent > 90) {
        progressBar.style.boxShadow = '0 2px 12px rgba(79, 245, 245, 0.5)';
      } else {
        progressBar.style.boxShadow = '0 2px 8px rgba(79, 245, 245, 0.3)';
      }
    }
  
    // Throttled scroll handler
    let ticking = false;

    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const themeToggleContainer = document.querySelector('.theme-and-language-toggle-container');

    function updateTOC() {
      const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;
      const isScrollingDown = currentScrollY > lastScrollY;
      
      updateProgress();
      updateActiveSection();
      checkTOCVisibility();
      
      // Update scroll direction class on mobile TOC and mobile menu toggle after visibility check
      // This ensures the class is set even if TOC just became visible
      if (isScrollingDown) {
        // Initialize start time if this is the first scroll-down frame
        if (tocScrollDownStartTime === null) {
          tocScrollDownStartTime = Date.now();
        }
        
        // Check if more than 2 seconds have passed since scroll-down started
        const timeElapsed = Date.now() - tocScrollDownStartTime;
        if (timeElapsed > 2000) {
          // Reset counter if more than 2 seconds have passed
          tocScrollDownDistance = 0;
          tocScrollDownStartTime = Date.now();
        }
        
        // Calculate scroll distance in this frame
        const scrollDistance = currentScrollY - lastScrollY;
        // Accumulate scroll-down distance
        tocScrollDownDistance += scrollDistance;
        
        // If scrolled down more than 100px within 2 seconds, add scrolling-down class
        if (tocScrollDownDistance >= 100) {
          if (tocMobile && tocMobile.classList.contains('visible')) {
            tocMobile.classList.add('scrolling-down');
          }
          if (mobileMenuToggle) {
            mobileMenuToggle.classList.add('scrolling-down');
          }
          if (themeToggleContainer) {
            themeToggleContainer.classList.add('scrolling-down');
          }
          // Reset counters after switching
          tocScrollDownDistance = 0;
          tocScrollDownStartTime = null;
          tocScrollUpDistance = 0;
          tocScrollUpStartTime = null;
        }
        // If still in default state (scrolling-up) and distance < 100px, keep default
      } else {
        // Initialize start time if this is the first scroll-up frame
        if (tocScrollUpStartTime === null) {
          tocScrollUpStartTime = Date.now();
        }
        
        // Check if more than 2 seconds have passed since scroll-up started
        const timeElapsed = Date.now() - tocScrollUpStartTime;
        if (timeElapsed > 2000) {
          // Reset counter if more than 2 seconds have passed
          tocScrollUpDistance = 0;
          tocScrollUpStartTime = Date.now();
        }
        
        // Calculate scroll distance in this frame
        const scrollDistance = lastScrollY - currentScrollY;
        // Accumulate scroll-up distance
        tocScrollUpDistance += scrollDistance;
        
        // If scrolled up more than 500px within 2 seconds, remove scrolling-down class (default = scrolling-up)
        // Also remove if near the top
        if (tocScrollUpDistance >= 500 || currentScrollY < 50) {
          if (tocMobile) {
            tocMobile.classList.remove('scrolling-down');
          }
          if (mobileMenuToggle) {
            mobileMenuToggle.classList.remove('scrolling-down');
          }
          if (themeToggleContainer) {
            themeToggleContainer.classList.remove('scrolling-down');
          }
          // Reset counters after switching
          tocScrollUpDistance = 0;
          tocScrollUpStartTime = null;
          tocScrollDownDistance = 0;
          tocScrollDownStartTime = null;
        }
      }
      
      lastScrollY = currentScrollY;
    }

    function onScroll() {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateTOC();
                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', function() {
      updateProgress();
      updateActiveSection();
      checkTOCVisibility();
    });
    
    // Show TOC when user scrolls down (mobile and desktop)
    function checkTOCVisibility() {
      const isWideScreen = window.innerWidth >= 1200;
      const isMobile = window.innerWidth < 768;
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      
      // Calculate content offsetTop if postContent exists
      let contentOffsetTop = 0;
      let hasScrolledPastContent = false;
      
      if (postContent) {
        contentOffsetTop = postContent.getBoundingClientRect().top + scrollY;
        hasScrolledPastContent = scrollY >= contentOffsetTop;
      }
      
      // Mobile TOC visibility - show when scrolled past content offsetTop
      if (tocMobile) {
        if (isWideScreen) {
          // Hide mobile TOC on desktop wide screens
          tocMobile.classList.remove('visible');
        } else if (!isMobile) {
          // Hide mobile TOC on desktop narrow screens
          tocMobile.classList.remove('visible');
        } else {
          // Mobile (< 768px): show when scrolled past content offsetTop
          if (hasScrolledPastContent) {
            const wasVisible = tocMobile.classList.contains('visible');
            tocMobile.classList.add('visible');
            // Set initial scroll direction class if TOC just became visible
            if (!wasVisible) {
              // Default to scrolling-down (translucent) when first appearing
              tocMobile.classList.add('scrolling-down');
            }
          } else {
            tocMobile.classList.remove('visible');
          }
        }
      }
      
      // Desktop TOC visibility - show when scrolled past content offsetTop
      if (tocDesktop && isWideScreen && postContent) {
        if (hasScrolledPastContent) {
          tocDesktop.classList.add('visible');
        } else {
          tocDesktop.classList.remove('visible');
        }
      }
    }

    // Initial updates
    updateProgress();
    updateActiveSection();
    checkTOCVisibility();
    
    // Desktop wide screens: position wrapper
    if (window.innerWidth >= 1200) {
      // Position TOC wrapper to align with post-content start
      positionTOCWrapper();
    }
    
    // Function to position TOC wrapper at content start and set its height
    function positionTOCWrapper() {
      const tocWrapper = document.querySelector('.toc-desktop-wrapper');
      
      if (window.innerWidth < 1200) {
        // Clean up wrapper styles when screen is too small
        if (tocWrapper) {
          tocWrapper.style.top = '';
          tocWrapper.style.height = '';
        }
        return;
      }
      
      const postContent = document.querySelector('.post-content');
      const blogPost = document.querySelector('.blog-post');
      
      if (tocWrapper && postContent && blogPost) {
        // Calculate offset from blog-post top to post-content top
        const blogPostOffset = blogPost.offsetTop;
        const postContentOffset = postContent.offsetTop;
        const offsetTop = postContentOffset - blogPostOffset + 40;
        tocWrapper.style.top = offsetTop + 'px';
        
        // Set wrapper height to match post-content height so sticky works properly
        const postContentHeight = postContent.offsetHeight;
        tocWrapper.style.height = postContentHeight + 'px';
      }
    }
  
    // Toggle TOC collapse on mobile when header is clicked
    if (tocHeaderBtn && tocMobile) {
      tocHeaderBtn.addEventListener('click', function (e) {
        // Desktop wide screens (1200px+): header is hidden, don't toggle
        if (window.innerWidth >= 1200) {
          // Don't toggle on desktop wide screens
          return;
        }
        
        // Don't toggle if clicking the close button
        if (e.target.classList.contains('toc-close-icon')) return;
        
        e.stopPropagation();
        const isCollapsed = tocMobile.hasAttribute('data-collapsed');
        
        // Make TOC more opaque when clicked
        // Reset scroll distances and timers, remove scrolling-down class (default = scrolling-up)
        tocScrollUpDistance = 0;
        tocScrollUpStartTime = null;
        tocScrollDownDistance = 0;
        tocScrollDownStartTime = null;
        tocMobile.classList.remove('scrolling-down');
        
        if (isCollapsed) {
          tocMobile.removeAttribute('data-collapsed');
          tocHeaderBtn.setAttribute('aria-expanded', 'true');
        } else {
          tocMobile.setAttribute('data-collapsed', '');
          tocHeaderBtn.setAttribute('aria-expanded', 'false');
        }
      });
    }

    // Close TOC on desktop when close button is clicked
    if (tocCloseBtn && tocMobile) {
      tocCloseBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        if (window.innerWidth >= 768) {
          // Desktop: hide TOC
          tocMobile.style.display = 'none';
        }
      });
    }

    // Close TOC when clicking outside (mobile only, not desktop wide screens)
    document.addEventListener('click', function (e) {
      if (window.innerWidth < 1200 && tocMobile && !tocMobile.contains(e.target)) {
        // Clicked outside the TOC, close it if it's open (mobile/tablet)
        if (!tocMobile.hasAttribute('data-collapsed')) {
          tocMobile.setAttribute('data-collapsed', '');
          if (tocHeaderBtn) {
            tocHeaderBtn.setAttribute('aria-expanded', 'false');
          }
        }
      }
    });
    
    // Add keyboard navigation support
    if (tocHeaderBtn) {
      tocHeaderBtn.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (!isDesktop) {
            tocHeaderBtn.click();
          }
        }
      });
    }

    // Handle window resize
    window.addEventListener('resize', function() {
      const nowWideScreen = window.innerWidth >= 1200;
      
      checkTOCVisibility();
      
      // Always reposition/cleanup wrapper on resize
      positionTOCWrapper();
      
      if (nowWideScreen) {
        // Wide desktop: always show desktop TOC list
        if (tocDesktop) {
          tocDesktop.removeAttribute('data-collapsed');
        }
      }
    });
    
    // Update wrapper height on scroll (content might have changed height)
    let lastContentHeight = 0;
    window.addEventListener('scroll', function() {
      if (window.innerWidth >= 1200 && postContent) {
        const currentHeight = postContent.offsetHeight;
        // Update wrapper height if content height changed
        if (currentHeight !== lastContentHeight) {
          lastContentHeight = currentHeight;
          const tocWrapper = document.querySelector('.toc-desktop-wrapper');
          if (tocWrapper) {
            tocWrapper.style.height = currentHeight + 'px';
          }
        }
      }
    }, { passive: true });
  });