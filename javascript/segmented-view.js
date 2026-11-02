const tabBtns = document.querySelectorAll('.nav-btn');
const pages = document.querySelectorAll('.container-time-tool');

tabBtns.forEach((button) => {
  button.addEventListener('click', () => {
    pages.forEach((page) => page.classList.add('is-hidden'));
    tabBtns.forEach((btn) => btn.classList.remove('is-active-button'));
    document.getElementById(button.dataset.link).classList.remove('is-hidden');
    document.getElementById(button.dataset.link).focus();
    button.classList.add('is-active-button');
  });
});