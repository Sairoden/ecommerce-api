const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      required: [true, "Please provide a rating"],
      min: 1,
      max: 5,
    },
    title: {
      type: String,
      trim: true,
      required: [true, "Please provide a title"],
      minLength: 3,
      maxLength: 100,
    },
    comment: {
      type: String,
      minLength: 3,
      maxLength: 500,
      required: [true, "Please provide a comment"],
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { timestamps: true }
);

reviewSchema.index({ product: 1, user: 1 }, { unique: true });

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
