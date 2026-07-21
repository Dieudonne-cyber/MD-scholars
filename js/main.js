/* ==========================================================
   MD Scholars — shared behaviour
   Works across every page. Individual pages call the small
   render*() helpers below only when their target elements exist.
   ========================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initYear();
  initMobileNav();
  initReveal();
  initLang();
  initAuthState();
  initFaq();
  initNewsletterForms();
  initContactForm();
  initLoginForm();
  initSignupForm();
  renderOpportunityGrids();
  renderOpportunityDetail();
  renderStoryGrids();
  initFilterBar();
});

/* ---------- footer year ---------- */
function initYear(){
  document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });
}

/* ---------- mobile nav ---------- */
function initMobileNav(){
  const toggle = document.querySelector('.menu-toggle');
  const links = document.querySelector('nav.links');
  if(!toggle || !links) return;
  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));
}

/* ---------- scroll reveal ---------- */
function initReveal(){
  const targets = document.querySelectorAll('.reveal');
  if(!targets.length) return;
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    targets.forEach(t => t.classList.add('in'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.15 });
  targets.forEach(el => io.observe(el));
}

/* ---------- language toggle (EN / RW) ----------
   Elements opt in with data-i18n-en="..." data-i18n-rw="..."
   Inputs use data-i18n-en-ph / data-i18n-rw-ph for placeholders. */
function initLang(){
  const stored = localStorage.getItem('mds_lang') || 'en';
  applyLang(stored);
  document.querySelectorAll('.lang-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const current = localStorage.getItem('mds_lang') || 'en';
      const next = current === 'en' ? 'rw' : 'en';
      localStorage.setItem('mds_lang', next);
      applyLang(next);
    });
  });
}
function applyLang(lang){
  document.documentElement.setAttribute('lang', lang === 'rw' ? 'rw' : 'en');
  const key = lang === 'rw' ? 'i18nRw' : 'i18nEn';
  document.querySelectorAll('[data-i18n-en]').forEach(el => {
    if(el.dataset[key]) el.textContent = el.dataset[key];
  });
  const phKey = lang === 'rw' ? 'i18nRwPh' : 'i18nEnPh';
  document.querySelectorAll('[data-i18n-en-ph]').forEach(el => {
    if(el.dataset[phKey]) el.setAttribute('placeholder', el.dataset[phKey]);
  });
  document.querySelectorAll('.lang-toggle .lang-label').forEach(el => {
    el.textContent = lang === 'rw' ? 'EN' : 'RW';
  });
}

/* ---------- mock auth state reflected in nav ---------- */
function initAuthState(){
  const session = getSession();
  document.querySelectorAll('[data-auth-slot]').forEach(slot => {
    if(session){
      slot.innerHTML = `
        <span class="mono" style="font-size:13px;color:var(--muted);">Hi, ${escapeHtml(session.name.split(' ')[0])}</span>
        <button class="btn btn-outline" id="mds-logout" type="button">Log out</button>
      `;
    }
  });
  const logoutBtn = document.getElementById('mds-logout');
  if(logoutBtn){
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('mds_session');
      showToast('You have been logged out.', 'ok');
      setTimeout(() => window.location.href = 'index.html', 700);
    });
  }
}
function getSession(){
  try{ return JSON.parse(localStorage.getItem('mds_session')); } catch(e){ return null; }
}
function getUsers(){
  try{ return JSON.parse(localStorage.getItem('mds_users')) || []; } catch(e){ return []; }
}
function saveUsers(users){ localStorage.setItem('mds_users', JSON.stringify(users)); }

