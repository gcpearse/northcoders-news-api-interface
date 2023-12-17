import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getArticles } from "../../../utils/api-utils";
import Article from "./Article";
import Error from "../../Error";
import OrderBy from "./search-bar/OrderBy";
import Pagination from "../../Pagination";
import FilterBy from "./search-bar/FilterBy";
import SortBy from "./search-bar/SortBy";

const News = ({ topics }) => {

  const [searchParams, setSearchParams] = useSearchParams();
  const sortByQuery = searchParams.get("sort_by");
  const topicQuery = searchParams.get("topic");
  const orderQuery = searchParams.get("order");
  const pageQuery = searchParams.get("p");

  const [articles, setArticles] = useState([]);
  const [pageLimit, setPageLimit] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [apiError, setApiError] = useState(null);

  useEffect(() => {
    getArticles(topicQuery, sortByQuery, orderQuery, pageQuery)
      .then(({ articles, full_count }) => {
        setArticles(articles);
        setPageLimit(Math.ceil(full_count / 10));
        setIsLoading(false);
      })
      .catch((err) => {
        setApiError(err.message);
        setIsLoading(false);
        setIsError(true);
      });
  }, [sortByQuery, topicQuery, orderQuery, pageQuery]);

  if (isLoading) return <p>Loading content...</p>;
  if (isError) return <Error message={apiError} />;

  return (
    <section>
      <div id="search-bar">
        <form id="search-form">
          <FilterBy
            topics={topics}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            topicQuery={topicQuery} />
          <SortBy
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            sortByQuery={sortByQuery} />
        </form>
        <OrderBy
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          orderQuery={orderQuery} />
      </div>
      {!articles.length ? <div className="error-section">
        <p className="error-body">
          {topicQuery ? `No articles found for ${topicQuery[0].toUpperCase() + topicQuery.slice(1).toLowerCase()}` : "No articles found"}
        </p>
      </div> : null}
      <ul id="articles-list">
        {articles.map((article) => {
          return <Article key={article.article_id} article={article} />;
        })}
      </ul>
      {pageLimit ? <Pagination
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        pageQuery={pageQuery}
        pageLimit={pageLimit} /> : null}
    </section>
  );
};

export default News;
