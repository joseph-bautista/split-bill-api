const express = require("express");
const router = express.Router();

const apiLimiter = require("../middleware/rateLimiter");

// Apply limiter to all routes here
router.use(apiLimiter);

// GET /api/users
router.get("/", (req, res) => {
  res.json({
    success: true,
    data: [
      { id: 1, name: "John" },
      { id: 2, name: "Jane" }
    ]
  });
});

// POST /api/users
router.post("/", (req, res) => {
  const { name } = req.body;

  res.status(201).json({
    success: true,
    message: "User created",
    user: {
      id: Date.now(),
      name
    }
  });
});

module.exports = router;