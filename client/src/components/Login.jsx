import { useRef, useState } from "react";
import styles from "../styles/Form.module.css";
import {
  USERNAME_MIN_LENGTH,
  PASSWORD_MIN_LENGTH,
  validateUsername,
  validatePassword,
  validateLoginDetails,
} from "../utils/validators";

function Login() {
  const username = useRef("");
  const password = useRef("");
  const [isValidUsername, setIsValidUsername] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);

  function handleLogin(e) {
    e.preventDefault();
    const req = {
      username: username.current.value.trim(),
      password: password.current.value.trim(),
    };
    const areValidLoginDetails = validateLoginDetails(
      req.username,
      req.password
    );
    if (!areValidLoginDetails.status) {
      return areValidLoginDetails.errors.forEach((e) => console.error(e));
    }
    fetch("http://localhost:5000/login", {
      method: "POST",
      body: JSON.stringify(req),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((data) => data.json())
      .then((data) => console.log(data))
      .catch((e) => console.error(e));
  }

  return (
      <form className={styles["form"]} onSubmit={handleLogin}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
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
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
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
        <input type="submit" value="Login" />
      </form>
  );
}

export default Login;
