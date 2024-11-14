const Pelicula = require('../models/pelicula');
const multer = require('multer');
const path = require('path');

// Configurar multer para almacenar archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

const peliculaController = {
  obtenerTodas: async (req, res) => {
    try {
      const peliculas = await Pelicula.obtenerTodas();
      res.json(peliculas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener las películas' });
    }
  },
  obtenerPorId: async (req, res) => {
    try {
      const pelicula = await Pelicula.obtenerPorId(req.params.id);
      res.json(pelicula);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener la película' });
    }
  },
  crear: [
    upload.single('imagen'),
    async (req, res) => {
      try {
        const { nombre, sinopsis, fecha_lanzamiento, calificacion, trailer, director_id } = req.body;
        const nuevaPelicula = await Pelicula.crear({
          nombre,
          sinopsis,
          imagen: req.file ? req.file.path : null,
          fecha_lanzamiento,
          calificacion,
          trailer,
          director_id: parseInt(director_id, 10) // Asegúrate de que director_id sea un número entero
        });
        res.json(nuevaPelicula);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear la película' });
      }
    },
  ],
  actualizar: [
    upload.single('imagen'),
    async (req, res) => {
      try {
        const { nombre, sinopsis, fecha_lanzamiento, calificacion, trailer, director_id } = req.body;
        const peliculaActualizada = await Pelicula.actualizar(req.params.id, {
          nombre,
          sinopsis,
          imagen: req.file ? req.file.path : null,
          fecha_lanzamiento,
          calificacion,
          trailer,
          director_id: parseInt(director_id, 10) // Asegúrate de que director_id sea un número entero
        });
        res.json(peliculaActualizada);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar la película' });
      }
    },
  ],
  eliminar: async (req, res) => {
    try {
      const peliculaEliminada = await Pelicula.eliminar(req.params.id);
      res.json(peliculaEliminada);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al eliminar la película' });
    }
  },
};

module.exports = peliculaController;
