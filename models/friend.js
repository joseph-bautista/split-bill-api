'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Friend extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Friend.belongsTo(sequelize.models.User, { foreignKey: 'main_user_id' });
      Friend.belongsTo(sequelize.models.User, { foreignKey: 'friend_user_id' });
    }
  }
  Friend.init({
    main_user_id: DataTypes.INTEGER,
    friend_user_id: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Friend',
    tableName: 'friends',
    underscored: true,
    freezeTableName: true,
    timestamps: true
  });
  return Friend;
};