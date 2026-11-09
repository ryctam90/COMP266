const tabBtns = document.querySelectorAll('.nav-btn');
const pages = document.querySelectorAll('.container-time-tool');

//codes each time-tool button to switch visibility to their assigned data-link panel
tabBtns.forEach((button) => {
  button.addEventListener('click', () => {
    //de-accentuates all buttons, then accentuates the designated button
    tabBtns.forEach((btn) => btn.classList.remove('is-active-button'));
    button.classList.add('is-active-button');

    //hides all panels, then makes designated panel visible and brings focus to it
    pages.forEach((page) => page.classList.add('is-hidden'));
    document.getElementById(button.dataset.link).classList.remove('is-hidden');
    document.getElementById(button.dataset.link).focus();
    

    //changes name of the header title and the tab
    document.getElementById('banner-title').textContent = button.dataset.title
    document.title = button.dataset.title;
  });
});