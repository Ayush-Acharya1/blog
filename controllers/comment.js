const Comment = require("../models/comment.js");

const createComment = async (req, res) => {
  try {
    const { tokenId, commentData, commentId, tokenAuthor } = req.body;
    console.log(tokenId);
    console.log(commentData);
    console.log(commentId);

    const commentCreate = await Comment.create({
      tokenId,
      commentData,
      commentId,
      tokenAuthor,
      date: new Date(),
    });
    res.status(200).json(commentCreate);
  } catch (err) {
    res.status(500).json("error while creating comment");
  }
};

const getComment = async (req, res) => {
  try {
    const commentId = req.params.blogPostId;
    console.log(commentId);
    const comment = await Comment.find({ commentId }).sort({
      createdAt: -1,
    });
    res.status(200).json(comment);
  } catch (err) {
    res.status(401).json(err);
  }
};
const deleteComment = async (req, res) => {
  try {
    const commentId = req.params.commentId;
    await Comment.findByIdAndDelete(commentId);
    res.status(200).json("successfully deleted");
  } catch (err) {
    console.log("error while deleting", err);
  }
};

module.exports = { createComment, getComment, deleteComment };
