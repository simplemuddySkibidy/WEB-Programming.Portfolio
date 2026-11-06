// 1. Theme toggle (saved in localStorage)
const root = document.documentElement;
const themeBtn = document.getElementById('themeToggle');
function applyTheme(theme) {
  root.setAttribute('data-theme', theme);
  themeBtn.setAttribute('aria-pressed', theme === 'light');
  localStorage.setItem('theme', theme);
}
applyTheme(localStorage.getItem('theme') || 'dark');
themeBtn.addEventListener('click', () => {
  applyTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
});

// 2. Mobile menu
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
function setMenu(open) {
  nav.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', open);
  burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
}
burger.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));

// 3. Form validation
const form = document.getElementById('contactForm');
const success = document.getElementById('formSuccess');
const rules = {
  name: v => v.trim().length >= 2 ? '' : 'Enter your name (at least 2 characters).',
  email: v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? '' : 'Enter a valid email, e.g. name@example.com.',
  message: v => v.trim().length >= 10 ? '' : 'Message must be at least 10 characters.'
};
function validateField(id) {
  const input = document.getElementById(id);
  const msg = rules[id](input.value);
  document.getElementById(id + 'Error').textContent = msg;
  input.closest('.field').classList.toggle('invalid', msg !== '');
  return msg === '';
}
Object.keys(rules).forEach(id => {
  document.getElementById(id).addEventListener('input', () => { success.textContent = ''; validateField(id); });
});
form.addEventListener('submit', e => {
  e.preventDefault();
  const results = Object.keys(rules).map(validateField);
  if (results.every(Boolean)) {
    success.textContent = 'Thank you! Your message was filled in correctly.';
    form.reset();
  } else {
    success.textContent = '';
    form.querySelector('.invalid input, .invalid textarea').focus();
  }
});

const skillInfo = {
  swift: ['Swift', '1+ years', 'Main language for iOS apps. I use it with SwiftUI and clean app architecture.'],
  python: ['Python', 'Learning basics', 'Used for scripts and learning programming logic.'],
  java: ['Java', 'Learning basics', 'Used to study object-oriented programming.'],
  html: ['HTML', '2+ years', 'Semantic markup: header, nav, main, section, footer.'],
  css: ['CSS', '2+ years', 'Responsive layouts with Flexbox and Grid, themes via CSS variables.'],
  js: ['JavaScript', '1+ years', 'Interactive pages: menus, forms, theme switching, modals.'],
  git: ['Git', '120+ hours', 'Version control and GitHub workflow: branches, commits, pull requests.'],
  figma: ['Figma', '2+ years', 'UI/UX design: desktop and mobile layouts, components, prototypes.']
};
const modal = document.getElementById('modal');
let lastFocus = null;
function openModal(key) {
  const [title, level, text] = skillInfo[key];
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalLevel').textContent = 'Experience: ' + level;
  document.getElementById('modalText').textContent = text;
  lastFocus = document.activeElement;
  modal.hidden = false;
  document.getElementById('modalClose').focus();
}
function closeModal() {
  modal.hidden = true;
  if (lastFocus) lastFocus.focus();
}
document.querySelectorAll('.skill').forEach(b => b.addEventListener('click', () => openModal(b.dataset.skill)));
document.getElementById('modalClose').addEventListener('click', closeModal);
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !modal.hidden) closeModal(); });
