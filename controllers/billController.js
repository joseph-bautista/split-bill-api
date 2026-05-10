const bcrypt = require("bcryptjs");

const { User, Bill } = require("../models");

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