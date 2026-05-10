'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bill extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Bill.belongsToMany(sequelize.models.User, {
        through: sequelize.models.UserBill,
        foreignKey: 'bill_id',
        otherKey: 'user_id'
      });
      Bill.hasMany(sequelize.models.Item, { foreignKey: 'bill_id' });
      Bill.belongsTo(sequelize.models.User, { foreignKey: 'created_by' });
    }
  }
  Bill.init({
    name: DataTypes.STRING,
    total_bill: DataTypes.DECIMAL(10, 2)
  }, {
    sequelize,
    modelName: 'Bill',
    tableName: 'bills',
    underscored: true,
    freezeTableName: true,
    timestamps: true
  });
  
  return Bill;
};