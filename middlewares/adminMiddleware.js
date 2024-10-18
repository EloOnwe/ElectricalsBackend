const asyncHandler = require("express-async-handler");

const admin = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(401).send("You can only access this route as an admin");
  }
});

module.exports = admin;
