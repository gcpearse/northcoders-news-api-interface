import { useEffect, useState } from "react";
import { getArticles } from "../../../utils/api-utils";
import Article from "./Article";
import { useSearchParams } from "react-router-dom";
import Error from "../../Error";

const News = ({ topics }) => {

  const [searchParams, setSearchParams] = useSearchParams();
  const sortByQuery = searchParams.get("sort_by");
  const topicQuery = searchParams.get("topic");
  const orderQuery = searchParams.get("order");

  const [sortBy, setSortBy] = useState("");
  const [topic, setTopic] = useState("");

  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [apiError, setApiError] = useState(null);

  useEffect(() => {
    getArticles(topicQuery, sortByQuery, orderQuery)
      .then(({ articles }) => {
        setArticles(articles);
        setIsLoading(false);
      })
      .catch((err) => {
        setApiError(err.message);
        setIsLoading(false);
        setIsError(true);
      });
  }, [sortByQuery, topicQuery, orderQuery]);

  const setSortByQuery = (sortBy) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("sort_by", sortBy);
    setSearchParams(newParams);
  };

  const setTopicQuery = (topic) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("topic", topic);
    setSearchParams(newParams);
  };

  const setOrderQuery = (order) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("order", order);
    setSearchParams(newParams);
  };

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleSortBySubmit = (event) => {
    event.preventDefault();
    if (sortBy) setSortByQuery(sortBy);
  };

  const handleTopicChange = (event) => {
    setTopic(event.target.value);
  };

  const handleTopicSubmit = (event) => {
    event.preventDefault();
    setTopicQuery(topic);
  };

  if (isLoading) return <p>Loading content...</p>;
  if (isError) return <Error message={apiError} />;

  return (
    <section>
      <div id="search-bar">
        <form onSubmit={handleTopicSubmit}>
          <label id="topic-label" htmlFor="topic-dropdown">
            Search
            <select
              name="topic"
              id="topic-dropdown"
              defaultValue={topicQuery}
              onChange={handleTopicChange}>
              <option value="">All topics</option>
              {topics.map((topic) => {
                return <option key={topic.slug} value={topic.slug}>
                  {topic.slug[0].toUpperCase() + topic.slug.slice(1).toLowerCase()}
                </option>;
              })}
            </select>
            <input type="submit" value="&#x1F50D;" className="select-btn search-btn" />
          </label>
        </form>
        <form id="sort-by-form" onSubmit={handleSortBySubmit}>
          <label id="sort-by-label" htmlFor="sort-by-dropdown">
            Sort by
            <select
              name="sort-by"
              id="sort-by-dropdown"
              defaultValue={sortByQuery || "created_at"}
              onChange={handleSortByChange}>
              <option value="author">Author</option>
              <option value="comment_count">Comment count</option>
              <option value="created_at">Date created</option>
              <option value="title">Title</option>
              <option value="votes">Votes</option>
            </select>
            <input type="submit" value="&#x1F50D;" className="select-btn search-btn" />
          </label>
        </form>
        <div id="order-btns">
          <span>
            Order
          </span>
          <button
            className="order-btn"
            id="asc-btn"
            onClick={() => setOrderQuery("asc")}
            disabled={orderQuery === "asc"}>
            Ascending
          </button>
          <button
            className="order-btn"
            id="desc-btn"
            onClick={() => setOrderQuery("desc")}
            disabled={!orderQuery || orderQuery === "desc"}>
            Descending
          </button>
        </div>
      </div>
      {!articles.length ? <div className="error-section">
        <p className="error-body">
          No articles found
        </p>
      </div> : null}
      <ul id="articles-list">
        {articles.map((article) => {
          return <Article key={article.article_id} article={article} />;
        })}
      </ul>
    </section>
  );
};

export default News;
