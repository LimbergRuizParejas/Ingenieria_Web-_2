const Director = require('../models/director');

const directorController = {
  obtenerTodos: async (req, res) => {
    try {
      const directores = await Director.findAll();
      res.json(directores);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los directores' });
    }
  },
  obtenerPorId: async (req, res) => {
    try {
      const director = await Director.findByPk(req.params.id);
      res.json(director);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener el director' });
    }
  },
  crear: async (req, res) => {
    try {
      const nuevoDirector = await Director.create(req.body);
      res.json(nuevoDirector);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear el director' });
    }
  },
  actualizar: async (req, res) => {
    try {
      const directorActualizado = await Director.update(req.body, {
        where: { id: req.params.id },
      });
      res.json(directorActualizado);
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar el director' });
    }
  },
  eliminar: async (req, res) => {
    try {
      await Director.destroy({
        where: { id: req.params.id },
      });
      res.json({ mensaje: 'Director eliminado' });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar el director' });
    }
  },
};

module.exports = directorController;
