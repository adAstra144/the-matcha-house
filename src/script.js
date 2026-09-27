const burger = document.querySelector('.burger');
const nav = document.querySelector('#site-nav');

burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  nav.classList.toggle('open');
  burger.setAttribute('aria-expanded', burger.classList.contains('open'));
});
