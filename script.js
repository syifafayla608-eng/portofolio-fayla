// SCROLL REVEAL
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(r => obs.observe(r));

// SKILL BARS (animate when visible)
const barObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.skill-bar').forEach(bar => {
        bar.style.width = bar.dataset.w + '%';
      });
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.skills-group').forEach(g => barObs.observe(g));

// TYPED TEXT
const words = ['Universitas Syiah Kuala', 'Web Developer ✨', 'Problem Solver 🧩', 'K-Pop Enthusiast 🎵', 'Tech Explorer 🔍'];
let wi = 0, ci = 0, del = false;
const el = document.getElementById('heroTyped');
function type() {
  const w = words[wi];
  if (!del) { el.textContent = w.slice(0, ci + 1); ci++; if (ci === w.length) { del = true; setTimeout(type, 2200); return; } }
  else { el.textContent = w.slice(0, ci - 1); ci--; if (ci === 0) { del = false; wi = (wi + 1) % words.length; } }
  setTimeout(type, del ? 45 : 75);
}
setTimeout(type, 800);

// GALLERY FILTER
function filterGallery(cat, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.gal-item').forEach(item => {
    const match = cat === 'all' || item.dataset.cat === cat;
    item.style.display = match ? '' : 'none';
  });
}

// LIGHTBOX
function openLightbox(item) {
  const lb = document.getElementById('lightbox');
  const content = document.getElementById('lbContent');
  const img = item.querySelector('img');
  if (img) {
    content.innerHTML = `<img src="${img.src}" alt="${img.alt}" style="max-width:90vw;max-height:85vh;border-radius:16px;box-shadow:0 40px 100px rgba(0,0,0,0.5)" />`;
  } else {
    const placeholder = item.querySelector('.gal-placeholder');
    content.innerHTML = `<div class="lb-placeholder" style="width:400px;height:320px;border-radius:16px;background:linear-gradient(160deg,#fde8f0,#f5c6d6,#c8b4d4);display:flex;align-items:center;justify-content:center;font-size:5rem">${placeholder ? placeholder.querySelector('span').textContent : '🌸'}</div>`;
  }
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

// Load EmailJS
const script = document.createElement('script');
script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
script.onload = () => emailjs.init('5C0-9mGjzqQDVpXgk');
document.head.appendChild(script);

// CONTACT FORM
function handleSend() {
  const btn = document.getElementById('sendBtn');
  const nama = document.getElementById('namanya').value.trim();
  const email = document.getElementById('emailnya').value.trim();
  const pesan = document.getElementById('pesannya').value.trim();

  if (!nama || !email || !pesan) {
    alert('Isi semua field dulu ya!');
    return;
  }

  btn.textContent = 'Mengirim...';
  btn.disabled = true;

emailjs.send('service_nslm1h6', 'template_6zropb7', {
    name: nama,
    email: email,
    message: pesan,
    title: 'Portfolio Contact'
  })
  .then(() => {
    btn.textContent = '✓ Terkirim!';
    btn.style.background = '#7bd47b';
    btn.style.boxShadow = '0 4px 20px rgba(123,212,123,0.4)';
    document.getElementById('namanya').value = '';
    document.getElementById('emailnya').value = '';
    document.getElementById('pesannya').value = '';
    setTimeout(() => {
      btn.textContent = 'Kirim Pesan ✉';
      btn.style.background = '';
      btn.style.boxShadow = '';
      btn.disabled = false;
    }, 2500);
  })
  .catch((err) => {
    alert('Gagal kirim, coba lagi ya!');
    btn.textContent = 'Kirim Pesan ✉';
    btn.disabled = false;
    console.error(err);
  });
}
