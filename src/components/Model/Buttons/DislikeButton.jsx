import { DislikeIcon } from "../../Icons/Icons";

function DislikeButton({ onClick }) {
  return (
    <button onClick={onClick}>
      <DislikeIcon /> Dislike
    </button>
  );
}

export default DislikeButton;
