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

reviewSchema.statics.calculateAverageRating = async function (productId) {
  console.log(productId);

  const result = await this.aggregate([
    {
      $match: { product: productId },
    },
    {
      $group: {
        _id: null,
        averageRating: { $avg: "$rating" },
        numOfReviews: { $sum: 1 },
      },
    },
  ]);

  console.log(result);

  try {
    await this.model("Product").findOneAndUpdate(
      { _id: productId },
      {
        averageRating: Math.ceil(result[0]?.averageRating || 0),
        numOfReviews: result[0]?.numOfReviews || 0,
      }
    );
  } catch (err) {
    console.log(err);
  }
};

reviewSchema.post("save", async function (doc) {
  await Review.calculateAverageRating(doc.product);
});

reviewSchema.post("findOneAndDelete", async function (doc) {
  await Review.calculateAverageRating(doc.product);
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
