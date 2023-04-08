import ValidationResult from "./Result";

export const USERNAME_MIN_LENGTH = 3;
export const USERNAME_MAX_LENGTH = 22;
export const PASSWORD_MIN_LENGTH = 3;
export const PASSWORD_MAX_LENGTH = 22;
export const REPEAT_PASSWORD_MIN_LENGTH = PASSWORD_MIN_LENGTH;
export const REPEAT_PASSWORD_MAX_LENGTH = PASSWORD_MAX_LENGTH;
export const EMAIL_MIN_LENGTH = 6;
export const EMAIL_MAX_LENGTH = 256;
export const ALLOWED_MODEL_EXTENSIONS = ["stl"];
export const ALLOWED_IMAGE_EXTENSIONS = ["jpg", "jpeg", "png", "webp"];
export const MODEL_NAME_MIN_LENGTH = 2;
export const MODEL_NAME_MAX_LENGTH = 45;
export const MODEL_DESCRIPTION_MIN_LENGTH = 0;
export const MODEL_DESCRIPTION_MAX_LENGTH = 2000;

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

export function validateRegisterDetails(
  username,
  email,
  password,
  repeatPassword
) {
  const result = new ValidationResult();

  // If some fields are empty, push errors and return the result.
  if (!username || !email || !password || !repeatPassword) {
    if (!username) {
      result.errors.push(`No username provided.`);
    }
    if (!email) {
      result.errors.push(`No email provided.`);
    }
    if (!password) {
      result.errors.push(`No password provided.`);
    }
    if (!repeatPassword) {
      result.errors.push(`No repeat password provided.`);
    }
    return result;
  }

  // Validation.
  const isValidUsername = validateUsername(username.trim());
  const isValidEmail = validateEmail(email.trim());
  const isValidPassword = validatePassword(password.trim());
  const isValidRepeatPassword = validateRepeatPassword(
    password.trim(),
    repeatPassword.trim()
  );

  // If some fields are invalid, push errors and return the result.
  if (
    !isValidUsername ||
    !isValidEmail ||
    !isValidPassword ||
    !isValidRepeatPassword
  ) {
    if (!isValidUsername) {
      result.errors.push(
        `The length of the username has to be atleast ${USERNAME_MIN_LENGTH} characters long.`
      );
    }
    if (!isValidEmail) {
      result.errors.push(
        `The length of the email has to be atleast ${EMAIL_MIN_LENGTH} characters long and match the pattern **@**.**.`
      );
    }
    if (!isValidPassword) {
      result.errors.push(
        `The length of the password has to be atleast ${PASSWORD_MIN_LENGTH} characters long.`
      );
    }
    if (!isValidRepeatPassword) {
      result.errors.push(`Both passwords must match.`);
    }
    return result;
  }

  // Else return status true in the result.
  result.status = true;
  return result;
}

export function validateEditUserDetails(email, password, repeatPassword) {
  const result = new ValidationResult();

  // If some fields are empty, push errors and return the result.
  if (!email || !password || !repeatPassword) {
    if (!email) {
      result.errors.push(`No email provided.`);
    }
    if (!password) {
      result.errors.push(`No password provided.`);
    }
    if (!repeatPassword) {
      result.errors.push(`No repeat password provided.`);
    }
    return result;
  }

  // Validation.
  const isValidEmail = validateEmail(email.trim());
  const isValidPassword = validatePassword(password.trim());
  const isValidRepeatPassword = validateRepeatPassword(
    password.trim(),
    repeatPassword.trim()
  );

  // If some fields are invalid, push errors and return the result.
  if (!isValidEmail || !isValidPassword || !isValidRepeatPassword) {
    if (!isValidEmail) {
      result.errors.push(
        `The length of the email has to be atleast ${EMAIL_MIN_LENGTH} characters long and match the pattern **@**.**.`
      );
    }
    if (!isValidPassword) {
      result.errors.push(
        `The length of the password has to be atleast ${PASSWORD_MIN_LENGTH} characters long.`
      );
    }
    if (!isValidRepeatPassword) {
      result.errors.push(`Both passwords must match.`);
    }
    return result;
  }

  // Else return status true in the result.
  result.status = true;
  return result;
}

/**
 * @param {String} modelName
 * @returns {Boolean}
 */
export function validateModelName(modelName) {
  modelName = modelName.trim();
  if (
    !modelName ||
    modelName.length < MODEL_NAME_MIN_LENGTH ||
    modelName.length > MODEL_NAME_MAX_LENGTH
  ) {
    return false;
  }
  return true;
}

/**
 * @param {String} modelDescription
 * @returns {Boolean}
 */
export function validateModelDescription(modelDescription) {
  modelDescription = modelDescription.trim();
  if (
    !modelDescription ||
    modelDescription.length < MODEL_DESCRIPTION_MIN_LENGTH ||
    modelDescription.length > MODEL_DESCRIPTION_MAX_LENGTH
  ) {
    return false;
  }
  return true;
}

export function validateImage(fileName) {
  fileName = fileName.trim();
  const fileNameArray = fileName.split(".");
  const fileExtension = fileNameArray.pop();
  if (!fileName) {
    return false;
  }
  if (!ALLOWED_IMAGE_EXTENSIONS.includes(fileExtension.toLowerCase())) {
    return false;
  }

  return true;
}

export function validateModelFilename(fileName) {
  fileName = fileName.trim();
  const fileNameArray = fileName.split(".");
  const fileExtension = fileNameArray.pop();
  if (!fileName) {
    return false;
  }
  if (!ALLOWED_MODEL_EXTENSIONS.includes(fileExtension.toLowerCase())) {
    return false;
  }

  return true;
}
