import Validator from '../../services/validator.service.js';
import FormValidationService from '../../services/form-validation.service.js';
import InputMaskService from '../../services/input-mask.service.js';
import StickyHeadingsService from '../../services/sticky-headings.service.js';

const validationService = new FormValidationService(new Validator());
const stickyHeadingsService = new StickyHeadingsService();

const form = document.getElementById('checkoutForm');
const submitBtn = document.getElementById('submitBtn');
const phoneFieldsContainer = document.getElementById('phoneFieldsContainer');
const addPhoneFieldBtn = document.getElementById('addPhoneFieldBtn');

let phoneFieldCount = 1;
let isSubmitting = false;

stickyHeadingsService.init();

// Event delegation for input masking
form.addEventListener('input', (event) => {
  const { target } = event;
  if (target.id === 'creditCard') {
    InputMaskService.maskCreditCard(target);
  } else if (target.id === 'cvv') {
    InputMaskService.maskCVV(target);
  } else if (target.id === 'email') {
    InputMaskService.maskEmail(target);
  } else if (target.name === 'phone') {
    InputMaskService.maskPhoneNumber(target);
  }
});

addPhoneFieldBtn.addEventListener('click', () => {
  if (phoneFieldCount < 3) {
    phoneFieldCount++;
    const newPhoneField = document.createElement('div');
    newPhoneField.innerHTML = `
      <label for="phone${phoneFieldCount}">Phone Number:</label>
      <input type="tel" id="phone${phoneFieldCount}" name="phone" required aria-required="true" aria-label="Phone Number" aria-describedby="phoneError">
    `;
    phoneFieldsContainer.appendChild(newPhoneField);
    addPhoneFieldBtn.disabled = phoneFieldCount === 3;
  }
});

addPhoneFieldBtn.disabled = false;

// Event delegation for input blur validation
form.addEventListener(
  'blur',
  (event) => {
    const { target } = event;
    if (target.tagName === 'INPUT' || target.tagName === 'SELECT') {
      const errorElement = document.getElementById(`${target.id}`);
      if (target.validity.valueMissing) {
        const errorMessage = `${target.labels[0].textContent.trim()} is required.`;
        validationService.displayErrorMessage(errorElement, errorMessage);
      } else {
        validationService.removeErrorMessage(errorElement);
      }
    }
  },
  true
);

// Event delegation for form submission
form.addEventListener('submit', async (event) => {
  event.preventDefault();

  if (isSubmitting) {
    return;
  }

  const firstNameInput = document.getElementById('firstName');
  const lastNameInput = document.getElementById('lastName');
  const emailInput = document.getElementById('email');
  const phoneInputs = Array.from(
    document.querySelectorAll('input[name="phone"]')
  );
  const countryInput = document.getElementById('country');
  const addressInput = document.getElementById('address');
  const creditCardInput = document.getElementById('creditCard');
  const cvvInput = document.getElementById('cvv');
  const termsAgreementInput = document.getElementById('termsAgreement');

  const isPersonalInfoValid = validationService.validatePersonalInfo(
    firstNameInput,
    lastNameInput
  );
  const isContactInfoValid = await validationService.validateContactInfo(
    emailInput,
    phoneInputs,
    countryInput,
    addressInput
  );
  const isPaymentDetailsValid = validationService.validatePaymentDetails(
    creditCardInput,
    cvvInput,
    termsAgreementInput
  );

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
