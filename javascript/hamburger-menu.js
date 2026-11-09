const navbarBtn = document.getElementById('navbar-button');
const navbar = document.getElementById('navbar')
const overlay = document.getElementById('overlay');
const content = document.getElementById('content');

function toggleMenu() {
  navbar.classList.toggle('collapsed');
  overlay.classList.toggle('collapsed');
  if (content.inert) {navbarBtn.src = 'assets/menu-button.svg'}
  else {navbarBtn.src = 'assets/menu-button-inverted.svg'}
  content.inert = !content.inert;
}

navbarBtn.addEventListener('click', toggleMenu);
overlay.addEventListener('click', toggleMenu);
document.addEventListener('keyup', (event) => {
  if (event.code === 'Escape' && content.inert) {
    toggleMenu();
    navbarBtn.blur();
  }
});