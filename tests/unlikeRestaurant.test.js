/* eslint-disable no-undef */
import LikeButtonInitiator from '../src/scripts/utils/like-button-presenter';
import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurandb';
import * as TestFactories from './helpers/testFactories';

describe('Unliking A Restaurant', () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
  };
  beforeEach(async () => {
    addLikeButtonContainer();
    await FavoriteRestaurantIdb.putRestaurant({ id: 1 });
  });
  afterEach(async () => {
    await FavoriteRestaurantIdb.deleteRestaurant(1);
  });
  it('should display unlike widget when the restaurant has been liked', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });
    const likeButton = document.querySelector('[aria-label="unlike this resto"]');
    // Log the like button element for inspection
    console.log('Like Button Element:', likeButton);

    // Assert that the like button element exists and is truthy
    expect(likeButton).toBeTruthy();
  });
  it('should not display like widget when the restaurant has been liked', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });
    const likeButton = document.querySelector('[aria-label="like this resto"]');
    // Log the like button element for inspection
    console.log('Like Button Element:', likeButton);

    // Assert that the like button element exists and is truthy
    expect(likeButton).toBeFalsy();
  });
  it('should be able to remove liked restaurant from the list', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });
    const likeButton = document.querySelector('[aria-label="unlike this resto"]');
    likeButton.dispatchEvent(new Event('click'));

    expect(await FavoriteRestaurantIdb.getAllRestaurant()).toEqual([]);
  });
  it('should not throw error when user click unlike widget if the unliked restaurant is not in the list', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });
    // // Hapus dulu film dari daftar film yang disukai
    await FavoriteRestaurantIdb.deleteRestaurant(1);
    // Kemudian, simulasikan pengguna menekan widget batal menyukai film
    const likeButton = document.querySelector('[aria-label="unlike this resto"]');
    likeButton.dispatchEvent(new Event('click'));

    expect(await FavoriteRestaurantIdb.getAllRestaurant()).toEqual([]);
  });
});
