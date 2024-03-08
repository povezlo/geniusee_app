class ValidationService {
  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  validatePhoneNumber(phoneNumber) {
    const phoneRegex = /^(\+\d{1,3}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
    return phoneRegex.test(phoneNumber);
  }

  validateCreditCard(creditCardNumber) {
    return /^\d{16}$/.test(creditCardNumber);
  }

  validateCVV(cvv) {
    return /^\d{3,4}$/.test(cvv);
  }
}

export default ValidationService;
