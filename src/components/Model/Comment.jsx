import { DeleteIcon } from "../Icons/Icons";
import styles from "../../styles/Model.module.css";
import { dateFormatter } from "../../utils/formatters";

function Comment({ comment }) {
  return (
    <div
      key={comment._id}
      className={styles["model-comments-list-single-comment"]}
    >
      <span className={styles["model-comments-list-single-comment-delete"]}>
        <button>
          <DeleteIcon />
        </button>
      </span>
      <span className="model-comments-list-single-comment-date">
        <small>{dateFormatter(comment.date)}</small>{" "}
      </span>
      <span className={styles["model-comments-list-single-comment-username"]}>
        {comment.creatorUsername}:{" "}
      </span>
      <span className={styles["model-comments-list-single-comment-content"]}>
        {comment.comment}
      </span>
    </div>
  );
}

export default Comment;
