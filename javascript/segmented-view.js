const navBtns = document.querySelectorAll('.nav-btn');
const containers = document.querySelectorAll('.container-time-element');

navBtns.forEach((button) => {
  button.addEventListener('click', () => {
    containers.forEach((container) => container.classList.add('is-hidden'));
    navBtns.forEach((btn) => btn.classList.remove('is-active-button'));

    const target = document.getElementById(button.dataset.target);
    button.classList.add('is-active-button');
    target.classList.remove('is-hidden');
  });
})