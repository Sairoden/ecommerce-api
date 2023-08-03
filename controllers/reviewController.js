const Review = require("../models/reviewModel");
const Product = require("../models/productModel");
const { checkPermission } = require("../utils");

const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate({
        path: "product",
        select: "name company price",
      })
      .populate({ path: "user", select: "name" });

    return res.status(200).send({ reviews, count: reviews.length });
  } catch (err) {
    console.log(err.message);
    return res.status(400).send({ error: err.message });
  }
};

const getSingleReview = async (req, res) => {
  try {
    const { id: reviewId } = req.params;

    const review = await Review.findById(reviewId);

    if (!review) throw new Error(`No review with id ${reviewId}`);

    return res.status(200).send({ review });
  } catch (err) {
    console.log(err.message);
    return res.status(400).send({ error: err.message });
  }
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

    if (existedReview)
      throw new Error("Already submitted a review for this product");

    const review = await Review.create(req.body);

    return res.status(201).send(review);
  } catch (err) {
    console.log(err.message);
    return res.status(400).send({ error: err.message });
  }
};

const updateReview = async (req, res) => {
  try {
    const { id: reviewId } = req.params;
    const { rating, title, comment } = req.body;

    const review = await Review.findById(reviewId);

    if (!review) throw new Error(`No review with id ${reviewId}`);

    const permission = checkPermission(req.user, review.user);
    if (!permission)
      return res.status(401).send("You do not have permission to update");

    if (rating) review.rating = rating;
    if (title) review.title = title;
    if (comment) review.comment = comment;

    await review.save();

    res.status(200).send({ review });
  } catch (err) {
    console.log(err.message);
    return res.status(404).send({ error: err.message });
  }
};

const deleteReview = async (req, res) => {
  try {
    const { id: reviewId } = req.params;

    const review = await Review.findOne({ _id: reviewId });
    if (!review) throw new Error(`No review with id ${reviewId}`);

    const permission = checkPermission(req.user, review.user);
    if (!permission)
      return res.status(401).send("You do not have permission to delete");

    await review.deleteOne();

    return res.status(200).send({ review });
  } catch (err) {
    console.log(err.message);
    return res.status(404).send({ error: err.message });
  }
};

const getSingleProductReviews = async (req, res) => {
  const { id: productId } = req.params;

  const reviews = await Review.find({ product: productId });

  res.status(200).send({ reviews, count: reviews.length });
};

module.exports = {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
  getSingleProductReviews,
};
