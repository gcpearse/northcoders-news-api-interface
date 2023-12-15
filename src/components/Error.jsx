import { useNavigate } from "react-router-dom";

const Error = ({ message }) => {

  const navigate = useNavigate();

  return (
    <section className="error-section">
      <h2 className="error-header">Error</h2>
      <p>{message}</p>
      <button className="site-nav-btn" onClick={() => navigate(-1)}>Back</button>
    </section>
  );
};

export default Error;
