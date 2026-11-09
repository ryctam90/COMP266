const tabBtns = document.querySelectorAll('.nav-btn');
const pages = document.querySelectorAll('.container-time-tool');

//codes each time-tool button to switch visibility to their assigned data-link panel
tabBtns.forEach((button) => {
  button.addEventListener('click', () => {
    //hide all panels, hide all accent colours
    pages.forEach((page) => page.classList.add('is-hidden'));
    tabBtns.forEach((btn) => btn.classList.remove('is-active-button'));

    //show and focus data-link panel, accent button
    document.getElementById(button.dataset.link).classList.remove('is-hidden');
    document.getElementById(button.dataset.link).focus();
    button.classList.add('is-active-button');

    //changes name of the header title and the tab
    document.getElementById('banner-title').textContent = button.dataset.title
    document.title = button.dataset.title;
  });
});