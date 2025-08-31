const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../../controllers/auth-controller");
const { authMiddleware } = require("../../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);

// Admin login
router.post("/login", loginUser);

// Admin logout
router.post("/logout", logoutUser);

// Check authentication (only admin allowed)
router.get("/check-auth", authMiddleware, (req, res) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    message: "Authenticated admin!",
    user,
  });
});

module.exports = router;
