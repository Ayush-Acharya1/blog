import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const TokenDecode = (token) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const decode = async () => {
    setUsername(token.author);
    setUserId(token._id);
  };
  return (
    <div>
      <button onClick={() => decode()}>token</button>
      {username} {userId}
      <button onClick={() => navigate("/home")}>navigate</button>
    </div>
  );
};

export default TokenDecode;
