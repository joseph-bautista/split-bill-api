'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Item.belongsTo(sequelize.models.Bill, { foreignKey: 'bill_id' });
    }
  }
  Item.init({
    name: DataTypes.STRING,
    bill_id: DataTypes.INTEGER,
    price: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Item',
    tableName: 'items',
    underscored: true,
    freezeTableName: true,
    timestamps: true
  });
  return Item;
};