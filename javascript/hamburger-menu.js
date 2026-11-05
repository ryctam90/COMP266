const navbarBtn = document.getElementById('navbar-button');
const navbar = document.getElementById('navbar')
const overlay = ;
const content = document.getElementById('content');
let collapsed = true;

navbarBtn.addEventListener('click', () => {
  if (collapsed) {
    navbar.classList.remove('collapsed');
    overlay.classList.remove('collapsed');
    content.inert = true;
    collapsed = false;
  }
  else {
    navbar.classList.add('collapsed');
    overlay.classList.add('collasped');
    content.inert = false;
    collapsed = true;
  }
})