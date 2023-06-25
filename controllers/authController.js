const User = require("../models/userModel");
const CustomError = require("../errors");
const { attachCookiesToResponse } = require("../utils");

exports.register = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });

    if (user) throw new CustomError.BadRequestError("Email is taken already");

    user = await User.create(req.body);

    const tokenUser = {
      userId: user._id,
      name: user.name,
      role: user.role,
    };

    attachCookiesToResponse({ res, user: tokenUser });
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

exports.login = async (req, res) => {
  if (!req.body.email || !req.body.password)
    CustomError.UnauthenticatedError("Please provide email and password");

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(401).send("Incorrect password or email");

  const isCorrectPassword = await user.comparePassword(req.body.password);
  if (!isCorrectPassword)
    throw new CustomError.UnauthenticatedError("Incorrect password or email");

  const tokenUser = {
    userId: user._id,
    name: user.name,
    role: user.role,
  };

  attachCookiesToResponse({ res, user: tokenUser });
};

exports.logout = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  return res.status(200).send("Logged out successfully");
};
