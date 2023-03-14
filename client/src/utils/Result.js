class ValidationResult {
  constructor(status = false, errors = [], values = []) {
    this.status = status;
    this.errors = errors;
    this.values = values;
  }
}

export default ValidationResult;
