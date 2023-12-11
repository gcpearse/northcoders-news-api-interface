import { useEffect, useState } from "react";
import Comment from "./Comment";
import { getCommentsByArticleId } from "../../../utils/api-utils";

const Comments = ({ article_id }) => {

  const [comments, setComments] = useState([]);
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
  }, [article_id]);

  if (isLoading) return <p>Loading content...</p>;
  if (isError) return <p>Oops! Something went wrong...</p>;

  console.log(comments);

  return (
    <section>
      <h3 id="comments-header">Comments</h3>
      <ul>
        {comments.map((comment) => {
          return <Comment key={comment.comment_id} comment={comment} />;
        })}
      </ul>
    </section>
  );
};

export default Comments;
