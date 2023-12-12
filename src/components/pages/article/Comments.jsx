import { useContext, useEffect, useState } from "react";
import Comment from "./Comment";
import { getCommentsByArticleId, postComment } from "../../../utils/api-utils";
import { UserContext } from "../../../contexts/UserContext";

const Comments = ({ article_id }) => {

  const [comments, setComments] = useState([]);
  const [input, setInput] = useState("");
  const { user } = useContext(UserContext);
  const [newComment, setNewComment] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getCommentsByArticleId(article_id)
      .then(({ comments }) => {
        setComments(comments);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        setIsError(true);
      });
  }, [newComment]);

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (user && input) {
      const body = {
        "username": user,
        "body": input
      };
      postComment(article_id, body)
        .then(({ comment }) => {
          setNewComment(comment);
        });
    }
    setInput("");
  };

  const handleClear = () => {
    setInput("");
  };

  if (isLoading) return <p>Loading content...</p>;
  if (isError) return <p>Oops! Something went wrong...</p>;

  console.log(comments);

  return (
    <section>
      <h3 id="comments-header">Comments</h3>
      <div>
        <form id="new-comment-form" onSubmit={handleSubmit}>
          <textarea
            name="new-comment"
            id="new-comment"
            placeholder={"Add a comment..."}
            value={input}
            onChange={handleChange}></textarea>
          <div className="section-btns">
            <button type="submit" className="grey-btn">Submit</button>
            <button type="button" className="grey-btn" onClick={handleClear}>Clear</button>
          </div>
        </form>
      </div>
      <ul>
        {comments.map((comment) => {
          return <Comment key={comment.comment_id} comment={comment} />;
        })}
      </ul>
    </section>
  );
};

export default Comments;
