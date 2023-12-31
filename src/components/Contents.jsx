import { Route, Routes } from "react-router-dom";
import News from "./pages/news/News";
import Topics from "./pages/topics/Topics";
import SingleArticle from "./pages/article/SingleArticle";
import { useEffect, useState } from "react";
import { getTopics } from "../utils/api-utils";
import Error from "./Error";
import User from "./pages/user/User";
import NewArticle from "./pages/new-article/NewArticle";

const Contents = () => {

  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getTopics()
      .then(({ topics }) => {
        const sortedTopics = topics.sort((a, b) => {
          if (a.slug > b.slug) return 1;
          if (a.slug < b.slug) return -1;
          return 0;
        });
        setTopics(sortedTopics);
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
        <Route path="/" element={<News topics={topics} />}></Route>
        <Route path="/articles/:article_id" element={<SingleArticle />}></Route>
        <Route path="/articles/new" element={<NewArticle />}></Route>
        <Route path="/topics" element={<Topics topics={topics} setTopics={setTopics} isLoading={isLoading} isError={isError} />}></Route>
        <Route path="/users/:username" element={<User />}></Route>
        <Route path="/*" element={<Error message={"Oops! That page does not exist!"} nav={-1} />}></Route>
      </Routes>
    </main>
  );
};

export default Contents;
