import { Link } from "react-router-dom";
import { formatWord, lengthenDate } from "../../../utils/formatting-utils";

const Article = ({ article }) => {

  const timeRegex = /\d{2}:\d{2}/;
  const yearRegex = /\d{4}-\d{2}-\d{2}/;

  const defaultURL = "https://images.unsplash.com/photo-1596713907713-e2595427fd3e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

  return (
    <div className="article-container">
      <Link to={`/articles/${article.article_id}`}>
        <li id="article">
          <p className="article-topic">
            <span className="topic-keyword">
              {article.topic[0].toUpperCase() + article.topic.slice(1).toLowerCase()}
            </span>
          </p>
          <h2 className="article-title">{article.title}</h2>
          <img
            src={article.article_img_url || defaultURL}
            alt="An image representing the topic of the article"
            id="article-img" />
          <p className="article-text">
            Published by <b id="article-author-keyword">{article.author}</b> at {article.created_at.match(timeRegex)} on {lengthenDate(article.created_at.match(yearRegex)[0])}
          </p>
          <div className="count-container">
            <p>{article.comment_count} comments</p>
            <p>{article.votes} {formatWord(article.votes)}</p>
          </div>
        </li>
      </Link>
    </div>
  );
};

export default Article;
