import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "./Loading";
import { DownloadIcon, LikesIcon, CommentsIcon, RibbonIcon } from "./Icons";
import { numberFormatter } from "../utils/formatters";
import styles from "../styles/Model.module.css";

function Model() {
  const modelId = useParams().id;
  const [model, setModel] = useState(null);
  const [mainImage, setMainImage] = useState("");
  useEffect(() => {
    fetch(`http://localhost:5000/api/models/${modelId}`)
      .then((res) => res.json())
      .then((res) => {
        setModel(res);
        setMainImage(res.images[0]);
      })
      .catch((e) => console.log(e));
  }, [modelId]);
  function handleDownload() {
    console.log(modelId);
  }
  console.log(model);
  return (
    <>
      {model ? (
        <div className={styles["model"]}>
          <div className={styles["model-image"]}>
            <div className={styles["model-image-main"]}>
              <img src={mainImage} alt="model" />
            </div>
            <div className={styles["model-image-additional"]}>
              {model.images.map((image, i) => (
                <img
                  key={i}
                  src={image}
                  alt="model"
                  onClick={() => setMainImage(image)}
                />
              ))}
            </div>
          </div>
          <div className={styles["model-info"]}>
            <div className={styles["model-header"]}>
              <div className={styles["model-name"]}>
                <h2>{model.name}</h2>
              </div>
              <div className={styles["model-creator"]}>
                <small>
                  Uploaded by{" "}
                  <Link to={`/profile/${model.creator._id}`}>
                    {model.creator.username}
                  </Link>
                </small>
              </div>
            </div>
            {model.isFeatured && (
              <div className={styles["model-is-featured"]}>
                <p>
                  Featured model <RibbonIcon />
                </p>
              </div>
            )}
            <div className={styles["model-description"]}>
              <h3>Description</h3>
              <p>{model.description}</p>
            </div>
            <div className={styles["model-statistics"]}>
              <div className={styles["model-statistics-download-count"]}>
                <DownloadIcon />
                <span>
                  <small>Downloads</small>
                </span>
                <span>{numberFormatter(model.downloadsCount)}</span>
              </div>
              <div className={styles["model-statistics-likes-count"]}>
                <LikesIcon />
                <span>
                  <small>Likes</small>
                </span>
                <span>{numberFormatter(model.likesCount)}</span>
              </div>
              <div className={styles["model-statistics-comments-count"]}>
                <CommentsIcon />
                <span>
                  <small>Comments</small>
                </span>
                <span>{numberFormatter(model.commentsCount)}</span>
              </div>
            </div>
            <div className={styles["model-view-download"]}>
              <button>View model</button>
              <button onClick={handleDownload}>Download</button>
            </div>
            <br />
            Model comments: {model.comments}
            <br />
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Model;
