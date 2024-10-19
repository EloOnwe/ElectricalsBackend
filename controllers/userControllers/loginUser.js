const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../../models/userModel");
require("dotenv").config();

function generateToken(payload) {
  return jwt.sign({ payload }, process.env.JWT_SECRET, { expiresIn: "1d" });
}

const loginUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ message: "Please fill in the required fields" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).send("Invalid email or password");
    }

    // Verify password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).send("Password does not match");
    }
    if (user && passwordMatch) {
      const token = generateToken({ id: user._id, email: user.email });
      const newUser = await User.findOne({ email }).select("-password");
      res
        .cookie("token", token, {
          path: "/",
          httpOnly: true,
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
          secure: true,
          sameSite: "none",
        })
        .json({
          message: "login successful",
          user: newUser,
        });
    }
  } catch (error) {
    res.send(error.message);
  }
});

module.exports = loginUser;
