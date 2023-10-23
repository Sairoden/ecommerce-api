const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const { checkPermission } = require("../utils");

const fakeStripeAPI = async ({ amount, currency }) => {
  const client_secret = "someRandomValue";
  return { client_secret, amount };
};

const getAllOrders = async (req, res) => {
  return res.status(200).send("Get All Orders");
};

const getSingleOrder = async (req, res) => {
  return res.status(201).send("Get Order");
};

const getCurrentUserOrders = async (req, res) => {
  return res.status(200).send("Get Current User Orders");
};

const createOrder = async (req, res) => {
  try {

    const { items: cartItems, tax, shippingFee } = req.body;

    if (!cartItems || cartItems.length < 1)
      throw new Error("No cart items provided");

    if (!tax || !shippingFee)
      throw new Error("Please provide tax and shipping fee");

    let orderItems = [];
    let subTotal = 0;

    for (let item of cartItems) {
      const dbProduct = await Product.findOne({ _id: item.product });

      if (!dbProduct) throw new Error(`No product with id: ${dbProduct.id}`);

      const { name, price, image, _id } = dbProduct;
      const singleOrderItem = {
        amount: item.amount,
        name,
        price,
        image,
        product: _id,
      };

      // Add item to orders
      orderItems.push(singleOrderItem);

      // Calculate subtotal
      subTotal += item.amount * price;
    }

    // Calculate Total
    const total = subTotal + tax + shippingFee;

    // Get Client Secret
    const paymentIntent = await fakeStripeAPI({
      amount: total,
      currency: "usd",
    });

    const order = await Order.create({
      orderItems,
      total,
      subTotal,
      tax,
      shippingFee,
      clientSecret: paymentIntent.client_secret,
      user: req.user.userId,
    });

    return res.status(201).send({ order, clientSecret: order.clientSecret });
  } catch (err) {
    console.log(err.message);
    return res.status(400).send({ error: err.message });
  }
};

const updateOrder = async (req, res) => {
  return res.status(200).send("Update Order");
};

module.exports = {
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  createOrder,
  updateOrder,
};
