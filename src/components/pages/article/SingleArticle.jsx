import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getArticleById, patchArticleById } from "../../../utils/api-utils";
import { formatWord, lengthenDate } from "../../../utils/formatting-utils";
import Comments from "./Comments";
import CommentViewer from "./CommentViewer";

const SingleArticle = () => {

  const { article_id } = useParams();
  const [singleArticle, setSingleArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    getArticleById((article_id))
      .then(({ article }) => {
        setSingleArticle(article);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        setIsError(true);
      });
  }, [article_id]);

  const handleUpvote = () => {
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
  };

  const handleDownVote = () => {
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
  };

  if (isLoading) return <p>Loading content...</p>;
  if (isError) return <p>Oops! Something went wrong...</p>;

  return (
    <section>
      <div id="single-article">
        <p className="article-topic"><span className="topic-keyword">{singleArticle.topic[0].toUpperCase() + singleArticle.topic.slice(1).toLowerCase()}</span></p>
        <h2 className="article-title">{singleArticle.title}</h2>
        <p className="timestamp">{singleArticle.created_at.match(/\d{2}:\d{2}/)} on {lengthenDate(singleArticle.created_at.match(/\d{4}-\d{2}-\d{2}/)[0])}</p>
        <p className="author">{singleArticle.author}</p>
        <p className="text-body">{singleArticle.body}</p>
        <div className="count-container">
          <p>{singleArticle.comment_count} comments</p>
          <p>{singleArticle.votes} {formatWord(singleArticle.votes)}</p>
        </div>
        <div className="section-btns" id="single-article-btns">
          <button className="grey-btn" onClick={() => {
            setShowComments(!showComments);
          }}>{showComments ? "Hide comments" : "Show comments"}</button>
          <div>
            <button className="vote-btn upvote-btn" onClick={handleUpvote}>+</button>
            <button className="vote-btn downvote-btn" onClick={handleDownVote}>-</button>
          </div>
        </div>
        {error ? <p className="vote-error">{error}</p> : null}
        <CommentViewer showComments={showComments}>
          <Comments article_id={article_id} />
        </CommentViewer>
      </div>
      <Link to="/news">
        <button className="site-nav-btn">Back to News</button>
      </Link>
    </section>
  );
};

export default SingleArticle;
