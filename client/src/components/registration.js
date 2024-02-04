import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../designCodeCSS/reg.css";
const Registration = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useNavigate();
  const backUrl = "http://localhost:5000";
  const register = async () => {
    try {
      const res = await axios.post(`${backUrl}/auth/register`, {
        username,
        email,
        password,
      });

      console.log(res.data);
      setUsername("");
      setEmail("");
      setPassword("");
      history("/login");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="regpage">
      <div className="reg">
        <span>REGISTRATION</span>
        <input
          className="regis"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        <input
          className="regis"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          className="regis"
          placeholder="Enter your password"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></input>
        <button className="regis-btn" onClick={register}>
          Register
        </button>
      </div>
    </div>
  );
};

export default Registration;
