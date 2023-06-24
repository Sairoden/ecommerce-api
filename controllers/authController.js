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
  res.send("Login user");
};

exports.logout = async (req, res) => {
  res.send("Logout user");
};
