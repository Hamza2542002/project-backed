const mongoose = require("mongoose");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

// * @desc Register a new user
// * POST /api/users/register
const registerUser = asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;

  if (!userName || !email || !password) {
    res.status(400);
    throw new Error("Missing mandatory fields");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400);
    throw new Error("User is already Registered");
  }

  const createdUser = await User.create({
    userName,
    email,
    password,
  });

  if (createdUser) {
    res.status(201).json({
      message: "User has registered successfully!",
      id: createdUser._id,
      name: createdUser.userName,
      email: createdUser.email,
    });
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }
});

// * @desc Login a user
// * POST /api/users/login
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(404);
    throw new Error("Missing mandatory fields");
  }

  const user = await User.findOne({ email });
  if (user && user.password === password) {
    res.status(200).json({
      message: "User logged in successfully!",
      id: user._id,
      name: user.userName,
      email: user.email,
    });
  } else {
    res.status(400).json({ message: "User email or password mismatch" });
  }
});

// * @desc Get a user
// * GET /api/users/:id
const getUser = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id);

  if (user) {
    res.status(200).json({
      id: user._id,
      name: user.userName,
      email: user.email,
      cities: user.cities,
    });
  } else {
    res.status(400).json({ message: "User email or password mismatch" });
  }
});

module.exports = { registerUser, loginUser, getUser };
