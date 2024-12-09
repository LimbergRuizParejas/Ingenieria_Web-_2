const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
  class Municipio extends Model {}

  Municipio.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Municipio',
  });

  return Municipio;
};
