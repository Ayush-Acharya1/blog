const User = require("../models/registration.js");
const LogUser = require("../models/login.js");
const jwt = require("jsonwebtoken");
const authRegister = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      res.status(400).json({ error: "Username or email already in use" });
    } else {
      await User.create({ username, email, password });
      res.status(201).json({ message: "registration done" });
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

const authLogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const UserPresent = await LogUser.findOne({ username });
    if (!UserPresent) {
      res.status(401).json({ err: "wrong username or password" });
    }

    const isPasswordValid = await UserPresent.comparePassword(password);
    if (isPasswordValid) {
      const token = await jwt.sign(
        { userId: UserPresent._id },
        `${process.env.SECRET_KEY}`,
        { expiresIn: "1hr" }
      );
      const userData = {
        _id: UserPresent._id,
        author: UserPresent.username,
      };
      return res
        .status(200)
        .json({ token, message: "login succesfully", user: userData });
    } else {
      res.status(401).json({ error: "invalid username or password" });
    }
  } catch (err) {
    res.status(404).json(err);
  }
};
module.exports = { authRegister, authLogin };
