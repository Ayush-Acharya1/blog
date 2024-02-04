import React, { useEffect } from "react";
import Registration from "./components/registration";
import Login from "./components/login";
import CreateBlog from "./components/createBlog";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "./components/homePage";
import AllBlogs from "./components/allBlogs";
import BlogData from "./components/blogData";
import Profile from "./components/profile";
import MyBlogs from "./components/myBlogs";
import CreateComment from "./components/createComment";
import Nav from "./components/nav";
const App = () => {
  useEffect(() => {
    if (window.location.pathname !== "/login") {
      // Use the Navigate component for redirection
      return <Navigate to="/login" replace />;
    }
  }, []);
  return (
    <Router>
      <>
        <Nav />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/create" element={<CreateBlog />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/allBlogs" element={<AllBlogs />} />
          <Route path="/blog/:id" element={<BlogData />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/myBlogs" element={<MyBlogs />} />
          <Route path="/createComm" element={<CreateComment />} />
        </Routes>
      </>
    </Router>
  );
};

export default App;
