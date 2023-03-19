import { useRef, useState } from "react";
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
} from "../utils/validators";
import styles from "../styles/Form.module.css";
import { useNavigate } from "react-router-dom";

function Register({ setToken }) {
  const username = useRef("");
  const email = useRef("");
  const password = useRef("");
  const repeatPassword = useRef("");
  const [isValidUsername, setIsValidUsername] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidRepeatPassword, setIsValidRepeatPassword] = useState(false);
  const navigate = useNavigate();

  function handleRegister(e) {
    e.preventDefault();
    // Register
    console.log(
      e.target.value,
      username.current.value,
      email.current.value,
      password.current.value,
      repeatPassword.current.value
    );
    // add validation
    const req = {
      username: username.current.value.trim(),
      email: email.current.value.trim(),
      password: password.current.value.trim(),
      repeatPassword: repeatPassword.current.value.trim(),
    };
    fetch("http://localhost:5000/register", {
      method: "POST",
      body: JSON.stringify(req),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        console.log(data.status);
        console.log(data.errors);
        console.log(data.value);
      })
      .catch((e) => console.error(e));
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
        <label htmlFor="email">Email</label>
        <input
          type="text"
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
      </form>
    </div>
  );
}

export default Register;
