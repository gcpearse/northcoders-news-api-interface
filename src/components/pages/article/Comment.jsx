import { useContext, useState } from "react";
import { formatWord, lengthenDate } from "../../../utils/formatting-utils";
import { UserContext } from "../../../contexts/UserContext";
import { deleteComment, patchCommentById } from "../../../utils/api-utils";
import { Link } from "react-router-dom";

const Comment = ({ comment, toggle, setToggle, setComments }) => {

  const timeRegex = /\d{2}:\d{2}/;
  const yearRegex = /\d{4}-\d{2}-\d{2}/;

  const { user } = useContext(UserContext);

  const [error, setError] = useState(null);

  const handleDelete = () => {
    let index = 0;
    if (user === comment.author) {
      setComments((currentComments) => {
        index = currentComments.indexOf(comment);
        return [...currentComments].filter((currentComment) => {
          return currentComment.comment_id !== comment.comment_id;
        });
      });
      deleteComment(comment.comment_id)
        .then(() => {
          setToggle(!toggle);
        })
        .catch(() => {
          setComments((currentComments) => {
            const copy = [...currentComments];
            copy.splice(index, 0, comment);
            copy[index].error = "Oops! something went wrong";
            return copy;
          });
        });
    }
  };

  const handleUpvote = () => {
    if (user) {
      setComments((currentComments) => {
        const updatedComments = currentComments.map((currentComment) => {
          if (currentComment.comment_id === comment.comment_id) {
            return { ...currentComment, votes: currentComment.votes + 1 };
          }
          return currentComment;
        });
        return updatedComments;
      });
      setError(null);
      patchCommentById(comment.comment_id, {
        "inc_votes": 1
      })
        .catch(() => {
          setError("Oops! Something went wrong...");
          setComments((currentComments) => {
            const updatedComments = currentComments.map((currentComment) => {
              if (currentComment.comment_id === comment.comment_id) {
                return { ...currentComment, votes: currentComment.votes - 1 };
              }
              return currentComment;
            });
            return updatedComments;
          });
        });
    } else {
      setError("You must be logged in to vote.");
    }
  };

  const handleDownvote = () => {
    if (user) {
      setComments((currentComments) => {
        const updatedComments = currentComments.map((currentComment) => {
          if (currentComment.comment_id === comment.comment_id) {
            return { ...currentComment, votes: currentComment.votes - 1 };
          }
          return currentComment;
        });
        return updatedComments;
      });
      setError(null);
      patchCommentById(comment.comment_id, {
        "inc_votes": -1
      })
        .catch(() => {
          setError("Oops! Something went wrong...");
          setComments((currentComments) => {
            const updatedComments = currentComments.map((currentComment) => {
              if (currentComment.comment_id === comment.comment_id) {
                return { ...currentComment, votes: currentComment.votes + 1 };
              }
              return currentComment;
            });
            return updatedComments;
          });
        });
    } else {
      setError("You must be logged in to vote.");
    }
  };

  return (
    <div id="comment">
      <Link className="username-link" to={`/users/${comment.author}`}>
        <p className="author">{comment.author}</p>
      </Link>
      <p className="timestamp">
        {comment.created_at.match(timeRegex)} on {lengthenDate(comment.created_at.match(yearRegex)[0])}
      </p>
      <p className="text-body">{comment.body}</p>
      <p id="comment-votes">{comment.votes} {formatWord(comment.votes)}</p>
      <div className="section-btns" id="comment-btns">
        {user === comment.author ? <button className="delete-comment-btn" onClick={handleDelete}>
          Delete
        </button> : <button disabled className="delete-comment-btn">
          Delete
        </button>}
        <div>
          <button
            className="vote-btn upvote-btn"
            onClick={handleUpvote}
            onBlur={() => setError(null)}>
            +
          </button>
          <button
            className="vote-btn downvote-btn"
            onClick={handleDownvote}
            onBlur={() => setError(null)}>
            -
          </button>
        </div>
      </div>
      {error ? <p className="error">{error}</p> : null}
      <p className="error">{comment.error}</p>
    </div>
  );
};

export default Comment;
