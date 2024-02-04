import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const CreateBlog = () => {
  const navigate = useNavigate();
  const backUrl = "http://localhost:5000";
  const location = useLocation();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [isUpdating, setIsUpdating] = useState(0);
  // const params = location.state.id;
  const params = location.state?.id ?? "";

  const updating = (params) => {
    if (params) {
      setIsUpdating(1);
    } else {
      setIsUpdating(0);
    }
  };
  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");

      const tokenId = localStorage.getItem("tokenId");

      await axios.post(
        `${backUrl}/blog/`,
        { title, content },
        { headers: { Authorization: `Bearer ${token}`, tokenId: tokenId } }
      );
      setTitle("");
      setContent("");
      navigate("/home");
    } catch (err) {
      console.error("Axios error", err);
    }
  };
  const updatePost = async (updateId) => {
    try {
      console.log(updateId);
      await axios.post(`${backUrl}/blog/${updateId}`, { title, content });
      setIsUpdating(0);
      navigate("/allBlogs");
    } catch (err) {
      console.log("error while updating", err);
    }
  };
  useEffect(() => {
    updating(params);
  });
  const module = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike"],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }],

      ["link", "image"],
      ["clean"],
    ],
  };
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  return (
    <div>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
      </div>
      <ReactQuill
        theme="snow"
        value={content}
        onChange={(content) => setContent(content)}
        modules={module}
        formats={formats}
      />
      <div>
        {isUpdating === 1 ? (
          <button onClick={() => updatePost(params)}>Update</button>
        ) : (
          <button value="create" onClick={() => handleSubmit()}>
            Create
          </button>
        )}
      </div>
    </div>
  );
};

export default CreateBlog;
