import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getArticleById } from "../../../utils/api-utils";
import { formatWord, lengthenDate } from "../../../utils/formatting-utils";

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
        <p className="article-topic">Posted in <span id="article-topic-keyword">{singleArticle.topic}</span></p>
        <h2 className="single-article-title">{singleArticle.title}</h2>
        <p className="single-article-author">{singleArticle.author}</p>
        <p className="article-body">{singleArticle.body}</p>
        <p className="single-article-time">{singleArticle.created_at.match(/\d{2}:\d{2}/)} on {lengthenDate(singleArticle.created_at.match(/\d{4}-\d{2}-\d{2}/)[0])}</p>
        <div className="article-count-container">
          <p className="article-comment-count">{singleArticle.comment_count} comments</p>
          <p className="article-votes">{singleArticle.votes} {formatWord(singleArticle.votes)} { }</p>
        </div>
        <div className="article-btns">
          <Link to={`/news/articles/${singleArticle.article_id}`}>
            <button>Add a comment</button>
          </Link>
          <div className="article-vote-btns">
            <button>+</button>
            <button>-</button>
          </div>
        </div>
      </div>
      <Link to="/news">
        <button className="nav-btn">Back to News</button>
      </Link>
    </section>
  );
};

export default SingleArticle;
