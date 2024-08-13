const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const User = require("../model/user");

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.podcasterUserToken;
  try {
    if (token) {
      const decode = jwt.verify(token, process.env.KEY);
      const user = await User.findById(decode.id);
      if (!user) {
        res.status(404).send({ message: "User not found" });
      }
      req.user = user;
      next();
    }
  } catch (error) {
    res.status(500).send({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;