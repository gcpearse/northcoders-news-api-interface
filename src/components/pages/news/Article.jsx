import { Link } from "react-router-dom";
import { formatWord, lengthenDate } from "../../../utils/formatting-utils";

const Article = ({ article }) => {

  return (
    <div className="article">
      <li>
        <p className="article-topic">Posted in <span id="article-topic-keyword">{article.topic}</span></p>
        <h2 className="article-title">{article.title}</h2>
        <img src={article.article_img_url} alt="An image representing the topic of the article" className="article-img" />
        <p className="article-author-time">Published by {article.author} at {article.created_at.match(/\d{2}:\d{2}/)} on {lengthenDate(article.created_at.match(/\d{4}-\d{2}-\d{2}/)[0])}.</p>
        <div className="article-count-container">
          <p className="article-comment-count">{article.comment_count} comments</p>
          <p className="article-votes">{article.votes} {formatWord(article.votes)} { }</p>
        </div>
      </li>
      <div className="article-btns">
        <Link to={`/news/articles/${article.article_id}`}>
          <button>View article</button>
        </Link>
        <div className="article-vote-btns">
          <button>+</button>
          <button>-</button>
        </div>
      </div>
    </div>
  );
};

export default Article;
