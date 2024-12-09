'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Permitir valores NULL inicialmente
    await queryInterface.addColumn('Carreteras', 'path', {
      type: Sequelize.JSON,
      allowNull: true, // Permitir valores NULL inicialmente
    });

    // Actualizar los registros existentes con un valor por defecto
    await queryInterface.sequelize.query(`
      UPDATE "Carreteras"
      SET "path" = '[]'
      WHERE "path" IS NULL
    `);

    // Cambiar la columna para que no permita valores NULL
    await queryInterface.changeColumn('Carreteras', 'path', {
      type: Sequelize.JSON,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Carreteras', 'path');
  }
};
