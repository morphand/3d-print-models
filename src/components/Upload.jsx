import { useRef, useState } from "react";
import styles from "../styles/Form.module.css";

function Upload({ userId }) {
  const [filesSelected, setFilesSelected] = useState(null);
  const modelName = useRef();
  const modelDescription = useRef();
  function handleSubmit(e) {
    if (userId) {
      e.preventDefault();
      const formData = new FormData();
      formData.append(
        "modelInfo",
        JSON.stringify({
          creatorId: userId,
          modelName: modelName.current.value,
          modelDescription: modelDescription.current.value,
        })
      );
      [...filesSelected].forEach((file, i) =>
        formData.append(`file-${i}`, file, file.name)
      );
      fetch(`http://localhost:5000/api/user/${userId}/upload`, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
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
          maxLength="100"
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
          placeholder="Describe your model here."
        ></textarea>
        <label htmlFor="model">Files (allowed file formats: STL/OBJ/3MF)</label>
        <input
          type="file"
          name="model"
          id="model"
          onChange={(e) => {
            setFilesSelected(e.target.files);
          }}
        />
        <input type="submit" value="Upload" />
      </form>
    </div>
  );
}

export default Upload;
