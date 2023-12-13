import { useEffect, useState } from "react";
import { getArticles } from "../../../utils/api-utils";
import Article from "./Article";
import { useSearchParams } from "react-router-dom";

const News = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  const topicQuery = searchParams.get("topic");
  const sortByQuery = searchParams.get("sort_by");
  const orderQuery = searchParams.get("order");

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

  const handleChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (sortBy) setSortByQuery(sortBy);
  };

  if (isLoading) return <p>Loading content...</p>;
  if (isError) return <p>Oops! Something went wrong...</p>;

  return (
    <section>
      <div id="search-bar">
        <form onSubmit={handleSubmit}>
          <label htmlFor="sort-by-dropdown">
            <span>Sort articles</span>
            <select name="sort-by" id="sort-by-dropdown" onChange={handleChange}>
              <option value="">Select preference</option>
              <option value="author">Author</option>
              <option value="comment_count">Comment count</option>
              <option value="created_at">Date created</option>
              <option value="title">Title</option>
              <option value="votes">Votes</option>
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
