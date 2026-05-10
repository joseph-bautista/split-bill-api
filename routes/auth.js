const express = require("express");

const router = express.Router();
const apiLimiter = require("../middleware/rateLimiter");
const authMiddleware = require("../middleware/authMiddleware");

router.use(apiLimiter);

const {
  register,
  login,
  logout
} = require("../controllers/authController");

router.post("/register", register);

router.post("/login", login);

router.post("/logout", authMiddleware, logout);

module.exports = router;