class FormService {
  constructor(validationService) {
    this.validationService = validationService;
    this.errorMessages = {};
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

    if (emailInput.value) {
      const isEmailFormatValid = this.validationService.validateEmail(
        emailInput.value
      );
      if (!isEmailFormatValid) {
        const errorMessage = 'Invalid email address.';
        isValid = false;
        this.displayErrorMessage(emailInput, errorMessage);
      }
    }

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
      const errorMessage = 'Please enter a valid 16-digit credit card number';
      isValid = false;
      this.displayErrorMessage(creditCardInput, errorMessage);
    }

    if (!this.validationService.validateCVV(cvvInput.value)) {
      const errorMessage = 'Please enter a valid 3-digit CVV2 code.';
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

  displayErrorMessage(input, message) {
    const { id } = input;

    // Remove any existing error message for a different input
    const existingErrorElement = this.errorMessages[id];
    if (existingErrorElement) {
      existingErrorElement.remove();
      delete this.errorMessages[id];
    }

    // Create a new error message element
    const errorElement = document.createElement('span');
    errorElement.classList.add('error-message');
    errorElement.setAttribute('role', 'alert');
    errorElement.setAttribute('id', `${id}Error`);
    errorElement.setAttribute('aria-live', 'polite');
    errorElement.textContent = message;
    input.insertAdjacentElement('afterend', errorElement);

    // Store the error message element in the errorMessages object
    this.errorMessages[id] = errorElement;

    setTimeout(() => {
      errorElement.classList.add('show');
    }, 10);
  }

  removeErrorMessage(input) {
    const { id } = input;
    const errorElement = this.errorMessages[id];

    if (errorElement) {
      errorElement.classList.remove('show');
      errorElement.addEventListener('animationend', () => {
        errorElement.remove();
        delete this.errorMessages[id];
      });
    }
  }
}

export default FormService;