import { Link } from "react-router-dom";
import { DownloadIcon, LikesIcon, CommentsIcon } from "../Icons/Icons";
import styles from "../../styles/ModelCard.module.css";
import { numberFormatter } from "../../utils/formatters";

function ModelCard({ model }) {
  return (
    <div className={styles["model"]}>
      <div className={styles["model-head"]}>
        <span>{model.name}</span>
      </div>
      <div className={styles["model-uploaded-by"]}>
        <small>Uploaded by {model.creator.username}</small>
      </div>
      <div className={styles["model-image"]}>
        <img src={model.images[0]} alt="" srcSet="" />
      </div>
      <div className={styles["model-statistics"]}>
        <p>
          <DownloadIcon /> <span>{numberFormatter(model.downloadsCount)}</span>
        </p>
        <p>
          <LikesIcon /> <span>{numberFormatter(model.likesCount)}</span>
        </p>
        <p>
          <CommentsIcon /> <span>{numberFormatter(model.commentsCount)}</span>
        </p>
      </div>
      <Link to={`/models/${model._id}`}>View model</Link>
    </div>
  );
}

export default ModelCard;
