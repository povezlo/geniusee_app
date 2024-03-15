# Тестове завдання Geniusee.

### Запустити проект
Запустіть `npm run dev` для запуску програми.

### Опис: Простий web-додаток із двома сторінками. Створено за допомогою сучасного інструменту збірки Vite.js.


- Головна сторінка Home page.
- Форма Форма сторінки

Форма оформлення замовлення. Створено гарний плавний
UI/UX для кінцевого користувача. Форма адаптивна до всіх браузерів і екранів. Використовуються всі сучасні стандарти верстки, використані атрибути для людей з обмеженими можливостями. 

У формі реалізовано функціонал валідації даних, запис значення форми після успішного відправлення.

### Зміст форми
Розділ 1: Особиста інформація
- Ім'я - рядок, обов'язковий для заповнення.
- Прізвище - рядок, обов'язковий для заповнення.
Розділ 2. Контактна інформація - рядок, обов'язковий для заповнення
- Email для отримання - рядок, має відповідати формату електронної пошти, необов'язково.
- Номери телефонів - список рядків, min - 1 запис, max - 3 записи
- Країна - рядок, обов'язковий для заповнення, має бути вибором.
- Адреса - рядок, обов'язковий для заповнення.
Розділ 3. Платіжні реквізити
- Кредитна картка - 16 цифр, обов'язково.
- CVV2 код - 3 цифри, обов'язково.
- Згода з умовами використання - булевий, обов'язковий.

### Валідація
- Перевірка поля під час розмиття поля і під час надсилання форми.
- Показується повідомлення про помилки, якщо введене значення недійсне.
- Очищення помилки, якщо поле було недійсним, а користувач ввів правильне значення пізніше.

### Вимоги до UI/UX
1. Додати маски введення для полів кредитної картки, коду CVV2, електронної пошти та телефону.
2. Додано логіку в разі помилки надсилання: застосунок має прокручувати сторінку до першого недійсного введення і фокусуватися на ньому, якщо валідація не пройшла.
на ньому, якщо валідація не пройшла.
3. Додано асинхронну валідацію для поля електронної пошти. Для цілей розробки необхідно створити
mock-обробник, який дозволяє обіцянку в 75% через 1 с.
4. Кожен розділ містить липкий заголовок.
5. Додано логіку, що запобігає множинному відправленню. Обробник відправлення повинен дозволяти
обіцянку через 1 с. Кнопка повинна показувати стан завантаження
