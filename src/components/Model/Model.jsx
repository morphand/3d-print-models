import { useEffect, useState, useRef, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
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
import LikeButton from "./LikeButton";
import DislikeButton from "./DislikeButton";
import { numberFormatter } from "../../utils/formatters";
import styles from "../../styles/Model.module.css";
import formStyles from "../../styles/Form.module.css";
import DownloadButton from "./DownloadButton";
import CommentsButton from "./CommentsButton";
import AuthContext from "../../contexts/Auth";

function Model() {
  const authContext = useContext(AuthContext);
  const userId = authContext.userId;
  const username = authContext.username;
  const isUserLoggedIn = authContext.isUserLoggedIn;
  const isUserAdmin = authContext.isUserAdmin;
  const modelId = useParams().id;
  const [model, setModel] = useState(null);
  const [modelComments, setModelComments] = useState([]);
  const [isFeaturedModel, setIsFeaturedModel] = useState(false);
  const [modelLikes, setModelLikes] = useState(0);
  const [modelCommentsCount, setModelCommentsCount] = useState(0);
  const [modelDownloadsCount, setModelDownloadsCount] = useState(0);
  const [userLikedModel, setUserLikedModel] = useState(false);
  const [mainImage, setMainImage] = useState("");
  const [modelShown, setModelShown] = useState(false);
  const [isUserCreator, setIsUserCreator] = useState(false);
  const comment = useRef("");
  const navigate = useNavigate();
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
        setModelLikes(res.likesCount);
        setUserLikedModel([...res.usersLikedModel].includes(userId));
        setIsUserCreator(res.creator._id.toString() === userId);
        setIsFeaturedModel(res.isFeatured);
        setModelCommentsCount(res.comments.length);
        setModelDownloadsCount(res.downloadsCount);
      })
      .catch((e) => console.log(e));
  }, [modelId, userId]);
  function handleDownloadModel() {
    fetch(model.files[0])
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Bad server response");
        }
        return res.blob();
      })
      .then((data) => {
        const url = window.URL.createObjectURL(data);
        const anchor = document.createElement("a");
        const filePath = model.files[0].split("/");
        const fileName = filePath[filePath.length - 1];
        anchor.href = url;
        anchor.download = fileName;
        anchor.click();

        window.URL.revokeObjectURL(url);
        document.body.appendChild(anchor);
        document.body.removeChild(anchor);
      })
      .catch((err) => console.error(err));

    fetch(`http://localhost:5000/api/models/${modelId}/download`, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then((res) => {
        setModelDownloadsCount((downloadsCount) => downloadsCount + 1);
        console.log(res);
      })
      .catch((e) => console.log(e));

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
    fetch(`http://localhost:5000/api/models/${modelId}/like/add`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        setModelLikes((likes) => likes + 1);
        setUserLikedModel(true);
      })
      .catch((e) => console.log(e));
  }
  function handleDislikeModel() {
    console.log(modelId);
    const formData = new FormData();
    formData.append("userId", userId);
    fetch(`http://localhost:5000/api/models/${modelId}/like/remove`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        setModelLikes((likes) => likes - 1);
        setUserLikedModel(false);
      })
      .catch((e) => console.log(e));
  }
  function handleDeleteModel() {
    const confirmModelDelete = prompt(
      `Are you sure you want to delete this model? Enter "${model.name}" to confirm.`
    );
    if (confirmModelDelete === model.name) {
      const formData = new FormData();
      formData.append("userId", userId);
      fetch(`http://localhost:5000/api/models/${modelId}`, {
        method: "DELETE",
        body: formData,
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.status) {
            navigate("/models");
          } else {
            // Show toast
            console.log(res);
            console.log(res.errors);
          }
        })
        .catch((e) => console.log(e));
    }
  }
  function handleFeatureModel() {
    console.log(modelId);
    const formData = new FormData();
    formData.append("userId", userId);
    fetch(`http://localhost:5000/api/models/${modelId}/feature/add`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res, res.status);
        if (res.status) {
          setIsFeaturedModel(true);
        } else {
          // Show toast
          console.log(res.errors);
        }
      })
      .catch((e) => console.log(e));
  }
  function handleRemoveFeatureModel() {
    console.log(modelId);
    const formData = new FormData();
    formData.append("userId", userId);
    fetch(`http://localhost:5000/api/models/${modelId}/feature/remove`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res, res.status);
        if (res.status) {
          setIsFeaturedModel(false);
        } else {
          // Show toast
          console.log(res.errors);
        }
      })
      .catch((e) => console.log(e));
  }
  function scrollToComments() {
    comment.current.scrollIntoView({ behavior: "smooth" });
  }
  async function getModelComments() {
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
        setModelCommentsCount((commentsCount) => commentsCount + 1);
        comment.current.value = "";
      })
      .catch((e) => console.log(e));
  }
  function handleDeleteComment(e, comment) {
    const commentId = comment._id;
    const creatorId = comment.creatorId;
    const modelCommented = comment.modelCommented;
    const formData = new FormData();
    formData.append("commentId", commentId);
    formData.append("isUserAdmin", isUserAdmin);
    fetch(`http://localhost:5000/api/models/${modelId}/comments`, {
      method: "DELETE",
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        getModelComments();
        setModelCommentsCount((commentsCount) => commentsCount - 1);
      })
      .catch((e) => console.log(e));
    console.log(
      modelId,
      e,
      comment,
      commentId,
      creatorId,
      modelCommented,
      authContext.token
    );
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
                  {(isUserCreator || isUserAdmin) && (
                    <div className={styles["model-administration-buttons"]}>
                      <Link to={`/models/${modelId}/edit`}>
                        <button
                          className={
                            styles["model-administration-buttons-edit"]
                          }
                        >
                          <EditIcon /> Edit
                        </button>
                      </Link>
                      <button
                        className={
                          styles["model-administration-buttons-delete"]
                        }
                        onClick={handleDeleteModel}
                      >
                        <DeleteIcon /> Delete
                      </button>
                      {isUserAdmin && (
                        <>
                          <button
                            className={
                              styles["model-administration-buttons-feature"]
                            }
                            disabled={isFeaturedModel}
                            onClick={handleFeatureModel}
                          >
                            <RibbonIcon /> Feature
                          </button>
                          <button
                            className={
                              styles[
                                "model-administration-buttons-remove-feature"
                              ]
                            }
                            disabled={!isFeaturedModel}
                            onClick={handleRemoveFeatureModel}
                          >
                            <RibbonIcon /> Remove feature
                          </button>
                        </>
                      )}
                    </div>
                  )}
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
              {isFeaturedModel && (
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
                  <span>{numberFormatter(modelDownloadsCount)}</span>
                </div>
                <div className={styles["model-statistics-likes-count"]}>
                  <LikesIcon />
                  <span>
                    <small>Likes</small>
                  </span>
                  <span>{numberFormatter(modelLikes)}</span>
                </div>
                <div className={styles["model-statistics-comments-count"]}>
                  <CommentsIcon />
                  <span>
                    <small>Comments</small>
                  </span>
                  <span>{numberFormatter(modelCommentsCount)}</span>
                </div>
              </div>
              <div className={styles["model-download-like-comment"]}>
                <DownloadButton onClick={handleDownloadModel} />
                {isUserLoggedIn && (
                  <>
                    {!userLikedModel ? (
                      <LikeButton onClick={handleLikeModel} />
                    ) : (
                      <DislikeButton onClick={handleDislikeModel} />
                    )}
                    <CommentsButton onClick={scrollToComments} />
                  </>
                )}
              </div>
            </div>
          </div>
          <div className={styles["model-comments"]}>
            <h4>Comments</h4>
            {model.comments && (
              <div className={styles["model-comments-list"]}>
                {[...modelComments].map((comment) => (
                  <Comment
                    key={comment._id}
                    comment={comment}
                    onClick={handleDeleteComment}
                  />
                ))}
              </div>
            )}
            {isUserLoggedIn && (
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
            )}
          </div>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Model;
