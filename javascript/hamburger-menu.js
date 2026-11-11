const navbarBtn = document.getElementById('navbar-button');
const navbarBtnImg = document.getElementById('navbar-button-image');
const navbar = document.getElementById('navbar')
const overlay = document.getElementById('overlay');
const content = document.getElementById('content');


//toggleMenu toggles between a closed and open navbar with dark grey overlay.
//While open, main content of the webpage gets disabled and aria-expanded turns true for screen readers.
function toggleMenu() {
  navbar.classList.toggle('collapsed');
  overlay.classList.toggle('collapsed');
  if (content.inert) {navbarBtnImg.src = 'assets/menu-button.svg'}
  else {navbarBtnImg.src = 'assets/menu-button-inverted.svg'}
  content.inert = !content.inert;
  navbarBtn.setAttribute('aria-expanded',content.inert);
}


//event listeners: clicking the navbar button opens the menu.
//Clicking the navbar button, the dark grey overlay, or pressing esc closes the menu
navbarBtn.addEventListener('click', toggleMenu);
overlay.addEventListener('click', toggleMenu);
document.addEventListener('keyup', (event) => {
  if (event.code === 'Escape' && content.inert) {
    toggleMenu();
    navbarBtn.blur();
  }
});