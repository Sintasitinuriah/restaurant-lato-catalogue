import CONFIG from '../global/config';

const createRestaurantItemTemplate = (restaurant) => `
  <div class="restaurant-item">
    <div class="restaurant-item__header">
      <img loading="lazy" id="restaurant-item__header__poster" alt="${restaurant.name || '-'}" src="${CONFIG.BASE_IMAGE_URL_S + restaurant.pictureId}">
      <div class="restaurant-item__header__rating">
        <p>⭐️<span class="restaurant-item__header__rating__score">${restaurant.rating || '-'}</span></p>
      </div>
    </div>
    <div class="restaurant-item__content">
      <h3 class="restaurant__title"><a href="/#/detail/${restaurant.id}">${restaurant.name || '-'}</a></h3>
      <p class="restaurant-item__description">${restaurant.description || '-'}</p>
      <p>📍<span class="restaurant-item__location">${restaurant.city || '-'}</p>
    </div>
  </div>
`;

const createSearchRestaurantItemTemplate = (restaurant) => `
  <div class="restaurant-item">
    <div class="restaurant-item__header">
      <img loading="lazy" class="restaurant-item__header__poster" alt="${restaurant.name}"
           src="${CONFIG.BASE_IMAGE_URL_S + restaurant.pictureId}">
      <div class="restaurant-item__header__rating">
        <p>⭐️<span class="restaurant-item__header__rating__score">${restaurant.rating}</span></p>
      </div>
    </div>
    <div class="restaurant-item__content">
      <h3>${restaurant.name}</h3>
      <p class="restaurant-item__description">${restaurant.description}</p>
      <p>📍<span class="restaurant-item__location">${restaurant.city}</p>
    </div>
  </div>
`;

const createRestaurantDetailTemplate = (restaurant) => `
  <h2 class=restaurant__title">${restaurant.name}</h2>
  <img loading="lazy" id="restaurant__poster" src="${CONFIG.BASE_IMAGE_URL_S + restaurant.pictureId}" alt="${restaurant.name}" />
  <div class=restaurant__info">
    <h3>Information</h3>
    <h4>Kota</h4>
    <p>${restaurant.city}</p>
    <h4>Alamat</h4>
    <p>${restaurant.address} minutes</p>
    <h4>Rating</h4>
    <p>${restaurant.rating}</p>
  </div>
  <div class=restaurant__overview">
    <h3>Deskripsi Restaurant</h3>
    <p>${restaurant.description}</p>
  </div>
`;

const createReviewRstaurantTemplate = (review) => `
  <div class="list-item-review">
    <div class="review-item__header">
      <h3 class="title">${review.name}</h3>
      <h5 class="date">${review.date}</h5>
    </div>
    <div class="review-item__content">  
      <p class="content">${review.review}</p>
    </div>
  </div>
`;

const createCategoriesFoodTemplate = (resto) => `
  <div class="restaurant-item-advance">
    <p>${resto.name}</p>
  </div>
`;

const createLikeButtonTemplate = () => `
  <button aria-label="like this resto" id="likeButton" class="like">
    <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createLikedButtonTemplate = () => `
  <button aria-label="unlike this resto" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

export {
  createRestaurantItemTemplate,
  createRestaurantDetailTemplate,
  createLikeButtonTemplate,
  createLikedButtonTemplate,
  createCategoriesFoodTemplate,
  createReviewRstaurantTemplate,
  createSearchRestaurantItemTemplate,
};
