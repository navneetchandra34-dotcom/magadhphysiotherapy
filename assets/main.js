/* ==========================================================================
   MAGADH PHYSIOTHERAPY & ELECTRO HOMEOPATHY — 3D INTERACTIVE ENGINE
   File: assets/main.js
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  init3DTiltCards();
  initScrollReveal();
  initCounters();
  initServiceFilter();
  initFaqAccordion();
  initBookingForm();
  initDaylightWebGL();
});

/* 1. Responsive Navigation & Mobile Drawer */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const toggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');

  window.addEventListener('scroll', () => {
    if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 20);
  });

  if (toggle && navMenu) {
    toggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      toggle.textContent = isOpen ? '✕' : '☰';
    });
  }
}

/* 2. Subtle, Unclustered 3D Perspective Card Tilt */
function init3DTiltCards() {
  const cards = document.querySelectorAll('.tilt-card');
  if (!window.matchMedia('(hover: hover)').matches) return;

  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const maxTilt = Number(card.dataset.tiltMax || 5);

      const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -maxTilt;
      const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * maxTilt;

      card.style.transform = `perspective(1100px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1100px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });
}

/* 3. Smooth Scroll Reveal */
function initScrollReveal() {
  const items = document.querySelectorAll('.reveal-3d');
  if (!('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  items.forEach((el) => observer.observe(el));
}

/* 4. Animated Clinical Counters */
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        const suffix = el.dataset.suffix || '';
        const start = performance.now();
        const duration = 1600;

        function tick(now) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.floor(eased * target).toLocaleString() + suffix;
          if (progress < 1) requestAnimationFrame(tick);
        }

        requestAnimationFrame(tick);
        observer.unobserve(el);
      });
    },
    { threshold: 0.4 }
  );

  counters.forEach((c) => observer.observe(c));
}

/* 5. Category Filter Tabs */
function initServiceFilter() {
  const buttons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('[data-category]');
  if (!buttons.length || !cards.length) return;

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      buttons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      cards.forEach((card) => {
        const show = filter === 'all' || card.dataset.category.includes(filter);
        card.style.display = show ? 'flex' : 'none';
      });
    });
  });
}

/* 6. FAQ Accordion */
function initFaqAccordion() {
  document.querySelectorAll('.faq-item').forEach((item) => {
    const btn = item.querySelector('.faq-question');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const open = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach((i) => i.classList.remove('open'));
      if (!open) item.classList.add('open');
    });
  });
}

/* 7. Appointment Form & Symptom Pill Selector */
function initBookingForm() {
  const pills = document.querySelectorAll('.zone-pill');
  const hiddenInput = document.getElementById('selected-zones');

  pills.forEach((pill) => {
    pill.addEventListener('click', () => {
      pill.classList.toggle('selected');
      if (hiddenInput) {
        const active = Array.from(document.querySelectorAll('.zone-pill.selected')).map((p) =>
          p.textContent.trim()
        );
        hiddenInput.value = active.join(', ');
      }
    });
  });

  const form = document.getElementById('appointment-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const status = document.getElementById('form-status');
      const name = form.querySelector('[name="name"]')?.value || 'Patient';
      const dept = form.querySelector('[name="service"]')?.value || 'Consultation';
      if (status) {
        status.style.display = 'block';
        status.innerHTML = `✓ Thank you, <strong>${name}</strong>. Your request for <strong>${dept}</strong> has been received. Our clinic desk will contact you shortly.`;
      }
      form.reset();
      pills.forEach((p) => p.classList.remove('selected'));
    });
  }
}

/* 8. Soft Daylight Three.js 3D Bio-Helix & Botanical Lattice */
function initDaylightWebGL() {
  const canvas = document.getElementById('webgl-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 34;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const group = new THREE.Group();
  scene.add(group);

  const nodeGeo = new THREE.SphereGeometry(0.22, 14, 14);
  const blueMat = new THREE.MeshBasicMaterial({ color: 0x0284c7 });
  const greenMat = new THREE.MeshBasicMaterial({ color: 0x059669 });
  const lineMat = new THREE.LineBasicMaterial({ color: 0x94a3b8, transparent: true, opacity: 0.22 });

  const count = 28;
  for (let i = 0; i < count; i++) {
    const y = (i - count / 2) * 1.1;
    const angle = i * 0.32;
    const r = 6.5;

    const x1 = Math.cos(angle) * r;
    const z1 = Math.sin(angle) * r;
    const x2 = Math.cos(angle + Math.PI) * r;
    const z2 = Math.sin(angle + Math.PI) * r;

    const m1 = new THREE.Mesh(nodeGeo, blueMat);
    m1.position.set(x1, y, z1);
    group.add(m1);

    const m2 = new THREE.Mesh(nodeGeo, greenMat);
    m2.position.set(x2, y, z2);
    group.add(m2);

    const lineGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(x1, y, z1),
      new THREE.Vector3(x2, y, z2)
    ]);
    group.add(new THREE.Line(lineGeo, lineMat));
  }

  let mouseX = 0;
  let mouseY = 0;
  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  function animate() {
    requestAnimationFrame(animate);
    group.rotation.y += 0.003;
    group.rotation.x += (mouseY * 0.15 - group.rotation.x) * 0.04;
    group.position.x += (mouseX * 2.5 - group.position.x) * 0.04;
    renderer.render(scene, camera);
  }

  animate();
}
