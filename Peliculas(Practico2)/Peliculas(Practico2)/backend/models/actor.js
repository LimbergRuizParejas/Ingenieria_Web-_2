const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Actor extends Model {
  static async obtenerTodos() {
    return await Actor.findAll();
  }

  static async crear(data) {
    return await Actor.create(data);
  }

  static async obtenerPorId(id) {
    return await Actor.findByPk(id);
  }

  static async actualizar(id, data) {
    const actor = await Actor.findByPk(id);
    if (actor) {
      return await actor.update(data);
    }
    return null;
  }

  static async eliminar(id) {
    const actor = await Actor.findByPk(id);
    if (actor) {
      await actor.destroy();
      return actor;
    }
    return null;
  }
}

Actor.init({
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fecha_nacimiento: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  nacionalidad: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Actor',
  tableName: 'actores',
  timestamps: false,
});

module.exports = Actor;
