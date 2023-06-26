const express = require("express");
const {
  registerUser,
  authUser,
  allUsers,
} = require("../controller/userController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/login").post(authUser);
router.route("/").get(protect, allUsers).post(registerUser);
module.exports = router;
