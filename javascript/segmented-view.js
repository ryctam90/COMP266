const navBtns = document.querySelectorAll('.nav-btn');
const pages = document.querySelectorAll('.container-time-element');

navBtns.forEach((button) => {
  button.addEventListener('click', () => {
    pages.forEach((page) => page.classList.add('is-hidden'));
    navBtns.forEach((btn) => btn.classList.remove('is-active-button'));
    document.getElementById(button.dataset.page).classList.remove('is-hidden');
    button.classList.add('is-active-button');
  });
});