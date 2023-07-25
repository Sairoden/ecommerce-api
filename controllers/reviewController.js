const Review = require("../models/reviewModel");
const Product = require("../models/productModel");
const { checkPermission } = require("../utils");

const getAllReviews = async (req, res) => {
  const { product: productId } = req.body;
  req.body.user = req.user.userId;

  const isValidProduct = await Product.findById(productId);

  if (!isValidProduct) throw new Error(`No product with id : ${productId}`);
  return res.status(200).send("Get All Reviews");
};

const getSingleReview = async (req, res) => {
  return res.status(200).send("Get Single Review");
};

const createReview = async (req, res) => {
  try {
    const { product: productId } = req.body;
    req.body.user = req.user.userId;

    const isValidProduct = await Product.findById(productId);

    if (!isValidProduct) throw new Error(`No product with id : ${productId}`);

    const existedReview = await Review.findOne({
      product: productId,
      user: req.user.userId,
    });

    if (!existedReview)
      throw new Error("Already submitted a review for this product");

    const review = await Review.create(req.body);

    return res.status(201).send(review);
  } catch (err) {
    console.log(err.message);
    return res.status(400).send(err.message);
  }
};

const updateReview = async (req, res) => {
  return res.status(200).send("Update Review");
};

const deleteReview = async (req, res) => {
  return res.status(200).send("Delete Review");
};

module.exports = {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
};
