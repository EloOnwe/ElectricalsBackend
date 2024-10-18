const User = require("../../models/userModel");
const asyncHandler = require("express-async-handler");

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password").sort("-createdAt");
  if (users) {
    res.status(200).json(users);
  }
  if (!users) {
    res.status(400).send("Users not found");
    throw new Error("users not found");
  }
});

module.exports = getUsers;
