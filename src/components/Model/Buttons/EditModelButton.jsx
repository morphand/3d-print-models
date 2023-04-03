import { Link } from "react-router-dom";
import { EditIcon } from "../../Icons/Icons";
import styles from "../../../styles/Model.module.css";

function EditModelButton({ modelId }) {
  return (
    <Link to={`/models/${modelId}/edit`}>
      <button className={styles["model-administration-buttons-edit"]}>
        <EditIcon /> Edit
      </button>
    </Link>
  );
}

export default EditModelButton;
