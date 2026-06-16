/* ── Hero typewriter ── */
(function () {
  const el = document.getElementById('hero-typed');
  if (!el) return;
  const segments = ['Find what your', '<br>', 'finance team', '<br>', "can't see."];
  let html = '';
  let si = 0;
  let ci = 0;
  function tick() {
    const seg = segments[si];
    if (seg === '<br>') {
      html += '<br>';
      el.innerHTML = html;
      si++; ci = 0;
      setTimeout(tick, 60);
    } else if (ci < seg.length) {
      html += seg[ci];
      el.innerHTML = html;
      ci++;
      setTimeout(tick, 48);
    } else {
      si++; ci = 0;
      if (si < segments.length) setTimeout(tick, 60);
    }
  }
  setTimeout(tick, 300);
})();

/* ── Hamburger menu ── */
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});
document.querySelectorAll('.mobile-menu a').forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

/* ── What-if rotator ── */
const phrases = [
  '"What if we\'re being overcharged?"',
  '"What if a contract changed?"',
  '"What if we missed a deadline?"',
  '"What if we\'re leaking money?"',
  '"What if a customer never paid?"'
];
let pi = 0;
const wel = document.getElementById('whatif');
const nextPhrase = () => {
  wel.style.opacity = '0';
  setTimeout(() => {
    wel.textContent = phrases[pi];
    wel.style.opacity = '1';
    pi++;
    if (pi < phrases.length) setTimeout(nextPhrase, 1900);
    else setTimeout(() => { wel.style.opacity = '0'; }, 2400);
  }, 420);
};
setTimeout(nextPhrase, 700);


/* ── Scroll-triggered animations ── */
const animObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      animObs.unobserve(e.target);
    }
  });
}, { threshold: 0.07, rootMargin: '0px 0px -32px 0px' });
document.querySelectorAll('.up').forEach(el => animObs.observe(el));

/* ── Nav active section ── */
const navLinks = document.querySelectorAll('.nav-link');
const secObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(l => l.classList.remove('active'));
      const a = document.querySelector(`.nav-link[href="#${e.target.id}"]`);
      if (a) a.classList.add('active');
    }
  });
}, { threshold: 0.35 });
document.querySelectorAll('section[id]').forEach(s => secObs.observe(s));

/* ── Demo Modal ── */
const modal = document.getElementById('demo-modal');
const mEmail = document.getElementById('m-email');

function openModal(prefillEmail) {
  showModalStep(1);
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  if (prefillEmail) mEmail.value = prefillEmail;
  setTimeout(() => document.getElementById('m-name').focus(), 220);
}
function closeModal() {
  modal.classList.remove('open');
  document.body.style.overflow = '';
}
function showModalStep(n) {
  document.querySelectorAll('.modal-step').forEach(s => s.classList.remove('active'));
  document.getElementById('modal-step-' + n).classList.add('active');
}

document.querySelectorAll('[data-demo]').forEach(btn => {
  btn.addEventListener('click', () => openModal());
});

const ctaInput = document.querySelector('.cta-input');
const ctaSubmit = document.querySelector('.cta-submit');
if (ctaSubmit) {
  ctaSubmit.addEventListener('click', e => {
    e.preventDefault();
    openModal(ctaInput ? ctaInput.value.trim() : '');
  });
}

document.getElementById('modal-next').addEventListener('click', () => {
  const name  = document.getElementById('m-name').value.trim();
  const email = document.getElementById('m-email').value.trim();
  if (!name || !email) {
    alert('Please enter your name and work email.');
    return;
  }
  showModalStep(2);
});

document.getElementById('modal-submit').addEventListener('click', () => {
  const submitBtn = document.getElementById('modal-submit');
  const checks = [...document.querySelectorAll('.modal-checks input:checked')].map(c => c.value);
  const data = {
    name:    document.getElementById('m-name').value.trim(),
    email:   document.getElementById('m-email').value.trim(),
    company: document.getElementById('m-company').value.trim(),
    role:    document.getElementById('m-role').value,
    goals:   checks.join(', '),
    context: document.getElementById('m-context').value.trim(),
  };

  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending…';

  fetch('https://formspree.io/f/maqzvorq', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify(data),
  })
    .then(res => res.json())
    .then(result => {
      if (result.ok) {
        showModalStep(3);
      } else {
        const msg = result.errors?.map(e => e.message).join(', ') || 'Submission failed. Please try again.';
        alert(msg);
        submitBtn.disabled = false;
        submitBtn.textContent = '→ Submit Request';
      }
    })
    .catch(() => {
      alert('Network error. Please check your connection and try again.');
      submitBtn.disabled = false;
      submitBtn.textContent = '→ Submit Request';
    });
});

document.getElementById('modal-close').addEventListener('click', closeModal);
document.getElementById('modal-back').addEventListener('click', closeModal);
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

/* ── Trust pillar tabs ── */
const trustTabs = document.querySelectorAll('.trust-tab');
const trustPanels = document.querySelectorAll('.trust-panel');
trustTabs.forEach((tab, i) => {
  tab.addEventListener('click', () => {
    trustTabs.forEach(t => t.classList.remove('active'));
    trustPanels.forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    if (trustPanels[i]) trustPanels[i].classList.add('active');
  });
});

/* ── Flow node highlight on step card hover ── */
const stepCards = document.querySelectorAll('.step-card');
const flowNodes = document.querySelectorAll('.flow-node');
stepCards.forEach((card, i) => {
  card.addEventListener('mouseenter', () => flowNodes[i]?.classList.add('active'));
  card.addEventListener('mouseleave', () => flowNodes[i]?.classList.remove('active'));
});

