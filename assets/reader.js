(() => {
  const essays = window.MCI_ESSAYS || [];
  const params = new URLSearchParams(window.location.search);
  let current = Math.min(Math.max(Number(params.get('chapter')) || 1, 1), essays.length || 10);
  const content = document.querySelector('#essay-content');
  const meta = document.querySelector('#reader-meta');
  const position = document.querySelector('#reader-position');
  const previous = document.querySelector('#previous-essay');
  const next = document.querySelector('#next-essay');
  const progress = document.querySelector('#reading-progress');
  const drawer = document.querySelector('#chapter-drawer');
  const drawerButton = document.querySelector('#chapters-button');
  const chapterList = document.querySelector('#chapter-list');

  const chapterUrl = n => `reader.html?chapter=${n}`;

  function renderChapterList() {
    if (!chapterList) return;
    chapterList.innerHTML = essays.map(essay => `
      <li><a href="${chapterUrl(essay.n)}" ${essay.n === current ? 'aria-current="page"' : ''}>
        <span>${String(essay.n).padStart(2, '0')}</span>${essay.title}
      </a></li>`).join('');
  }

  function setNavigation() {
    previous.hidden = current <= 1;
    next.hidden = current >= essays.length;
    previous.href = chapterUrl(Math.max(1, current - 1));
    next.href = chapterUrl(Math.min(essays.length, current + 1));
    position.textContent = `${current} / ${essays.length}`;
  }

  async function loadChapter() {
    const essay = essays[current - 1];
    if (!essay) return;
    meta.textContent = `Essay ${String(essay.n).padStart(2, '0')} of ${essays.length}`;
    document.title = `${essay.title} — The Manifold of Completed Intelligibility`;
    setNavigation();
    renderChapterList();

    try {
      const response = await fetch(essay.file);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const source = await response.text();
      const documentFragment = new DOMParser().parseFromString(source, 'text/html');
      const article = documentFragment.querySelector('article') || documentFragment.querySelector('main') || documentFragment.body;
      content.innerHTML = article.innerHTML;
      content.querySelectorAll('script, style, link[rel="stylesheet"], nav, footer').forEach(node => node.remove());
      content.focus({preventScroll: true});
      window.scrollTo({top: 0, behavior: 'instant'});
      updateProgress();
    } catch (error) {
      content.innerHTML = `<article><h1>${essay.title}</h1><p>The essay could not be loaded. Open the <a href="${essay.file}">standalone HTML file</a> instead.</p><p class="loading">${error.message}</p></article>`;
    }
  }

  function updateProgress() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const amount = max > 0 ? Math.min(100, Math.max(0, (window.scrollY / max) * 100)) : 100;
    progress.style.width = `${amount}%`;
  }

  function goTo(n) {
    if (n < 1 || n > essays.length || n === current) return;
    window.location.href = chapterUrl(n);
  }

  let startX = 0;
  let startY = 0;
  let startTime = 0;
  document.addEventListener('touchstart', event => {
    const touch = event.changedTouches[0];
    startX = touch.clientX;
    startY = touch.clientY;
    startTime = Date.now();
  }, {passive: true});

  document.addEventListener('touchend', event => {
    const touch = event.changedTouches[0];
    const dx = touch.clientX - startX;
    const dy = touch.clientY - startY;
    const elapsed = Date.now() - startTime;
    if (elapsed > 700 || Math.abs(dx) < 70 || Math.abs(dx) < Math.abs(dy) * 1.35) return;
    if (dx < 0) goTo(current + 1);
    if (dx > 0) goTo(current - 1);
  }, {passive: true});

  document.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight') goTo(current + 1);
    if (event.key === 'ArrowLeft') goTo(current - 1);
    if (event.key === 'Escape' && drawer) drawer.classList.remove('open');
  });

  drawerButton?.addEventListener('click', () => {
    const open = drawer.classList.toggle('open');
    drawerButton.setAttribute('aria-expanded', String(open));
  });

  window.addEventListener('scroll', updateProgress, {passive: true});
  window.addEventListener('resize', updateProgress);
  loadChapter();
})();