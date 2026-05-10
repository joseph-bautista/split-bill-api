const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  myProfile,
  myFriends,
  friendRequests,
  updateFriendRequest
} = require("../controllers/profileController");

router.get("/my_profile", authMiddleware, myProfile);

router.get("/my_friends", authMiddleware, myFriends);

router.get("/friend_requests", authMiddleware, friendRequests);

router.post("/friends", authMiddleware, updateFriendRequest);

module.exports = router;