// service.js (separate file)
const validateEmail = (email) => {
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return emailRegex.test(email);
};

const validatePhoneNumber = (phoneNumber) => {
  const phoneRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
  return phoneRegex.test(phoneNumber);
};

const validateCreditCard = (creditCardNumber) => {
  return /^\d{16}$/.test(creditCardNumber);
};

const validateCVV = (cvv) => {
  return /^\d{3}$/.test(cvv);
};

// checkout-form.js
const form = document.getElementById('checkoutForm');
const submitBtn = document.getElementById('submitBtn');

// Input masks
const creditCardInput = document.getElementById('creditCard');
const cvvInput = document.getElementById('cvv');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');

// Inputs
const firstNameInput = document.getElementById('firstName');
const lastNameInput = document.getElementById('lastName');
const countryInput = document.getElementById('country');
const addressInput = document.getElementById('address');
const termsAgreementInput = document.getElementById('termsAgreement');

// Error messages
const firstNameError = document.getElementById('firstNameError');
const lastNameError = document.getElementById('lastNameError');
const emailError = document.getElementById('emailError');
const phoneError = document.getElementById('phoneError');
const countryError = document.getElementById('countryError');
const addressError = document.getElementById('addressError');
const creditCardError = document.getElementById('creditCardError');
const cvvError = document.getElementById('cvv2Error');
const termsAgreementError = document.getElementById('termsAgreedError');

// Add input masks
creditCardInput.addEventListener('input', () => {
  creditCardInput.value = creditCardInput.value
    .replace(/\D/g, '')
    .replace(/(.{4})/g, '$1 ')
    .trim();
});

cvvInput.addEventListener('input', () => {
  cvvInput.value = cvvInput.value.replace(/\D/g, '').slice(0, 3);
});

emailInput.addEventListener('input', () => {
  emailInput.value = emailInput.value.trim();
});

phoneInput.addEventListener('input', () => {
  phoneInput.value = phoneInput.value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
});

// Validation functions
const validatePersonalInfo = () => {
  let isValid = true;

  if (!firstNameInput.value.trim()) {
    showErrorAnimation(firstNameError, 'First name is required.');
    isValid = false;
  } else {
    hideErrorAnimation(firstNameError);
  }

  if (!lastNameInput.value.trim()) {
    showErrorAnimation(lastNameError, 'Last name is required.');
    isValid = false;
  } else {
    hideErrorAnimation(lastNameError);
  }

  return isValid;
};

