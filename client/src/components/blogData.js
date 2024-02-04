import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../designCodeCSS/blogData.css";
const BlogData = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = location.state.id;

  const tokenId = localStorage.getItem("tokenId");
  const [blogTitle, setBlogTitle] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [id, setId] = useState("");
  const [comment, setComment] = useState([]);

  const backUrl = "http://localhost:5000";
  const deleteComment = async (commentId) => {
    await axios.delete(`${backUrl}/comment/${commentId}`);
    fetchComment(params);
  };

  const fetchComment = async (blogPostId) => {
    try {
      console.log(blogPostId);
      const commentFetch = await axios.get(`${backUrl}/comment/${blogPostId}`);
      console.log(commentFetch);
      setComment(commentFetch.data);
    } catch (err) {
      console.log("error while fetching the comment");
    }
  };
  useEffect(() => {
    fetchData(params);
    fetchComment(params);
  }, [params]);
  const fetchData = async (params) => {
    try {
      const blogFetch = await axios.get(`${backUrl}/blog/${params}`);
      // console.log(params);
      const { data } = blogFetch.data;
      setBlogTitle(data.title);
      setBlogContent(data.content);
      setId(data.author);
    } catch (err) {
      console.log("error fetching the blog", err);
    }
  };
  const deletePost = async (params) => {
    await axios.delete(`${backUrl}/blog/${params}`);
    console.log("successfully deleted");
    setBlogContent("");
    setBlogTitle("");
    setId("");
    navigate("/allBlogs");
  };
  const commentNav = async (params) => {
    console.log(params);
    navigate("/createComm", { state: { id: params } });
  };
  const updatePost = async (id) => {
    navigate("/create", { state: { id: id } });
  };

  return (
    <div className="blogpage">
      <div className="blog-header">
        <div className="blogTitle">{blogTitle}</div>
        <div className="btn-container">
          {tokenId === id && (
            <>
              <button className="btn" onClick={() => deletePost(params)}>
                DELETE
              </button>
              <button className="btn" onClick={() => updatePost(params)}>
                Update
              </button>
            </>
          )}
          <button className="btn" onClick={() => commentNav(params)}>
            Add Comment
          </button>
        </div>
      </div>
      <div
        className="blog-content"
        dangerouslySetInnerHTML={{ __html: blogContent }}
      />

      <div className="comment-section">
        <h3>Comments</h3>
        <div className="comment-list">
          {comment.map((comm) => (
            <div key={comm._id} className="commentData">
              <div className="commentAuthor">{comm.tokenAuthor}</div>
              <div
                className="comment-text"
                dangerouslySetInnerHTML={{ __html: comm.commentData }}
              />
              {tokenId === comm.tokenId && (
                <button className="btn" onClick={() => deleteComment(comm._id)}>
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogData;
