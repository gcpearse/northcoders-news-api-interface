import { useContext, useEffect, useState } from "react";
import { getUsers } from "../utils/api-utils";
import { UserContext } from "../contexts/UserContext";

const Login = () => {

  const { user } = useContext(UserContext);
  const { setUser } = useContext(UserContext);

  const [users, setUsers] = useState([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    getUsers()
      .then(({ users }) => {
        setUsers(users);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (input && !user) {
      setUser(input);
      setInput("");
    } else {
      setError(true);
    }
  };

  if (!user) {
    return (
      <section className="login-bar">
        <form onSubmit={handleSubmit} onBlur={() => setError(false)} id="login-form">
          <label htmlFor="user-selection">
            <select
              name="users"
              className={error ? "login-error" : null}
              id="user-selection"
              onChange={handleChange}>
              <option value="">Select username</option>
              {users.map((user) => {
                return <option key={user.username} value={user.username}>{user.username}</option>;
              })}
            </select>
          </label>
          <input
            type="submit"
            value="Log in"
            className="login-btn" />
        </form>
      </section>
    );
  } else {
    return (
      <section className="login-bar">
        <p>Hello, {user}!</p>
        <button
          type="submit"
          className="login-btn"
          onClick={() => setUser("")}>
          Log out
        </button>
      </section>
    );
  }
};

export default Login;
