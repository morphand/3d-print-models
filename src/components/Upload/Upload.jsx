import { useRef, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/Form.module.css";
import {
  MODEL_NAME_MIN_LENGTH,
  validateModelName,
  validateModelDescription,
  validateImage,
  validateModelFilename,
  MODEL_DESCRIPTION_MAX_LENGTH,
} from "../../utils/validators";
import AuthContext from "../../contexts/Auth";
import ToastContext from "../../contexts/Toast";
import RequestSender from "../../utils/RequestSender";

function Upload() {
  const authContext = useContext(AuthContext);
  const userId = authContext.userId;
  const toastContext = useContext(ToastContext);
  const showToast = toastContext.showToast;
  const [filesSelected, setFilesSelected] = useState(null);
  const [images, setImages] = useState(null);
  const [errors, setErrors] = useState(true);
  const [isValidModelName, setIsValidModelName] = useState(false);
  const [isValidModelDescription, setIsValidModelDescription] = useState(true);
  const modelName = useRef();
  const modelDescription = useRef();
  const navigate = useNavigate();
  const isUploadButtonDisabled =
    errors || !images || !filesSelected || !isValidModelName;

  function handleImages(images) {
    let hasInvalidImages = false;
    let error = "Invalid file names.";
    const description = [];
    [...images].forEach((image, i) => {
      if (!validateImage(image.name)) {
        hasInvalidImages = true;
        description.push(`${image.name} contains invalid file extension.`);
      }
    });
    if (hasInvalidImages) {
      setErrors(true);
      return showToast(error, description.join(" "));
    }
    setErrors(false);
    return setImages(images);
  }

  function handleFiles(files) {
    let hasInvalidFiles = false;
    let error = "Invalid file names.";
    const description = [];
    [...files].forEach((file, i) => {
      if (!validateModelFilename(file.name)) {
        hasInvalidFiles = true;
        description.push(`${file.name} contains invalid file extension.`);
      }
    });
    if (hasInvalidFiles) {
      setErrors(true);
      return showToast(error, description.join(" "));
    }
    setErrors(false);
    return setFilesSelected(files);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();

    // Set basic model info.
    formData.append("creatorId", userId);
    formData.append("modelName", modelName.current.value);
    formData.append("modelDescription", modelDescription.current.value);

    // Add the model files to the form data.
    [...filesSelected].forEach((file, i) => {
      formData.append(`file-${i}`, file, file.name);
    });

    // Add the images to the form data.
    [...images].forEach((image, i) => {
      formData.append(`image-${i}`, image, image.name);
    });

    // Send request.
    if (!errors) {
      const requestSender = new RequestSender();
      const result = await requestSender.post(`/user/${userId}/upload`, {
        data: formData,
      });
      const modelId = result.value._id;
      showToast("Model created", `${result.value.name} created successfully.`);
      navigate(`/models/${modelId}`);
    }
  }

  return (
    <div>
      <h3>Upload model</h3>
      <form
        method="POST"
        encType="multipart/form-data"
        className={styles["form"]}
        onSubmit={(e) => handleSubmit(e)}
      >
        <label htmlFor="modelName">Name</label>
        <input
          type="text"
          name="modelName"
          id="modelName"
          ref={modelName}
          minLength="2"
          maxLength="45"
          placeholder="The name of your model."
          onChange={(e) => {
            validateModelName(e.target.value)
              ? setIsValidModelName(true)
              : setIsValidModelName(false);
          }}
          required
        />
        {!isValidModelName && (
          <p className={styles["error-text"]}>
            <small>
              The model name should be atleast {MODEL_NAME_MIN_LENGTH}{" "}
              characters long.
            </small>
          </p>
        )}
        <label htmlFor="modelDescription">Description <small>(optional)</small></label>
        <textarea
          name="modelDescription"
          id="modelDescription"
          ref={modelDescription}
          cols="30"
          rows="10"
          maxLength="2000"
          placeholder="Describe your model here."
          onChange={(e) => {
            validateModelDescription(e.target.value)
              ? setIsValidModelDescription(true)
              : setIsValidModelDescription(false);
          }}
        ></textarea>
        {!isValidModelDescription && (
          <p className={styles["error-text"]}>
            <small>
              The model name should be no more than{" "}
              {MODEL_DESCRIPTION_MAX_LENGTH} characters long.
            </small>
          </p>
        )}
        <label htmlFor="model">Model files (allowed file formats: STL)</label>
        <input
          type="file"
          name="model"
          id="model"
          onChange={(e) => {
            handleFiles(e.target.files);
          }}
          required
        />
        {!filesSelected && (
          <p className={styles["error-text"]}>
            <small>No file selected.</small>
          </p>
        )}
        <label htmlFor="modelImages">
          Model images (allowed file formats: JPG, JPEG, PNG, WEBP)
        </label>
        <input
          type="file"
          name="modelImages"
          id="modelImages"
          multiple
          onChange={(e) => handleImages(e.target.files)}
          required
        />
        {!images && (
          <p className={styles["error-text"]}>
            <small>No image selected.</small>
          </p>
        )}
        <input type="submit" value="Upload" disabled={isUploadButtonDisabled} />
      </form>
    </div>
  );
}

export default Upload;
