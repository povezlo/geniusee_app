// utils.js
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
let phoneFieldCount = 1;

export function validateForm(field, isSubmitting = false) {
  let isFormValid = true;
  const form = document.getElementById('checkoutForm');
  const fields = isSubmitting
    ? form.querySelectorAll('input, select')
    : [field];

  fields.forEach((field) => {
    const errorSpan = form.querySelector(`#${field.id}Error`);
    if (isRequiredField(field)) {
      showError(errorSpan, errorMessages.required);
      isFormValid = false;
    } else if (field.type === 'checkbox' && !field.checked) {
      showError(errorSpan, errorMessages.required);
      isFormValid = false;
    } else if (field.name === 'phone' && !phoneRegex.test(field.value)) {
      if (!field.required && !field.value.trim()) {
        return;
      }
      showError(errorSpan, errorMessages.phone);
      isFormValid = false;
    } else if (
      field.name === 'creditCard' &&
      !creditCardRegex.test(field.value)
    ) {
      showError(errorSpan, errorMessages.creditCard);
      isFormValid = false;
    } else if (field.name === 'cvv' && !cvvRegex.test(field.value)) {
      showError(errorSpan, errorMessages.cvv);
      isFormValid = false;
    } else {
      clearError(errorSpan);
    }
  });

  return isFormValid;
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

export function mockFormSubmit(formValues) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(formValues);
    }, 1000);
  });
}

export function addPhoneField() {
  const phoneFieldsContainer = document.getElementById('phoneFieldsContainer');

  if (phoneFieldCount < MAX_NUMBER_PHONE_FIELDS) {
    phoneFieldCount++;

    const inputField = document.createElement('input');
    inputField.type = 'tel';
    inputField.name = 'phone';
    inputField.required = false;
    inputField.setAttribute('aria-required', 'false');
    inputField.setAttribute('aria-label', 'Phone Number');
    inputField.setAttribute('aria-describedby', `phone${phoneFieldCount}Error`);
    inputField.setAttribute(
      'pattern',
      '^(+?d{1,2}?[-s]?)?(?d{3})?[-s]?d{3}[-s]?d{4}$'
    );
    inputField.id = `phone${phoneFieldCount}`;

    const label = document.createElement('label');
    label.textContent = `Phone Number ${phoneFieldCount}:`;
    label.htmlFor = `phone${phoneFieldCount}`;

    const errorSpan = document.createElement('span');
    errorSpan.classList.add('error-message');
    errorSpan.id = `phone${phoneFieldCount}Error`;
    errorSpan.setAttribute('aria-live', 'polite');

    phoneFieldsContainer.appendChild(label);
    phoneFieldsContainer.appendChild(inputField);
    phoneFieldsContainer.appendChild(errorSpan);

    addPhoneFieldBtn.disabled = phoneFieldCount === MAX_NUMBER_PHONE_FIELDS;

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
      field.addEventListener('input', () => {
        field.value = field.value
          .replace(/\D/g, '')
          .replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
      });
    } else if (field.type === 'email') {
      field.addEventListener('input', () => {
        field.value = field.value.toLowerCase().trim();
      });
    } else if (field.name === 'creditCard') {
      field.addEventListener('input', () => {
        field.value = field.value
          .replace(/\D/g, '')
          .replace(/(\d{4})(?=\d)/g, '$1 ');
      });
    } else if (field.name === 'cvv') {
      field.addEventListener('input', () => {
        field.value = field.value.replace(/\D/g, '');
      });
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

export async function AsyncEmailValidate(field) {
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

function isRequiredField(field) {
  return field.required && !field.value.trim();
}
