class FormService {
  constructor(validationService) {
    this.validationService = validationService;
  }

  validatePersonalInfo(firstNameInput, lastNameInput) {
    let isValid = true;

    // Remove any existing error messages
    this.removeErrorMessage(firstNameInput);
    this.removeErrorMessage(lastNameInput);

    if (!firstNameInput.value.trim()) {
      const errorMessage = 'First name is required.';
      isValid = false;
      this.displayErrorMessage(firstNameInput, errorMessage);
    }

    if (!lastNameInput.value.trim()) {
      const errorMessage = 'Last name is required.';
      isValid = false;
      this.displayErrorMessage(lastNameInput, errorMessage);
    }

    return isValid;
  }

  async validateContactInfo(
    emailInput,
    phoneInput,
    countryInput,
    addressInput
  ) {
    let isValid = true;

    // Remove any existing error messages
    this.removeErrorMessage(emailInput);
    this.removeErrorMessage(phoneInput);
    this.removeErrorMessage(countryInput);
    this.removeErrorMessage(addressInput);

    if (
      emailInput.value &&
      !this.validationService.validateEmail(emailInput.value)
    ) {
      const errorMessage = 'Invalid email address.';
      isValid = false;
      this.displayErrorMessage(emailInput, errorMessage);
    }

    const phoneNumbers = phoneInput.value
      .split(',')
      .map((phone) => phone.trim())
      .filter((phone) => phone);

    if (phoneNumbers.length < 1 || phoneNumbers.length > 3) {
      const errorMessage =
        'Please provide at least one and at most three phone numbers.';
      isValid = false;
      this.displayErrorMessage(phoneInput, errorMessage);
    } else {
      for (const phone of phoneNumbers) {
        if (!this.validationService.validatePhoneNumber(phone)) {
          const errorMessage = 'Invalid phone number.';
          isValid = false;
          this.displayErrorMessage(phoneInput, errorMessage);
          break;
        }
      }
    }

    if (!countryInput.value) {
      const errorMessage = 'Please select a country.';
      isValid = false;
      this.displayErrorMessage(countryInput, errorMessage);
    }

    if (!addressInput.value.trim()) {
      const errorMessage = 'Address is required.';
      isValid = false;
      this.displayErrorMessage(addressInput, errorMessage);
    }

    // Async email validation
    const mockEmailValidationPromise = new Promise((resolve) => {
      setTimeout(() => {
        if (Math.random() < 0.75) {
          resolve(true);
        } else {
          const errorMessage = 'Email address is not available.';
          isValid = false;
          this.displayErrorMessage(emailInput, errorMessage);
        }
      }, 1000);
    });

    await mockEmailValidationPromise;

    return isValid;
  }

  validatePaymentDetails(creditCardInput, cvvInput, termsAgreementInput) {
    let isValid = true;

    // Remove any existing error messages
    this.removeErrorMessage(creditCardInput);
    this.removeErrorMessage(cvvInput);
    this.removeErrorMessage(termsAgreementInput);

    if (
      !this.validationService.validateCreditCard(
        creditCardInput.value.replace(/\s/g, '')
      )
    ) {
      const errorMessage = 'Invalid credit card number.';
      isValid = false;
      this.displayErrorMessage(creditCardInput, errorMessage);
    }

    if (!this.validationService.validateCVV(cvvInput.value)) {
      const errorMessage = 'Invalid CVV code.';
      isValid = false;
      this.displayErrorMessage(cvvInput, errorMessage);
    }

    if (!termsAgreementInput.checked) {
      const errorMessage = 'Please agree to the terms of use.';
      isValid = false;
      this.displayErrorMessage(termsAgreementInput, errorMessage);
    }

    return isValid;
  }

  removeErrorMessage(input) {
    const errorElement = input.parentNode.querySelector('.error-message');
    if (errorElement) {
      errorElement.remove();
    }
  }

  displayErrorMessage(input, message) {
    const errorElement = document.createElement('span');
    errorElement.classList.add('error-message', 'show');
    errorElement.setAttribute('role', 'alert');
    errorElement.setAttribute('aria-live', 'polite');
    errorElement.textContent = message;
    input.insertAdjacentElement('afterend', errorElement);
  }
}

export default FormService;
