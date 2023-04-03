import { RibbonIcon } from "../../Icons/Icons";
import styles from "../../../styles/Model.module.css";

function FeatureButton({ onClick, disabled }) {
  return (
    <button
      className={styles["model-administration-buttons-feature"]}
      disabled={disabled}
      onClick={onClick}
    >
      <RibbonIcon /> Feature
    </button>
  );
}

export default FeatureButton;
