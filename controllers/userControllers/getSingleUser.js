const asyncHandler = require("express-async-handler");
const User = require("../../models/userModel");

const getSingleUser = asyncHandler(async (req, res) => {
  const id = req.user._id;
  try {
    const user = await User.findOne({ _id: id }).select("-password");
    res.status(200).send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

module.exports = getSingleUser;
