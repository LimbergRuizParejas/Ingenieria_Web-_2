const express = require('express');
const actorController = require('../controllers/actorController');

const router = express.Router();

router.get('/', actorController.obtenerTodos);
router.get('/:id', actorController.obtenerPorId);
router.post('/', actorController.crear);
router.put('/:id', actorController.actualizar);
router.delete('/:id', actorController.eliminar);

module.exports = router;
