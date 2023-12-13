import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import News from "./pages/news/News";
import Topics from "./pages/topics/Topics";
import SingleArticle from "./pages/article/SingleArticle";
import { useEffect, useState } from "react";
import { getTopics } from "../utils/api-utils";

const Contents = () => {

  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getTopics()
      .then(({ topics }) => {
        setTopics(topics);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        setIsError(true);
      });
  }, []);

  return (
    <main>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/news" element={<News topics={topics} />}></Route>
        <Route path="/news/articles/:article_id" element={<SingleArticle />}></Route>
        <Route path="/topics" element={<Topics topics={topics} setTopics={setTopics} isLoading={isLoading} isError={isError} />}></Route>
      </Routes>
    </main>
  );
};

export default Contents;
