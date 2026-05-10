const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  index,
  show,
  store,
  update,
  destroy
} = require("../controllers/billController");

router.get("/", authMiddleware, index);

router.get("/:id", authMiddleware, show);

router.post("/", authMiddleware, store);

router.put("/:id", authMiddleware, update);

router.delete("/:id", authMiddleware, destroy);

module.exports = router;