const bcrypt = require("bcryptjs");

const { User, Bill, UserBill } = require("../models");

exports.index = async (req, res) => {

  try {

    const bills = await Bill.findAll({
        include: [
            {
            model: User,
            where: {
                id: req.user.id
            },
            through: {
                attributes: []
            },
            attributes: []
            }
        ]
    });

    res.json({
      success: true,
      data: bills
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

    const bill = await Bill.findOne({
      where: {
        id
      },

      include: [
        {
          model: User,

          where: {
            id: req.user.id
          },

          through: {
            attributes: []
          },

          attributes: []
        }
      ]
    });

    if (!bill) {
      return res.status(404).json({
        success: false,
        message: "Bill not found"
      });
    }

    res.json({
      success: true,
      data: bill
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }

};

exports.store = async (req, res) => {

  try {

    const {
      name
    } = req.body;

    const bill = await Bill.create({
      name,
      created_by: req.user.id
    });

    await UserBill.create({
      user_id: req.user.id,
      bill_id: bill.id,
      percentage: 100,
      sub_total_bill: 0
    });

    res.status(201).json({
      success: true,
      data: {
        id: bill.id,
        name: bill.name,
        total_bill: bill.total_bill
      }
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }

};

exports.update = async (req, res) => {

  try {

    const { id } = req.params;

    const bill = await Bill.findByPk(id);

    if (!bill) {
      return res.status(404).json({
        success: false,
        message: "Bill not found"
      });
    }

    const {
      name
    } = req.body;

    await bill.update({
      name
    });

    res.json({
      success: true,
      data: bill
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }

};

exports.destroy = async (req, res) => {

  try {

    const { id } = req.params;

    const bill = await Bill.findByPk(id);

    if (!bill) {
      return res.status(404).json({
        success: false,
        message: "Bill not found"
      });
    }

    await bill.destroy();

    res.json({
      success: true,
      message: "Bill deleted"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }

};

exports.addFriend = async (req, res) => {

  try {

    const {
      email,
      bill_id
    } = req.body;

    const friend = await User.findOne({
      where: {
        email
      },
    });

    if (!friend) {
      return res.status(404).json({
        success: false,
        message: "Friend not found"
      });
    }

    const bill = await Bill.findOne({
      where: {
        id: bill_id
      }
    });

    if (!bill) {
      return res.status(404).json({
        success: false,
        message: "Bill not found"
      });
    }

    // PREVENT DUPLICATES
    const existingParticipant = await UserBill.findOne({
      where: {
        user_id: friend.id,
        bill_id: bill.id
      }
    });

    if (existingParticipant) {
      return res.status(400).json({
        success: false,
        message: "User already added to bill"
      });
    }

    // ADD FRIEND TO BILL
    await UserBill.create({
      user_id: friend.id,
      bill_id: bill.id,
      percentage: 0,
      sub_total_bill: 0
    });

    // GET ALL PARTICIPANTS
    const participants = await UserBill.findAll({
      where: {
        bill_id: bill.id
      }
    });

    // SPLIT EQUALLY
    const percentage = 100 / participants.length;

    // UPDATE ALL PERCENTAGES
    for (const participant of participants) {

      await participant.update({
        percentage,
        sub_total_bill: percentage * bill.total_bill / 100
      });

    }

    res.status(201).json({
      success: true,
      data: {
        id: bill.id,
        name: bill.name,
        total_bill: bill.total_bill
      }
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }

};

exports.removeFriend = async (req, res) => {

  try {

    const {
      user_id,
      bill_id
    } = req.body;

    // FIND FRIEND
    const friend = await User.findOne({
      where: {
        id: user_id
      }
    });

    if (!friend) {
      return res.status(404).json({
        success: false,
        message: "Friend not found"
      });
    }

    // FIND BILL
    const bill = await Bill.findOne({
      where: {
        id: bill_id
      }
    });

    if (!bill) {
      return res.status(404).json({
        success: false,
        message: "Bill not found"
      });
    }

    // FIND PARTICIPANT
    const participant = await UserBill.findOne({
      where: {
        user_id: friend.id,
        bill_id: bill.id
      }
    });

    if (!participant) {
      return res.status(404).json({
        success: false,
        message: "User is not part of this bill"
      });
    }

    // OPTIONAL:
    // prevent removing bill creator

    if (friend.id === bill.created_by) {
      return res.status(400).json({
        success: false,
        message: "Bill creator cannot be removed"
      });
    }

    // REMOVE PARTICIPANT
    await participant.destroy();

    // GET REMAINING PARTICIPANTS
    const remainingParticipants = await UserBill.findAll({
      where: {
        bill_id: bill.id
      }
    });

    // RECALCULATE PERCENTAGES
    if (remainingParticipants.length > 0) {

      const percentage = parseFloat(
        (100 / remainingParticipants.length).toFixed(2)
      );

      for (const participant of remainingParticipants) {

        await participant.update({
          percentage,
          sub_total_bill: percentage * bill.total_bill / 100
        });

      }

    }

    res.json({
      success: true,
      message: "Friend removed from bill"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }

};