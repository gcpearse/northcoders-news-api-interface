import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav>
      <Link to="/" className="nav-link">News</Link>
      <Link to="/topics" className="nav-link">Topics</Link>
    </nav>
  );
};

export default Nav;
