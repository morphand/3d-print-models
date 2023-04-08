import { GitHubIcon } from "../Icons/Icons";
import styles from "../../styles/Footer.module.css";

function Footer() {
  return (
    <div className={styles["footer"]}>
      <small>
        This project is made for the SoftUni ReactJS exam. Checkout the code for
        the <GitHubIcon />{" "}
        <a
          href="https://github.com/morphand/softuni-reactjs-exam"
          target="_blank"
          rel="noreferrer"
        >
          client
        </a>{" "}
        or the <GitHubIcon />{" "}
        <a
          href="https://github.com/morphand/softuni-reactjs-exam-server"
          target="_blank"
          rel="noreferrer"
        >
          server
        </a>
        .
      </small>
    </div>
  );
}

export default Footer;
