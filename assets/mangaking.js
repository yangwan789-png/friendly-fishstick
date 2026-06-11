(() => {
  const handleize = (value) => {
    return String(value || '')
      .toLowerCase()
      .trim()
      .replace(/['"]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  };

  const titleCaseFromSlug = (slug) => {
    const words = String(slug || '')
      .replace(/[_\s]+/g, '-')
      .split('-')
      .filter(Boolean);
    return words.map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  };

  const renderCharacterSpotlight = () => {
    const roots = document.querySelectorAll('[data-mk-character-spotlight]');
    roots.forEach((root) => {
      const dataEl = root.querySelector('script[type="application/json"][data-mk-data]');
      const listEl = root.querySelector('[data-mk-list]');
      if (!dataEl || !listEl) return;

      let data;
      try {
        data = JSON.parse(dataEl.textContent || '{}');
      } catch {
        return;
      }

      const tags = Array.isArray(data.tags) ? data.tags : [];
      const limit = Number(data.limit || 6);
      const baseUrl = String(data.baseUrl || '/collections/all');
      const prefix = String(data.prefix || 'character:');

      if (!tags.length) return;

      const picked = [];
      const used = new Set();
      const maxAttempts = Math.min(tags.length * 3, 300);
      let attempts = 0;
      while (picked.length < Math.min(limit, tags.length) && attempts < maxAttempts) {
        attempts += 1;
        const idx = Math.floor(Math.random() * tags.length);
        const tag = tags[idx];
        if (!tag || used.has(tag)) continue;
        used.add(tag);
        picked.push(tag);
      }

      const html = picked
        .map((tag) => {
          const labelSlug = String(tag).startsWith(prefix) ? String(tag).slice(prefix.length) : String(tag);
          const label = titleCaseFromSlug(labelSlug);
          const href = `${baseUrl}/${handleize(tag)}`;
          return `<a class="mk-character-card" href="${href}"><span class="mk-character-card__label">${label}</span></a>`;
        })
        .join('');

      listEl.innerHTML = html;
    });
  };

  const initCharacterSearch = () => {
    const roots = document.querySelectorAll('[data-mk-character-search]');
    roots.forEach((root) => {
      const input = root.querySelector('input[type="search"][data-mk-input]');
      const items = Array.from(root.querySelectorAll('[data-mk-item]'));
      if (!input || !items.length) return;

      const apply = () => {
        const q = String(input.value || '').trim().toLowerCase();
        items.forEach((el) => {
          const text = String(el.getAttribute('data-mk-text') || '').toLowerCase();
          el.style.display = !q || text.includes(q) ? '' : 'none';
        });
      };

      input.addEventListener('input', apply);
      apply();
    });
  };

  document.addEventListener('DOMContentLoaded', () => {
    renderCharacterSpotlight();
    initCharacterSearch();
  });

  document.addEventListener('shopify:section:load', (e) => {
    const section = e.target;
    if (!section) return;
    if (section.querySelector('[data-mk-character-spotlight]')) renderCharacterSpotlight();
    if (section.querySelector('[data-mk-character-search]')) initCharacterSearch();
  });
})();
