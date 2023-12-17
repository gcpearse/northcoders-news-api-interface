import { Link } from "react-router-dom";

const Topic = ({ topic }) => {
  return (
    <div className="topic">
      <li>
        <Link to={`/?topic=${topic.slug}`}>
          <h3 id="topic-header">
            {topic.slug[0].toUpperCase() + topic.slug.slice(1).toLowerCase()}
          </h3>
          <p className="topic-body">
            {topic.description}
          </p>
          <p className="topic-body" id="topic-article-count">
            {topic.article_count} articles for this topic
          </p>
        </Link>
      </li>
      <Link to={`/articles/new?topic=${topic.slug}`}>
        <button className="grey-btn" id="contribute-btn">
          Post an article
        </button>
      </Link>
    </div>
  );
};

export default Topic;
