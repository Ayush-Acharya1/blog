import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../designCodeCSS/home.css";
const HomePage = () => {
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const location = useLocation();
  const data = location.state;
  const createBlog = () => {
    navigate("/create");
  };
  const allBlogs = () => {
    navigate("/allBlogs");
  };
  const navigate = useNavigate();

  useEffect(() => {
    try {
      // console.log(data.userId);
      console.log(data.author);
      setUsername(data.author);
      setUserId(data.userId);
    } catch (err) {
      console.log(err);
    }
  }, [data]);

  return (
    <div className="homepage">
      <div className="user">Hello, {username}</div>
      <button className="btn" value="create" onClick={() => createBlog()}>
        Create Your Blog
      </button>
      <button className="btn" value="fetch" onClick={() => allBlogs()}>
        See All Blogs
      </button>
    </div>
  );
};

export default HomePage;
