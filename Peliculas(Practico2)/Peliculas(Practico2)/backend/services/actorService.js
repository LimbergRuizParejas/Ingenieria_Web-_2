const Actor = require('../models/actor');

exports.obtenerActores = async () => {
  return await Actor.findAll();
};

exports.obtenerActorPorId = async (id) => {
  return await Actor.findByPk(id);
};

exports.crearActor = async (actorData) => {
  return await Actor.create(actorData);
};

exports.actualizarActor = async (id, actorData) => {
  const actor = await Actor.findByPk(id);
  if (actor) {
    return await actor.update(actorData);
  }
  return null;
};

exports.eliminarActor = async (id) => {
  const actor = await Actor.findByPk(id);
  if (actor) {
    await actor.destroy();
    return true;
  }
  return false;
};
