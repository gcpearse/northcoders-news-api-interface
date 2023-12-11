import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getArticleById } from "../../../utils/api-utils";
import { formatWord, lengthenDate } from "../../../utils/formatting-utils";
import Comments from "./Comments";

const SingleArticle = () => {

  const { article_id } = useParams();
  const [singleArticle, setSingleArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

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

  if (isLoading) return <p>Loading content...</p>;
  if (isError) return <p>Oops! Something went wrong...</p>;

  return (
    <section>
      <div className="single-article">
        <p id="single-article-topic"><span id="single-article-topic-keyword">{singleArticle.topic[0].toUpperCase() + singleArticle.topic.slice(1).toLowerCase()}</span></p>
        <h2 id="single-article-title">{singleArticle.title}</h2>
        <p id="single-article-author">{singleArticle.author}</p>
        <p id="single-article-body">{singleArticle.body}</p>
        <p id="single-article-time">{singleArticle.created_at.match(/\d{2}:\d{2}/)} on {lengthenDate(singleArticle.created_at.match(/\d{4}-\d{2}-\d{2}/)[0])}</p>
        <div id="single-article-count-container">
          <p className="article-comment-count">{singleArticle.comment_count} comments</p>
          <p className="article-votes">{singleArticle.votes} {formatWord(singleArticle.votes)} { }</p>
        </div>
        <div className="single-article-btns">
          <Link to={`/news/articles/${singleArticle.article_id}`}>
            <button id="add-comment-btn">Add a comment</button>
          </Link>
          <div>
            <button className="vote-btn upvote-btn">+</button>
            <button className="vote-btn downvote-btn">-</button>
          </div>
        </div>
        <Comments article_id={article_id} />
      </div>
      <Link to="/news">
        <button className="site-nav-btn">Back to News</button>
      </Link>
    </section>
  );
};

export default SingleArticle;
