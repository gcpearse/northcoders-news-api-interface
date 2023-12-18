import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../../contexts/UserContext";

const Topic = ({ topic }) => {

  const { user } = useContext(UserContext);

  const navigate = useNavigate();

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
        <button
          className="grey-btn"
          id="contribute-btn"
          onClick={() => navigate(`/articles/new?topic=${topic.slug}`)}
          disabled={!user}>
          {user ? "Post an article" : "Log in to post"}
        </button>
    </div>
  );
};

export default Topic;
