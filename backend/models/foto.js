const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
  class Foto extends Model {}

  Foto.init({
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    incidenteId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Incidencias', // Asegúrate de que el modelo `Incidencia` está correctamente definido
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Foto',
  });

  return Foto;
};
