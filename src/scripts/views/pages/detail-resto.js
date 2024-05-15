import Swal from 'sweetalert2';
import UrlParser from '../../routes/url-parser';
import RestaurantDbSource from '../../data/restaurantdb-source';
import { createCategoriesFoodTemplate, createRestaurantDetailTemplate, createReviewRstaurantTemplate } from '../templates-creator';
import LikeButtonPresenter from '../../utils/like-button-presenter';
import FavoriteRestaurantIdb from '../../data/favorite-restaurandb';

const DetailResto = {
  async render() {
    return `
    <div class="restaurant-list-card">
      <div id="resto" class="resto"></div>
      <div id="resto-advance" class="resto-advance">
        <div id="resto-categories" class="resto-categories">
            <h3>Categories Resto:</h3>
            <div class="resto-categories-item"></div>
        </div> 
        <h3 class="menus">Menus:</h3>
        <div id="resto-menus" class="resto-menus">
            <div id="resto-foods" class="resto-foods">
                <h3>Food:</h3>
                <div id="resto-foods-item" class="resto-foods-item"></div>
            </div>
            <div id="resto-drinks" class="resto-drinks">
                <h3>Drinks:</h3>
                <div id="resto-drinks-item" class="resto-drinks-item"></div>
            </div>
        </div>
      </div>
    </div>
    <div id="likeButtonContainer"></div>
    <div class="review">
      <h2 class="review-item">Reviews Customer</h2>
      <div id="list-review-card" class="list-review-card"></div>
      <div class="input-review">
          <h2> Tambahkan Masukan Anda </h2>
          <form id="addReviewtForm">
              <div class="input">
                  <label for="name">Name:</label>
                  <input type="text" id="name" name="name" required>
              </div>
              <div class="input">
                  <label for="description">Description:</label>
                  <textarea id="description" name="description" required></textarea>
              </div>
              <button class="btn-review" type="submit">Add Your Review</button>
          </form>
      </div>
    </div>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurant = await RestaurantDbSource.detailRestaurants(url.id);
    const restaurantDetail = restaurant.restaurant;
    const restoContainer = document.querySelector('#resto');
    const restocategoryContainer = document.querySelector('#resto-categories');
    const restoFoodContainer = document.querySelector('#resto-foods-item');
    const restoDrinkContainer = document.querySelector('#resto-drinks-item');
    const restoReviewContainer = document.querySelector('#list-review-card');

    const btnReview = document.querySelector('.btn-review');
    btnReview.addEventListener('click', addPostReview);

    // Display
    const hero = document.querySelector('.hero');
    const title = document.querySelector('.header-content');
    title.style.display = 'none';
    hero.style.display = 'none';

    function addPostReview() {
      const inputName = document.querySelector('#name');
      const inputReviewContent = document.querySelector('#description');

      const name = inputName.value;
      const review = inputReviewContent.value;

      if (review.trim() === '' || name.trim() === '') {
        // eslint-disable-next-line no-alert
        alert('Review dan Nama harus diisi');
        return;
      }

      const data = {
        id: restaurant.restaurant.id,
        name,
        review,
      };

      RestaurantDbSource.addReview(data);

      inputName.value = '';
      inputReviewContent.value = '';

      Swal.fire({
        icon: 'success',
        title: 'Data berhasil disimpan!',
        showConfirmButton: false,
        timer: 1500,
        onBeforeOpen: () => {
          Swal.showLoading(); // Tampilkan animasi loading
        },
      }).then(() => {
        // Setelah menampilkan pesan sukses, reload halaman
        window.location.reload();
      });
    }

    const restocateg = restaurant.restaurant.categories;
    restoContainer.innerHTML = createRestaurantDetailTemplate(restaurantDetail);

    if (restocateg && restocateg.length > 0) {
      restocateg.forEach((restaurant) => {
        restocategoryContainer.innerHTML += createCategoriesFoodTemplate(restaurant);
      });
      console.log(restocateg);
    } else {
      console.log('Data kategori tidak ditemukan.');
    }
    const restomenus = restaurant.restaurant.menus;
    if (restomenus) {
      // Mengakses makanan (foods) dan minuman (drinks)
      const { foods } = restomenus;
      const { drinks } = restomenus;

      if (foods && foods.length > 0) {
        foods.forEach((food) => {
          restoFoodContainer.innerHTML += createCategoriesFoodTemplate(food);
        });
      } else {
        console.log('Data makanan tidak ditemukan.');
      }

      if (drinks && drinks.length > 0) {
        drinks.forEach((drink) => {
          restoDrinkContainer.innerHTML += createCategoriesFoodTemplate(drink);
        });
      } else {
        console.log('Data minuman tidak ditemukan.');
      }
    } else {
      console.log('Data menus tidak ditemukan.');
    }

    const review = restaurant.restaurant.customerReviews;
    if (review && review.length > 0) {
      review.forEach((review) => {
        restoReviewContainer.innerHTML += createReviewRstaurantTemplate(review);
      });
      console.log(review);
    } else {
      console.log('Data kategori tidak ditemukan.');
    }

    LikeButtonPresenter.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      favoriteRestaurant: FavoriteRestaurantIdb,
      restaurant: {
        id: restaurant.restaurant.id,
        name: restaurant.restaurant.name,
        description: restaurant.restaurant.description,
        // backdrop_path: restaurant.backdrop_path,
        rating: restaurant.restaurant.rating,
        city: restaurant.restaurant.city,
        pictureId: restaurant.restaurant.pictureId,
      },
    });
  },
};

export default DetailResto;
