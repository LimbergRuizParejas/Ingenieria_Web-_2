'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('peliculas', 'director_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'directores', // Nombre de la tabla de directores
        key: 'id'
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('peliculas', 'director_id');
  }
};
