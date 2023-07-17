const Product = require("../models/productModel");

const createProduct = async (req, res) => {
  try {
    req.body.user = req.user.userId;

    const product = await Product.create(req.body);

    return res.status(200).send({ product });
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

const getAllProducts = (req, res) => {
  return res.status(200).send("Get All Products");
};

const getSingleProduct = (req, res) => {
  return res.status(200).send("Get Single Product");
};

const updateProduct = (req, res) => {
  return res.status(200).send("Update Product");
};

const deleteProduct = (req, res) => {
  return res.status(200).send("Delete Product");
};

const uploadImage = (req, res) => {
  return res.status(200).send("Upload Image");
};

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
};
