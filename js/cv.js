// Screenshot carousel for the CV projects: clicking a thumbnail opens the
// project's demo video and screenshots in a full-screen <dialog> instead of a
// new tab. Arrows (buttons, keys or swipe) cycle through them; Esc, the close
// button or a click outside the media closes it. The video plays when it
// becomes the current slide and stops when you leave it.
function initializeScreenshotLightbox() {
    const lightbox = document.querySelector('.cv-lightbox');
    if (!lightbox || typeof lightbox.showModal !== 'function') return;

    const image = lightbox.querySelector('.cv-lightbox-image');
    const video = lightbox.querySelector('.cv-lightbox-video');
    const caption = lightbox.querySelector('.cv-lightbox-caption');
    const prevBtn = lightbox.querySelector('.cv-lightbox-prev');
    const nextBtn = lightbox.querySelector('.cv-lightbox-next');
    const closeBtn = lightbox.querySelector('.cv-lightbox-close');

    let shots = [];
    let project = '';
    let index = 0;

    function stopVideo() {
        video.pause();
        // Dropping the source also cancels any download still in flight.
        video.removeAttribute('src');
        video.load();
    }

    function show(newIndex) {
        index = (newIndex + shots.length) % shots.length;
        const shot = shots[index];
        caption.textContent = `${project} · ${index + 1} / ${shots.length}`;

        if (shot.isVideo) {
            image.hidden = true;
            image.removeAttribute('src');
            video.hidden = false;
            video.poster = shot.poster;
            video.src = shot.src;
            video.setAttribute('aria-label', shot.alt);
            video.play().catch(() => {});
        } else {
            stopVideo();
            video.hidden = true;
            image.hidden = false;
            image.src = shot.src;
            image.alt = shot.alt;
        }

        // Warm the cache so the next arrow press doesn't wait on the network.
        [index - 1, index + 1].forEach(i => {
            const neighbour = shots[(i + shots.length) % shots.length];
            if (!neighbour.isVideo) new Image().src = neighbour.src;
        });
    }

    function step(delta) {
        if (shots.length > 1) show(index + delta);
    }

    document.querySelectorAll('.cv-project-shots').forEach(list => {
        const links = Array.from(list.querySelectorAll('a'));

        links.forEach((link, i) => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                shots = links.map(a => {
                    const thumb = a.querySelector('img');
                    return {
                        src: a.href,
                        alt: thumb.alt,
                        isVideo: a.hasAttribute('data-video'),
                        poster: thumb.src,
                    };
                });
                project = list.dataset.project;
                lightbox.classList.toggle('is-single', shots.length < 2);
                lightbox.showModal();
                show(i);
            });
        });
    });

    prevBtn.addEventListener('click', () => step(-1));
    nextBtn.addEventListener('click', () => step(1));
    closeBtn.addEventListener('click', () => lightbox.close());

    lightbox.addEventListener('keydown', function(e) {
        // A focused video keeps its own arrow keys for seeking.
        if (e.target === video) return;
        if (e.key === 'ArrowLeft') step(-1);
        if (e.key === 'ArrowRight') step(1);
    });

    // The dialog covers the viewport, so a click that lands on it (not on the
    // media or a button) is a click on the dimmed backdrop.
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox || e.target.classList.contains('cv-lightbox-figure')) {
            lightbox.close();
        }
    });

    // Swipes over the video are left alone so its seek bar can be dragged.
    let touchStartX = null;
    lightbox.addEventListener('touchstart', e => {
        touchStartX = e.target === video ? null : e.touches[0].clientX;
    }, { passive: true });
    lightbox.addEventListener('touchend', function(e) {
        if (touchStartX === null) return;
        const dx = e.changedTouches[0].clientX - touchStartX;
        touchStartX = null;
        if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
    });

    lightbox.addEventListener('close', function() {
        stopVideo();
        image.removeAttribute('src');
    });
}

initializeScreenshotLightbox();
