import { CommentsIcon } from "../../Icons/Icons";

function CommentsButton({ onClick }) {
  return (
    <button onClick={onClick}>
      <CommentsIcon /> Comment
    </button>
  );
}

export default CommentsButton;
