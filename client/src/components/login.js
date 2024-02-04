import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../designCodeCSS/login.css";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const backUrl = "http://localhost:5000";
  const navigate = useNavigate();
  const login = async () => {
    try {
      const res = await axios.post(`${backUrl}/auth/login`, {
        username,
        password,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("tokenAuthor", res.data.user.author);
      localStorage.setItem("tokenId", res.data.user._id);

      console.log(res.data);
      setUsername("");
      setPassword("");
      navigate("/home", {
        state: { author: res.data.user.author, userId: res.data.user._id },
      });
    } catch (err) {
      console.log(err);
    }
  };
  const register = () => {
    navigate("/register");
  };
  return (
    <div className="logpage">
      <div className="log">
        <span>LOGIN</span>
        <input
          placeholder="enter the email"
          className="log-inp"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        ></input>
        <input
          placeholder="enter the password"
          className="log-inp"
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button className="log-btn" onClick={() => login()}>
          Login
        </button>
        <span>do not have an account ?</span>
        <button onClick={() => register()}>Register</button>
      </div>
    </div>
  );
};

export default Login;
