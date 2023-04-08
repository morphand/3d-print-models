import { useRef, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  USERNAME_MIN_LENGTH,
  USERNAME_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
  EMAIL_MIN_LENGTH,
  EMAIL_MAX_LENGTH,
  REPEAT_PASSWORD_MIN_LENGTH,
  REPEAT_PASSWORD_MAX_LENGTH,
  validateUsername,
  validatePassword,
  validateEmail,
  validateRepeatPassword,
  validateRegisterDetails,
  validateImageURL,
} from "../../utils/validators";
import styles from "../../styles/Form.module.css";
import RequestSender from "../../utils/RequestSender";
import ToastContext from "../../contexts/Toast";

function Register() {
  const username = useRef("");
  const email = useRef("");
  const password = useRef("");
  const repeatPassword = useRef("");
  const imageURL = useRef("");
  const toastContext = useContext(ToastContext);
  const showToast = toastContext.showToast;
  const [isValidUsername, setIsValidUsername] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidImageURL, setIsValidImageURL] = useState(false);
  const [isValidRepeatPassword, setIsValidRepeatPassword] = useState(false);
  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();
    // Get the request's username, email, password and repeatPassword from the form and trim them.
    const req = {
      username: username.current.value.trim(),
      email: email.current.value.trim(),
      imageURL: imageURL.current.value.trim(),
      password: password.current.value.trim(),
      repeatPassword: repeatPassword.current.value.trim(),
    };

    // Validate the provided username, email, password and repeatPassword.
    const areValidRegisterDetails = validateRegisterDetails(
      req.username,
      req.email,
      req.imageURL,
      req.password,
      req.repeatPassword
    );

    // Initialize the error and description variables, which will hold the errors.
    let error = "Invalid register details.";
    const description = [];

    // If the status of the validation is false, append the errors to the description and return Toast with the provided values.
    if (!areValidRegisterDetails.status) {
      areValidRegisterDetails.errors.forEach((e) => description.push(e));
      return showToast(error, description.join(" "));
    }

    // Prepare the form data.
    const formData = new FormData();
    formData.append("username", req.username);
    formData.append("email", req.email);
    formData.append("imageURL", req.imageURL);
    formData.append("password", req.password);
    formData.append("repeatPassword", req.repeatPassword);

    // Make the request.
    const requestSender = new RequestSender();
    const result = await requestSender.post(`/register`, { data: formData });

    // Navigate to login on result success status.
    if (result.status) {
      return navigate("/login");
    }

    // Else show the errors.
    result.errors.forEach((e) => description.push(e));
    return showToast(error, description.join(" "));
  }

  return (
    <div>
      <form className={styles["form"]}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          minLength={USERNAME_MIN_LENGTH}
          maxLength={USERNAME_MAX_LENGTH}
          ref={username}
          onChange={(e) => {
            validateUsername(e.target.value)
              ? setIsValidUsername(true)
              : setIsValidUsername(false);
          }}
          required
        />
        {!isValidUsername && (
          <p className={styles["error-text"]}>
            <small>
              Username should be atleast {USERNAME_MIN_LENGTH} characters long.
            </small>
          </p>
        )}
        <label htmlFor="imageURL">Image URL</label>
        <input
          type="text"
          name="imageURL"
          id="imageURL"
          ref={imageURL}
          onChange={(e) => {
            validateImageURL(e.target.value)
              ? setIsValidImageURL(true)
              : setIsValidImageURL(false);
          }}
          required
        />
        {!isValidImageURL && (
          <p className={styles["error-text"]}>
            <small>Invalid image URL.</small>
          </p>
        )}
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          minLength={EMAIL_MIN_LENGTH}
          maxLength={EMAIL_MAX_LENGTH}
          ref={email}
          onChange={(e) => {
            validateEmail(e.target.value)
              ? setIsValidEmail(true)
              : setIsValidEmail(false);
          }}
          required
        />
        {!isValidEmail && (
          <p className={styles["error-text"]}>
            <small>Invalid email.</small>
          </p>
        )}
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          minLength={PASSWORD_MIN_LENGTH}
          maxLength={PASSWORD_MAX_LENGTH}
          ref={password}
          onChange={(e) => {
            validatePassword(e.target.value)
              ? setIsValidPassword(true)
              : setIsValidPassword(false);
          }}
          required
        />
        {!isValidPassword && (
          <p className={styles["error-text"]}>
            <small>
              Password should be atleast {PASSWORD_MIN_LENGTH} characters long.
            </small>
          </p>
        )}
        <label htmlFor="repeatPassword">Repeat password</label>
        <input
          type="password"
          name="repeatPassword"
          id="repeatPassword"
          minLength={REPEAT_PASSWORD_MIN_LENGTH}
          maxLength={REPEAT_PASSWORD_MAX_LENGTH}
          ref={repeatPassword}
          onChange={(e) => {
            validateRepeatPassword(password.current.value, e.target.value)
              ? setIsValidRepeatPassword(true)
              : setIsValidRepeatPassword(false);
          }}
          required
        />
        {!isValidRepeatPassword && (
          <p className={styles["error-text"]}>
            <small>
              Repeat password should be atleast {PASSWORD_MIN_LENGTH} characters
              long and should match the password.
            </small>
          </p>
        )}
        <input type="submit" value="Register" onClick={handleRegister} />
        <small>
          Have account? <Link to="/login">Login</Link> now.
        </small>
      </form>
    </div>
  );
}

export default Register;
