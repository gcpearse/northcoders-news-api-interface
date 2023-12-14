import { useEffect, useState } from "react";
import { getUserByUsername } from "../../../utils/api-utils";
import { useNavigate, useParams } from "react-router-dom";

const User = () => {

  const navigate = useNavigate();

  const { username } = useParams();

  const [user, setUser] = useState({});

  useEffect(() => {
    getUserByUsername(username)
      .then(({ user }) => {
        setUser(user);
      });
  });

  return (
    <section>
      <div id="user-profile">
        <h2 id="user-username">User profile for {user.username}</h2>
        <img src={user.avatar_url} alt="The user's avatar" id="user-avatar" />
      </div>
      <button className="site-nav-btn" onClick={() => navigate(-1)}>Back</button>
    </section>
  );
};

export default User;
