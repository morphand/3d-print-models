import { render, screen } from "@testing-library/react";
import CommentsList from "./CommentsList";

test("renders comment list with a sample comment", () => {
  const comment = (
    <span className="Model_model-comments-list-single-comment-content__o4k8b">
      sample comment
    </span>
  );
  render(<CommentsList>{comment}</CommentsList>);
  const commentElement = screen.getByText(/sample/i);
  expect(commentElement).toBeInTheDocument();
});
