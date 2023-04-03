import { DeleteIcon } from "../../Icons/Icons";
import styles from "../../../styles/Model.module.css";

function DeleteModelButton({ onClick }) {
  return (
    <button
      className={styles["model-administration-buttons-delete"]}
      onClick={onClick}
    >
      <DeleteIcon /> Delete
    </button>
  );
}

export default DeleteModelButton;
