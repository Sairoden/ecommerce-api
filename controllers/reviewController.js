const createReview = async (req, res) => {
  return res.status(201).send("Create Review");
};

const getAllReviews = async (req, res) => {
  return res.status(200).send("Get All Reviews");
};

const getSingleReview = async (req, res) => {
  return res.status(200).send("Get Single Review");
};

const updateReview = async (req, res) => {
  return res.status(200).send("Update Review");
};

const deleteReview = async (req, res) => {
  return res.status(200).send("Delete Review");
};

module.exports   = {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
};
