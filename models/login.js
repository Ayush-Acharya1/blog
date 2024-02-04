const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    required: true,
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.methods.comparePassword = async function (userPassword) {
  try {
    return await bcrypt.compare(userPassword, this.password);
  } catch (err) {
    throw err;
  }
};

const LogUser = mongoose.model("LogUser", userSchema, "blog-data");
module.exports = LogUser;
