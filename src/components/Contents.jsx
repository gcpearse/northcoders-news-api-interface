import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import News from "./pages/news/News";
import Topics from "./pages/topics/Topics";

const Contents = () => {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/news" element={<News />}></Route>
        <Route path="/topics" element={<Topics />}></Route>
      </Routes>
    </main>
  );
};

export default Contents;