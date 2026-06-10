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
