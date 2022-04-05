const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

module.exports = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (e) {
      res.status(401).send("unauthorized ");
    }
  } else {
    res.status(401).send("not authorized , no token");
  }
});
