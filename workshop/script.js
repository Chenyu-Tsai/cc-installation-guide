  // Fit the 1440x900 design canvas to the viewport. Pure scale transform —
  // no reflow, no overflow, layout identical at every viewport size.
  function fitDeck() {
    const s = Math.min(window.innerWidth / 1440, window.innerHeight / 900);
    document.documentElement.style.setProperty('--s', s);
  }
  fitDeck();
  window.addEventListener('resize', fitDeck);

  const slides = document.querySelectorAll('.slide');
  let idx = 0;
  document.getElementById('total').textContent = slides.length;

  function show(i) {
    slides[idx].classList.remove('active');
    idx = (i + slides.length) % slides.length;
    slides[idx].classList.add('active');
    document.getElementById('cur').textContent = idx + 1;
  }
  function next() { show(idx + 1); }
  function prev() { show(idx - 1); }

  document.addEventListener('keydown', e => {
    if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A') return;
    if (e.key === 'ArrowRight' || e.key === ' ') next();
    if (e.key === 'ArrowLeft') prev();
  });

  function burstParticles(btn) {
    const rect = btn.getBoundingClientRect();
    const ox = rect.left + rect.width / 2;
    const oy = rect.top + rect.height / 2;
    const count = 11;
    const sizes = ['copy-particle--sm', '', 'copy-particle--lg'];
    // Mix ink particles only when the button itself sits on a light bg
    const onLight = btn.classList.contains('vp-copy')
      || btn.closest('.template-card');
    for (let i = 0; i < count; i++) {
      const p = document.createElement('span');
      p.className = 'copy-particle ' + sizes[i % sizes.length];
      if (onLight && i % 2 === 0) p.classList.add('copy-particle--ink');
      const baseAngle = (Math.PI * 2 * i) / count;
      const angle = baseAngle + (Math.random() - 0.5) * 0.45;
      const dist = 34 + Math.random() * 26;
      p.style.setProperty('--ox', ox + 'px');
      p.style.setProperty('--oy', oy + 'px');
      p.style.setProperty('--dx', (Math.cos(angle) * dist).toFixed(1) + 'px');
      p.style.setProperty('--dy', (Math.sin(angle) * dist).toFixed(1) + 'px');
      p.style.setProperty('--delay', Math.floor(Math.random() * 70) + 'ms');
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 850);
    }
  }

  document.querySelectorAll('.copy-btn, .copy-btn-mini, .copy-btn-inline, .vp-copy').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const text = btn.dataset.clip || '';
      if (!btn.dataset.label) btn.dataset.label = btn.textContent;
      const orig = btn.dataset.label;
      const reset = () => {
        btn.textContent = orig;
        btn.classList.remove('copied', 'copy-failed');
      };
      const replay = cls => {
        btn.classList.remove('copied', 'copy-failed');
        void btn.offsetWidth;
        btn.classList.add(cls);
      };
      navigator.clipboard.writeText(text).then(() => {
        btn.textContent = '已複製';
        replay('copied');
        burstParticles(btn);
      }).catch(() => {
        btn.textContent = '複製失敗';
        replay('copy-failed');
      });
      clearTimeout(btn._copyTimer);
      btn._copyTimer = setTimeout(reset, 1500);
    });
  });
