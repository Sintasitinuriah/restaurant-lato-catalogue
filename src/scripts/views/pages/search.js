import RestaurantDbSource from '../../data/restaurantdb-source';
import CONFIG from '../../global/config';
import { createSearchRestaurantItemTemplate } from '../templates-creator';

const Search = {
  async render() {
    return `
      <div class="content">
        <h2 class="content__heading">Your Result Restaurant</h2>
        <div id="restaurant" class="restaurant">
 
        </div>
      </div>
    `;
  },

  async afterRender() {
    const restaurantContainer = document.querySelector('#restaurant');
    const searchInput = document.querySelector('#searchInput');
    const searchForm = document.querySelector('#search-box');

    searchForm.addEventListener('submit', async (event) => {
      event.preventDefault(); // Mencegah pengiriman form

      const keyword = searchInput.value.trim().toLowerCase();

      try {
        const restaurants = await RestaurantDbSource.searchRestaurants(keyword);
        // eslint-disable-next-line max-len
        const filteredData = restaurants.restaurants.filter((data) => data.name.toLowerCase().includes(keyword));

        displayResult(filteredData);
      } catch (error) {
        console.log(error);
      }
    });

    function displayResult(result) {
      restaurantContainer.innerHTML = '';

      if (result.length === 0) {
        restaurantContainer.innerHTML = '<p>No restaurants found.</p>';
      } else {
        result.forEach((restaurant) => {
          restaurantContainer.innerHTML += createSearchRestaurantItemTemplate(restaurant);
        });
      }
    }
  },
};

export default Search;
