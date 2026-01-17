(() => {
  const $ = (sel) => document.querySelector(sel);

  const input = $('#search-input');
  const resultsEl = $('#search-results');
  const metaEl = $('#search-meta');
  const form = $('#search-form');

  if (!input || !resultsEl || !metaEl || !form) return;

  const params = new URLSearchParams(window.location.search);
  const initialQ = (params.get('q') || '').trim();
  if (initialQ) input.value = initialQ;

  const escapeHtml = (s) =>
    String(s)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;');

  const normalize = (s) =>
    String(s || '')
      .toLowerCase()
      .replace(/\s+/g, ' ')
      .trim();

  const scoreItem = (item, q) => {
    const title = normalize(item.title);
    const summary = normalize(item.summary);
    const tags = Array.isArray(item.tags) ? item.tags.map(normalize) : [];
    const section = normalize(item.section);

    let score = 0;
    if (title.includes(q)) score += 8;
    if (section && section.includes(q)) score += 2;
    if (summary.includes(q)) score += 2;
    if (tags.some((t) => t.includes(q))) score += 3;
    if (title.startsWith(q)) score += 4;
    return score;
  };

  const render = (q, items) => {
    const qNorm = normalize(q);
    resultsEl.innerHTML = '';

    if (!qNorm) {
      metaEl.textContent = 'Enter a query to search.';
      return;
    }

    const matches = items
      .map((it) => ({ it, score: scoreItem(it, qNorm) }))
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 50)
      .map((x) => x.it);

    metaEl.textContent = `${matches.length} result${matches.length === 1 ? '' : 's'} for “${q}”`;

    if (matches.length === 0) {
      resultsEl.innerHTML = `<div class="search-empty">No matches. Try fewer words or different terms.</div>`;
      return;
    }

    const html = matches
      .map((it) => {
        const title = escapeHtml(it.title || it.url || '');
        const url = escapeHtml(it.url || '#');
        const summary = escapeHtml(it.summary || '');
        const tags = Array.isArray(it.tags) ? it.tags : [];
        const tagHtml =
          tags.length > 0
            ? `<div class="search-tags">${tags
                .slice(0, 8)
                .map((t) => `<span class="search-tag">${escapeHtml(t)}</span>`)
                .join('')}</div>`
            : '';

        return `
          <a class="search-result" href="${url}">
            <div class="search-title">${title}</div>
            ${summary ? `<div class="search-summary">${summary}</div>` : ''}
            ${tagHtml}
          </a>
        `;
      })
      .join('');

    resultsEl.innerHTML = html;
  };

  let indexPromise = null;
  const loadIndex = () => {
    if (!indexPromise) {
      indexPromise = fetch('/index.json', { cache: 'force-cache' })
        .then((r) => {
          if (!r.ok) throw new Error(`Failed to load /index.json (${r.status})`);
          return r.json();
        })
        .then((data) => (Array.isArray(data) ? data : []))
        .catch((err) => {
          metaEl.textContent =
            'Search index failed to load. Please rebuild the site and ensure /index.json is published.';
          console.error(err);
          return [];
        });
    }
    return indexPromise;
  };

  let t = null;
  const run = async (q) => {
    const items = await loadIndex();
    render(q, items);
  };

  input.addEventListener('input', () => {
    const q = input.value.trim();
    clearTimeout(t);
    t = setTimeout(() => run(q), 120);
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const q = input.value.trim();
    const url = new URL(window.location.href);
    url.searchParams.set('q', q);
    history.replaceState(null, '', url.toString());
    run(q);
  });

  // initial render
  run(input.value.trim());
})();


