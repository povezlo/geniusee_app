class InputMaskService {
  maskCreditCard(input) {
    input.value = input.value
      .replace(/\D/g, '')
      .replace(/(.{4})/g, '$1 ')
      .trim();
  }

  maskCVV(input) {
    input.value = input.value.replace(/\D/g, '').slice(0, 3);
  }

  maskEmail(input) {
    input.value = input.value.trim();
  }

  maskPhoneNumber(input) {
    input.value = input.value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
  }
}

export default InputMaskService;
