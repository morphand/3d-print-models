import { useState } from "react";
import styles from "../styles/Form.module.css";

function Upload({ userId }) {
  const [filesSelected, setFilesSelected] = useState(null);
  function handleSubmit(e) {
    if (userId) {
      e.preventDefault();
      const formData = new FormData();
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
      <form
        method="POST"
        encType="multipart/form-data"
        className={styles["form"]}
        onSubmit={(e) => handleSubmit(e)}
      >
        <label htmlFor="modelName">Model name</label>
        <input type="text" name="modelName" id="modelName" />
        <input
          type="file"
          name="model"
          id="model"
          onChange={(e) => {
            setFilesSelected(e.target.files);
          }}
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default Upload;
