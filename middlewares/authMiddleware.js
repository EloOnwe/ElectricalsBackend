const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token;

  try {
    if (!token) {
      return res.status(400).send("login please");
    }

    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!verifiedToken) {
      return res.status(401).send("Bad request");
    }
    const user = await User.findById(verifiedToken.payload.id).select(
      "-password"
    );

    req.user = user;
    next();
  } catch (error) {
    throw new Error("Please log in to continue");
  }
});

module.exports = protect;
