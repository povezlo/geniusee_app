class FormService {
  constructor(validationService) {
    this.validationService = validationService;
  }

  validatePersonalInfo(firstNameInput, lastNameInput) {
    let isValid = true;

    if (!firstNameInput.value.trim()) {
      firstNameInput.errorElement.textContent = 'First name is required.';
      firstNameInput.errorElement.classList.add('show');
      isValid = false;
    } else {
      firstNameInput.errorElement.classList.remove('show');
    }

    if (!lastNameInput.value.trim()) {
      lastNameInput.errorElement.textContent = 'Last name is required.';
      lastNameInput.errorElement.classList.add('show');
      isValid = false;
    } else {
      lastNameInput.errorElement.classList.remove('show');
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

    if (
      emailInput.value &&
      !this.validationService.validateEmail(emailInput.value)
    ) {
      emailInput.errorElement.textContent = 'Invalid email address.';
      emailInput.errorElement.classList.add('show');
      isValid = false;
    } else {
      emailInput.errorElement.classList.remove('show');

      // Async email validation
      const mockEmailValidationPromise = new Promise((resolve) => {
        setTimeout(() => {
          if (Math.random() < 0.75) {
            resolve(true);
          } else {
            emailInput.errorElement.textContent =
              'Email address is not available.';
            emailInput.errorElement.classList.add('show');
            isValid = false;
          }
        }, 1000);
      });

      await mockEmailValidationPromise;
    }

    const phoneNumbers = phoneInput.value
      .split(',')
      .map((phone) => phone.trim())
      .filter((phone) => phone);

    if (phoneNumbers.length < 1 || phoneNumbers.length > 3) {
      phoneInput.errorElement.textContent =
        'Please provide at least one and at most three phone numbers.';
      phoneInput.errorElement.classList.add('show');
      isValid = false;
    } else {
      phoneInput.errorElement.classList.remove('show');

      for (const phone of phoneNumbers) {
        if (!this.validationService.validatePhoneNumber(phone)) {
          phoneInput.errorElement.textContent = 'Invalid phone number.';
          phoneInput.errorElement.classList.add('show');
          isValid = false;
          break;
        }
      }
    }

    if (!countryInput.value) {
      countryInput.errorElement.textContent = 'Please select a country.';
      countryInput.errorElement.classList.add('show');
      isValid = false;
    } else {
      countryInput.errorElement.classList.remove('show');
    }

    if (!addressInput.value.trim()) {
      addressInput.errorElement.textContent = 'Address is required.';
      addressInput.errorElement.classList.add('show');
      isValid = false;
    } else {
      addressInput.errorElement.classList.remove('show');
    }

    return isValid;
  }

  validatePaymentDetails(creditCardInput, cvvInput, termsAgreementInput) {
    let isValid = true;

    if (
      !this.validationService.validateCreditCard(
        creditCardInput.value.replace(/\s/g, '')
      )
    ) {
      creditCardInput.errorElement.textContent = 'Invalid credit card number.';
      creditCardInput.errorElement.classList.add('show');
      isValid = false;
    } else {
      creditCardInput.errorElement.classList.remove('show');
    }

    if (!this.validationService.validateCVV(cvvInput.value)) {
      cvvInput.errorElement.textContent = 'Invalid CVV code.';
      cvvInput.errorElement.classList.add('show');
      isValid = false;
    } else {
      cvvInput.errorElement.classList.remove('show');
    }

    if (!termsAgreementInput.checked) {
      termsAgreementInput.errorElement.textContent =
        'Please agree to the terms of use.';
      termsAgreementInput.errorElement.classList.add('show');
      isValid = false;
    } else {
      termsAgreementInput.errorElement.classList.remove('show');
    }

    return isValid;
  }
}

export default FormService;
