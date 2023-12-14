import { Link } from "react-router-dom";
import { formatWord, lengthenDate } from "../../../utils/formatting-utils";

const Article = ({ article }) => {

  const timeRegex = /\d{2}:\d{2}/;
  const yearRegex = /\d{4}-\d{2}-\d{2}/;

  return (
    <div id="article">
      <li>
        <p className="article-topic">
          <span className="topic-keyword">
            {article.topic[0].toUpperCase() + article.topic.slice(1).toLowerCase()}
          </span>
        </p>
        <h2 className="article-title">{article.title}</h2>
        <img
          src={article.article_img_url}
          alt="An image representing the topic of the article"
          id="article-img" />
        <p className="article-text">
          Published by <Link className="username-link" to={`/users/${article.author}`}><b id="article-author-keyword">{article.author}</b></Link> at {article.created_at.match(timeRegex)} on {lengthenDate(article.created_at.match(yearRegex)[0])}.
        </p>
        <div className="count-container">
          <p>{article.comment_count} comments</p>
          <p>{article.votes} {formatWord(article.votes)}</p>
        </div>
      </li>
      <Link to={`/news/articles/${article.article_id}`}>
        <button className="grey-btn">View article</button>
      </Link>
    </div>
  );
};

export default Article;