const validateContactInfo = async () => {
  let isValid = true;

  if (emailInput.value && !validateEmail(emailInput.value)) {
    showErrorAnimation(emailError, 'Invalid email address.');
    isValid = false;
  } else {
    hideErrorAnimation(emailError);

    // Async email validation
    const mockEmailValidationPromise = new Promise((resolve) => {
      setTimeout(() => {
        if (Math.random() < 0.75) {
          resolve(true);
        } else {
          showErrorAnimation(emailError, 'Email address is not available.');
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
    showErrorAnimation(
      phoneError,
      'Please provide at least one and at most three phone numbers.'
    );
    isValid = false;
  } else {
    hideErrorAnimation(phoneError);

    for (const phone of phoneNumbers) {
      if (!validatePhoneNumber(phone)) {
        showErrorAnimation(phoneError, 'Invalid phone number.');
        isValid = false;
        break;
      }
    }
  }

  if (!countryInput.value) {
    showErrorAnimation(countryError, 'Please select a country.');
    isValid = false;
  } else {
    hideErrorAnimation(countryError);
  }

  if (!addressInput.value.trim()) {
    showErrorAnimation(addressError, 'Address is required.');
    isValid = false;
  } else {
    hideErrorAnimation(addressError);
  }

  return isValid;
};

const validatePaymentDetails = () => {
  let isValid = true;

  if (!validateCreditCard(creditCardInput.value.replace(/\s/g, ''))) {
    showErrorAnimation(creditCardError, 'Invalid credit card number.');
    isValid = false;
  } else {
    hideErrorAnimation(creditCardError);
  }

  if (!validateCVV(cvvInput.value)) {
    showErrorAnimation(cvvError, 'Invalid CVV code.');
    isValid = false;
  } else {
    hideErrorAnimation(cvvError);
  }

  if (!termsAgreementInput.checked) {
    showErrorAnimation(
      termsAgreementError,
      'Please agree to the terms of use.'
    );
    isValid = false;
  } else {
    hideErrorAnimation(termsAgreementError);
  }

  return isValid;
};

// Sticky headings
const headings = document.querySelectorAll('legend');
const sections = document.querySelectorAll('fieldset');
const headerHeight = 64; // Height of the header in pixels

window.addEventListener('scroll', () => {
  sections.forEach((section, index) => {
    const rect = section.getBoundingClientRect();
    if (rect.top < headerHeight && rect.bottom > headerHeight) {
      headings[index].style.position = 'sticky';
      headings[index].style.top = `${headerHeight}px`;
      headings[index].style.backgroundColor = '#f2f2f2';
    } else {
      headings[index].style.position = 'static';
      headings[index].style.backgroundColor = 'transparent';
    }
  });
});

// Disable submit button until form is valid
const disableSubmitButton = () => {
  submitBtn.disabled = true;
  submitBtn.style.opacity = '0.5';
  submitBtn.style.cursor = 'not-allowed';
};

const enableSubmitButton = () => {
  submitBtn.disabled = false;
  submitBtn.style.opacity = '1';
  submitBtn.style.cursor = 'pointer';
};

// Disable submit button initially
disableSubmitButton();

// Validate form on input and enable/disable submit button
const handleFormChange = () => {
  const isPersonalInfoValid = validatePersonalInfo();
  const isContactInfoValid = validateContactInfo();
  const isPaymentDetailsValid = validatePaymentDetails();

  if (isPersonalInfoValid && isContactInfoValid && isPaymentDetailsValid) {
    enableSubmitButton();
  } else {
    disableSubmitButton();
  }
};

// Add event listeners for input fields
const inputs = Array.from(
  form.querySelectorAll('input:not([type="checkbox"])')
);
inputs.forEach((input) => {
  input.addEventListener('input', handleFormChange);
  input.addEventListener('blur', handleFormChange);
});

countryInput.addEventListener('change', handleFormChange);
termsAgreementInput.addEventListener('change', handleFormChange);

// Form submission
let isSubmitting = false;

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  if (isSubmitting) {
    return;
  }

  const isPersonalInfoValid = validatePersonalInfo();
  const isContactInfoValid = await validateContactInfo();
  const isPaymentDetailsValid = validatePaymentDetails();

  if (isPersonalInfoValid && isContactInfoValid && isPaymentDetailsValid) {
    isSubmitting = true;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';

    // Mock API call
    const mockAPIPromise = new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });

    await mockAPIPromise;

    // Log form values
    const formData = new FormData(form);
    const formValues = Object.fromEntries(formData);
    console.log('Form Values:', formValues);

    // Clear form fields and error messages
    firstNameInput.value = '';
    lastNameInput.value = '';
    emailInput.value = '';
    phoneInput.value = '';
    countryInput.value = '';
    addressInput.value = '';
    creditCardInput.value = '';
    cvvInput.value = '';
    termsAgreementInput.checked = false;

    hideErrorAnimation(firstNameError);
    hideErrorAnimation(lastNameError);
    hideErrorAnimation(emailError);
    hideErrorAnimation(phoneError);
    hideErrorAnimation(countryError);
    hideErrorAnimation(addressError);
    hideErrorAnimation(creditCardError);
    hideErrorAnimation(cvvError);
    hideErrorAnimation(termsAgreementError);

    isSubmitting = false;
    submitBtn.disabled = false;
    submitBtn.textContent = 'Submit';
  } else {
    const firstInvalidInput = Array.from(form.elements).find(
      (input) => !input.validity.valid && input.type !== 'checkbox'
    );

    if (firstInvalidInput) {
      firstInvalidInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
      firstInvalidInput.focus();
    }
  }
});

// Error animation functions
const showErrorAnimation = (errorElement, message) => {
  errorElement.textContent = message;
  errorElement.style.opacity = '0';
  errorElement.style.transform = 'translateY(-10px)';

  requestAnimationFrame(() => {
    errorElement.style.transition =
      'opacity 0.3s ease-in-out, transform 0.3s ease-in-out';
    errorElement.style.opacity = '1';
    errorElement.style.transform = 'translateY(0)';
  });
};

const hideErrorAnimation = (errorElement) => {
  errorElement.style.opacity = '0';
  errorElement.style.transform = 'translateY(-10px)';
};
