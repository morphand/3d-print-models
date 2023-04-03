import { forwardRef } from "react";
import formStyles from "../../../styles/Form.module.css";

const AddCommentForm = forwardRef(function AddCommentForm({ onSubmit }, ref) {
  return <form className={formStyles["form"]} onSubmit={onSubmit}>
    <label htmlFor="comment">Add comment</label>
    <textarea
      name="comment"
      id="comment"
      cols="30"
      rows="10"
      placeholder="Comment the model"
      ref={ref}
      required
    ></textarea>
    <input type="submit" value="Comment" />
  </form>;
});

export default AddCommentForm;
