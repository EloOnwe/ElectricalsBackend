const User = require("../../models/userModel");
const asyncHandler = require("express-async-handler");

const updateUserData = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  if (user) {
    const { username, phone, address } = user;
    user.username = req.body.username || username;
    user.phone = req.body.phone || phone;
    user.address = req.body.address || address;
    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } else {
    res.status(400).json({ msg: "User not found" });
  }
});

const updateUserPhoto = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id, { new: true }).select(
    "-password"
  );
  const { photo } = user;
  user.photo = req.body.photo || photo;

  const updatedUser = await user.save();
  res.status(200).json(updatedUser);
});

module.exports = {
  updateUserData,
  updateUserPhoto,
};
