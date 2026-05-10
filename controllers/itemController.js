const bcrypt = require("bcryptjs");

const { User, Bill, UserBill, Item } = require("../models");

exports.index = async (req, res) => {

  try {

    const { bill_id } = req.params;

    // VERIFY ACCESS TO BILL
    const bill = await Bill.findOne({
      where: {
        id: bill_id
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

    // GET ITEMS
    const items = await Item.findAll({
      where: {
        bill_id
      }
    });

    res.json({
      success: true,
      data: items
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

    const { id, bill_id } = req.params;

    // VERIFY ACCESS TO BILL
    const bill = await Bill.findOne({
      where: {
        id: bill_id
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
    const item = await Item.findOne({
      where: {
        id
      },
    });

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found"
      });
    }

    res.json({
      success: true,
      data: item
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
      bill_id,
      name,
      price
    } = req.body;

    // VERIFY ACCESS TO BILL
    const bill = await Bill.findOne({
      where: {
        id: bill_id
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

    const item = await Item.create({
      bill_id,
      name,
      price
    });

    // GET ALL ITEMS
    const items = await Item.findAll({
      where: {
        bill_id
      }
    });

    // COMPUTE TOTAL BILL
    const totalBill = items.reduce((sum, item) => {
      return sum + parseFloat(item.price);
    }, 0);

    // UPDATE BILL TOTAL
    await bill.update({
      total_bill: totalBill
    });

    // GET PARTICIPANTS
    const participants = await UserBill.findAll({
      where: {
        bill_id
      }
    });

    // UPDATE SUBTOTALS
    for (const participant of participants) {

      const subtotal =
        totalBill * (participant.percentage / 100);

      await participant.update({
        sub_total_bill: parseFloat(
          subtotal.toFixed(2)
        )
      });

    }

    res.status(201).json({
      success: true,
      data: {
        item,
        total_bill: totalBill
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

    const {
      name,
      price
    } = req.body;

    // FIND ITEM
    const item = await Item.findByPk(id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found"
      });
    }

    // VERIFY ACCESS TO BILL
    const bill = await Bill.findOne({
      where: {
        id: item.bill_id
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

    // UPDATE ITEM
    await item.update({
      name,
      price
    });

    // GET ALL ITEMS
    const items = await Item.findAll({
      where: {
        bill_id: bill.id
      }
    });

    // COMPUTE TOTAL BILL
    const totalBill = items.reduce((sum, item) => {
      return sum + parseFloat(item.price);
    }, 0);

    // UPDATE BILL TOTAL
    await bill.update({
      total_bill: totalBill
    });

    // GET PARTICIPANTS
    const participants = await UserBill.findAll({
      where: {
        bill_id: bill.id
      }
    });

    // UPDATE SUBTOTALS
    for (const participant of participants) {

      const subtotal =
        totalBill * (participant.percentage / 100);

      await participant.update({
        sub_total_bill: parseFloat(
          subtotal.toFixed(2)
        )
      });

    }

    res.json({
      success: true,
      data: {
        item,
        total_bill: totalBill
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

exports.destroy = async (req, res) => {

  try {

    const { id } = req.params;

    // FIND ITEM
    const item = await Item.findByPk(id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found"
      });
    }

    // VERIFY ACCESS TO BILL
    const bill = await Bill.findOne({
      where: {
        id: item.bill_id
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

    // DELETE ITEM
    await item.destroy();

    // GET REMAINING ITEMS
    const items = await Item.findAll({
      where: {
        bill_id: bill.id
      }
    });

    // RECALCULATE TOTAL BILL
    const totalBill = items.reduce((sum, item) => {
      return sum + parseFloat(item.price);
    }, 0);

    // UPDATE BILL TOTAL
    await bill.update({
      total_bill: totalBill
    });

    // GET PARTICIPANTS
    const participants = await UserBill.findAll({
      where: {
        bill_id: bill.id
      }
    });

    // UPDATE SUBTOTALS
    for (const participant of participants) {

      const subtotal =
        totalBill * (participant.percentage / 100);

      await participant.update({
        sub_total_bill: parseFloat(
          subtotal.toFixed(2)
        )
      });

    }

    res.json({
      success: true,
      message: "Item deleted",
      total_bill: totalBill
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }

};