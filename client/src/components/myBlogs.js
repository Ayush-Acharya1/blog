// MyBlogs.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../designCodeCSS/myBlogs.css";

const MyBlogs = () => {
  const backUrl = "http://localhost:5000";
  const [blogs, setBlogs] = useState([]);

  const fetchMyBlogs = async () => {
    const tokenId = localStorage.getItem("tokenId");
    const myBlogs = await axios.get(`${backUrl}/blog/myBlogs/${tokenId}`);
    setBlogs(myBlogs.data);
  };

  useEffect(() => {
    fetchMyBlogs();
  }, []);

  return (
    <div className="my-blogs-container">
      {blogs.map((blog) => (
        <div key={blog._id} className="blog-item">
          <Link
            to={`/blog/${blog._id}`}
            state={{ id: blog._id }}
            className="blog-button"
          >
            {blog.title}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default MyBlogs;
