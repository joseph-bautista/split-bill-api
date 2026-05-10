const bcrypt = require("bcryptjs");

const { Op } = require("sequelize");

const { User, Friend } = require("../models");

exports.index = async (req, res) => {

  try {

    const users = await User.findAll({
      where: {
        id: {
          [Op.ne]: req.user.id
        }
      },

      attributes: {
        exclude: ["password"]
      }
    });

    res.json({
      success: true,
      data: users
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }


};

exports.show = async (req, res) => {

  try {

    const { id } = req.params;

    const user = await User.findByPk(id, {
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

exports.addOrCancelFriendRequest = async (req, res) => {

  try {

    const authenticatedUserId = req.user.id;

    const { friendUserId } = req.params;

    if (authenticatedUserId === friendUserId) {
      return res.status(400).json({
        success: false,
        message: "You cannot add yourself"
      });
    }

    const user = await User.findByPk(friendUserId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    const existingFriendRequest = await Friend.findOne({
      where: {
        main_user_id: authenticatedUserId,
        friend_user_id: friendUserId
      }
    });

    if (existingFriendRequest) {

      await existingFriendRequest.destroy();

      const reciprocalFriendRequest = await Friend.findOne({
        where: {
          main_user_id: friendUserId,
          friend_user_id: authenticatedUserId
        }
      });

      await reciprocalFriendRequest.destroy();

      return res.json({
        success: true,
        message: "Friend request canceled"
      });

    }

    // CREATE FRIEND REQUEST
    const friendRequest = await Friend.create({
      main_user_id: authenticatedUserId,
      friend_user_id: friendUserId,
      status: "requested"
    });

    await Friend.create({
      main_user_id: friendUserId,
      friend_user_id: authenticatedUserId,
      status: "received"
    });

    res.status(201).json({
      success: true,
      message: "Friend request sent",
      data: friendRequest
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }

};

exports.deleteFriend = async (req, res) => {

  try {

    const authenticatedUserId = req.user.id;

    const { friendUserId } = req.params;

    if (authenticatedUserId === friendUserId) {
      return res.status(400).json({
        success: false,
        message: "You cannot delete yourself"
      });
    }

    const user = await User.findByPk(friendUserId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    const existingFriend = await Friend.findOne({
      where: {
        main_user_id: authenticatedUserId,
        friend_user_id: friendUserId
      }
    });

    if (existingFriend) {

      await existingFriend.destroy();
      const reciprocalFriend = await Friend.findOne({
        where: {
            main_user_id: friendUserId,
            friend_user_id: authenticatedUserId
        }
      });
      
      await reciprocalFriend.destroy();

      return res.json({
        success: true,
        message: "Friend deleted"
      });

    }

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }

};