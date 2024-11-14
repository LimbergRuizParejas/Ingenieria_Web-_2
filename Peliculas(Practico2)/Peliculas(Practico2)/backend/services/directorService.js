const Director = require('../models/director');

exports.obtenerDirectores = async () => {
  return await Director.findAll();
};

exports.obtenerDirectorPorId = async (id) => {
  return await Director.findByPk(id);
};

exports.crearDirector = async (directorData) => {
  return await Director.create(directorData);
};

exports.actualizarDirector = async (id, directorData) => {
  const director = await Director.findByPk(id);
  if (director) {
    return await director.update(directorData);
  }
  return null;
};

exports.eliminarDirector = async (id) => {
  const director = await Director.findByPk(id);
  if (director) {
    await director.destroy();
    return true;
  }
  return false;
};
