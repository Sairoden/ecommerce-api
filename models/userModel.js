const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
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

userSchema.pre("save", async function () {
  // Hash password
  const genSalt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, genSalt);
});

userSchema.methods.comparePassword = async function (unhashedPassword) {
  return bcrypt.compare(unhashedPassword, this.password);
};

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
