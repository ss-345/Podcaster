const express = require("express");
const User = require("../model/user");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/authMiddleware");
// signup route
router.post("/sign-up", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 6) {
      return res.status(400).json({
        message: "Length of password should be atleast 6",
      });
    }
    //user exist
    const existingEmail = await User.findOne({ email: email });
    const existingName = await User.findOne({ username: username });
    if (existingEmail || existingName) {
      return res.status(400).json({
        message: "User of given email or username already exist",
      });
    }
    // new user
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, salt);
    const newUser = new User({
      username,
      email,
      password: hashPass,
    });
    await newUser.save();
    return res.status(200).json({ message: "Account created" });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// sign-in

router.post("/sign-in", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      return res.status(400).json({
        message: "Invalid credential",
      });
    }
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credential",
      });
    }

    // create token

    const token = jwt.sign(
      {
        id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
      },
      process.env.KEY,
      { expiresIn: "7d" }
    );
    res.cookie("podcasterUserToken", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
      path: "/",
    });
    res.status(200).send({
      id: existingUser._id,
      username: existingUser.username,
      email: existingUser.email,
      message: "Sign IN succesfully",
    });
  } catch (error) {
    res.status(500).json({ error });
  }
});
// log-out
router.post("/log-out", async (req, res) => {
  try {
    res.clearCookie("podcasterUserToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
      path: "/",
    });
    return res.status(200).send({
      message: "Log-Out successfully",
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
});
// check-cookie present or not

router.get("/check-cookie", async (req, res) => {
  try {
    const token = req.cookies.podcasterUserToken;
    if (token) {
      return res.status(200).send({
        message: "true",
      });
    }
    return res.status(200).send({
      message: "false",
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
});

// route to fetch user details

router.get("/user-details", authMiddleware, async (req, res) => {
  try {
    const { email } = req.user;
    const existingUser = await User.findOne({ email: email }).select(
      "-password"
    );
    // console.log(existingUser);
    res.status(200).json({
      user: existingUser,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
});
module.exports = router;
