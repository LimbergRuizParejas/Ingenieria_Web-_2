const express = require('express');
const router = express.Router();
const pokemonController = require('../controllers/pokemonController');

router.post('/pokemon', pokemonController.createPokemon);
router.put('/pokemon/:id', pokemonController.updatePokemon);
router.delete('/pokemon/:id', pokemonController.deletePokemon);

module.exports = router;
