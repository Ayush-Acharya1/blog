import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../designCodeCSS/allBlogs.css";
const AllBlogs = () => {
  const backUrl = "http://localhost:5000";
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageChange = (page) => {
    setCurrentPage(page);
  };
  const fetchData = async (page) => {
    try {
      const blogData = await axios.get(`${backUrl}/blog/?page=${page}`);
      const { data, currentPage, totalPages } = blogData.data;
      setBlogs(data);
      setCurrentPage(currentPage);
      setTotalPages(totalPages);
    } catch (error) {
      console.error("error fetching the blogs", error);
    }
  };
  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);
  return (
    <div className="allpage">
      {blogs.map((blog) => (
        <div className="blog" key={blog._id}>
          <Link to={`/blog/${blog._id}`} state={{ id: blog._id }}>
            {blog.title}
          </Link>
        </div>
      ))}

      <div>
        <button
          className="btn"
          onClick={() => pageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          {currentPage} of {totalPages}
        </span>
        <button
          className="btn"
          onClick={() => pageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllBlogs;
