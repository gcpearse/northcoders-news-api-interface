import { formatWord, lengthenDate } from "../../../utils/formatting-utils";

const Comment = ({ comment }) => {
  return (
    <div className="comment">
      <p className="comment-author">{comment.author}</p>
      <p className="comment-time">{comment.created_at.match(/\d{2}:\d{2}/)} on {lengthenDate(comment.created_at.match(/\d{4}-\d{2}-\d{2}/)[0])}</p>
      <p className="comment-body">{comment.body}</p>
      <p className="comment-votes">{comment.votes} {formatWord(comment.votes)}</p>
      <div className="comment-btns">
        <button>Delete comment</button>
        <div>
          <button>+</button>
          <button>-</button>
        </div>
      </div>
    </div>
  );
};

export default Comment;
