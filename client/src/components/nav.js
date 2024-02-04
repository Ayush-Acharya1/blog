import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../designCodeCSS/nav.css";
const Nav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const logout = () => {
    try {
      if (localStorage.getItem("token")) {
        localStorage.removeItem("token");
        localStorage.removeItem("tokenId");
        localStorage.removeItem("tokenAuthor");
        navigate("/login");
      } else {
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const profile = () => {
    navigate("/profile");
  };

  const isLoginPage = location.pathname === "/login";
  const isRegisterPage = location.pathname === "/register";
  const isProfilePage = location.pathname === "/profile";

  return (
    <>
      <div className="nav-container">
        <div className="title">BLOG-ZONE</div>
        <div>
          {!isLoginPage && !isRegisterPage && !isProfilePage && (
            <button className="profile" onClick={() => profile()}>
              Profile
            </button>
          )}
          {!isLoginPage && !isRegisterPage && (
            <button className="profile" onClick={() => logout()}>
              LOGOUT
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Nav;
