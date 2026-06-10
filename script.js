// JS DYNAMIC FILTER FOR ROOM CATALOG
function filterCategory(category, badgeElement) {
  // Manage active state of filter badges
  const badges = document.querySelectorAll('.filter-badge');
  badges.forEach(b => b.classList.remove('active'));
  badgeElement.classList.add('active');

  // Filter room cards
  const roomCards = document.querySelectorAll('.room-card');
  roomCards.forEach(card => {
    const catAttr = card.getAttribute('data-cat');
    if (category === 'all' || catAttr.includes(category)) {
      card.classList.remove('hidden');
    } else {
      card.classList.add('hidden');
    }
  });
}

// ACCORDION DYNAMICS FOR FAQ BLOCK
function toggleFaq(button) {
  const item = button.parentElement;
  const content = item.querySelector('.faq-content');
  const isActive = item.classList.contains('active');

  // Close all other items
  const allItems = document.querySelectorAll('.faq-item');
  allItems.forEach(i => {
    i.classList.remove('active');
    i.querySelector('.faq-content').style.display = 'none';
  });

  if (!isActive) {
    item.classList.add('active');
    content.style.display = 'block';
  }
}

// BOOKING: all CTAs lead to the Yandex Travel affiliate page
const BOOKING_URL = "https://travel.yandex.ru/hotels/sochi/diadia-stiopa/?affiliate_clid=4910087&affiliate_vid=188657&travelpayouts_uid=4e8c9cbf79f7458cb8c6b9776-188657&utm_campaign=xn-----7kcbqaeee3dxbseo5qb.xn--p1ai&utm_medium=cpa&utm_source=travelpayouts";

function openBooking() {
  window.open(BOOKING_URL, '_blank');
}

// ROOM CARD PHOTO SLIDERS
document.querySelectorAll('[data-slider]').forEach(holder => {
  const track = holder.querySelector('.slider-track');
  const count = track.querySelectorAll('img').length;
  const dotsBox = holder.querySelector('.slider-dots');
  let idx = 0;

  for (let i = 0; i < count; i++) {
    const dot = document.createElement('span');
    dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
    dotsBox.appendChild(dot);
  }
  const dots = dotsBox.children;

  function go(n) {
    idx = (n + count) % count;
    track.style.transform = `translateX(-${idx * 100}%)`;
    for (let i = 0; i < dots.length; i++) {
      dots[i].classList.toggle('active', i === idx);
    }
  }
  holder.querySelector('.slider-prev').addEventListener('click', () => go(idx - 1));
  holder.querySelector('.slider-next').addEventListener('click', () => go(idx + 1));
});

// GALLERY LIGHTBOX
const LIGHTBOX_PHOTOS = [
  'lb-01.webp', 'lb-02.webp', 'lb-03.webp', 'lb-04.webp', 'lb-05.webp',
  'lb-06.webp', 'lb-07.webp', 'lb-08.webp', 'lb-09.webp', 'lb-10.webp',
  'lb-11.webp', 'lb-12.webp', 'lb-13.webp', 'lb-14.webp', 'lb-15.webp',
  'lb-16.webp', 'lb-17.webp', 'lb-18.webp', 'lb-19.webp', 'lb-20.webp',
];
let lbIndex = 0;

function updateLightbox() {
  document.getElementById('lightbox-img').src = LIGHTBOX_PHOTOS[lbIndex];
  document.getElementById('lightbox-counter').textContent = `${lbIndex + 1} / ${LIGHTBOX_PHOTOS.length}`;
}

function openLightbox(i) {
  lbIndex = i;
  updateLightbox();
  document.getElementById('lightbox').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.add('hidden');
  document.body.style.overflow = '';
}

function lightboxStep(dir) {
  lbIndex = (lbIndex + dir + LIGHTBOX_PHOTOS.length) % LIGHTBOX_PHOTOS.length;
  updateLightbox();
}

// Close on click outside the photo, navigate with keyboard
document.getElementById('lightbox').addEventListener('click', e => {
  if (e.target === e.currentTarget) closeLightbox();
});
document.addEventListener('keydown', e => {
  if (document.getElementById('lightbox').classList.contains('hidden')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') lightboxStep(-1);
  if (e.key === 'ArrowRight') lightboxStep(1);
});

// MOBILE BURGER MENU
function toggleMenu() {
  const menu = document.getElementById('nav-menu');
  const isOpen = menu.classList.toggle('open');
  const btn = document.getElementById('burger-btn');
  btn.classList.toggle('open', isOpen);
  btn.setAttribute('aria-expanded', isOpen);
}

// Close the mobile menu after navigating to a section
document.querySelectorAll('.nav-menu .nav-link').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('nav-menu').classList.remove('open');
    const btn = document.getElementById('burger-btn');
    btn.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
  });
});

// DARK / LIGHT THEME TOGGLE (initial theme is set inline in <head> to avoid flashing)
function toggleTheme() {
  const newTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
}
