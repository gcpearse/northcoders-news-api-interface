import { Link } from "react-router-dom";

const TrendingTopic = ({ topic }) => {
  return (
    <div id="trending-topic-container">
      <Link to={`/?topic=${topic.slug}`}>
        <li key={topic.slug} className="trending-topic">
          {topic.slug[0].toUpperCase() + topic.slug.slice(1).toLowerCase()}
        </li>
      </Link>
    </div>
  );
};

export default TrendingTopic;
