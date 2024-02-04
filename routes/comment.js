const express = require("express");
const router = express.Router();
const {
  createComment,
  getComment,
  deleteComment,
} = require("../controllers/comment.js");
router.post("/create", createComment);
router.get("/:blogPostId", getComment);
router.delete("/:commentId", deleteComment);

module.exports = router;
