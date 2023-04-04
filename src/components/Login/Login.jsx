import { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/Form.module.css";
import {
  USERNAME_MIN_LENGTH,
  PASSWORD_MIN_LENGTH,
  validateUsername,
  validatePassword,
  validateLoginDetails,
} from "../../utils/validators";
import RequestSender from "../../utils/RequestSender";
import AuthContext from "../../contexts/Auth";

function Login({ showToast }) {
  const authContext = useContext(AuthContext);
  const setToken = authContext.setToken;
  const username = useRef("");
  const password = useRef("");
  const [isValidUsername, setIsValidUsername] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    // Get the request's username and password from the form and trim them.
    const req = {
      username: username.current.value.trim(),
      password: password.current.value.trim(),
    };

    // Validate the provided username and password.
    const areValidLoginDetails = validateLoginDetails(
      req.username,
      req.password
    );

    // Initialize the error and description variables, which will hold the errors.
    let error = "Invalid login details.";
    const description = [];

    // If the status of the validation is false, append the errors to the description and return Toast with the provided values.
    if (!areValidLoginDetails.status) {
      areValidLoginDetails.errors.forEach((e) => description.push(e));
      return showToast(error, description.join(" "));
    }

    // Prepare the form data.
    const formData = new FormData();
    formData.append("username", req.username);
    formData.append("password", req.password);

    // Make the request.
    const requestSender = new RequestSender();
    const result = await requestSender.post(`/login`, { data: formData });

    // Set token on result success status.
    if (result.status) {
      localStorage.setItem("auth", result.value.token);
      setToken(result.value.token);
      return navigate("/");
    }

    // Else show the errors.
    result.errors.forEach((e) => description.push(e));
    return showToast(error, description.join(" "));
  }

  return (
    <>
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
        <small>
          Don't have account? <Link to="/register">Register</Link> now.
        </small>
      </form>
    </>
  );
}

export default Login;
