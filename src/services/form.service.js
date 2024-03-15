import { Mask } from './masks.js';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const creditCardRegex = /^(\d{4})\s?(\d{4})\s?(\d{4})\s?(\d{4})$/;
const cvvRegex = /^[0-9]{3}$/;
const phoneRegex = /^(\+?\d{1,2}?[\s-]?)?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{4}$/;

const errorMessages = {
  required: 'This field is required',
  email: 'Please enter a valid email address',
  phone: 'Please enter a valid phone number',
  creditCard: 'Please enter a valid credit card number',
  cvv: 'Please enter a valid CVV code',
};

const MAX_NUMBER_PHONE_FIELDS = 3;

export function validateForm(field, isSubmitting = false) {
  let isFormValid = true;
  const form = document.getElementById('checkoutForm');
  const fields = isSubmitting
    ? form.querySelectorAll('input, select')
    : [field];

  fields.forEach((field) => {
    const errorSpan = form.querySelector(`#${field.id}Error`);
    const validationResult = validateField(field);

    if (!validationResult.valid) {
      showError(errorSpan, validationResult.message);
      isFormValid = false;
    } else {
      clearError(errorSpan);
    }
  });

  return isFormValid;
}

function validateField(field) {
  if (field.required && !field.value.trim()) {
    return { valid: false, message: errorMessages.required };
  }

  if (field.type === 'checkbox' && !field.checked) {
    return { valid: false, message: errorMessages.required };
  }

  if (field.name === 'phone' && !phoneRegex.test(field.value)) {
    if (!field.required && !field.value.trim()) {
      return { valid: true, message: '' };
    }
    return { valid: false, message: errorMessages.phone };
  }

  if (field.name === 'creditCard' && !creditCardRegex.test(field.value)) {
    return { valid: false, message: errorMessages.creditCard };
  }

  if (field.name === 'cvv' && !cvvRegex.test(field.value)) {
    return { valid: false, message: errorMessages.cvv };
  }

  return { valid: true, message: '' };
}

function showError(errorSpan, message) {
  if (!errorSpan) {
    return;
  }
  errorSpan.textContent = message;
  errorSpan.classList.add('show');
}

function clearError(errorSpan) {
  if (!errorSpan) {
    return;
  }
  errorSpan.textContent = '';
  errorSpan.classList.remove('show');
}

export function addPhoneField(phoneFieldsContainer) {
  const phoneFieldCount = phoneFieldsContainer.querySelectorAll(
    'input[name="phone"]'
  ).length;

  if (phoneFieldCount < MAX_NUMBER_PHONE_FIELDS) {
    const inputField = document.createElement('input');
    inputField.type = 'tel';
    inputField.name = 'phone';
    inputField.required = false;
    inputField.setAttribute('aria-required', 'false');
    inputField.setAttribute('aria-label', 'Phone Number');
    inputField.setAttribute(
      'aria-describedby',
      `phone${phoneFieldCount + 1}Error`
    );
    inputField.setAttribute(
      'pattern',
      '^(+?\\d{1,2}?[-\\s]?)?(?:\\d{3})?[-\\s]?\\d{3}[-\\s]?\\d{4}$'
    );
    inputField.id = `phone${phoneFieldCount + 1}`;

    const label = document.createElement('label');
    label.textContent = `Phone Number ${phoneFieldCount + 1}:`;
    label.htmlFor = `phone${phoneFieldCount + 1}`;

    const errorSpan = document.createElement('span');
    errorSpan.classList.add('error-message');
    errorSpan.id = `phone${phoneFieldCount + 1}Error`;
    errorSpan.setAttribute('aria-live', 'polite');

    phoneFieldsContainer.appendChild(label);
    phoneFieldsContainer.appendChild(inputField);
    phoneFieldsContainer.appendChild(errorSpan);

    const addPhoneFieldBtn =
      phoneFieldsContainer.parentElement.querySelector('#addPhoneFieldBtn');
    addPhoneFieldBtn.disabled = phoneFieldCount === MAX_NUMBER_PHONE_FIELDS - 1;

    inputField.addEventListener('blur', () => validateForm(inputField));
    maskInputs([inputField]);
  }
}

export function scrollToInvalidField() {
  const form = document.getElementById('checkoutForm');
  const invalidField = form.querySelector('input:invalid, select:invalid');
  if (invalidField) {
    invalidField.scrollIntoView({ behavior: 'smooth', block: 'center' });
    invalidField.focus();
  }
}

export function maskInputs(inputs = null) {
  const fields =
    inputs ||
    document.querySelectorAll(
      'input[type="tel"], input[type="email"], input[name="creditCard"], input[name="cvv"]'
    );
  fields.forEach((field) => {
    if (field.type === 'tel') {
      field.addEventListener('input', () => Mask.phone(field));
    } else if (field.type === 'email') {
      field.addEventListener('input', () => Mask.email(field));
    } else if (field.name === 'creditCard') {
      field.addEventListener('input', () => Mask.creditCard(field));
    } else if (field.name === 'cvv') {
      field.addEventListener('input', () => Mask.cvv(field));
    }
  });
}

export function showLoadingState(isLoading) {
  const submitBtn = document.getElementById('submitBtn');
  if (isLoading) {
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';
  } else {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Submit';
  }
}

export async function asyncEmailValidate(field) {
  const emailFieldValue = field.value.trim();
  const emailErrorSpan = document.getElementById('emailError');

  if (!emailFieldValue) {
    clearError(emailErrorSpan);
    return;
  }

  if (!emailRegex.test(emailFieldValue)) {
    showError(emailErrorSpan, errorMessages.email);
    return;
  }

  showLoadingState(true);

  try {
    await mockAPICall();
  } catch (error) {
    showError(emailErrorSpan, error.message);
  } finally {
    showLoadingState(false);
    clearError(emailErrorSpan);
  }
}

function mockAPICall() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() < 0.75;
      if (shouldResolve) {
        resolve();
      } else {
        reject(new Error('Email validation failed'));
      }
    }, 1000);
  });
}

export function mockFormSubmit(formValues) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(formValues);
    }, 1000);
  });
}
