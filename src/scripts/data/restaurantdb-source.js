import API_ENPOINT from '../global/api-endpoint';
import CONFIG from '../global/config';

class RestaurantDbSource {
  static async listRestaurants() {
    const response = await fetch(API_ENPOINT.LIST_RESTO);
    const responseJson = await response.json();
    return responseJson.restaurants;
  }

  static async detailRestaurants(id) {
    const response = await fetch(API_ENPOINT.DETAIL(id));
    return response.json();
  }

  static async searchRestaurants(query) {
    const response = await fetch(API_ENPOINT.SEARCH(query));
    return response.json();
  }

  static async addReview(reviewData) {
    const url = API_ENPOINT.REVIEW;
    const requestBody = reviewData;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error('Failed to add review');
      }

      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error('Error adding review:', error);
      throw error;
    }
  }
}

export default RestaurantDbSource;
