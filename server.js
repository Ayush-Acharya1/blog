const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const authRoutes = require("./routes/auth.js");
const blogRoutes = require("./routes/blogPost.js");
const commentRoutes = require("./routes/comment.js");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

mongoose
  .connect(`${process.env.MONGODB_URL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "blog",
  })
  .then(() => {
    console.log("connected successfully");
  })
  .catch((err) => {
    throw err;
  });
app.use("/auth", authRoutes);
app.use("/blog", blogRoutes);
app.use("/comment", commentRoutes);
app.listen(PORT, () => {
  console.log("server running successfully");
});
