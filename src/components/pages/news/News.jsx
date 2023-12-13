import { useEffect, useState } from "react";
import { getArticles } from "../../../utils/api-utils";
import Article from "./Article";
import { useSearchParams } from "react-router-dom";

const News = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  const topicQuery = searchParams.get("topic");
  const sortByQuery = searchParams.get("sort_by");
  const [sortByInput, setSortByInput] = useState("");
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getArticles(topicQuery, sortByQuery)
      .then(({ articles }) => {
        setArticles(articles);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        setIsError(true);
      });
  }, [topicQuery, sortByQuery]);

  const setSortByQuery = (sortByInput) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("sort_by", sortByInput);
    setSearchParams(newParams);
  };

  const handleChange = (event) => {
    setSortByInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSortByQuery(sortByInput);
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
              <option value="" disabled>Select preference</option>
              <option value="comment_count">Comment count</option>
              <option value="created_at">Date</option>
              <option value="votes">Votes</option>
            </select>
            <input type="submit" value="Go" />
          </label>
        </form>
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
