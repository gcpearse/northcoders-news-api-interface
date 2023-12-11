import { formatWord, lengthenDate } from "../../../utils/formatting-utils";

const Comment = ({ comment }) => {
  return (
    <div id="comment">
      <p id="comment-author">{comment.author}</p>
      <p id="comment-time">{comment.created_at.match(/\d{2}:\d{2}/)} on {lengthenDate(comment.created_at.match(/\d{4}-\d{2}-\d{2}/)[0])}</p>
      <p id="comment-body">{comment.body}</p>
      <p id="comment-votes">{comment.votes} {formatWord(comment.votes)}</p>
      <div className="section-btns" id="comment-btns">
        <button id="delete-comment-btn">Delete comment</button>
        <div>
          <button className="vote-btn upvote-btn">+</button>
          <button className="vote-btn downvote-btn">-</button>
        </div>
      </div>
    </div>
  );
};

export default Comment;
