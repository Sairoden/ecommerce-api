const mongoose = require("mongoose");

const connectDB = async url => {
  try {
    await mongoose.connect(url);
    return console.log(`Connected to MongoDB Atlas`);
  } catch (err) {
    console.log("Problem connecting to MongoDB Atlas", err.message);
  }
};

module.exports = connectDB;
