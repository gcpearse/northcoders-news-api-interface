import { useContext, useState } from "react";
import { formatWord, lengthenDate } from "../../../utils/formatting-utils";
import { UserContext } from "../../../contexts/UserContext";
import { deleteComment } from "../../../utils/api-utils";

const Comment = ({ comment, toggle, setToggle }) => {

  const { user } = useContext(UserContext);
  const [error, setError] = useState(null);

  const handleDelete = () => {
    if (user === comment.author) {
      setError(null)
      deleteComment(comment.comment_id)
        .then(() => {
          setToggle(!toggle);
          console.log(toggle);
        })
        .catch(() => {
          setError("Oops! Something went wrong...")
        });
    }
  };

  return (
    <div id="comment">
      <p className="author">{comment.author}</p>
      <p className="timestamp">{comment.created_at.match(/\d{2}:\d{2}/)} on {lengthenDate(comment.created_at.match(/\d{4}-\d{2}-\d{2}/)[0])}</p>
      <p className="text-body">{comment.body}</p>
      <p id="comment-votes">{comment.votes} {formatWord(comment.votes)}</p>
      <div className="section-btns" id="comment-btns">
        {user === comment.author ? <button className="delete-comment-btn" onClick={handleDelete}>Delete</button> : <button disabled className="delete-comment-btn">Delete</button>}
        <div>
          <button className="vote-btn upvote-btn">+</button>
          <button className="vote-btn downvote-btn">-</button>
        </div>
      </div>
      {error ? <p className="error">{error}</p> : null}
    </div>
  );
};

export default Comment;
