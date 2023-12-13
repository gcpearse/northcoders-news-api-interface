import { useEffect, useState } from "react";
import { getArticles } from "../../../utils/api-utils";
import Article from "./Article";
import { useSearchParams } from "react-router-dom";

const News = ({ topics }) => {

  const [searchParams, setSearchParams] = useSearchParams();
  const topicQuery = searchParams.get("topic");
  const sortByQuery = searchParams.get("sort_by");
  const orderQuery = searchParams.get("order");

  const [topic, setTopic] = useState("");
  const [sortBy, setSortBy] = useState("");

  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getArticles(topicQuery, sortByQuery, orderQuery)
      .then(({ articles }) => {
        setArticles(articles);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        setIsError(true);
      });
  }, [topicQuery, sortByQuery, orderQuery]);

  const setSortByQuery = (sortBy) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("sort_by", sortBy);
    setSearchParams(newParams);
  };

  const setOrderQuery = (order) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("order", order);
    setSearchParams(newParams);
  };

  const setTopicQuery = (topic) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("topic", topic);
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
  if (isError) return <p>Oops! Something went wrong...</p>;

  return (
    <section>
      <div id="search-bar">
        <form onSubmit={handleSortBySubmit}>
          <label htmlFor="sort-by-dropdown">
            <span>Sort articles</span>
            <select name="sort-by" id="sort-by-dropdown" defaultValue={sortByQuery || "created_at"} onChange={handleSortByChange}>
              <option value="author">Author</option>
              <option value="comment_count">Comment count</option>
              <option value="created_at">Date created</option>
              <option value="title">Title</option>
              <option value="votes">Votes</option>
            </select>
            <input type="submit" value="Go" />
          </label>
        </form>
        <form onSubmit={handleTopicSubmit}>
          <label htmlFor="topic-dropdown">
            <span>Filter articles</span>
            <select name="topic" id="topic-dropdown" defaultValue={topicQuery} onChange={handleTopicChange}>
              <option value="">All topics</option>
              {topics.sort((a, b) => {
                if (a.slug > b.slug) return 1;
                if (a.slug < b.slug) return -1;
                return 0;
              }).map((topic) => {
                return <option key={topic.slug} value={topic.slug}>{topic.slug[0].toUpperCase() + topic.slug.slice(1).toLowerCase()}</option>;
              })}
            </select>
            <input type="submit" value="Go" />
          </label>
        </form>
        <div>
          <span>Sort order</span>
          <button className="order-btn" onClick={() => setOrderQuery("asc")}>Ascending</button>
          <button className="order-btn" onClick={() => setOrderQuery("desc")}>Descending</button>
        </div>
      </div>
      <ul id="articles-list">
        {articles.map((article) => {
          return <Article key={article.article_id} article={article} />;
        })}
      </ul>
    </section>
  );
};

export default News;
