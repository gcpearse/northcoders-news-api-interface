import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getArticleById, patchArticleById } from "../../../utils/api-utils";
import { formatWord, lengthenDate } from "../../../utils/formatting-utils";
import Comments from "./Comments";
import CommentViewer from "./CommentViewer";
import { UserContext } from "../../../contexts/UserContext";
import Error from "../../Error";

const SingleArticle = () => {

  const timeRegex = /\d{2}:\d{2}/;
  const yearRegex = /\d{4}-\d{2}-\d{2}/;

  const { article_id } = useParams();

  const { user } = useContext(UserContext);

  const [singleArticle, setSingleArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [error, setError] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    getArticleById((article_id))
      .then(({ article }) => {
        setSingleArticle(article);
        setIsLoading(false);
      })
      .catch((err) => {
        setApiError(err.message);
        setIsLoading(false);
        setIsError(true);
      });
  }, [toggle]);

  const handleUpvote = () => {
    if (user) {
      setSingleArticle((currentArticle) => {
        return { ...currentArticle, votes: currentArticle.votes + 1 };
      });
      setError(null);
      patchArticleById(singleArticle.article_id, {
        "inc_votes": 1
      })
        .catch(() => {
          setError("Oops! Something went wrong...");
          setSingleArticle((currentArticle) => {
            return { ...currentArticle, votes: currentArticle.votes - 1 };
          });
        });
    } else {
      setError("You must be logged in to vote.");
    }
  };

  const handleDownvote = () => {
    if (user) {
      setSingleArticle((currentArticle) => {
        return { ...currentArticle, votes: currentArticle.votes - 1 };
      });
      setError(null);
      patchArticleById(singleArticle.article_id, {
        "inc_votes": -1
      })
        .catch(() => {
          setError("Oops! Something went wrong...");
          setSingleArticle((currentArticle) => {
            return { ...currentArticle, votes: currentArticle.votes + 1 };
          });
        });;
    } else {
      setError("You must be logged in to vote.");
    }
  };

  if (isLoading) return <p>Loading content...</p>;
  if (isError) return <Error message={apiError} />;

  return (
    <section>
      <div id="single-article">
        <p className="article-topic">
          <span className="topic-keyword">
            {singleArticle.topic[0].toUpperCase() + singleArticle.topic.slice(1).toLowerCase()}
          </span>
        </p>
        <h2 className="article-title">{singleArticle.title}</h2>
        <p className="timestamp">
          {singleArticle.created_at.match(timeRegex)} on {lengthenDate(singleArticle.created_at.match(yearRegex)[0])}
        </p>
        <Link className="username-link" to={`/users/${singleArticle.author}`}>
          <p className="author">{singleArticle.author}</p>
        </Link>
        <p className="text-body">{singleArticle.body}</p>
        <div className="count-container">
          <p id="single-article-comments" onClick={() => setShowComments(!showComments)}>
            {singleArticle.comment_count} comments
          </p>
          <p>
            {singleArticle.votes} {formatWord(singleArticle.votes)}
          </p>
        </div>
        {error ? <p className="error">{error}</p> : null}
        <div className="section-btns" id="single-article-btns">
          <button className="grey-btn" onClick={() => {
            setShowComments(!showComments);
          }}>{showComments ? "Hide comments" : "Show comments"}</button>
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
        <CommentViewer showComments={showComments}>
          <Comments article_id={article_id} toggle={toggle} setToggle={setToggle} />
        </CommentViewer>
      </div>
      <Link to="/news">
        <button className="site-nav-btn">Back to News</button>
      </Link>
    </section>
  );
};

export default SingleArticle;
