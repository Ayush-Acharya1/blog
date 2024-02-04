const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  console.log(token);
  const userId = req.header("tokenId");
  console.log(userId);

  if (!token) {
    res.status(404).json({ error: "Unauthorized" });
    return;
  }
  try {
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        res.status(401).json({ error: "invalid token" });
        return;
      } else {
        req.user = userId;
        console.log(decoded);
      }
    });
  } catch (err) {
    console.log(err);
  }
  next();
};

module.exports = verifyToken;
