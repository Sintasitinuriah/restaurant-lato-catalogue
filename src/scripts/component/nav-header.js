import RestaurantDbSource from '../data/restaurantdb-source';

const nav = document.querySelector('.nav');
const searchIcon = document.querySelector('#searchIcon');
const navOpenBtn = document.querySelector('.navOpenBtn');
const navCloseBtn = document.querySelector('.navCloseBtn');

// eslint-disable-next-line consistent-return
searchIcon.addEventListener('click', () => {
  nav.classList.toggle('openSearch');
  nav.classList.remove('openNav');
  if (nav.classList.contains('openSearch')) {
    return searchIcon.classList.replace('uil-search', 'uil-times');
  }
  searchIcon.classList.replace('uil-times', 'uil-search');
});

navOpenBtn.addEventListener('click', () => {
  nav.classList.add('openNav');
  nav.classList.remove('openSearch');
  searchIcon.classList.replace('uil-times', 'uil-search');
});
navCloseBtn.addEventListener('click', () => {
  nav.classList.remove('openNav');
});
