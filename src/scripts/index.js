/* eslint-disable func-names */
/* eslint-disable no-undef */
import 'regenerator-runtime'; /* for async await transpile */
import './component/nav-header.js';
import './component/list-resto.js';
import './component/footer.js';
import App from './views/app.js';
import swRegister from './utils/sw-register';
import FooterToolsInitiator from './utils/footer-initiator.js';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

require('./style.js');

const app = new App({
  button: document.querySelector('.navOpenBtn'),
  drawer: document.querySelector('.nav-links'),
  content: document.querySelector('.restaurant-list'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
  swRegister();
  // WebSocketInitiator.init(CONFIG.WEB_SOCKET_SERVER);
  FooterToolsInitiator.init({
    subscribeButton: document.querySelector('#subscribePushNotification'),
    unsubscribeButton: document.querySelector('#unsubscribePushNotification'),
  });
});
const navOpenBtn = document.querySelector('.navOpenBtn');
const navCloseBtn = document.querySelector('.navCloseBtn');

navOpenBtn.addEventListener('click', function () {
  this.style.display = 'none';
});

navCloseBtn.addEventListener('click', () => {
  navOpenBtn.style.display = 'block';
});
