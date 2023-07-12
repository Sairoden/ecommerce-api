const User = require("../models/userModel");
const CustomError = require("../errors");

const { createTokenUser, attachCookiesToResponse } = require("../utils");

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
  res.status(200).send({ user: req.user });
};

const updateUser = async (req, res) => {
  const { name, email } = req.body;

  if (!email || !name)
    return res.status(400).send("Please provide a name and an email");

  const user = await User.findById(req.user.userId);

  user.name = name;
  user.email = email;

  await user.save();

  const tokenUser = createTokenUser(user);

  attachCookiesToResponse({ res, user: tokenUser });
};

const updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword)
    throw new CustomError.BadRequestError(
      "Please provide your old and new password"
    );

  const user = await User.findById(req.user.userId);
  const isPasswordCorrect = await user.comparePassword(oldPassword);
  if (!isPasswordCorrect)
    throw new CustomError.UnauthenticatedError("Invalid Credentials");
  user.password = newPassword;

  await user.save();
  return res.status(200).send({ msg: "Successfully updated the password! ✅" });
};

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};
