(() => {
  const sourceFile = 'foundational_monograph_scaffold_completed_intelligibility.html';
  const content = document.querySelector('#monograph-content');
  const progress = document.querySelector('#monograph-progress');
  const drawer = document.querySelector('#monograph-drawer');
  const drawerButton = document.querySelector('#monograph-menu-button');
  const list = document.querySelector('#monograph-list');

  function updateProgress() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const amount = max > 0 ? Math.min(100, Math.max(0, (window.scrollY / max) * 100)) : 100;
    progress.style.width = `${amount}%`;
  }

  function buildContents(root) {
    const sections = [...root.querySelectorAll('.part[id], article.chapter[id]')];
    list.innerHTML = sections.map(section => {
      const heading = section.querySelector(':scope > header h2, :scope > h3');
      if (!heading) return '';
      const isPart = section.classList.contains('part');
      return `<li class="${isPart ? 'drawer-part' : 'drawer-chapter'}"><a href="#${section.id}">${heading.textContent.trim()}</a></li>`;
    }).join('');

    list.addEventListener('click', event => {
      if (event.target.closest('a')) {
        drawer.classList.remove('open');
        drawerButton.setAttribute('aria-expanded', 'false');
      }
    });
  }

  async function loadMonograph() {
    try {
      const response = await fetch(sourceFile);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const source = await response.text();
      const parsed = new DOMParser().parseFromString(source, 'text/html');
      const main = parsed.querySelector('main.page') || parsed.querySelector('main') || parsed.body;
      content.innerHTML = main.innerHTML;
      content.querySelectorAll('script, style, link[rel="stylesheet"]').forEach(node => node.remove());
      buildContents(content);
      content.focus({preventScroll: true});
      updateProgress();
    } catch (error) {
      content.innerHTML = `<article><h1>Foundational Monograph</h1><p>The organized view could not be loaded. Open the <a href="${sourceFile}">standalone scaffold</a>.</p><p class="loading">${error.message}</p></article>`;
    }
  }

  drawerButton?.addEventListener('click', () => {
    const open = drawer.classList.toggle('open');
    drawerButton.setAttribute('aria-expanded', String(open));
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      drawer.classList.remove('open');
      drawerButton?.setAttribute('aria-expanded', 'false');
    }
  });

  window.addEventListener('scroll', updateProgress, {passive: true});
  window.addEventListener('resize', updateProgress);
  loadMonograph();
})();