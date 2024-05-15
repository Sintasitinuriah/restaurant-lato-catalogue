/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
import RestaurantDbSource from '../../data/restaurantdb-source';
import { createRestaurantItemTemplate } from '../templates-creator';

const ListRestaurant = {
  async render() {
    return `
      <div class="listResto">
        <div id="restaurant" class="restaurant">
        </div>
      </div>
    `;
  },

  async afterRender() {
    const restaurant = await RestaurantDbSource.listRestaurants();
    const restaurantContainer = document.querySelector('#restaurant');
    restaurant.forEach((restaurant) => {
      restaurantContainer.innerHTML += createRestaurantItemTemplate(restaurant);
    });
  },
};
export default ListRestaurant;