/* ---------- toast ---------- */
let toastTimer;
function showToast(message, type){
  let toast = document.querySelector('.toast');
  if(!toast){
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.className = 'toast show' + (type === 'err' ? ' err' : '');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
}

/* ---------- FAQ accordion ---------- */
function initFaq(){
  const list = document.getElementById('faq-list');
  if(!list) return;
  list.innerHTML = FAQS.map((item, i) => `
    <div class="acc-item" data-i="${i}">
      <button class="acc-q" type="button" aria-expanded="false">
        <span>${escapeHtml(item.q)}</span>
        <span class="mark">+</span>
      </button>
      <div class="acc-a"><div class="acc-a-inner">${escapeHtml(item.a)}</div></div>
    </div>
  `).join('');
  list.querySelectorAll('.acc-item').forEach(item => {
    const q = item.querySelector('.acc-q');
    const a = item.querySelector('.acc-a');
    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      list.querySelectorAll('.acc-item.open').forEach(other => {
        if(other !== item){
          other.classList.remove('open');
          other.querySelector('.acc-a').style.maxHeight = null;
          other.querySelector('.acc-q').setAttribute('aria-expanded', 'false');
        }
      });
      if(isOpen){
        item.classList.remove('open');
        a.style.maxHeight = null;
        q.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 'px';
        q.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* ---------- newsletter forms (may appear on multiple pages) ---------- */
function initNewsletterForms(){
  document.querySelectorAll('.js-newsletter').forEach(form => {
    const msg = form.querySelector('.form-msg');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = form.querySelector('input[type="email"]').value.trim();
      if(!validEmail(email)){
        setMsg(msg, 'That email address doesn\'t look right — check it and try again.', 'err');
        return;
      }
      const subs = JSON.parse(localStorage.getItem('mds_subscribers') || '[]');
      if(!subs.includes(email)) subs.push(email);
      localStorage.setItem('mds_subscribers', JSON.stringify(subs));
      setMsg(msg, 'You\'re on the list — watch your inbox before the next deadline.', 'ok');
      form.reset();
    });
  });
}
function setMsg(el, text, type){
  if(!el) return;
  el.textContent = text;
  el.className = 'form-msg show ' + type;
}
function validEmail(v){ return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }

/* ---------- contact form ---------- */
function initContactForm(){
  const form = document.getElementById('contact-form');
  if(!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let ok = true;
    ok = validateField(form, 'name', v => v.trim().length >= 2, 'Enter your full name.') && ok;
    ok = validateField(form, 'email', validEmail, 'Enter a valid email address.') && ok;
    ok = validateField(form, 'message', v => v.trim().length >= 10, 'Message should be at least 10 characters.') && ok;
    if(!ok) return;
    showToast('Message sent — we typically reply within one business day.', 'ok');
    form.reset();
  });
}

/* ---------- login form ---------- */
function initLoginForm(){
  const form = document.getElementById('login-form');
  if(!form) return;
  const msg = form.querySelector('.form-msg');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let ok = true;
    ok = validateField(form, 'email', validEmail, 'Enter a valid email address.') && ok;
    ok = validateField(form, 'password', v => v.length >= 4, 'Enter your password.') && ok;
    if(!ok) return;
    const email = form.email.value.trim().toLowerCase();
    const password = form.password.value;
    const user = getUsers().find(u => u.email.toLowerCase() === email && u.password === password);
    if(!user){
      setMsg(msg, 'We couldn\'t find an account with those details. Try again, or sign up below.', 'err');
      return;
    }
    localStorage.setItem('mds_session', JSON.stringify({ name: user.name, email: user.email }));
    setMsg(msg, 'Welcome back — redirecting you now…', 'ok');
    setTimeout(() => window.location.href = 'index.html', 700);
  });
}

/* ---------- signup form ---------- */
function initSignupForm(){
  const form = document.getElementById('signup-form');
  if(!form) return;
  const msg = form.querySelector('.form-msg');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let ok = true;
    ok = validateField(form, 'name', v => v.trim().length >= 2, 'Enter your full name.') && ok;
    ok = validateField(form, 'email', validEmail, 'Enter a valid email address.') && ok;
    ok = validateField(form, 'password', v => v.length >= 6, 'Use at least 6 characters.') && ok;
    ok = validateField(form, 'confirm', v => v === form.password.value && v.length > 0, 'Passwords don\'t match.') && ok;
    if(!ok) return;
    const email = form.email.value.trim().toLowerCase();
    const users = getUsers();
    if(users.some(u => u.email.toLowerCase() === email)){
      setMsg(msg, 'An account with that email already exists — try logging in instead.', 'err');
      return;
    }
    users.push({ name: form.name.value.trim(), email: form.email.value.trim(), password: form.password.value });
    saveUsers(users);
    localStorage.setItem('mds_session', JSON.stringify({ name: form.name.value.trim(), email: form.email.value.trim() }));
    setMsg(msg, 'Account created — redirecting you now…', 'ok');
    setTimeout(() => window.location.href = 'index.html', 700);
  });
}

