const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  tokenId: {
    type: String,
    required: true,
  },
  commentData: {
    type: String,
    required: true,
  },
  commentId: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  tokenAuthor: {
    type: String,
    required: true,
  },
});

const Comment = mongoose.model("Comment", commentSchema, "commentData");
module.exports = Comment;
