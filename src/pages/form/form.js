import Validator from '../../services/validator.service.js';
import FormValidationService from '../../services/form-valitation.service.js';
import InputMaskService from '../../services/input-mask.service.js';

const validationService = new FormValidationService(new Validator());
const inputMaskService = new InputMaskService();

const form = document.getElementById('checkoutForm');
const submitBtn = document.getElementById('submitBtn');

// Sticky headings
const headings = document.querySelectorAll('legend');
const sections = document.querySelectorAll('fieldset');
const headerHeight = 64; // Height of the header in pixels

let isSubmitting = false;

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

// Event delegation for input masking
form.addEventListener('input', (event) => {
  const { target } = event;
  if (target.id === 'creditCard') {
    inputMaskService.maskCreditCard(target);
  } else if (target.id === 'cvv') {
    inputMaskService.maskCVV(target);
  } else if (target.id === 'email') {
    inputMaskService.maskEmail(target);
  } else if (target.id === 'phone') {
    inputMaskService.maskPhoneNumber(target);
  }
});

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
  const phoneInput = document.getElementById('phone');
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
    phoneInput,
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
