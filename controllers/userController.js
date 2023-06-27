const User = require("../models/userModel");
const CustomError = require("../errors");

const getAllUsers = async (req, res) => {
  const users = await User.find({ role: "user" }).select("-password");

  if (!users) return res.status(400).send("There are no users");

  return res.status(200).send(users);
};

const getSingleUser = async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (!user) {
    res.status(404).send(`No user with id: ${req.params.id}`);
    throw new CustomError.NotFoundError(`No user with id: ${req.params.id}`);
  }

  return res.status(200).send(user);
};

const showCurrentUser = async (req, res) => {
  res.send("show current user");
};

const updateUser = async (req, res) => {
  res.send("update user");
};

const updateUserPassword = async (req, res) => {
  res.send("update user password");
};

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};
