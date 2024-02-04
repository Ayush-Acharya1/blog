const BlogModel = require("../models/blog.js");

const createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    const createPost = await BlogModel.create({
      title,
      content,
      author: req.user,
      date: new Date(),
    });
    res.status(201).json(createPost);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error during creating" });
  }
};
const getAllPost = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = 10;
    const totalPosts = await BlogModel.countDocuments();
    const totalPages = Math.ceil(totalPosts / pageSize);

    const blogFetch = await BlogModel.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize);
    res
      .status(200)
      .json({ data: blogFetch, currentPage: page, totalPages: totalPages });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getPost = async (req, res) => {
  try {
    const blogId = req.params.id;
    console.log(blogId);
    const blog = await BlogModel.findById(blogId);
    console.log(blog);
    res.status(200).json({ data: blog });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updatePost = async (req, res) => {
  try {
    const blogId = req.params.postId;
    const { title, content } = req.body;
    const updatedPost = await BlogModel.findByIdAndUpdate(
      blogId,
      { title, content, date: new Date() },
      {
        new: true,
      }
    );
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deletePost = async (req, res) => {
  try {
    const blogId = req.params.postId;
    await BlogModel.findByIdAndDelete(blogId);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getMyPost = async (req, res) => {
  try {
    const author = req.params.tokenId;
    console.log(author);
    const myBlogs = await BlogModel.find({ author });
    res.status(200).json(myBlogs);
  } catch (err) {
    console.log("error fetching data", err);
  }
};

module.exports = {
  createBlog,
  getAllPost,
  getPost,
  updatePost,
  deletePost,
  getMyPost,
};
