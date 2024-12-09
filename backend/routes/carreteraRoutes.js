const express = require('express');
const router = express.Router();
const { getAllCarreteras, createCarretera, updateCarretera, deleteCarretera } = require('../controllers/carreteraController');
const { authenticate } = require('../middleware/authMiddleware');

// Rutas para manejar carreteras
router.get('/', getAllCarreteras); // Obtener todas las carreteras
router.post('/', authenticate, createCarretera); // Crear nueva carretera
router.put('/:id', authenticate, updateCarretera); // Actualizar carretera existente
router.delete('/:id', authenticate, deleteCarretera); // Eliminar carretera

module.exports = router;
