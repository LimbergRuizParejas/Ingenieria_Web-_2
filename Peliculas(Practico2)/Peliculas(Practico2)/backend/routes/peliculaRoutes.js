const express = require('express');
const router = express.Router();
const peliculaController = require('../controllers/peliculaController');

router.get('/', peliculaController.obtenerTodas);
router.get('/:id', peliculaController.obtenerPorId);
router.post('/', peliculaController.crear);
router.put('/:id', peliculaController.actualizar);
router.delete('/:id', peliculaController.eliminar);

module.exports = router;
