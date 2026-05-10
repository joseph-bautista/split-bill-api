const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  index,
  show,
  store,
  update,
  destroy,
  addFriend,
  removeFriend
} = require("../controllers/billController");

router.get("/", authMiddleware, index);

router.get("/:id", authMiddleware, show);

router.post("/", authMiddleware, store);

router.put("/:id", authMiddleware, update);

router.delete("/:id", authMiddleware, destroy);

router.post("/:bill_id/friends", authMiddleware, addFriend);

router.delete("/:bill_id/friends", authMiddleware, removeFriend);

module.exports = router;