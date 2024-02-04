const express = require("express");
const router = express.Router();
const verifyToken = require("../controllers/verifyToken.js");
const {
  createBlog,
  getAllPost,
  getPost,
  updatePost,
  deletePost,
  getMyPost,
} = require("../controllers/blogPost.js");
router.post("/", verifyToken, createBlog);
router.get("/", getAllPost);
router.get("/:id", getPost);
router.post("/:postId", updatePost);
router.delete("/:postId", deletePost);
router.get("/myBlogs/:tokenId", getMyPost);
module.exports = router;
