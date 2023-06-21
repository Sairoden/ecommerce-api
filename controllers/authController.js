const User = require("../models/userModel");
const CustomError = require("../errors");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });

    if (user) throw new CustomError.BadRequestError("Email is taken already");

    user = await User.create(req.body);

    const tokenUser = {
      userId: user._id,
      name: user.name,
      role: user.role,
    };

    const token = jwt.sign(tokenUser, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_LIFETIME,
    });

    return res.status(201).send({ user: tokenUser, token });
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

const login = async (req, res) => {
  res.send("Login user");
};

const logout = async (req, res) => {
  res.send("Logout user");
};

module.exports = {
  register,
  login,
  logout,
};
