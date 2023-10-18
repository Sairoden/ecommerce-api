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
  return res.status(201).send("Create Order");
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
