import { navigateTo, router } from './router.js';

document.querySelector('#app').innerHTML = `
    <header>
        <nav>
            <ul>
                <li><a href="/" data-link>Home</a></li>
                <li><a href="/form" data-link>Form</a></li>
            </ul>
        </nav>
    </header>
    <main id="main"></main>
    <footer>
        <p>© 2024 Geniusee App</p>
    </footer>
`;

document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', (e) => {
    if (e.target.matches('[data-link]')) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  });

  router();
});

document
  .getElementById('orderForm')
  .addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    // Валидация данных формы (базовая проверка уже выполнена HTML атрибутами)
    console.log('Form Data Submitted:', data);

    // После успешной отправки/валидации
    alert('Order Submitted Successfully!');
  });

window.addEventListener('popstate', router);
