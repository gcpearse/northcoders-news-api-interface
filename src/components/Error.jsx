import { useNavigate } from "react-router-dom";

const Error = ({ message }) => {

  const navigate = useNavigate();

  return (
    <section id="error-section">
      <h2 id="error-header">Error</h2>
      <p id="error-msg">{message}</p>
      <button className="site-nav-btn" onClick={() => navigate(-1)}>Back</button>
    </section>
  );
};

export default Error;
