import styles from "../../styles/Model.module.css";

function CommentsList({ children }) {
  return <div className={styles["model-comments-list"]}>{children}</div>;
}

export default CommentsList;
