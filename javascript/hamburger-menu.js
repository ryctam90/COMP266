const navbarBtn = document.getElementById('navbar-button');
const navbar = document.getElementById('navbar')
const overlay = ;
let expanded = false;

navbarBtn.addEventListener('click', () => {
  if (expanded) {
    navbar.translate(15);
    overlay.translate();
  }
  else {
    navbar.translate(-15);
    overlay.translate();
  }
})