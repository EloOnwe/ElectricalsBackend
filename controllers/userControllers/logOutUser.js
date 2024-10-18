const asyncHandler = require("express-async-handler");

const logOutUser = asyncHandler(async (req, res) => {
  res
    .clearCookie("token", {
      path: "/",
      httpOnly: true,
      expires: new Date(0),
      secure: true,
      sameSite: none,
    })
    .json({
      message: "logout successful",
    });
});

module.exports = logOutUser;
