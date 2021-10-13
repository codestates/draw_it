'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_post_passed extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      user_post_passed.belongsTo(models.User, { foreignKey: 'userId' });
      user_post_passed.belongsTo(models.Post, { foreignKey: 'postId' });
    }
  }
  user_post_passed.init(
    {
      userId: DataTypes.INTEGER,
      postId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'user_post_passed',
      timestamps: false,
    }
  );
  return user_post_passed;
};
