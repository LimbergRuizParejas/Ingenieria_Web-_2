const express = require('express');
const router = express.Router();
const directorController = require('../controllers/directorController');

router.post('/', directorController.crear);
router.get('/', directorController.obtenerTodos);
router.get('/:id', directorController.obtenerPorId);
router.put('/:id', directorController.actualizar);
router.delete('/:id', directorController.eliminar);

module.exports = router;
