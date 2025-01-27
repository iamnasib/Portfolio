const jwt = require("jsonwebtoken");
const User = require("../models/User");

const isAuthorized = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).json({ msg: "Authorization denied" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ msg: "Authorization denied" });
    }
    req.user = decoded.userId;
    next();
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

module.exports = isAuthorized;
