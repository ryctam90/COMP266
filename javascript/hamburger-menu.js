const navbarBtn = document.getElementById('navbar-button');
const navbar = document.getElementById('navbar')
// const overlay = ;
const content = document.getElementById('content');
let collapsed = true;

navbarBtn.addEventListener('click', () => {
    navbar.classList.toggle('collapsed');
    // overlay.classList.remove('collapsed');
    // content.inert = true;
})