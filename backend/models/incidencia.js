const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
  class Incidencia extends Model {}

  Incidencia.init({
    tipo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    carretera_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    foto: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ubicacion: {
      type: DataTypes.GEOGRAPHY('POINT'), // Ajusta esto según el tipo de datos de tu base de datos
      allowNull: false,
    },
    detalle: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Incidencia',
  });

  return Incidencia;
};
