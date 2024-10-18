const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const getLoginStatus = asyncHandler(async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(400).json(false);
  }
  try {
    const tokenVerified = jwt.verify(token, process.env.JWT_SECRET);
    if (tokenVerified) {
      return res.status(200).json(true);
    } else {
      return res.status(401).json(false);
    }
  } catch (error) {
    console.error("Token verification failed:", error);
    return res.status(401).json({ loggedIn: false, error: "Invalid token" });
  }
});

module.exports = getLoginStatus;
