/* eslint-disable no-undef */
import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurandb';
import LikeButtonInitiator from '../src/scripts/utils/like-button-presenter';
import * as TestFactories from './helpers/testFactories';

describe('Liking A restaurant', () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
  };
  beforeEach(() => {
    addLikeButtonContainer();
  });
  it('should be able to like a restaurant', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });
    // Retrieve the like button element
    const likeButton = document.querySelector('[aria-label="like this resto"]');
    // Log the like button element for inspection
    console.log('Like Button Element:', likeButton);

    // Assert that the like button element exists and is truthy
    expect(likeButton).toBeTruthy();
  });
  it('should be able to unlike a restaurant', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });
    // Retrieve the like button element
    const likeButton = document.querySelector('[aria-label="unlike this resto"]');
    // Log the like button element for inspection
    console.log('Like Button Element:', likeButton);

    // Assert that the like button element exists and is truthy
    expect(likeButton).toBeFalsy();
  });
  it('should be able to like a restaurant', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });
    // Retrieve the like button element
    const likeButton = document.querySelector('#likeButton');
    likeButton.dispatchEvent(new Event('click'));
    // Log the like button element for inspection
    const resto = await FavoriteRestaurantIdb.getRestaurant(1);
    expect(resto).toEqual({ id: 1 });

    await FavoriteRestaurantIdb.deleteRestaurant(1);
  });
  it('should not add a restaurant when its already liked', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

    // Log the like button element for inspection
    await FavoriteRestaurantIdb.putRestaurant({ id: 1 });
    // Retrieve the like button element
    const likeButton = document.querySelector('#likeButton');
    likeButton.dispatchEvent(new Event('click'));

    expect(await FavoriteRestaurantIdb.getAllRestaurant()).toEqual([{ id: 1 }]);

    await FavoriteRestaurantIdb.deleteRestaurant(1);
  });
  it('should not add a restaurant when it has no id', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ });
    const likeButton = document.querySelector('#likeButton');
    likeButton.dispatchEvent(new Event('click'));

    expect(await FavoriteRestaurantIdb.getAllRestaurant()).toEqual([]);
  });
});
