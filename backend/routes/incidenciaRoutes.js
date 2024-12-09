const express = require('express');
const router = express.Router();
const incidenciaController = require('../controllers/incidenciaController');
const { authenticate } = require('../middleware/authMiddleware');

// Definición de rutas
router.get('/', authenticate, incidenciaController.getAllIncidentes);
router.post('/', authenticate, incidenciaController.createIncidente);
router.post('/reportar', authenticate, incidenciaController.reportarIncidente); // Nueva ruta para reportar
router.put('/:id', authenticate, incidenciaController.updateIncidente);
router.delete('/:id', authenticate, incidenciaController.deleteIncidente);
router.post('/:incidenteId/fotos', authenticate, incidenciaController.addFoto);
router.delete('/fotos/:id', authenticate, incidenciaController.deleteFoto);

module.exports = router;
