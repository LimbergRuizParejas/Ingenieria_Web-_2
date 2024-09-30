const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Director = sequelize.define('Director', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  foto: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'directores',
  timestamps: false,
});

module.exports = Director;
