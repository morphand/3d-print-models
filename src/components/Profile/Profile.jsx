import { useContext, useEffect, useState, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import ModelCard from "../Model/ModelCard";
import { LikesIcon, UploadIcon } from "../Icons/Icons";
import styles from "../../styles/Profile.module.css";
import { numberFormatter } from "../../utils/formatters";
import AuthContext from "../../contexts/Auth";
import RequestSender from "../../utils/RequestSender";

function Profile() {
  const authContext = useContext(AuthContext);
  const currentUserId = authContext.userId;
  const isUserAdmin = authContext.isUserAdmin;
  const [user, setUser] = useState({});
  const [username, setUsername] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [uploadedModels, setUploadedModels] = useState([]);
  const [likedModels, setLikedModels] = useState([]);
  const userId = useParams().userId;
  const getUserModels = useCallback(async () => {
    const requestSender = new RequestSender();
    const result = await requestSender.get(`/user/${userId}/models`);
    setUploadedModels(result);
  }, [userId]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/user/${userId}`)
      .then((data) => data.json())
      .then((res) => {
        setUser(res);
        setUsername(res.username);
        setImageURL(res.imageURL);
        setLikedModels(res.likedModels);
        getUserModels();  
      })
      .catch((e) => console.log(e.message));
  }, [userId, getUserModels]);

  return (
    user && (
      <>
        <div className={styles["profile-wrapper"]}>
          <div className={styles["profile-image"]}>
            <img src={imageURL} alt="" />
          </div>
          <div className={styles["profile-details"]}>
            <div className={styles["profile-name"]}>
              <p>{username}</p>
              {(currentUserId === userId || isUserAdmin) && (
                <small>
                  <Link
                    to={`/profile/${userId}/edit`}
                    className={styles["edit-profile-link"]}
                  >
                    Edit profile
                  </Link>
                </small>
              )}
            </div>
            <div className={styles["profile-statistics"]}>
              <div className="profile-uploaded-count">
                <p>
                  <UploadIcon />
                  <span>{numberFormatter(uploadedModels.length)}</span>
                </p>
              </div>
              <div className="profile-favorite-count">
                <p>
                  <LikesIcon />
                  <span>{numberFormatter(likedModels.length)}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles["model-list"]}>
          {uploadedModels.length > 0 &&
            uploadedModels.map((model) => (
              <ModelCard key={model._id} model={model} />
            ))}
        </div>
      </>
    )
  );
}

export default Profile;
