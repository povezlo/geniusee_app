import {
  validateForm,
  mockFormSubmit,
  addPhoneField,
  scrollToInvalidField,
  maskInputs,
  showLoadingState,
  AsyncEmailValidate,
} from './utils.js';

const form = document.getElementById('checkoutForm');
const addPhoneFieldBtn = document.getElementById('addPhoneFieldBtn');

let isSubmitting = false;

maskInputs();
addPhoneFieldBtn.addEventListener('click', addPhoneField);

form.querySelectorAll('input, select').forEach((field) => {
  field.addEventListener('blur', () =>
    field.name === 'email' ? AsyncEmailValidate(field) : validateForm(field)
  );
});

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const isFormValid = validateForm(null, true);
  if (isFormValid) {
    showLoadingState(true);
    const formData = new FormData(form);
    const formValues = Object.fromEntries(formData.entries());

    try {
      const response = await mockFormSubmit(formValues);
      console.log('Form Values:', response);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      showLoadingState(false);
    }
  } else {
    showLoadingState(false);
    scrollToInvalidField();
  }
});
