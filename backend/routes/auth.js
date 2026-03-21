const express = require("express");
const router = express.Router();
const {
  forgotPassword,
  verifyToken,
  resetPassword,
} = require("../controllers/authController");

router.post("/forgot-password", forgotPassword);
router.get("/verify/:token", verifyToken);
router.post("/reset/:token", resetPassword);

module.exports = router;