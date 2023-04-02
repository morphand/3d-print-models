import { DownloadIcon, LikesIcon, CommentsIcon } from "../Icons/Icons";
import { numberFormatter } from "../../utils/formatters";
import styles from "../../styles/Model.module.css";

function ModelStatistics({ downloadsCount, likesCount, commentsCount }) {
  return (
    <div className={styles["model-statistics"]}>
      <div className={styles["model-statistics-download-count"]}>
        <DownloadIcon />
        <span>
          <small>Downloads</small>
        </span>
        <span>{numberFormatter(downloadsCount)}</span>
      </div>
      <div className={styles["model-statistics-likes-count"]}>
        <LikesIcon />
        <span>
          <small>Likes</small>
        </span>
        <span>{numberFormatter(likesCount)}</span>
      </div>
      <div className={styles["model-statistics-comments-count"]}>
        <CommentsIcon />
        <span>
          <small>Comments</small>
        </span>
        <span>{numberFormatter(commentsCount)}</span>
      </div>
    </div>
  );
}

export default ModelStatistics;
