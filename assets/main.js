/* ==========================================================================
   MAGADH PHYSIOTHERAPY & REHABILITATION — 3D INTERACTIVE ENGINE
   File: assets/main.js
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  init3DTiltCards();
  initScrollReveal3D();
  initCounters();
  initServiceFilter();
  initFaqAccordion();
  initBookingForm();
  initWebGLBackground();
});

/* 1. Sticky Glassmorphic Navbar & Mobile Drawer */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const toggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
    if (!navbar) return;
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });

  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      toggle.innerHTML = isOpen ? '✕' : '☰';
    });
  }
}

/* 2. 60fps 3D Perspective Tilt & Dynamic Glare Physics */
function init3DTiltCards() {
  const cards = document.querySelectorAll('.tilt-card');
  const supportsHover = window.matchMedia('(hover: hover)').matches;
  if (!supportsHover) return;

  cards.forEach((card) => {
    let glare = card.querySelector('.card-glare');
    if (!glare) {
      glare = document.createElement('div');
      glare.className = 'card-glare';
      card.appendChild(glare);
    }

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const maxTilt = Number(card.dataset.tiltMax || 8);
      const rotateX = ((y - centerY) / centerY) * -maxTilt;
      const rotateY = ((x - centerX) / centerX) * maxTilt;

      card.style.transform = `perspective(1200px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`;
      card.style.setProperty('--glare-x', `${(x / rect.width) * 100}%`);
      card.style.setProperty('--glare-y', `${(y / rect.height) * 100}%`);
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });
}

/* 3. Scroll-Triggered 3D Reveal Animations */
function initScrollReveal3D() {
  const elements = document.querySelectorAll('.reveal-3d');
  if (!('IntersectionObserver' in window)) {
    elements.forEach((el) => el.classList.add('visible'));
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
    { threshold: 0.14 }
  );

  elements.forEach((el) => observer.observe(el));
}

/* 4. Animated Clinical Metric Counters */
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
        const duration = 1800;
        const startTime = performance.now();

        function updateCount(now) {
          const progress = Math.min((now - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.floor(eased * target).toLocaleString() + suffix;
          if (progress < 1) requestAnimationFrame(updateCount);
        }

        requestAnimationFrame(updateCount);
        observer.unobserve(el);
      });
    },
    { threshold: 0.4 }
  );

  counters.forEach((c) => observer.observe(c));
}

/* 5. Interactive Clinical Specialty Filter (Services Page) */
function initServiceFilter() {
  const buttons = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('[data-category]');
  if (!buttons.length || !items.length) return;

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      buttons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      items.forEach((item) => {
        const match = filter === 'all' || item.dataset.category.includes(filter);
        item.style.display = match ? 'flex' : 'none';
      });
    });
  });
}

/* 6. FAQ Accordion */
function initFaqAccordion() {
  const items = document.querySelectorAll('.faq-item');
  items.forEach((item) => {
    const btn = item.querySelector('.faq-question');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      items.forEach((i) => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
}

/* 7. Interactive Body-Zone Selector & Appointment Submission */
function initBookingForm() {
  const pills = document.querySelectorAll('.zone-pill');
  const hiddenZone = document.getElementById('selected-zones');

  pills.forEach((pill) => {
    pill.addEventListener('click', () => {
      pill.classList.toggle('selected');
      if (hiddenZone) {
        const selected = Array.from(document.querySelectorAll('.zone-pill.selected')).map(
          (p) => p.textContent.trim()
        );
        hiddenZone.value = selected.join(', ');
      }
    });
  });

  const form = document.getElementById('appointment-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const status = document.getElementById('form-status');
      const name = form.querySelector('[name="name"]')?.value || 'Patient';
      const service = form.querySelector('[name="service"]')?.value || 'Consultation';
      const zones = hiddenZone?.value ? ` (Focus Areas: ${hiddenZone.value})` : '';

      if (status) {
        status.style.display = 'block';
        status.innerHTML = `✓ Thank you, <strong>${name}</strong>! Your priority request for <strong>${service}</strong>${zones} has been recorded. Our clinical desk will confirm your slot shortly.`;
      }
      form.reset();
      pills.forEach((p) => p.classList.remove('selected'));
    });
  }
}

/* 8. Three.js 3D Biomechanical Helix & Restorative Particle Field */
function initWebGLBackground() {
  const canvas = document.getElementById('webgl-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 32;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const group = new THREE.Group();
  scene.add(group);

  // Create 3D Biomechanical Double-Helix Spine Lattice
  const sphereGeo = new THREE.SphereGeometry(0.24, 16, 16);
  const cyanMat = new THREE.MeshBasicMaterial({ color: 0x00d2ff });
  const emeraldMat = new THREE.MeshBasicMaterial({ color: 0x10b981 });
  const lineMat = new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.25 });

  const vertebraCount = 36;
  for (let i = 0; i < vertebraCount; i++) {
    const t = (i - vertebraCount / 2) * 0.85;
    const angle = i * 0.35;
    const radius = 5.5;

    const x1 = Math.cos(angle) * radius;
    const z1 = Math.sin(angle) * radius;
    const x2 = Math.cos(angle + Math.PI) * radius;
    const z2 = Math.sin(angle + Math.PI) * radius;

    const node1 = new THREE.Mesh(sphereGeo, cyanMat);
    node1.position.set(x1, t, z1);
    group.add(node1);

    const node2 = new THREE.Mesh(sphereGeo, emeraldMat);
    node2.position.set(x2, t, z2);
    group.add(node2);

    const connectorGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(x1, t, z1),
      new THREE.Vector3(x2, t, z2)
    ]);
    const connector = new THREE.Line(connectorGeo, lineMat);
    group.add(connector);
  }

  // Ambient Floating Bio-Particles
  const particleCount = 240;
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 70;
  }
  const particleGeo = new THREE.BufferGeometry();
  particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const particleMat = new THREE.PointsMaterial({
    color: 0x00d2ff,
    size: 0.18,
    transparent: true,
    opacity: 0.55
  });
  const particles = new THREE.Points(particleGeo, particleMat);
  scene.add(particles);

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
    group.rotation.y += 0.0045;
    group.rotation.x += (mouseY * 0.25 - group.rotation.x) * 0.05;
    group.position.x += (mouseX * 3.5 - group.position.x) * 0.04;
    particles.rotation.y -= 0.0012;
    renderer.render(scene, camera);
  }

  animate();
}
