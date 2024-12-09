const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
  class ChangeLog extends Model {}

  ChangeLog.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    entity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    entityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    action: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    timestamp: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    sequelize,
    modelName: 'ChangeLog',
  });

  return ChangeLog;
};
