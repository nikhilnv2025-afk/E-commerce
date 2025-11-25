const express = require("express");
const User = require("../models/User");
const {protect,admin} = require("../middleware/authMiddleware")

const router = express.Router();

// @route GET /api/users
// @desc Get all users (admin only)
// @access Private/Admin
router.get("/", protect, admin , async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
