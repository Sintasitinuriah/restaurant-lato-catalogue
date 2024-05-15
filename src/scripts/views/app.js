import DrawerInitiator from '../utils/drawer-initiatior';
import UrlParser from '../routes/url-parser';
import routes from '../routes/routes';
import Search from './pages/search';

class App {
  constructor({ button, drawer, content }) {
    this._button = button;
    this._drawer = drawer;
    this._content = content;

    this._initialAppShell();
  }

  _initialAppShell() {
    DrawerInitiator.init({
      button: this._button,
      drawer: this._drawer,
      content: this._content,

    });

    // kita bisa menginisiasikan komponen lain bila ada
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];
    this._content.innerHTML = await page.render();
    await page.afterRender();
    const skipLink = document.querySelector('.skip-to-content');
    const mainContent = document.querySelector('#main-content');
    const search = document.querySelector('#btn-search');

    skipLink.addEventListener('click', (event) => {
      event.preventDefault();
      mainContent.focus();
    });

    search.addEventListener('click', async (event) => {
      try {
        const mainContent = document.querySelector('#main-content');
        // Instantiate Search module
        const searchModule = Search || {}; // Fallback to empty object if import fails

        // Render search page content
        if (searchModule.render) {
          mainContent.innerHTML = await searchModule.render();
        } else {
          console.error('Search module does not have a render method.');
        }

        // Call afterRender if defined
        if (searchModule.afterRender) {
          await searchModule.afterRender();
        }
      } catch (error) {
        console.error('Error rendering search page:', error);
      }
    });
  }
}

export default App;
