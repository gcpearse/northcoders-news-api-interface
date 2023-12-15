import { useContext, useEffect, useState } from "react";
import Comment from "./Comment";
import { getCommentsByArticleId, postComment } from "../../../utils/api-utils";
import { UserContext } from "../../../contexts/UserContext";

const Comments = ({ article_id, toggle, setToggle }) => {

  const { user } = useContext(UserContext);

  const [comments, setComments] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

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
  }, [toggle]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (user && input) {
      const body = {
        username: user,
        body: input
      };
      postComment(article_id, body)
        .then(() => {
          setError(null);
          setToggle(!toggle);
        })
        .catch(() => {
          setError("Oops! Something went wrong...");
        });
    } else {
      if (!user && input) setError("You must be logged in to leave a comment.");
      if (user && !input) setError("Input field may not be empty.");
      if (!user && !input) setError("You must be logged in to leave a comment. Input field may not be empty.");
    }
    setInput("");
  };

  if (isLoading) return <p>Loading content...</p>;
  if (isError) return <p>Oops! Something went wrong...</p>;

  return (
    <section>
      <h3 id="comments-header">Comments</h3>
      <div>
        <form
          id="new-comment-form"
          onSubmit={handleSubmit}
          onBlur={() => setError(null)}>
          <textarea
            name="new-comment"
            id="new-comment"
            placeholder={"Add a comment..."}
            value={input}
            onChange={(event) => setInput(event.target.value)}></textarea>
          <div className="section-btns">
            <button
              type="submit"
              className="grey-btn">
              Submit
            </button>
            <button
              type="button"
              className="grey-btn"
              onClick={() => setInput("")}>
              Clear
            </button>
          </div>
          {error ? <p className="error">{error}</p> : null}
        </form>
      </div>
      <ul>
        {comments.map((comment) => {
          return <Comment
            key={comment.comment_id}
            comment={comment} toggle={toggle}
            setToggle={setToggle}
            setComments={setComments} />;
        })}
      </ul>
    </section>
  );
};

export default Comments;