/* ---------- generic field validation helper ---------- */
function validateField(form, fieldName, test, errorText){
  const input = form[fieldName];
  if(!input) return true;
  const wrap = input.closest('.field');
  const valid = test(input.value);
  if(wrap){
    let err = wrap.querySelector('.field-error');
    if(!err){
      err = document.createElement('div');
      err.className = 'field-error';
      wrap.appendChild(err);
    }
    err.textContent = errorText;
    wrap.classList.toggle('invalid', !valid);
  }
  return valid;
}

/* ---------- opportunity card markup ---------- */
function oppCardHtml(o){
  return `
    <div class="opp-card reveal in">
      <div class="opp-top"><span class="opp-code">${o.code}</span><span class="opp-tag">${escapeHtml(o.tag)}</span></div>
      <div class="opp-body">
        <h3>${escapeHtml(o.title)}</h3>
        <p>${escapeHtml(o.blurb)}</p>
        <div class="opp-foot">
          <span class="opp-deadline">Closes ${o.deadlineLabel}</span>
          <a class="opp-link" href="opportunity.html?id=${encodeURIComponent(o.id)}">Read the fine print</a>
        </div>
      </div>
    </div>
  `;
}

/* ---------- render opportunity grids (home + listing page) ---------- */
function renderOpportunityGrids(){
  document.querySelectorAll('[data-opp-grid]').forEach(grid => {
    const limit = parseInt(grid.getAttribute('data-limit'), 10);
    const list = limit ? OPPORTUNITIES.slice(0, limit) : OPPORTUNITIES;
    grid.innerHTML = list.map(oppCardHtml).join('');
  });
}

/* ---------- filter bar (opportunities.html) ---------- */
function initFilterBar(){
  const bar = document.getElementById('filter-bar');
  const grid = document.querySelector('[data-opp-grid]');
  if(!bar || !grid) return;

  const countryPicker = bar.querySelector('#f-country');
  const tagPicker = bar.querySelector('#f-tag');
  const search = bar.querySelector('#f-search');
  const countEl = document.getElementById('filter-count');

  const countries = [...new Set(OPPORTUNITIES.map(o => o.country))].sort();
  countryPicker.innerHTML = '<option value="">All countries</option>' +
    countries.map(c => `<option value="${escapeHtml(c)}">${escapeHtml(c)}</option>`).join('');
  const tags = [...new Set(OPPORTUNITIES.map(o => o.tag))].sort();
  tagPicker.innerHTML = '<option value="">All types</option>' +
    tags.map(t => `<option value="${escapeHtml(t)}">${escapeHtml(t)}</option>`).join('');

  function apply(){
    const q = search.value.trim().toLowerCase();
    const country = countryPicker.value;
    const tag = tagPicker.value;
    const filtered = OPPORTUNITIES.filter(o => {
      const matchesQ = !q || o.title.toLowerCase().includes(q) || o.blurb.toLowerCase().includes(q) || o.country.toLowerCase().includes(q);
      const matchesCountry = !country || o.country === country;
      const matchesTag = !tag || o.tag === tag;
      return matchesQ && matchesCountry && matchesTag;
    });
    grid.innerHTML = filtered.length ? filtered.map(oppCardHtml).join('') :
      '<div class="empty-state" style="grid-column:1/-1;">No opportunities match those filters yet. Try clearing one and searching again.</div>';
    if(countEl) countEl.textContent = `Showing ${filtered.length} of ${OPPORTUNITIES.length} open opportunities`;
  }
  [search, countryPicker, tagPicker].forEach(el => el.addEventListener('input', apply));
  apply();
}

