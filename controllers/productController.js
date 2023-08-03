// Libray
const path = require("path");

// Model
const Product = require("../models/productModel");

const createProduct = async (req, res) => {
  try {
    req.body.user = req.user.userId;

    const product = await Product.create(req.body);

    return res.status(201).send({ product });
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

const getAllProducts = async (req, res) => {
  const products = await Product.find().populate({
    path: "user",
    select: "name",
  });

  if (!products)
    return res.status(400).send({ msg: "There are no products available" });

  return res.status(200).send({ products, count: products.length });
};

const getSingleProduct = async (req, res) => {
  const { id: productId } = req.params;

  const product = await Product.findById(productId).populate("reviews");

  if (!product)
    return res
      .status(400)
      .send({ msg: "No product for the given id", productId });

  return res.status(200).send({ product });
};

const updateProduct = async (req, res) => {
  const { id: productId } = req.params;

  const product = await Product.findByIdAndUpdate(productId, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product)
    return res
      .status(400)
      .send({ msg: "No product for the given id", productId });

  return res.status(200).send(product);
};

const deleteProduct = async (req, res) => {
  const { id: productId } = req.params;

  const product = await Product.findOneAndDelete({ _id: productId });

  if (!product) {
    return res
      .status(400)
      .send({ msg: "No product for the given id", productId });
  }

  return res.status(200).send({ msg: "Success! Product removed" });
};

const uploadImage = async (req, res) => {
  if (!req.file) return res.status(400).send({ msg: "No File Uploaded" });

  const productImage = req.file;

  if (!productImage.mimetype.startsWith("image"))
    return res.status(400).send({ msg: "Please upload image" });

  const maxSize = 1024 * 1024;

  if (productImage.size > maxSize)
    return res
      .status(400)
      .send({ msg: "Please upload image smaller than 1mb" });

  return res.status(200).send({ image: `/uploads/${productImage.filename}` });
};

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
};
