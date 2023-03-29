import { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { StlViewer } from "react-stl-viewer";
import Loading from "../Loading/Loading";
import {
  DownloadIcon,
  LikesIcon,
  CommentsIcon,
  RibbonIcon,
  EditIcon,
  DeleteIcon,
} from "../Icons/Icons";
import Comment from "./Comment";
import { numberFormatter } from "../../utils/formatters";
import styles from "../../styles/Model.module.css";
import formStyles from "../../styles/Form.module.css";

function Model({ username, userId }) {
  const modelId = useParams().id;
  const [model, setModel] = useState(null);
  const [modelComments, setModelComments] = useState([]);
  const [mainImage, setMainImage] = useState("");
  const [modelShown, setModelShown] = useState(false);
  const comment = useRef("");
  const stlViewerStyle = {
    width: "32rem",
    height: "32rem",
  };

  useEffect(() => {
    fetch(`http://localhost:5000/api/models/${modelId}`)
      .then((res) => res.json())
      .then((res) => {
        setModel(res);
        setMainImage(res.images[0]);
        setModelComments(res.comments);
      })
      .catch((e) => console.log(e));
  }, [modelId]);
  function handleDownload() {
    console.log(modelId);
  }
  function handleViewModel() {
    setModelShown(true);
    setMainImage("");
  }
  function handleLikeModel() {
    console.log(modelId);
    const formData = new FormData();
    formData.append("userId", userId);
    fetch(`http://localhost:5000/api/models/${modelId}/like`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
  }
  function handleEditModel() {
    console.log(modelId);
  }
  function handleDeleteModel() {
    console.log(modelId);
  }
  function handleFeatureModel() {
    console.log(modelId);
  }
  function scrollToComments() {
    comment.current.scrollIntoView({ behavior: "smooth" });
  }
  function getModelComments() {
    fetch(`http://localhost:5000/api/models/${modelId}/comments`)
      .then((res) => res.json())
      .then((res) => {
        setModelComments(res.comments);
      })
      .catch((e) => console.log(e));
  }
  function handleAddComment(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("comment", comment.current.value.trim());
    formData.append("creatorUsername", username);
    fetch(`http://localhost:5000/api/models/${modelId}/comments`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        getModelComments();
        comment.current.value = "";
      })
      .catch((e) => console.log(e));
  }
  console.log(model);
  return (
    <>
      {model ? (
        <>
          <div className={styles["model"]}>
            <div className={styles["model-image"]}>
              <div className={styles["model-image-main"]}>
                {modelShown ? (
                  <StlViewer
                    style={stlViewerStyle}
                    orbitControls
                    shadows
                    showAxes
                    url={model.files[0]}
                    modelProps={{ scale: 2 }}
                  />
                ) : (
                  <img src={mainImage} alt="model" />
                )}
                <div className={styles["model-download-like-comment"]}>
                  <button onClick={handleViewModel}>View model</button>
                </div>
              </div>

              <div className={styles["model-image-additional"]}>
                {model.images.map((image, i) => (
                  <img
                    key={i}
                    src={image}
                    alt="model"
                    onClick={() => {
                      setModelShown(false);
                      setMainImage(image);
                    }}
                  />
                ))}
              </div>
            </div>
            <div className={styles["model-info"]}>
              <div className={styles["model-header"]}>
                <div className={styles["model-name"]}>
                  <h2>{model.name}</h2>
                  <div className={styles["model-administration-buttons"]}>
                    <button
                      className={styles["model-administration-buttons-edit"]}
                      onClick={handleEditModel}
                    >
                      <EditIcon /> Edit
                    </button>
                    <button
                      className={styles["model-administration-buttons-delete"]}
                      onClick={handleDeleteModel}
                    >
                      <DeleteIcon /> Delete
                    </button>
                    <button
                      className={styles["model-administration-buttons-feature"]}
                      onClick={handleFeatureModel}
                    >
                      <RibbonIcon /> Feature
                    </button>
                  </div>
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
              <div className={styles["model-download-like-comment"]}>
                <Link to={model.files[0]}>
                  <button onClick={handleDownload}>
                    <DownloadIcon /> Download
                  </button>
                </Link>
                <button onClick={handleLikeModel}>
                  <LikesIcon /> Like
                </button>
                <button onClick={scrollToComments}>
                  <CommentsIcon /> Comment
                </button>
              </div>
            </div>
          </div>
          <div className={styles["model-comments"]}>
            <h4>Comments</h4>
            {model.comments.length ? (
              <div className={styles["model-comments-list"]}>
                {[...modelComments].map((comment) => (
                  <Comment key={comment._id} comment={comment} />
                ))}
              </div>
            ) : (
              <h4>No comments yet.</h4>
            )}
            <form className={formStyles["form"]} onSubmit={handleAddComment}>
              <label htmlFor="comment">Add comment</label>
              <textarea
                name="comment"
                id="comment"
                cols="30"
                rows="10"
                placeholder="Comment the model"
                ref={comment}
                required
              ></textarea>
              <input type="submit" value="Comment" />
            </form>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Model;
