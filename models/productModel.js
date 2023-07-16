const mongoose = require("mongoose");

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
        values: ["ikea", "liddy", "marcos"],
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
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
