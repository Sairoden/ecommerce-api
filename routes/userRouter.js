// Express
const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} = require("../controllers/userController");

// Middlewares
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");

router
  .route("/")
  .get(authenticateUser, authorizePermissions("admin", "owner"), getAllUsers);

router.route("/showMe").get(showCurrentUser);
router.route("/updateUser").patch(authorizePermissions, updateUser);
router
  .route("/updateUserPassword")
  .patch(authorizePermissions, updateUserPassword);

router.route("/:id").get(authenticateUser, getSingleUser);

module.exports = router;
