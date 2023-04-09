import { useRef, useContext, useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  MODEL_NAME_MIN_LENGTH,
  validateModelName,
  validateModelDescription,
  MODEL_DESCRIPTION_MAX_LENGTH,
} from "../../utils/validators";
import styles from "../../styles/Form.module.css";
import AuthContext from "../../contexts/Auth";
import ToastContext from "../../contexts/Toast";
import RequestSender from "../../utils/RequestSender";

function EditModel() {
  const authContext = useContext(AuthContext);
  const userId = authContext.userId;
  const toastContext = useContext(ToastContext);
  const showToast = toastContext.showToast;
  const modelId = useParams().id;
  const modelName = useRef();
  const modelDescription = useRef();
  const [modelNameInitialValue, setModelNameInitialValue] = useState("");
  const [modelDescriptionInitialValue, setModelDescriptionInitialValue] =
    useState("");
  const [isValidModelName, setIsValidModelName] = useState(true);
  const [isValidModelDescription, setIsValidModelDescription] = useState(true);
  const navigate = useNavigate();
  const getInitialValues = useCallback(async () => {
    const requestSender = new RequestSender();
    const result = await requestSender.get(`/models/${modelId}`);
    setModelNameInitialValue(result.name);
    setModelDescriptionInitialValue(result.description);
  }, [modelId]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      // Set basic model info.
      const formData = new FormData();
      formData.append("creatorId", userId);
      formData.append("modelName", modelName.current.value);
      formData.append("modelDescription", modelDescription.current.value);

      // Send request.
      const requestSender = new RequestSender();
      const result = await requestSender.post(`/models/${modelId}/edit`, {
        data: formData,
      });

      if (result.status) {
        return navigate(`/models/${modelId}`);
      }
    } catch (e) {
      showToast("Error.", e.message);
    }
  }

  function handleBackToModel() {
    navigate(`/models/${modelId}`);
  }

  useEffect(() => {
    getInitialValues();
  }, [getInitialValues]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "0.32rem",
          marginBottom: "1rem",
        }}
      >
        <h3>Edit model</h3>
        <button
          style={{
            border: "0.12rem solid red",
            background: "red",
            color: "white",
            padding: "0.12rem",
            cursor: "pointer",
            borderRadius: "0.32rem",
            fontWeight: "bold",
          }}
          onClick={handleBackToModel}
        >
          Back
        </button>
      </div>
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
          defaultValue={modelNameInitialValue}
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
        <label htmlFor="modelDescription">
          Description <small>(optional)</small>
        </label>
        <textarea
          name="modelDescription"
          id="modelDescription"
          ref={modelDescription}
          defaultValue={modelDescriptionInitialValue}
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
        <input type="submit" value="Edit" disabled={!isValidModelName} />
      </form>
    </div>
  );
}

export default EditModel;
