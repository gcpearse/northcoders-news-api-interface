import { useEffect, useState } from "react";
import { getArticles } from "../../../utils/api-utils";
import Article from "./Article";

const News = () => {

  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    getArticles()
      .then(({ articles }) => {
        setArticles(articles);
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false)
        setIsError(true)
      });
  }, []);

  if (isLoading) return <p>Loading content...</p>
  if (isError) return <p>Oops! Something went wrong...</p>

  return (
    <section>
      <div id="search-bar">
        <p>Add sort / search / order tools here</p>
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
