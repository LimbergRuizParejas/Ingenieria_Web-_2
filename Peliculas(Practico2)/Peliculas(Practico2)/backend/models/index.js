const sequelize = require('../config/database');
const Actor = require('./actor');
const Director = require('./director');
const Pelicula = require('./pelicula');

// Configurar las asociaciones
Pelicula.belongsToMany(Actor, { through: 'pelicula_actor' });
Actor.belongsToMany(Pelicula, { through: 'pelicula_actor' });

module.exports = {
  sequelize,
  Actor,
  Director,
  Pelicula,
};
