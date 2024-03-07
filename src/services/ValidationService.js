class ValidationService {
  static validateName(name) {
    return name.trim() !== '';
  }

  static validateEmail(email) {
    // Псевдо-асинхронная валидация
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            email
          )
        ) {
          resolve(true);
        } else {
          reject('Please enter a valid email address');
        }
      }, 1000);
    });
  }

  static validateCreditCard(number) {
    return number.replace(/\s+/g, '').length === 16 && /^\d+$/.test(number);
  }

  static validateCVV(cvv) {
    return cvv.trim().length === 3 && /^\d+$/.test(cvv);
  }

  static validateTerms(checked) {
    return checked;
  }
}

export default ValidationService;
