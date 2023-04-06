import { useRef, useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../../styles/Form.module.css";
import AuthContext from "../../contexts/Auth";
import RequestSender from "../../utils/RequestSender";

function EditModel() {
  const authContext = useContext(AuthContext);
  const userId = authContext.userId;
  const modelId = useParams().id;
  const modelName = useRef();
  const modelDescription = useRef();
  const [modelNameInitialValue, setModelNameInitialValue] = useState("");
  const [modelDescriptionInitialValue, setModelDescriptionInitialValue] =
    useState("");
  const navigate = useNavigate();
  const requestSender = new RequestSender();
  async function handleSubmit(e) {
    e.preventDefault();
    if (userId) {
      // Set basic model info.
      const formData = new FormData();
      formData.append("creatorId", userId);
      formData.append("modelName", modelName.current.value);
      formData.append("modelDescription", modelDescription.current.value);

      // Send request.
      const result = await requestSender.post(`/models/${modelId}/edit`, {
        data: formData,
      });

      if (result.status) {
        return navigate(`/models/${modelId}`);
      }
    }
  }
  async function getInitialValues() {
    const result = await requestSender.get(`/models/${modelId}`);
    setModelNameInitialValue(result.name);
    setModelDescriptionInitialValue(result.description);
  }
  function handleBackToModel() {
    navigate(`/models/${modelId}`);
  }
  useEffect(() => {
    getInitialValues();
  }, []);
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
          required
        />
        <label htmlFor="modelDescription">Description</label>
        <textarea
          name="modelDescription"
          id="modelDescription"
          ref={modelDescription}
          defaultValue={modelDescriptionInitialValue}
          cols="30"
          rows="10"
          maxLength="2000"
          placeholder="Describe your model here."
        ></textarea>
        <input type="submit" value="Edit" />
      </form>
    </div>
  );
}

export default EditModel;
