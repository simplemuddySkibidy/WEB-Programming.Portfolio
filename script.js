/* ---------- 1. Light / dark theme ---------- */
const themeButton = document.getElementById('theme');

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);   // remember the choice
  if (theme === 'dark') {
    themeButton.textContent = '☾';
  } else {
    themeButton.textContent = '☀';
  }
}

// on page load: use saved theme, or dark if nothing is saved
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
  setTheme('light');
} else {
  setTheme('dark');
}

themeButton.addEventListener('click', function () {
  const current = document.documentElement.getAttribute('data-theme');
  if (current === 'dark') {
    setTheme('light');
  } else {
    setTheme('dark');
  }
});


/* ---------- 2. Mobile menu ---------- */
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');

// click on ☰ opens or closes the menu
burger.addEventListener('click', function () {
  nav.classList.toggle('open');
});

// click on any menu link closes the menu
const links = document.querySelectorAll('nav a');
links.forEach(function (link) {
  link.addEventListener('click', function () {
    nav.classList.remove('open');
  });
});


/* ---------- 3. Form validation ---------- */
const form = document.getElementById('form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const success = document.getElementById('success');

// shows an error under the field (or clears it if text is empty)
function setError(field, text) {
  document.getElementById(field.id + 'Error').textContent = text;
  if (text === '') {
    field.classList.remove('invalid');
  } else {
    field.classList.add('invalid');
  }
}

// each check returns true (ok) or false (error)
function checkName() {
  if (nameInput.value.trim().length < 2) {
    setError(nameInput, 'Enter your name (at least 2 characters)');
    return false;
  }
  setError(nameInput, '');
  return true;
}

function checkEmail() {
  const email = emailInput.value.trim();
  if (!email.includes('@') || !email.includes('.')) {
    setError(emailInput, 'Enter a valid email, for example name@example.com');
    return false;
  }
  setError(emailInput, '');
  return true;
}

function checkMessage() {
  if (messageInput.value.trim().length < 10) {
    setError(messageInput, 'Message must be at least 10 characters');
    return false;
  }
  setError(messageInput, '');
  return true;
}

// check a field again while the user is typing
nameInput.addEventListener('input', checkName);
emailInput.addEventListener('input', checkEmail);
messageInput.addEventListener('input', checkMessage);

// when the form is sent
form.addEventListener('submit', function (event) {
  event.preventDefault();   // do not reload the page

  const nameOk = checkName();
  const emailOk = checkEmail();
  const messageOk = checkMessage();

  if (nameOk && emailOk && messageOk) {
    success.textContent = 'Thank you! The form was filled in correctly.';
    form.reset();
  } else {
    success.textContent = '';
  }
});
