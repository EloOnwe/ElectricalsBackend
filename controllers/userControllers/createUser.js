const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const User = require("../../models/userModel");
require("dotenv").config();

function generateToken(payload) {
  return jwt.sign({ payload }, process.env.JWT_SECRET, { expiresIn: "1h" });
}

const createUser = asyncHandler(async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      res.status(400);
      throw new Error("Please fill in all the required fields");
    }

    if (password.length < 6) {
      res.status(400);
      throw new Error("Password should be up to six characters or more");
    }

    //Check if user exists

    const userExist = await User.findOne({ email });
    if (userExist) {
      res.status(400).send({ error: "User exists with this email" });
    }

    // Create a user

    const user = await User.create({ username, email, password });

    if (user) {
      const token = generateToken(user._id);
      const { username, email, role } = user;

      res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400),
        // secure: true,
        // sameSite: none
      });

      res.status(201).json({
        message: "successfully registered",
        username,
        email,
        role,
      });
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = createUser;
