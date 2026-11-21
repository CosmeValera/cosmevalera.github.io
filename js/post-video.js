// Minimal player for muted, looping demo videos in posts (video.post-video):
// a seek bar, play/pause bottom left and fullscreen bottom right. Native
// controls would also bring volume, speed and download menus we don't need.
(function () {
  const ICONS = {
    play: '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M8 5.5v13l10.5-6.5z" fill="currentColor"/></svg>',
    pause: '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" fill="currentColor"/></svg>',
    enter: '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    exit: '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M9 4v5H4M20 9h-5V4M15 20v-5h5M4 15h5v5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  };

  // 75 -> "01:15"
  function clock(seconds) {
    const s = Math.floor(seconds);
    return String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0');
  }

  function button(label) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'post-video-btn';
    btn.setAttribute('aria-label', label);
    return btn;
  }

  function enhance(video) {
    const tile = video.classList.contains('post-video--tile');
    const player = document.createElement('div');
    player.className = 'post-video-player';
    video.parentNode.insertBefore(player, video);
    player.appendChild(video);

    const controls = document.createElement('div');
    controls.className = 'post-video-controls';

    const seek = document.createElement('input');
    seek.type = 'range';
    seek.className = 'post-video-seek';
    seek.min = 0;
    seek.max = 1000;
    seek.value = 0;
    seek.setAttribute('aria-label', 'Seek');

    const row = document.createElement('div');
    row.className = 'post-video-row';
    const playBtn = button('Pause');
    const fullBtn = button('Full screen');
    row.append(playBtn, fullBtn);
    const time = document.createElement('span');
    time.className = 'post-video-time';
    controls.append(time, seek, row);
    player.appendChild(controls);

    // Progress: requestAnimationFrame while playing, since timeupdate only
    // fires a few times per second and the bar would move in jumps.
    let frame = null;
    let seeking = false;
    function paintProgress() {
      if (!seeking && video.duration) {
        seek.value = (video.currentTime / video.duration) * 1000;
      }
      seek.style.setProperty('--progress', (seek.value / 10) + '%');
      const label = clock((seek.value / 1000) * (video.duration || 0)) + ' / ' + clock(video.duration || 0);
      if (time.textContent !== label) time.textContent = label;
    }
    function loop() {
      paintProgress();
      frame = requestAnimationFrame(loop);
    }

    function syncPlay() {
      const paused = video.paused;
      playBtn.innerHTML = paused ? ICONS.play : ICONS.pause;
      playBtn.setAttribute('aria-label', paused ? 'Play' : 'Pause');
      player.classList.toggle('is-paused', paused);
      cancelAnimationFrame(frame);
      if (paused) paintProgress();
      else loop();
    }

    function togglePlay() {
      if (video.paused) video.play();
      else video.pause();
    }

    // A server without HTTP Range support (e.g. `zola serve`; GitHub Pages
    // has it) makes the browser snap back to 0 on seek. If a seek lands far
    // from its target, load the whole file into memory once and seek there.
    let target = null;
    let loadingBlob = false;
    video.addEventListener('seeked', function () {
      if (target === null || loadingBlob || Math.abs(video.currentTime - target) < 1) return;
      loadingBlob = true;
      const wanted = target;
      fetch(video.currentSrc)
        .then(function (response) { return response.blob(); })
        .then(function (blob) {
          const wasPlaying = !video.paused;
          video.src = URL.createObjectURL(blob);
          video.addEventListener('loadedmetadata', function () {
            video.currentTime = wanted;
            if (wasPlaying) video.play();
          }, { once: true });
        })
        .catch(function () {});
    });

    seek.addEventListener('input', function () {
      seeking = true;
      if (video.duration) {
        target = (seek.value / 1000) * video.duration;
        video.currentTime = target;
      }
      paintProgress();
    });
    seek.addEventListener('change', function () {
      seeking = false;
    });

    // Space toggles play/pause in fullscreen or while a control has focus.
    // The keyup is swallowed too, so a focused button doesn't also click.
    function ownsSpace(event) {
      return event.code === 'Space' &&
        (document.fullscreenElement === player || (!tile && player.contains(document.activeElement)));
    }
    document.addEventListener('keydown', function (event) {
      if (!ownsSpace(event)) return;
      event.preventDefault();
      if (!event.repeat) togglePlay();
    });
    document.addEventListener('keyup', function (event) {
      if (ownsSpace(event)) event.preventDefault();
    });

    playBtn.addEventListener('click', togglePlay);
    // Clicking the video hands focus to the play button, so Space works next.
    video.addEventListener('click', function () {
      togglePlay();
      playBtn.focus({ preventScroll: true });
    });
    video.addEventListener('play', syncPlay);
    video.addEventListener('pause', syncPlay);
    video.addEventListener('loadedmetadata', paintProgress);

    // Fullscreen on the wrapper keeps these controls on screen. iOS Safari
    // only allows fullscreen on the video element itself, with native controls.
    function toggleFullscreen() {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else if (player.requestFullscreen) {
        player.requestFullscreen();
      } else if (video.webkitEnterFullscreen) {
        video.webkitEnterFullscreen();
      }
    }
    fullBtn.addEventListener('click', toggleFullscreen);
    // Double click also toggles fullscreen, like most players. Its two clicks
    // have already paused and resumed the video, so playback is unchanged.
    video.addEventListener('dblclick', toggleFullscreen);
    document.addEventListener('fullscreenchange', function () {
      const full = document.fullscreenElement === player;
      fullBtn.innerHTML = full ? ICONS.exit : ICONS.enter;
      fullBtn.setAttribute('aria-label', full ? 'Exit full screen' : 'Full screen');
      if (tile && !full) closeTile();
    });

    // Tiles (video.post-video--tile) are optional extras: a still poster with
    // a label until clicked, then they play in fullscreen, uncropped. Leaving
    // fullscreen stops them and brings the poster back.
    function closeTile() {
      if (video.paused && !video.currentTime) return;
      video.pause();
      video.load();
    }
    if (tile) {
      player.classList.add('is-tile');
      const open = document.createElement('button');
      open.type = 'button';
      open.className = 'post-video-tile';
      open.setAttribute('aria-label', 'Play ' + video.getAttribute('aria-label') + ' in full screen');
      const sub = video.dataset.sublabel ? '<small>' + video.dataset.sublabel + '</small>' : '';
      open.innerHTML = '<span class="post-video-tile-label">' + ICONS.play +
        '<span>' + video.dataset.label + sub + '</span></span>';
      open.addEventListener('click', function () {
        if (player.requestFullscreen) {
          player.requestFullscreen().then(function () { video.play(); });
        } else {
          video.play();
          if (video.webkitEnterFullscreen) video.webkitEnterFullscreen();
        }
      });
      player.appendChild(open);
      video.addEventListener('webkitendfullscreen', closeTile);
    }

    fullBtn.innerHTML = ICONS.enter;
    syncPlay();
  }

  document.querySelectorAll('video.post-video').forEach(enhance);
})();
