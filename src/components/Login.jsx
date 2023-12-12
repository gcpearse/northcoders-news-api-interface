import { useContext, useEffect, useState } from "react";
import { getUsers } from "../utils/api-utils";
import { UserContext } from "../contexts/UserContext";

const Login = () => {

  const { user } = useContext(UserContext);
  const { setUser } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [input, setInput] = useState("");
  const [loginBtn, setLoginBtn] = useState("Log in");
  const [visibility, setVisibility] = useState("visible-element");

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
      setVisibility("invisible-element");
      setLoginBtn("Log out");
      setUser(input);
    } else {
      setVisibility("visible-element");
      setLoginBtn("Log in");
      setUser("");
    }
  };

  const setGreeting = (user) => {
    if (user) return `Hello, ${user}!`;
  };

  return (
    <section id="login-bar">
      <p>{setGreeting(user)}</p>
      <form onSubmit={handleSubmit} id="login-form">
        <label htmlFor="user-selection">
          <select name="users" className={visibility} id="user-selection" onChange={handleChange}>
            <option value="">Select username</option>
            {users.map((user) => {
              return <option key={user.username} value={user.username}>{user.username}</option>;
            })}
          </select>
        </label>
        <input type="submit" value={loginBtn} className="select-btn" id="login-btn" />
      </form>
    </section>
  );
};

export default Login;
