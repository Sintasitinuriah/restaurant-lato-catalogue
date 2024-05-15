/* eslint-disable no-new */
/* eslint-disable no-undef */
import FavoriteRestaurantIdb from '../../data/favorite-restaurandb';
import { createRestaurantItemTemplate } from '../templates-creator';
import FavoriteRestaurantView from './liked-restaurant/favorite-restaurant-view';
import FavoriteRestaurantSearchPresenter from './liked-restaurant/favorite-restaurant-search-presenter';
import FavoriteRestaurantShowPresenter from './liked-restaurant/favorite-restaurant-show-presenter';

const view = new FavoriteRestaurantView();

const Like = {
  async render() {
    // return `
    //   <div class="content">
    //     <h2 class="content__heading">Your Liked Restaurant</h2>
    //     <div id="restaurant" class="restaurant">
    //     </div>
    //   </div>
    // `;
    return view.getTemplate();
  },

  async afterRender() {
    // const restaurants = await FavoriteRestaurantIdb.getAllRestaurant();
    // const restaurantContainer = document.querySelector('#restaurant');
    const hero = document.querySelector('.hero');
    const title = document.querySelector('.header-content');
    title.style.display = 'none';
    hero.style.display = 'none';

    // console.log(restaurants);

    // restaurants.forEach((restaurant) => {
    //   restaurantContainer.innerHTML += createRestaurantItemTemplate(restaurant);
    // });
    new FavoriteRestaurantShowPresenter({ view, favoriteRestaurant: FavoriteRestaurantIdb });

    new FavoriteRestaurantSearchPresenter({ view, favoriteRestaurant: FavoriteRestaurantIdb });
  },
};

export default Like;
