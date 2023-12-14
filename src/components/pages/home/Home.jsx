import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import TrendingTopic from "./TrendingTopic";
import { UserContext } from "../../../contexts/UserContext";

const Home = ({ topics }) => {

  const { user } = useContext(UserContext);

  const [index, setIndex] = useState(0);

  const handleLeftClick = () => {
    if (index > 0) {
      setIndex(index - 1);
    } else {
      setIndex(topics.length - 1);
    }
  };

  const handleRightClick = () => {
    if (index < topics.length - 1) {
      setIndex(index + 1);
    } else {
      setIndex(0);
    }
  };

  return (
    <>
      <h2 id="home-header">Welcome to Northcoders News</h2>
      <section id="home-intro">
        {user ? <p className="intro-body">You are currently logged in as <span id="current-user">{user}</span>.</p> : <p className="intro-body">You are not currently logged in, so certain features will not be available.</p>}
        {!user? <p className="intro-body">To get started, select a username from the dropdown list in the panel.</p> : null}
        <p className="intro-body">When ready, head over to our <Link className="home-link" to="/news">News</Link> page to begin exploring the articles on the site.</p>
      </section>
      <article id="trending-topics">
        <h3 className="home-feature-header">Trending topics</h3>
        <ul>
          {topics.map((topic) => {
            return <TrendingTopic topic={topic} />;
          })[index]}
        </ul>
        <div id="cycle-btns">
          <button className="cycle-btn" onClick={handleLeftClick}>&#10094;</button>
          <button id="reset-btn" onClick={() => setIndex(0)}>Reset</button>
          <button className="cycle-btn" onClick={handleRightClick}>&#10095;</button>
        </div>
      </article>
    </>
  );
};

export default Home;
