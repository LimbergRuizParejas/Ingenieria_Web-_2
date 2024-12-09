const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
  class Carretera extends Model {}

  Carretera.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    municipio_origen: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    municipio_destino: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    razon_bloqueo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    path: {
      type: DataTypes.JSON,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Carretera',
  });

  return Carretera;
};
