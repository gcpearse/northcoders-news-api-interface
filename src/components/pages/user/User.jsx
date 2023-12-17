import { useEffect, useState } from "react";
import { getUserByUsername } from "../../../utils/api-utils";
import { useNavigate, useParams } from "react-router-dom";
import Error from "../../Error";

const User = () => {

  const navigate = useNavigate();

  const { username } = useParams();

  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [apiError, setApiError] = useState(null);

  useEffect(() => {
    getUserByUsername(username)
      .then(({ user }) => {
        setUser(user);
        setIsLoading(false);
      })
      .catch((err) => {
        setApiError(err.message);
        setIsLoading(false);
        setIsError(true);
      });
  });

  if (isLoading) return <p>Loading content...</p>;
  if (isError) return <Error message={apiError} nav={-1} />;

  return (
    <section>
      <div id="user-profile">
        <h2 id="user-username">
          User profile for {user.username}
        </h2>
        <img
          src={user.avatar_url}
          alt="The user's avatar"
          id="user-avatar" />
      </div>
      <button
        className="site-nav-btn"
        onClick={() => navigate(-1)}>
        Back
      </button>
    </section>
  );
};

export default User;
