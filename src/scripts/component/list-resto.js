/* eslint-disable func-names */
import { dataRestorants } from '../data/data.js';

class RestaurantList extends HTMLElement {
  constructor() {
    super();
    this._renderList = this._renderList.bind(this);
  }

  connectedCallback() {
    this._renderList();
  }

  _renderList() {
    const { restaurants } = dataRestorants;
    this.innerHTML = '';

    restaurants.forEach((restaurant, index) => {
      const restaurantCard = document.createElement('div');
      restaurantCard.classList.add('restaurant-card');
      restaurantCard.setAttribute('tabindex', '0');

      restaurantCard.innerHTML = `
          <img src="${restaurant.pictureId}" alt="${restaurant.name}" class="restaurant-image">
          <div class="restaurant-info">
            <h2 class="restaurant-name">${restaurant.name}</h2>
            <p class="restaurant-location">Location: ${restaurant.city}</p>
            <p class="restaurant-rating">Rating: ${restaurant.rating}</p>
            <a href="#restaurant-${index + 1}" class="skip-to-restaurant">Skip to Restaurant ${index + 1}</a>
          </div>
      `;

      this.appendChild(restaurantCard);

      const skipToRestaurantLinks = restaurantCard.querySelectorAll('.skip-to-restaurant');
      skipToRestaurantLinks.forEach((link) => {
        link.addEventListener('click', function (event) {
          event.preventDefault();
          const targetId = this.getAttribute('href').substring(1);
          document.getElementById(targetId).focus();
        });
      });
    });
  }
}

customElements.define('restaurant-list', RestaurantList);
