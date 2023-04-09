import { useEffect, useState, useRef, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { StlViewer } from "react-stl-viewer";
import Loading from "../Loading/Loading";
import { RibbonIcon } from "../Icons/Icons";
import Comment from "./Comment";
import LikeButton from "./Buttons/LikeButton";
import DislikeButton from "./Buttons/DislikeButton";
import styles from "../../styles/Model.module.css";
import DownloadButton from "./Buttons/DownloadButton";
import CommentsButton from "./Buttons/CommentsButton";
import ModelStatistics from "./ModelStatistics";
import AuthContext from "../../contexts/Auth";
import RequestSender from "../../utils/RequestSender";
import AddCommentForm from "./Forms/AddCommentForm";
import CommentsList from "./CommentsList";
import FeatureButton from "./Buttons/FeatureButton";
import RemoveFeatureButton from "./Buttons/RemoveFeatureButton";
import DeleteModelButton from "./Buttons/DeleteModelButton";
import EditModelButton from "./Buttons/EditModelButton";
import { dateFormatter } from "../../utils/formatters";
import ToastContext from "../../contexts/Toast";

function Model() {
  const authContext = useContext(AuthContext);
  const userId = authContext.userId;
  const username = authContext.username;
  const isUserLoggedIn = authContext.isUserLoggedIn;
  const isUserAdmin = authContext.isUserAdmin;
  const toastContext = useContext(ToastContext);
  const showToast = toastContext.showToast;
  const modelId = useParams().id;
  const [model, setModel] = useState(null);
  const [modelComments, setModelComments] = useState([]);
  const [isFeaturedModel, setIsFeaturedModel] = useState(false);
  const [modelDateUploaded, setModelDateUploaded] = useState(null);
  const [modelDateLastModified, setmodelDateLastModified] = useState(null);
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
        setModelDateUploaded(res.dateUploaded);
        setmodelDateLastModified(res.dateLastModified);
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
    try {
      await requestSender.post(`/models/${modelId}/like/add`);
      setModelLikes((likes) => likes + 1);
      setUserLikedModel(true);
    } catch (e) {
      showToast("Error.", e.message);
    }
  }
  async function handleDislikeModel() {
    try {
      await requestSender.post(`/models/${modelId}/like/remove`);
      setModelLikes((likes) => likes - 1);
      setUserLikedModel(false);
    } catch (e) {
      showToast("Error.", e.message);
    }
  }
  async function handleDeleteModel() {
    const confirmModelDelete = prompt(
      `Are you sure you want to delete this model? Enter "${model.name}" to confirm.`
    );
    if (confirmModelDelete === model.name) {
      try {
        const result = await requestSender.delete(`/models/${modelId}`);
        if (result.status) {
          navigate("/models");
        }
      } catch (e) {
        showToast("Error.", e.message);
      }
    }
  }
  async function handleFeatureModel() {
    try {
      const result = await requestSender.post(`/models/${modelId}/feature/add`);
      if (result.status) {
        setIsFeaturedModel(true);
      }
    } catch (e) {
      showToast("Error.", e.message);
    }
  }
  async function handleRemoveFeatureModel() {
    try {
      const result = await requestSender.post(
        `/models/${modelId}/feature/remove`
      );
      if (result.status) {
        setIsFeaturedModel(false);
      }
    } catch (e) {
      showToast("Error.", e.message);
    }
  }
  function scrollToComments() {
    comment.current.scrollIntoView({ behavior: "smooth" });
  }
  async function getModelComments() {
    try {
      const res = await requestSender.get(`/models/${modelId}/comments`);
      setModelComments(res.comments);
    } catch (e) {
      showToast("Error.", e.message);
    }
  }
  async function handleAddComment(e) {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("comment", comment.current.value.trim());
      formData.append("creatorUsername", username);
      await requestSender.post(`/models/${modelId}/comments`, {
        data: formData,
      });
      getModelComments();
      setModelCommentsCount((commentsCount) => commentsCount + 1);
      comment.current.value = "";
    } catch (e) {
      showToast("Error.", e.message);
    }
  }
  async function handleDeleteComment(e, comment) {
    try {
      const commentId = comment._id;
      const formData = new FormData();
      formData.append("commentId", commentId);
      await requestSender.delete(`/models/${modelId}/comments`, {
        data: formData,
      });
      getModelComments();
      setModelCommentsCount((commentsCount) => commentsCount - 1);
    } catch (e) {
      showToast("Error.", e.message);
    }
  }

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
                      <EditModelButton modelId={modelId} />
                      <DeleteModelButton onClick={handleDeleteModel} />
                      {isUserAdmin && (
                        <>
                          <FeatureButton
                            onClick={handleFeatureModel}
                            disabled={isFeaturedModel}
                          />
                          <RemoveFeatureButton
                            onClick={handleRemoveFeatureModel}
                            disabled={!isFeaturedModel}
                          />
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
                    </Link>{" "}
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
              <div className={styles["model-uploaded-modified-at"]}>
                <small>Uploaded at {dateFormatter(modelDateUploaded)}</small>
                {modelDateLastModified && (
                  <small>
                    Modified at {dateFormatter(modelDateLastModified)}
                  </small>
                )}
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
              <CommentsList>
                {[...modelComments].map((comment) => (
                  <Comment
                    key={comment._id}
                    comment={comment}
                    onClick={handleDeleteComment}
                  />
                ))}
              </CommentsList>
            )}
            {isUserLoggedIn && (
              <AddCommentForm onSubmit={handleAddComment} ref={comment} />
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