/* ---------- opportunity detail page ---------- */
function renderOpportunityDetail(){
  const root = document.getElementById('detail-root');
  if(!root) return;
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const o = OPPORTUNITIES.find(x => x.id === id);

  if(!o){
    root.innerHTML = `
      <div class="empty-state">
        This listing may have closed or the link is out of date.<br><br>
        <a class="btn btn-solid" href="opportunities.html">Back to all opportunities</a>
      </div>`;
    document.title = 'Listing not found — MD Scholars';
    return;
  }

  document.title = o.title + ' — MD Scholars';
  root.innerHTML = `
    <div class="detail-wrap">
      <div class="detail-card reveal in">
        <p class="eyebrow">${escapeHtml(o.tag)} · ${escapeHtml(o.country)}</p>
        <h1>${escapeHtml(o.title)}</h1>
        <div class="detail-meta">
          <span class="badge country">${escapeHtml(o.country)}</span>
          <span class="badge tag">${escapeHtml(o.tag)}</span>
          <span class="badge deadline">Closes ${o.deadlineLabel}</span>
        </div>
        <p class="desc">${escapeHtml(o.description)}</p>
        <h3>What you'll need to apply</h3>
        <ul class="req-list">
          ${o.requirements.map(r => `<li>${escapeHtml(r)}</li>`).join('')}
        </ul>
        <div style="display:flex; gap:12px; flex-wrap:wrap;">
          <a href="writing-desk.html" class="btn btn-solid">Get help with this application</a>
          <a href="opportunities.html" class="btn btn-outline">Back to all opportunities</a>
        </div>
      </div>
      <div class="side-ticket reveal in">
        <div class="ticket" style="transform:none;">
          <div class="ticket-main">
            <div class="ticket-row">
              <div class="ticket-field"><div class="k">Level</div><div class="v">${escapeHtml(o.level)}</div></div>
              <div class="ticket-field" style="text-align:right"><div class="k">Type</div><div class="v">${escapeHtml(o.tag)}</div></div>
            </div>
            <div class="ticket-title">Departure notice</div>
            <div class="ticket-row" style="margin-bottom:6px;">
              <div class="ticket-field"><div class="k">Destination</div><div class="v">${escapeHtml(o.country)}</div></div>
              <div class="ticket-field" style="text-align:right"><div class="k">Code</div><div class="v">${o.code}</div></div>
            </div>
            <hr>
            <div class="ticket-row"><div class="ticket-field"><div class="k">Boarding closes</div><div class="v">${o.deadlineLabel}</div></div></div>
            <div class="ticket-barcode" style="margin-top:12px;"></div>
          </div>
          <div class="ticket-stub">
            <div class="vert">MD SCHOLARS</div>
            <div class="stub-code">${o.code}</div>
            <div class="vert">FILE NOW</div>
          </div>
        </div>
      </div>
    </div>
  `;
}

/* ---------- success stories grid ---------- */
function renderStoryGrids(){
  document.querySelectorAll('[data-story-grid]').forEach(grid => {
    const limit = parseInt(grid.getAttribute('data-limit'), 10);
    const list = limit ? TESTIMONIALS.slice(0, limit) : TESTIMONIALS;
    grid.innerHTML = list.map(t => `
      <div class="story-card reveal in">
        <div class="visa-stamp">VISA<br>GRANTED</div>
        <p class="story-quote">"${escapeHtml(t.quote)}"</p>
        <div class="story-who">
          <div class="story-avatar">${t.initial}</div>
          <div><div class="story-name">${escapeHtml(t.name)}</div><div class="story-dest">${escapeHtml(t.dest)}</div></div>
        </div>
      </div>
    `).join('');
  });
}

/* ---------- tiny helper ---------- */
function escapeHtml(str){
  return String(str).replace(/[&<>"']/g, s => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[s]));
}
