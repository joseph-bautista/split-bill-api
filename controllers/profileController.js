const bcrypt = require("bcryptjs");

const { User, Bill, UserBill, Friend } = require("../models");

exports.myProfile = async (req, res) => {

  try {

    const user = await User.findByPk(req.user.id, {
      attributes: {
        exclude: ["password"]
      }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.json({
      success: true,
      data: user
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }

};

exports.myFriends = async (req, res) => {

  try {

    const friends = await Friend.findAll({
      where: {
        main_user_id: req.user.id,
        status: "friends"
      },

      include: [
        {
          model: User,
          as: "friend",

          attributes: {
            exclude: ["password"]
          }
        }
      ]
    });

    res.json({
      success: true,
      data: friends
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }

};

exports.friendRequests = async (req, res) => {

  try {

    const friendRequests = await Friend.findAll({
      where: {
        main_user_id: req.user.id,
        status: "received"
      },

      include: [
        {
          model: User,
          as: "friend",

          attributes: {
            exclude: ["password"]
          }
        }
      ]
    });

    res.json({
      success: true,
      data: friendRequests
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }

};

exports.updateFriendRequest = async (req, res) => {

  try {

    const {
      action,
      friend_user_id
    } = req.body;

    const authenticatedUserId = req.user.id;

    // FIND CURRENT USER RECORD
    const currentUserFriend = await Friend.findOne({
      where: {
        main_user_id: authenticatedUserId,
        friend_user_id
      }
    });

    // FIND OTHER USER RECORD
    const otherUserFriend = await Friend.findOne({
      where: {
        main_user_id: friend_user_id,
        friend_user_id: authenticatedUserId
      }
    });

    if (!currentUserFriend || !otherUserFriend) {
      return res.status(404).json({
        success: false,
        message: "Friend request not found"
      });
    }

    // ACCEPT
    if (action === "accept") {

      await currentUserFriend.update({
        status: "friends"
      });

      await otherUserFriend.update({
        status: "friends"
      });

      return res.json({
        success: true,
        message: "Friend request accepted"
      });

    }

    // REJECT OR DELETE
    if (
      action === "reject" ||
      action === "delete"
    ) {

      await currentUserFriend.destroy();

      await otherUserFriend.destroy();

      return res.json({
        success: true,
        message:
          action === "reject"
            ? "Friend request rejected"
            : "Friend deleted"
      });

    }

    return res.status(400).json({
      success: false,
      message: "Invalid action"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }

};
