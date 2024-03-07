// src/form.js
import ValidationService from '../../services/ValidationService.js';

document.addEventListener('DOMContentLoaded', () => {
  const orderForm = document.getElementById('orderForm');
  setupInputMasks();
  setupValidation();

  orderForm.addEventListener('submit', async function (event) {
    event.preventDefault();
    clearPreviousErrors();

    let isValid = await validateForm();

    if (isValid) {
      console.log('Form is valid, processing form data...');
      // Здесь код для отправки формы
      alert('Form Submitted Successfully!');
    } else {
      // Прокрутка к первому невалидному полю
      document
        .querySelector('.error-message')
        .scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
});

function setupInputMasks() {
  document.getElementById('creditCard').addEventListener('input', (e) => {
    e.target.value = e.target.value
      .replace(/\D/g, '')
      .replace(/(\d{4})(?=\d)/g, '$1 ');
  });
}

async function validateForm() {
  let isValid = true;
  const form = document.getElementById('orderForm');

  // Валидация каждого поля...
  // Пример для имени:
  const firstName = form['firstName'].value;
  if (!ValidationService.validateName(firstName)) {
    showError(form['firstName'], 'First name is required');
    isValid = false;
  }

  // Асинхронная валидация для email
  try {
    await ValidationService.validateEmail(form['email'].value);
  } catch (error) {
    showError(form['email'], error);
    isValid = false;
  }

  // Продолжить валидацию других полей...

  return isValid;
}

function showError(element, message) {
  const errorMessage = document.createElement('div');
  errorMessage.textContent = message;
  errorMessage.classList.add('error-message');
  element.parentNode.insertBefore(errorMessage, element.nextSibling);
}

function clearPreviousErrors() {
  document.querySelectorAll('.error-message').forEach((e) => e.remove());
}

// function applyInputMasks() {
//   const creditCardInput = document.getElementById('creditCard');
//   const cvvInput = document.getElementById('cvv');

//   creditCardInput.addEventListener('input', function () {
//     let value = this.value.replace(/\D/g, ''); // Remove all non-digit characters
//     value = value.replace(/(\d{4})(?=\d)/g, '$1 '); // Insert space every 4 digits
//     this.value = value;
//   });

//   cvvInput.addEventListener('input', function () {
//     this.value = this.value.replace(/\D/g, '').slice(0, 3); // Allow only 3 digits
//   });
// }
