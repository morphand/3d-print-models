import { RibbonIcon } from "../../Icons/Icons";
import styles from "../../../styles/Model.module.css";

function RemoveFeatureButton({ onClick, disabled }) {
  return (
    <button
      className={styles["model-administration-buttons-remove-feature"]}
      onClick={onClick}
      disabled={disabled}
    >
      <RibbonIcon /> Remove feature
    </button>
  );
}

export default RemoveFeatureButton;
