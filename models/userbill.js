'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserBill extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserBill.belongsTo(sequelize.models.User, { foreignKey: 'user_id' });
      UserBill.belongsTo(sequelize.models.Bill, { foreignKey: 'bill_id' });
    }
  }
  UserBill.init({
    user_id: DataTypes.INTEGER,
    bill_id: DataTypes.INTEGER,
    percentage: DataTypes.DECIMAL(10, 2),
    sub_total_bill: DataTypes.DECIMAL(10, 2)
  }, {
    sequelize,
    modelName: 'UserBill',
    tableName: 'user_bills',
    underscored: true,
    freezeTableName: true,
    timestamps: true
  });
  
  return UserBill;
};