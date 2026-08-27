const {
  services,
  projects,
  galleryItems,
  caps
} = window.starkData;

const cursorDot = document.getElementById('cursor-dot');
if (window.matchMedia('(pointer:fine)').matches) {
  window.addEventListener('mousemove', e => {
    cursorDot.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%,-50%)`;
  });
  document.addEventListener('mouseover', e => {
    if (e.target.closest('a, button, .gal-item, .work-card')) cursorDot.classList.add('hover');
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest('a, button, .gal-item, .work-card')) cursorDot.classList.remove('hover');
  });
}

const header = document.getElementById('siteHeader');
window.addEventListener('scroll', () => header.classList.toggle('compact', window.scrollY > 30), { passive: true });

const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  hamburger.classList.remove('open');
  mobileMenu.classList.remove('open');
}));

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', event => {
    const targetId = link.getAttribute('href');
    if (!targetId || targetId === '#') return;
    const target = document.querySelector(targetId);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    history.pushState(null, '', targetId);
  });
});

document.querySelectorAll('.magnetic').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const r = btn.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    btn.style.transform = `translate(${x * 0.2}px, ${y * 0.35}px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'translate(0,0)';
  });
});

const serviceIcons = {
  briefcase: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7m-8 0h10a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2Z" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 12h6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
  booth: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4.5 9.5h15m-12 0V7.8A1.8 1.8 0 0 1 9.3 6h5.4a1.8 1.8 0 0 1 1.8 1.8v1.7m-9 0v7.2a1.8 1.8 0 0 0 1.8 1.8h9.4a1.8 1.8 0 0 0 1.8-1.8V9.5m-12.8 0 1.5-2.5h10.6l1.5 2.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  mic: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3a3 3 0 0 1 3 3v6a3 3 0 1 1-6 0V6a3 3 0 0 1 3-3Zm-6 9a6 6 0 1 0 12 0m-6 6v3m-4 0h8" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  rocket: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M14 4.5c3.1 1 5.5 3.4 6.5 6.5-2.2 1-4.6 1.3-6.9.8l-1.6-1.6c-.4-2.3-.1-4.7.9-6.7Zm-8 8.5c1.5-1.5 3.2-2.5 5.1-2.9l3.9 4c-.4 2.1-1.4 3.8-2.9 5.3l-6.1-6.4Zm6.1 1.4 4 4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/><path d="M7.5 16.5 5 19l2.5-2.5Z" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  megaphone: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12.5V9.8A1.8 1.8 0 0 1 5.8 8h9.4l5.3-3.2v14.8l-5.3-3.2H5.8A1.8 1.8 0 0 1 4 15.4v-2.9Zm0 0 2.5 1.7M10 16v4m4-4v4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  wrench: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M14.2 7.2a4.6 4.6 0 0 0-6.5 6.5l-4.3 4.3 1.4 1.4 4.3-4.3a4.6 4.6 0 0 0 6.5-6.5l1.8-1.8 2.2 2.2-1.8 1.8Z" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  heart: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 20s-7-4.3-7-10a4 4 0 0 1 7-2.7A4 4 0 0 1 19 10c0 5.7-7 10-7 10Z" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  music: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 18V7.4l9-2.1v10.6m-9 2.1a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm9-1.9a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`
};

const serviceCards = [
  { icon: 'briefcase', title: 'Corporate Events', text: 'Complete planning and delivery for conferences, seminars, award ceremonies and team experiences that run with confidence.' },
  { icon: 'booth', title: 'Exhibitions', text: 'From booth construction and staffing to registration, AV and logistics, we manage every part of your exhibition presence.' },
  { icon: 'mic', title: 'Conference Management', text: 'Coordinated conference support covering venue preparation, delegate care, technical requirements and smooth event flow.' },
  { icon: 'rocket', title: 'Product Launch', text: 'Strategic launch experiences that build anticipation, connect with audiences and give your brand a strong market entrance.' },
  { icon: 'megaphone', title: 'Promotion & BTL', text: 'Hands-on activations, retail campaigns, roadshows and awareness programs delivered by trained promotional teams.' },
  { icon: 'wrench', title: 'Fabrication & Production', text: 'Distinctive stalls and event environments, designed and built with thoughtful detailing, quality materials and precise execution.' },
  { icon: 'heart', title: 'Weddings & Décor', text: 'Personalised wedding planning and décor that brings your vision to life through beautiful styling and seamless coordination.' },
  { icon: 'music', title: 'Artist Management', text: 'Reliable artist booking and coordination for DJs, singers, performers and entertainers across corporate and social occasions.' }
];

