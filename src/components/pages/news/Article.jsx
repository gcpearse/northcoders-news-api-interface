import { Link } from "react-router-dom";
import { formatWord, lengthenDate } from "../../../utils/formatting-utils";

const Article = ({ article }) => {

  return (
    <div id="article">
      <li>
        <p id="article-topic"><span id="article-topic-keyword">{article.topic[0].toUpperCase() + article.topic.slice(1).toLowerCase()}</span></p>
        <h2 id="article-title">{article.title}</h2>
        <img src={article.article_img_url} alt="An image representing the topic of the article" id="article-img" />
        <p className="article-author-time">Published by <b id="article-author-keyword">{article.author}</b> at {article.created_at.match(/\d{2}:\d{2}/)} on {lengthenDate(article.created_at.match(/\d{4}-\d{2}-\d{2}/)[0])}.</p>
        <div id="article-count-container">
          <p>{article.comment_count} comments</p>
          <p>{article.votes} {formatWord(article.votes)} { }</p>
        </div>
      </li>
      <div className="article-btns">
        <Link to={`/news/articles/${article.article_id}`}>
          <button id="view-article-btn">View article</button>
        </Link>
        <div className="article-vote-btns">
          <button className="vote-btn upvote-btn">+</button>
          <button className="vote-btn downvote-btn">-</button>
        </div>
      </div>
    </div>
  );
};

export default Article;
