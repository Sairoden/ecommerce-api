const mongoose = require("mongoose");
const Review = require("./reviewModel");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Please provide a product name"],
      maxLength: [100, "Name can not be more than 100 characters"],
    },
    price: {
      type: Number,
      required: [true, "Please provide a product price"],
      default: 0,
    },
    description: {
      type: String,
      required: [true, "Please provide a product description"],
      maxLength: [1000, "Name can not be more than 1000 characters"],
    },
    image: {
      type: String,
      default: "/uploads/example.jpeg",
    },
    category: {
      type: String,
      required: [true, "Please provide a product category"],
      enum: {
        values: ["office", "clothes", "beauty"],
        message: "{VALUE} is not supported",
      },
    },
    company: {
      type: String,
      required: [true, "Please provide a company"],
      enum: {
        values: ["ikea", "liddy", "marcos"],
        message: "{VALUE} is not supported",
      },
    },
    colors: {
      type: [String],
      default: ["#222"],
      required: [true, "Please provide a product color"],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    freeShipping: { type: Boolean, default: false },
    inventory: {
      type: Number,
      required: true,
      default: 15,
    },
    averageRating: { type: Number, default: 0 },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

productSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "product",
  justOne: false,
});

productSchema.pre("findOneAndDelete", async function () {
  const productId = this._conditions._id;
  await Review.deleteMany({ product: productId });
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
