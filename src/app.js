import { router, setActiveRoute } from './router.js';

document.querySelector('#app').innerHTML = `
    <header>
        <nav aria-label="Main navigation">
            <ul>
                <li><a href="/" data-link>Home</a></li>
                <li><a href="/form" data-link>Form</a></li>
            </ul>
        </nav>
    </header>
    <main id="main" role="main"></main>
    <footer>
        <p>© 2024 Geniusee App</p>
    </footer>
`;

document.addEventListener('DOMContentLoaded', () => {
  router();
  setActiveRoute();
});

window.addEventListener('popstate', router);

document.body.addEventListener('click', (e) => {
  if (e.target.matches('[data-link]')) {
    e.preventDefault();
    history.pushState(null, null, e.target.href);
    router();
    setActiveRoute();
  }
});