document.getElementById('serviceGrid').innerHTML = serviceCards.map((service, index) => `
  <article class="service-card" data-r data-r-d="${(index % 4) + 1}">
    <div class="service-icon">${serviceIcons[service.icon]}</div>
    <h3>${service.title}</h3>
    <p>${service.text}</p>
  </article>
`).join('');

document.getElementById('workGrid').innerHTML = projects.map((p, i) => `
  <div class="work-card ${p.cls}" data-r data-r-d="${(i % 3) + 1}">
    <img src="${p.img}" alt="${p.name}" loading="lazy">
    <div class="work-info">
      <div class="wi-top">
        <div><h3>${p.name}</h3><div class="work-meta">${p.type} · ${p.loc} · ${p.year}</div></div>
      </div>
      <span class="view-link">VIEW PROJECT <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M1.5 5.5h8M6.5 2.5l3 3-3 3" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
    </div>
  </div>`).join('');

const galCats = ["All", ...new Set(galleryItems.map(g => g.cat))];
const galFilters = document.getElementById('galFilters');
galFilters.innerHTML = galCats.map((c, i) => `<button class="gal-tab ${i === 0 ? 'active' : ''}" data-cat="${c}">${c}</button>`).join('');

const galGrid = document.getElementById('galGrid');
function renderGallery(cat) {
  const items = cat === 'All' ? galleryItems : galleryItems.filter(g => g.cat === cat);
  galGrid.innerHTML = items.map((g, i) => `
    <div class="gal-item" data-img="${g.img.replace('w=700', 'w=1400')}" data-cap="${g.name} — ${g.cat}, ${g.year}">
      <span class="gal-idx">${String(i + 1).padStart(2, '0')}</span>
      <img src="${g.img}" alt="${g.name}" loading="lazy">
      <div class="gal-cap"><b>${g.name}</b><span>${g.cat} · ${g.year}</span></div>
    </div>`).join('');

  galGrid.querySelectorAll('.gal-item').forEach(el => {
    el.addEventListener('click', () => {
      document.getElementById('galLightboxImg').src = el.dataset.img;
      document.getElementById('galLightboxImg').alt = el.dataset.cap;
      document.getElementById('galLightboxCap').textContent = el.dataset.cap;
      document.getElementById('galLightbox').classList.add('open');
    });
  });
}

renderGallery('All');
galFilters.addEventListener('click', e => {
  const btn = e.target.closest('.gal-tab');
  if (!btn) return;
  galFilters.querySelectorAll('.gal-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderGallery(btn.dataset.cat);
});

document.getElementById('galLightboxClose').addEventListener('click', () => document.getElementById('galLightbox').classList.remove('open'));
document.getElementById('galLightbox').addEventListener('click', e => {
  if (e.target.id === 'galLightbox') e.currentTarget.classList.remove('open');
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') document.getElementById('galLightbox').classList.remove('open');
});

document.getElementById('capList').innerHTML = caps.map((c, i) => `
  <div class="cap-item" data-idx="${i}">
    <span class="cap-num">0${i + 1}</span>
    <div><h3>${c.t}</h3><p>${c.d}</p></div>
  </div>`).join('');

function bindReveal() {
  document.querySelectorAll('[data-r]:not(.io-bound)').forEach(el => {
    el.classList.add('io-bound');
    io.observe(el);
  });
}

const io = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting) {
      en.target.classList.add('in');
      io.unobserve(en.target);
    }
  });
}, { threshold: 0.12 });

bindReveal();

const capItems = () => document.querySelectorAll('.cap-item');
const capIo = new IntersectionObserver(entries => {
  entries.forEach(en => {
    en.target.classList.toggle('active', en.isIntersecting);
  });
}, { threshold: 0.55, rootMargin: '-30% 0px -30% 0px' });

setTimeout(() => capItems().forEach(c => capIo.observe(c)), 150);
