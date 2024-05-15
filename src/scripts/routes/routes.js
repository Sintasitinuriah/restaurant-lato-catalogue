import ListRestaurant from '../views/pages/list-resto';
import DetailResto from '../views/pages/detail-resto';
import Like from '../views/pages/like';
import Search from '../views/pages/search';

const routes = {
  '/': ListRestaurant,
  '/favorite': Like,
  '/detail/:id': DetailResto,
  '/search/:query': Search,
};

export default routes;
