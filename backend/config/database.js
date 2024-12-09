const { Sequelize } = require('sequelize');
require('dotenv').config();

// Configuración de la conexión a la base de datos
const sequelize = new Sequelize('SistemadeTransporte', process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'postgres'
});

sequelize.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.log('Error: ' + err));

module.exports = sequelize;
