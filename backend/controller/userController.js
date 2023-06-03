const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, dp } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("please enter other fields");
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("user already exists");
  }
  const user = await User.create({
    name,
    email,
    password,
    dp,
  });
  if (user) {
    console.log("user created successfully");
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      dp: user.dp,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("user not created");
  }
});
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchpassword(password))) {
    console.log("user login successful");
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      dp: user.dp,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("either email or password incorrect");
  }
});
// /ai/user?search=karan (Queries)
const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
  const users = await User.find(keyword).select("-password").find({ _id: { $ne: req.user._id } });
  res.send(users);
});
module.exports = { registerUser, authUser, allUsers };
