import styles from "../styles/Toast.module.css";

function Toast({ header, content }) {
  return (
    <div className={styles["toast"]}>
      <div className={styles["toast-header"]}>
        <p>{header}</p>
        <div className={styles["toast-header-close"]}>
            <small>Close</small>
        </div>
      </div>
      <div className="toast-content">
        <p><small>{content}</small></p>
      </div>
    </div>
  );
}

export default Toast;
