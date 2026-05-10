'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(sequelize.models.Friend, { foreignKey: 'user_id' });  
      User.hasMany(sequelize.models.Bill, { foreignKey: 'created_by' });
      User.belongsToMany(sequelize.models.Bill, {
        through: sequelize.models.UserBill,
        foreignKey: 'user_id',
        otherKey: 'bill_id'
      });
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    underscored: true,
    freezeTableName: true,
    timestamps: true
  });
  return User;
};