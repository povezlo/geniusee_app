class ErrorMessageService {
  static removeErrorMessage(input) {
    const errorElement = input.parentNode.querySelector('.error-message');
    if (errorElement) {
      errorElement.classList.remove('show');
      errorElement.addEventListener('animationend', () => {
        errorElement.remove();
      });
    }
  }

  static displayErrorMessage(input, message) {
    const errorElement = document.createElement('span');
    errorElement.classList.add('error-message');
    errorElement.setAttribute('role', 'alert');
    errorElement.setAttribute('id', `${input.id}Error`);
    errorElement.setAttribute('aria-live', 'polite');
    errorElement.textContent = message;
    input.insertAdjacentElement('afterend', errorElement);

    setTimeout(() => {
      errorElement.classList.add('show');
    }, 10);
  }
}

export default ErrorMessageService;
