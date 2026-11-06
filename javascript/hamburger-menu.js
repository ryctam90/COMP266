const navbarBtn = document.getElementById('navbar-button');
const navbar = document.getElementById('navbar')
const overlay = document.getElementById('overlay');
const content = document.getElementById('content');

function toggleMenu() {
  navbar.classList.toggle('collapsed');
  overlay.classList.toggle('collapsed');
  content.inert = !content.inert;
}

navbarBtn.addEventListener('click', toggleMenu);
overlay.addEventListener('click', toggleMenu);