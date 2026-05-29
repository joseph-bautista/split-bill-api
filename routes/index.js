const express = require("express");

const router = express.Router();
const apiLimiter = require("../middleware/rateLimiter");

router.use(apiLimiter);

router.get("/", (req, res) => {
  res.send("Welcome to SplitBill API");
});

module.exports = router;