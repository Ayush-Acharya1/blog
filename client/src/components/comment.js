import React, { useEffect, useState } from "react";
import axios from "axios";
const Comment = (blogPostId) => {
  const [comment, setComment] = useState([]);
  const backUrl = "http://localhost:5000";
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
    fetchComment(blogPostId);
  }, [blogPostId]);
  // const fetchComment=async()=>{
  // }
  return (
    <>
      {comment.map((comm) => (
        <div key={comm._id}>{comm.commentData}</div>
      ))}
    </>
  );
};

export default Comment;
