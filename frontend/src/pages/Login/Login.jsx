import { useContext, useState } from "react";
import "./login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../../context/ContextProvider";

const Login = () => {
  const { setUsers, setSirName, setUser } = useContext(Context);
  const [eid, setEid] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5500/api/user/login",
        { eid, password }
      );

      if (response.data.message) {
        console.log(response.data);
        setUser(response.data.user);
        return navigate("/user-dashboard");
      }

      else{
        return alert("Erorr");
      }
    } catch (error) {
      return alert("Invalid username or password");
    }
  };

  return (
    <main className="login main">
      <div className="login-container transparent">
        <form action="/login" method="post" onSubmit={handleSubmit}>
          <h1>Login</h1>
          <div className="input-field">
            <input
              type="text"
              name="username"
              placeholder="Employee ID"
              required
              onChange={(e) => setEid(e.target.value)}
            />
          </div>
          <div className="input-field">
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
      </div>
    </main>
  );
};

export default Login;
