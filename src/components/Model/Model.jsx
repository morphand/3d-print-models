import { useEffect, useState, useRef, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { StlViewer } from "react-stl-viewer";
import Loading from "../Loading/Loading";
import {
  RibbonIcon,
  EditIcon,
  DeleteIcon,
} from "../Icons/Icons";
import Comment from "./Comment";
import LikeButton from "./Buttons/LikeButton";
import DislikeButton from "./Buttons/DislikeButton";
import styles from "../../styles/Model.module.css";
import formStyles from "../../styles/Form.module.css";
import DownloadButton from "./Buttons/DownloadButton";
import CommentsButton from "./Buttons/CommentsButton";
import ModelStatistics from "./ModelStatistics";
import AuthContext from "../../contexts/Auth";
import RequestSender from "../../utils/RequestSender";

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
  const requestSender = new RequestSender();

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
  async function handleDownloadModel() {
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

    await requestSender.put(`/models/${modelId}/download`);
    setModelDownloadsCount((downloadsCount) => downloadsCount + 1);
  }
  function handleViewModel() {
    setModelShown(true);
    setMainImage("");
  }
  async function handleLikeModel() {
    const formData = new FormData();
    formData.append("userId", userId);
    await requestSender.post(`/models/${modelId}/like/add`, {
      data: formData,
    });
    setModelLikes((likes) => likes + 1);
    setUserLikedModel(true);
  }
  async function handleDislikeModel() {
    const formData = new FormData();
    formData.append("userId", userId);
    await requestSender.post(`/models/${modelId}/like/remove`, {
      data: formData,
    });
    setModelLikes((likes) => likes - 1);
    setUserLikedModel(false);
  }
  async function handleDeleteModel() {
    const confirmModelDelete = prompt(
      `Are you sure you want to delete this model? Enter "${model.name}" to confirm.`
    );
    if (confirmModelDelete === model.name) {
      const formData = new FormData();
      formData.append("userId", userId);
      const result = await requestSender.delete(`/models/${modelId}`, {
        data: formData,
      });
      if (result.status) {
        navigate("/models");
      } else {
        // Show toast
        console.log(result);
        console.log(result.errors);
      }
    }
  }
  async function handleFeatureModel() {
    const formData = new FormData();
    formData.append("userId", userId);
    const result = await requestSender.post(`/models/${modelId}/feature/add`, {
      data: formData,
    });
    if (result.status) {
      setIsFeaturedModel(true);
    } else {
      // Show toast
      console.log(result.errors);
    }
  }
  async function handleRemoveFeatureModel() {
    const formData = new FormData();
    formData.append("userId", userId);
    const result = await requestSender.post(
      `/models/${modelId}/feature/remove`,
      { data: formData }
    );
    if (result.status) {
      setIsFeaturedModel(false);
    } else {
      // Show toast
      console.log(result.errors);
    }
  }
  function scrollToComments() {
    comment.current.scrollIntoView({ behavior: "smooth" });
  }
  async function getModelComments() {
    const res = await requestSender.get(`/models/${modelId}/comments`);
    setModelComments(res.comments);
  }
  async function handleAddComment(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("comment", comment.current.value.trim());
    formData.append("creatorUsername", username);
    await requestSender.post(`/models/${modelId}/comments`, {
      data: formData,
    });
    getModelComments();
    setModelCommentsCount((commentsCount) => commentsCount + 1);
    comment.current.value = "";
  }
  async function handleDeleteComment(e, comment) {
    const commentId = comment._id;
    const formData = new FormData();
    formData.append("commentId", commentId);
    formData.append("isUserAdmin", isUserAdmin);
    await requestSender.delete(`/models/${modelId}/comments`, {
      data: formData,
    });
    getModelComments();
    setModelCommentsCount((commentsCount) => commentsCount - 1);
  }
  // console.log(model);
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
              <ModelStatistics
                downloadsCount={modelDownloadsCount}
                likesCount={modelLikes}
                commentsCount={modelCommentsCount}
              />
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
