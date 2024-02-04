import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const CreateComment = () => {
  const [commentData, setCommentData] = useState("");
  const [commentId, setCommentId] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const params = location.state.id;
  const backUrl = "http://localhost:5000";
  useEffect(() => {
    setCommentId(params);
  }, [params]);
  const handleSubmit = async () => {
    const tokenId = localStorage.getItem("tokenId");
    const tokenAuthor = localStorage.getItem("tokenAuthor");
    console.log(commentId);
    await axios.post(`${backUrl}/comment/create`, {
      tokenId,
      commentData,
      commentId,
      tokenAuthor,
    });
    setCommentData("");
    navigate(`/blog/${params}`, { state: { id: params } });
  };

  return (
    <>
      {}
      <ReactQuill
        value={commentData}
        onChange={(commentData) => setCommentData(commentData)}
        modules={quillModules}
        formats={quillFormats}
        placeholder="Write your comment..."
      />
      <button onClick={() => handleSubmit(params)}>SUBMIT</button>
    </>
  );
};

const quillModules = {
  toolbar: [
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],

    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],

    [{ color: [] }, { background: [] }],
    [{ align: [] }],

    ["clean"],
  ],
};

const quillFormats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "color",
  "background",
];

export default CreateComment;
