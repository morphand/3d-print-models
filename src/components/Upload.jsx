import { useRef, useState } from "react";
import styles from "../styles/Form.module.css";
import { validateImage } from "../utils/validators";
import Toast from "./Toast";

function Upload({ userId }) {
  const [filesSelected, setFilesSelected] = useState(null);
  const [images, setImages] = useState(null);
  const [errors, setErrors] = useState(false);
  const [modelCreated, setModelCreated] = useState(false);
  const modelName = useRef();
  const modelDescription = useRef();
  function handleImages(images) {
    setErrors(false);
    [...images].forEach((image, i) => {
      if (!validateImage(image.name)) {
        setErrors(true);
      }
    });
    if (!errors) {
      setImages(images);
    }
  }
  function handleSubmit(e) {
    if (userId) {
      e.preventDefault();
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
        fetch(`http://localhost:5000/api/user/${userId}/upload`, {
          method: "POST",
          body: formData,
        })
          .then((res) => res.json())
          .then((res) => {
            setModelCreated(true);
          });
      }
    }
  }
  return (
    <div>
      <h3>Upload model</h3>
      {errors && (
        <Toast
          header="Invalid files."
          content="Some files contain invalid file extensions."
        />
      )}
      {modelCreated && (
        <Toast
          header="Model created."
          content="The model has been created successfully."
        />
      )}
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
          placeholder="Describe your model here."
        ></textarea>
        <label htmlFor="model">
          Model files (allowed file formats: STL/OBJ/3MF)
        </label>
        <input
          type="file"
          name="model"
          id="model"
          onChange={(e) => {
            setFilesSelected(e.target.files);
          }}
          required
        />
        <label htmlFor="modelImages">Model images</label>
        <input
          type="file"
          name="modelImages"
          id="modelImages"
          multiple
          onChange={(e) => handleImages(e.target.files)}
          required
        />
        <input type="submit" value="Upload" />
      </form>
    </div>
  );
}

export default Upload;
