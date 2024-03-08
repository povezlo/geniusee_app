import ErrorMessageService from './error-message.service.js';

class FormService {
  constructor(validationService) {
    this.validationService = validationService;
  }

  validatePersonalInfo(firstNameInput, lastNameInput) {
    let isValid = true;

    // Remove any existing error messages
    ErrorMessageService.removeErrorMessage(firstNameInput);
    ErrorMessageService.removeErrorMessage(lastNameInput);

    if (!firstNameInput.value.trim()) {
      const errorMessage = 'First name is required.';
      isValid = false;
      ErrorMessageService.displayErrorMessage(firstNameInput, errorMessage);
    }

    if (!lastNameInput.value.trim()) {
      const errorMessage = 'Last name is required.';
      isValid = false;
      ErrorMessageService.displayErrorMessage(lastNameInput, errorMessage);
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
    ErrorMessageService.removeErrorMessage(emailInput);
    ErrorMessageService.removeErrorMessage(phoneInput);
    ErrorMessageService.removeErrorMessage(countryInput);
    ErrorMessageService.removeErrorMessage(addressInput);

    if (
      emailInput.value &&
      !this.validationService.validateEmail(emailInput.value)
    ) {
      const errorMessage = 'Invalid email address.';
      isValid = false;
      ErrorMessageService.displayErrorMessage(emailInput, errorMessage);
    }

    const phoneNumbers = phoneInput.value
      .split(',')
      .map((phone) => phone.trim())
      .filter((phone) => phone);

    if (phoneNumbers.length < 1 || phoneNumbers.length > 3) {
      const errorMessage =
        'Please provide at least one and at most three phone numbers.';
      isValid = false;
      ErrorMessageService.displayErrorMessage(phoneInput, errorMessage);
    } else {
      for (const phone of phoneNumbers) {
        if (!this.validationService.validatePhoneNumber(phone)) {
          const errorMessage = 'Invalid phone number.';
          isValid = false;
          ErrorMessageService.displayErrorMessage(phoneInput, errorMessage);
          break;
        }
      }
    }

    if (!countryInput.value) {
      const errorMessage = 'Please select a country.';
      isValid = false;
      ErrorMessageService.displayErrorMessage(countryInput, errorMessage);
    }

    if (!addressInput.value.trim()) {
      const errorMessage = 'Address is required.';
      isValid = false;
      ErrorMessageService.displayErrorMessage(addressInput, errorMessage);
    }

    // Async email validation
    const mockEmailValidationPromise = new Promise((resolve) => {
      setTimeout(() => {
        if (Math.random() < 0.75) {
          resolve(true);
        } else {
          const errorMessage = 'Email address is not available.';
          isValid = false;
          ErrorMessageService.displayErrorMessage(emailInput, errorMessage);
        }
      }, 1000);
    });

    await mockEmailValidationPromise;

    return isValid;
  }

  validatePaymentDetails(creditCardInput, cvvInput, termsAgreementInput) {
    let isValid = true;

    // Remove any existing error messages
    ErrorMessageService.removeErrorMessage(creditCardInput);
    ErrorMessageService.removeErrorMessage(cvvInput);
    ErrorMessageService.removeErrorMessage(termsAgreementInput);

    if (
      !this.validationService.validateCreditCard(
        creditCardInput.value.replace(/\s/g, '')
      )
    ) {
      const errorMessage = 'Invalid credit card number.';
      isValid = false;
      ErrorMessageService.displayErrorMessage(creditCardInput, errorMessage);
    }

    if (!this.validationService.validateCVV(cvvInput.value)) {
      const errorMessage = 'Invalid CVV code.';
      isValid = false;
      ErrorMessageService.displayErrorMessage(cvvInput, errorMessage);
    }

    if (!termsAgreementInput.checked) {
      const errorMessage = 'Please agree to the terms of use.';
      isValid = false;
      ErrorMessageService.displayErrorMessage(
        termsAgreementInput,
        errorMessage
      );
    }

    return isValid;
  }
}

export default FormService;
