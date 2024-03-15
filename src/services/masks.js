export class Mask {
  static phone(input) {
    input.value = input.value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
  }

  static email(input) {
    input.value = input.value.toLowerCase().trim();
  }

  static creditCard(input) {
    input.value = input.value
      .replace(/\D/g, '')
      .replace(/(\d{4})(?=\d)/g, '$1 ');
  }

  static cvv(input) {
    input.value = input.value.replace(/\D/g, '');
  }
}
