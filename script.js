const hero = document.querySelector('.hero');
const nav = document.querySelector('.main-nav');
const menuButton = document.querySelector('.menu-button');
const form = document.querySelector('.booking-form');

const heroImages = ['event1.jpg', 'event5.jpg', 'event7.jpg', 'events2.jpg', 'event9.jpg'];
let heroIndex = 0;

if (hero) {
  setInterval(() => {
    heroIndex = (heroIndex + 1) % heroImages.length;
    const nextImage = heroImages[heroIndex];
    hero.style.backgroundImage = `linear-gradient(115deg, rgba(14, 17, 16, 0.82) 10%, rgba(14, 17, 16, 0.38) 54%, rgba(14, 17, 16, 0.68) 100%), url('${nextImage}')`;
  }, 5000);
}

if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      menuButton.setAttribute('aria-expanded', 'false');
    });
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.18 }
);

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const message = [
      'Hello MC Deen, I would like to enquire about booking you for an event.',
      '',
      `Name: ${formData.get('name')}`,
      `Email: ${formData.get('email')}`,
      `Event: ${formData.get('eventType')}`,
      `Preferred date: ${formData.get('date')}`,
      `Details: ${formData.get('details') || 'Not provided'}`,
    ].join('\n');

    window.location.href = `https://wa.me/2347078776082?text=${encodeURIComponent(message)}`;
  });
}
