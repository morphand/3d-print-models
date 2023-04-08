import { useRef, useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
  EMAIL_MIN_LENGTH,
  EMAIL_MAX_LENGTH,
  REPEAT_PASSWORD_MIN_LENGTH,
  REPEAT_PASSWORD_MAX_LENGTH,
  validatePassword,
  validateEmail,
  validateImageURL,
  validateRepeatPassword,
  validateEditUserDetails,
} from "../../utils/validators";
import AuthContext from "../../contexts/Auth";
import ToastContext from "../../contexts/Toast";
import styles from "../../styles/Form.module.css";
import RequestSender from "../../utils/RequestSender";

function EditProfile() {
  const authContext = useContext(AuthContext);
  const currentUserId = authContext.userId;
  const isUserAdmin = authContext.isUserAdmin;
  const toastContext = useContext(ToastContext);
  const showToast = toastContext.showToast;
  const email = useRef("");
  const imageURL = useRef("");
  const password = useRef("");
  const repeatPassword = useRef("");
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidImageURL, setIsValidImageURL] = useState(false);
  const [isValidRepeatPassword, setIsValidRepeatPassword] = useState(false);
  const [initialEmail, setInitialEmail] = useState("");
  const [initialImageURL, setInitialImageURL] = useState("");
  const { userId } = useParams();
  const navigate = useNavigate();
  const requestSender = new RequestSender();

  useEffect(() => {
    if (currentUserId !== userId && !isUserAdmin) {
      return navigate(`/profile/${userId}`);
    }
    getInitialValues();
  }, [currentUserId, isUserAdmin, navigate, userId]);

  async function getInitialValues() {
    const result = await requestSender.get(`/user/${userId}/edit`);
    setInitialEmail(result.email);
    setInitialImageURL(result.imageURL);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    // Get the request's email, password and repeatPassword from the form and trim them.
    const req = {
      email: email.current.value.trim(),
      imageURL: imageURL.current.value.trim(),
      password: password.current.value.trim(),
      repeatPassword: repeatPassword.current.value.trim(),
    };

    // Validate the provided username, email, password and repeatPassword.
    const areValidEditUserDetails = validateEditUserDetails(
      req.email,
      req.imageURL,
      req.password,
      req.repeatPassword
    );

    // Initialize the error and description variables, which will hold the errors.
    let error = "Invalid details.";
    const description = [];

    // If the status of the validation is false, append the errors to the description and return Toast with the provided values.
    if (!areValidEditUserDetails.status) {
      areValidEditUserDetails.errors.forEach((e) => description.push(e));
      return showToast(error, description.join(" "));
    }

    // Prepare the form data.
    const formData = new FormData();
    formData.append("currentUserId", currentUserId);
    formData.append("editedUserId", userId);
    formData.append("email", req.email);
    formData.append("imageURL", req.imageURL);
    formData.append("password", req.password);
    formData.append("repeatPassword", req.repeatPassword);

    // Make the request.
    const result = await requestSender.post(`/user/${userId}/edit`, {
      data: formData,
    });

    // Navigate to login on result success status.
    if (result.status) {
      return navigate(`/profile/${userId}`);
    }

    // Else show the errors.
    result.errors.forEach((e) => description.push(e));
    return showToast(error, description.join(" "));
  }
  return (
    <div>
      <form className={styles["form"]} onSubmit={handleSubmit}>
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
          defaultValue={initialEmail}
          required
        />
        {!isValidEmail && (
          <p className={styles["error-text"]}>
            <small>Invalid email.</small>
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
          defaultValue={initialImageURL}
          required
        />
        {!isValidImageURL && (
          <p className={styles["error-text"]}>
            <small>Invalid image URL.</small>
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
        <input type="submit" value="Change profile" />
      </form>
    </div>
  );
}

export default EditProfile;
