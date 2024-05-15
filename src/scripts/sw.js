import 'regenerator-runtime';
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute, Route } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';
// import CacheHelper from './utils/cache-helper';

// const assetsToCache = [
//   './',
//   './',
//   './icons/icon-24x24.png',
//   './icons/icon-32x32.png',
//   './icons/icon-48x48.png',
//   './icons/icon-64x64.png',
//   './icons/icon-72x72.png',
//   './icons/icon-96x96.png',
//   './icons/icon-128x128.png',
//   './icons/icon-144x144.png',
//   './icons/icon-256x256.png',
//   './image/Navbar-143x77.png',
//   './image/Navbar.png',
//   './icons/icon-512x512.png',
//   './index.html',
//   './app.bundle.js',
//   './app.webmanifest',
//   './sw.bundle.js',
// ];
// self.addEventListener('install', (event) => {
//   event.waitUntil(CacheHelper.cachingAppShell([...assetsToCache]));
// });

// self.addEventListener('activate', (event) => {
//   event.waitUntil(CacheHelper.deleteOldCache());
// });

// self.addEventListener('fetch', (event) => {
//   event.respondWith(CacheHelper.revalidateCache(event.request));
// });

// Do precaching
precacheAndRoute(self.__WB_MANIFEST);

const therestaurantdbApi = new Route(
  ({ url }) => url.href.startsWith('https://restaurant-api.dicoding.dev'),
  new StaleWhileRevalidate({
    cacheName: 'therestaurantdb-api',
  }),
);

const therestaurantdbImageApi = new Route(
  ({ url }) => url.href.startsWith('https://restaurant-api.dicoding.dev/images/small/'),
  new StaleWhileRevalidate({
    cacheName: 'therestaurantdb-image-api',
  }),
);

registerRoute(therestaurantdbApi);
registerRoute(therestaurantdbImageApi);

self.addEventListener('install', () => {
  console.log('Service Worker: Installed');
  self.skipWaiting();
});
