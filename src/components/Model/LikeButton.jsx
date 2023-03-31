import { LikesIcon } from "../Icons/Icons";

function LikeButton({ onClick }) {
  return (
    <button onClick={onClick}>
      <LikesIcon /> Like
    </button>
  );
}

export default LikeButton;
