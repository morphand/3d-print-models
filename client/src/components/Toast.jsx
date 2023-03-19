import { useState } from "react";
import styles from "../styles/Toast.module.css";

function Toast({ header, content, hideAfterMs = 3000 }) {
  const [isShown, setIsShown] = useState(true);
  setTimeout(() => {
    setIsShown(false);
  }, hideAfterMs);
  return (
    isShown && (
      <div className={styles["toast"]}>
        <div className={styles["toast-header"]}>
          <p>{header}</p>
        </div>
        <div className="toast-content">
          <p>
            <small>{content}</small>
          </p>
        </div>
      </div>
    )
  );
}

export default Toast;
