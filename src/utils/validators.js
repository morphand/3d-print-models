import ValidationResult from "./Result";

export const USERNAME_MIN_LENGTH = 3;
export const USERNAME_MAX_LENGTH = 22;
export const PASSWORD_MIN_LENGTH = 3;
export const PASSWORD_MAX_LENGTH = 22;
export const REPEAT_PASSWORD_MIN_LENGTH = PASSWORD_MIN_LENGTH;
export const REPEAT_PASSWORD_MAX_LENGTH = PASSWORD_MAX_LENGTH;
export const EMAIL_MIN_LENGTH = 6;
export const EMAIL_MAX_LENGTH = 256;

/**
 * @param {String} username
 * @returns {Boolean}
 */
export function validateUsername(username) {
  username = username.trim();
  if (
    username.length < USERNAME_MIN_LENGTH ||
    username.length > USERNAME_MAX_LENGTH
  ) {
    return false;
  }
  return true;
}

/**
 * @param {String} password
 * @returns {Boolean}
 */
export function validatePassword(password) {
  password = password.trim();
  if (
    password.length < PASSWORD_MIN_LENGTH ||
    password.length > PASSWORD_MAX_LENGTH
  ) {
    return false;
  }
  return true;
}

/**
 * @param {String} email
 * @returns {Boolean}
 */
export function validateEmail(email) {
  email = email.trim().toLowerCase();
  const regex = new RegExp(
    /^(?<address>[A-Za-z0-9_]{2,})@(?<subdomainOne>[A-Za-z0-9]{2,}\.)?(?<subdomainTwo>[A-Za-z0-9]{2,}\.)?(?<hostname>[A-Za-z0-9]{2,})\.(?<domain>[A-Za-z0-9]{2,})$/
  );
  if (
    email.length < EMAIL_MIN_LENGTH ||
    email.length > EMAIL_MAX_LENGTH ||
    !regex.test(email)
  ) {
    return false;
  }
  return true;
}

/**
 * @param {String} password
 * @param {String} repeatPassword
 * @returns {Boolean}
 */
export function validateRepeatPassword(password, repeatPassword) {
  password = password.trim();
  repeatPassword = repeatPassword.trim();
  if (
    repeatPassword.length < REPEAT_PASSWORD_MIN_LENGTH ||
    repeatPassword.length > REPEAT_PASSWORD_MAX_LENGTH ||
    repeatPassword !== password
  ) {
    return false;
  }
  return true;
}

/**
 * @param {String} username
 * @param {String} password
 * @returns {ValidationResult}
 */
export function validateLoginDetails(username, password) {
  const result = new ValidationResult();

  // If username or password is empty, push errors and return the result.
  if (!username || !password) {
    if (!username) {
      result.errors.push(`No username provided.`);
    }
    if (!password) {
      result.errors.push(`No password provided.`);
    }
    return result;
  }

  // Validation.
  const isValidUsername = validateUsername(username.trim());
  const isValidPassword = validatePassword(password.trim());

  // If username or password is invalid, push errors and return the result.
  if (!isValidUsername || !isValidPassword) {
    if (!isValidUsername) {
      result.errors.push(
        `The length of the username has to be atleast ${USERNAME_MIN_LENGTH} characters long.`
      );
    }
    if (!isValidPassword) {
      result.errors.push(
        `The length of the password has to be atleast ${PASSWORD_MIN_LENGTH} characters long.`
      );
    }
    return result;
  }

  // Else return status true in the result.
  result.status = true;
  return result;
}
