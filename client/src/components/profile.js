import React from "react";
import { useNavigate } from "react-router-dom";
import "../designCodeCSS/profile.css";
const Profile = () => {
  const navigate = useNavigate();
  const fetchMyBlogs = () => {
    navigate("/myBlogs");
  };

  return (
    <>
      <button className="prof" onClick={() => fetchMyBlogs()}>
        My Blogs
      </button>
    </>
  );
};

export default Profile;
