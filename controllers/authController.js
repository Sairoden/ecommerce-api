const User = require("../models/userModel");
const CustomError = require("../errors");

const register = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });

    if (user) throw new CustomError.BadRequestError("Email is taken already");

    user = await User.create(req.body);

    return res.status(201).send(user);
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
