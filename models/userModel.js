const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    minLength: 3,
    maxLength: 100,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    minLength: 3,
    maxLength: 150,
    validate: {
      validate: validator.isEmail,
      message: "Please provide a valid email address",
    },
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minLength: 3,
    maxLength: 100,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
