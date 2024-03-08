class InputMaskService {
  static maskCreditCard(input) {
    input.value = input.value
      .replace(/\D/g, '')
      .replace(/(.{4})/g, '$1 ')
      .trim();
  }

  static maskCVV(input) {
    input.value = input.value.replace(/\D/g, '').slice(0, 3);
  }

  static maskEmail(input) {
    input.value = input.value.trim();
  }

  static maskPhoneNumber(input) {
    input.value = input.value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
  }
}

export default InputMaskService;
