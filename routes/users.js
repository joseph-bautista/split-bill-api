const express = require("express");

const router = express.Router();
const apiLimiter = require("../middleware/rateLimiter");
const authMiddleware = require("../middleware/authMiddleware");

router.use(apiLimiter);

const {
  index,
  show,
  addOrCancelFriendRequest,
  deleteFriend
} = require("../controllers/userController");

router.get("/", authMiddleware, index);

router.get("/:id", authMiddleware, show);

router.post("/:id/friend-request", authMiddleware, addOrCancelFriendRequest);

router.delete("/:id/friend", authMiddleware, deleteFriend);

module.exports = router;