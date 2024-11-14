const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Pelicula extends Model {
  static async obtenerTodas() {
    return await Pelicula.findAll();
  }

  static async crear(data) {
    return await Pelicula.create(data);
  }

  static async obtenerPorId(id) {
    return await Pelicula.findByPk(id);
  }

  static async actualizar(id, data) {
    const pelicula = await Pelicula.findByPk(id);
    if (pelicula) {
      return await pelicula.update(data);
    }
    return null;
  }

  static async eliminar(id) {
    const pelicula = await Pelicula.findByPk(id);
    if (pelicula) {
      await pelicula.destroy();
      return pelicula;
    }
    return null;
  }
}

Pelicula.init({
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sinopsis: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  imagen: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  fecha_lanzamiento: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  calificacion: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  trailer: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  director_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Pelicula',
  tableName: 'peliculas',
  timestamps: false,
});

module.exports = Pelicula;
