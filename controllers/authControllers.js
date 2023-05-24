const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");

const asyncHandler = require("express-async-handler");

const ApiError = require("../utils/ApiError");

const User = require("../models/userModel");

const generateToken = (payload) =>
  jwt.sign({ userId: payload }, process.env.JWT_SECRETE_KEY, {
    expiresIn: process.env.JWT_EXPIRE_TIME,
  });

// @desc    Signup
// @route   GET /api/v1/auth/signup
// @access  Public
const signup = asyncHandler(async (req, res, next) => {
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password,
  });
  const token = generateToken(user._id);
  res.status(201).json({ data: user, token });
});

const login = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return next(new ApiError("Incorrect email or password", 401));
  }
  const token = generateToken(user._id);
  res.status(200).json({ data: user, token });
});

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (req.headers.authorization) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(new ApiError("You Are not login", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRETE_KEY);

  const currentUser = await User.findById(decoded.userId);
  if (!currentUser) {
    return next(
      new ApiError("The User that belong to this token no longer exist ", 401)
    );
  }
  if (currentUser.passwordChangedAt) {
    const convertPasswordTime = parseInt(
      currentUser.passwordChangedAt.getTime() / 1000,
      10
    );
    if (convertPasswordTime > decoded.iat) {
      return next(
        new ApiError("User recently changed his password ,please login again.")
      );
    }
  }
  req.user = currentUser;
  next();
});

module.exports = {
  signup,
  login,
  protect,
};
