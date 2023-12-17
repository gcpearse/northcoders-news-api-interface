import { Link } from "react-router-dom";

const Topic = ({ topic }) => {
  return (
    <li className="topic">
      <Link to={`/?topic=${topic.slug}`}>
        <h2 id="topic-header">
          {topic.slug[0].toUpperCase() + topic.slug.slice(1).toLowerCase()}
        </h2>
        <p className="topic-body">{topic.description}</p>
        <p className="topic-body">{topic.article_count} posts for this topic</p>
      </Link>
    </li>
  );
};

export default Topic;
