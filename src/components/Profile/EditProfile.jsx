import { useRef, useState } from "react";
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
  validateRepeatPassword,
} from "../../utils/validators";
import styles from "../../styles/Form.module.css";

function EditProfile() {
  const email = useRef("");
  const password = useRef("");
  const repeatPassword = useRef("");
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidRepeatPassword, setIsValidRepeatPassword] = useState(false);
  const { userId } = useParams();
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    navigate(`/profile/${userId}`);
    console.log(userId);
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
        <input type="submit" value="Change profile" />
      </form>
    </div>
  );
}

export default EditProfile;
