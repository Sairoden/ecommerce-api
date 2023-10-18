const mongoose = require("mongoose");

const SingleCartItemSchema = mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  amount: { type: Number, required: true },
  product: {
    type: mongoose.Types.ObjectId,
    ref: "Product",
    required: true,
  },
});

const orderSchema = new mongoose.Schema(
  {
    tax: { type: Number, required: true, default: 0 },
    shippingFee: { type: Number, required: true, default: 0 },
    subtotal: { type: Number, required: true, default: 0 },
    total: { type: Number, required: true, default: 0 },
    cartItems: [SingleCartItemSchema],
    status: {
      type: String,
      enum: ["pending", "failed", "paid", "delivered", "canceled"],
      default: "pending",
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    clientSecret: { type: String, required: true },
    paymentId: { type: String },
  },
  { timestamps: true }
);

const Order = mongoose.Model("Order", orderSchema);

module.exports = Order;
