import { useRef, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../../styles/Form.module.css";
import AuthContext from "../../contexts/Auth";

function EditModel() {
  const authContext = useContext(AuthContext);
  const userId = authContext.userId;
  const modelId = useParams().id;
  const modelName = useRef();
  const modelDescription = useRef();
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    if (userId) {
      const formData = new FormData();

      // Set basic model info.
      formData.append(
        "modelInfo",
        JSON.stringify({
          creatorId: userId,
          modelName: modelName.current.value,
          modelDescription: modelDescription.current.value,
        })
      );
      console.log(formData, modelId);
      // Send request.
        fetch(`http://localhost:5000/api/models/${modelId}/edit`, {
          method: "POST",
          body: formData,
        })
          .then((res) => res.json())
          .then((res) => {
            navigate(`/models/${modelId}`);
          });
    }
  }
  function handleBackToModel() {
    navigate(`/models/${modelId}`);
  }
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
