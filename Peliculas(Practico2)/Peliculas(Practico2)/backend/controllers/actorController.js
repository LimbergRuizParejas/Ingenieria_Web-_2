const Actor = require('../models/actor');

const actorController = {
  obtenerTodos: async (req, res) => {
    try {
      const actores = await Actor.obtenerTodos();
      res.json(actores);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener los actores' });
    }
  },
  obtenerPorId: async (req, res) => {
    try {
      const actor = await Actor.obtenerPorId(req.params.id);
      res.json(actor);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener el actor' });
    }
  },
  crear: async (req, res) => {
    try {
      const nuevoActor = await Actor.crear(req.body);
      res.json(nuevoActor);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al crear el actor' });
    }
  },
  actualizar: async (req, res) => {
    try {
      const actorActualizado = await Actor.actualizar(req.params.id, req.body);
      res.json(actorActualizado);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al actualizar el actor' });
    }
  },
  eliminar: async (req, res) => {
    try {
      const actorEliminado = await Actor.eliminar(req.params.id);
      res.json(actorEliminado);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al eliminar el actor' });
    }
  },
};

module.exports = actorController;
