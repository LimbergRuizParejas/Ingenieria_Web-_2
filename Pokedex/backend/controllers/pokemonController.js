const Pokemon = require('../models/pokemonModel');

exports.getAllPokemons = async (req, res) => {
  try {
    const pokemons = await Pokemon.getAll();
    res.json(pokemons);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the Pokemons' });
  }
};

exports.getPokemonById = async (req, res) => {
  try {
    const pokemon = await Pokemon.getById(req.params.id);
    if (!pokemon) {
      return res.status(404).json({ error: 'Pokemon not found' });
    }
    res.json(pokemon);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the Pokemon' });
  }
};

exports.createPokemon = async (req, res) => {
  try {
    const { nombre, nroPokedex, idHabilidad1, idHabilidad2, idHabilidad3, idTipo1, idTipo2, descripcion, hp, attack, defense, spattack, spdefense, speed, nivelEvolution, idEvPrevia, idEvSiguiente, imagen } = req.body;

    const newPokemon = await Pokemon.create({
      nombre,
      nroPokedex,
      idHabilidad1: idHabilidad1 || null,
      idHabilidad2: idHabilidad2 || null,
      idHabilidad3: idHabilidad3 || null,
      idTipo1: idTipo1 || null,
      idTipo2: idTipo2 || null,
      descripcion,
      hp,
      attack,
      defense,
      spattack,
      spdefense,
      speed,
      nivelEvolution,
      idEvPrevia: idEvPrevia || null,
      idEvSiguiente: idEvSiguiente || null,
      imagen
    });
    res.json(newPokemon);
  } catch (error) {
    res.status(400).json({ error: 'An error occurred while creating the Pokemon' });
  }
};

exports.updatePokemon = async (req, res) => {
  try {
    const { nombre, nroPokedex, idHabilidad1, idHabilidad2, idHabilidad3, idTipo1, idTipo2, descripcion, hp, attack, defense, spattack, spdefense, speed, nivelEvolution, idEvPrevia, idEvSiguiente, imagen } = req.body;

    const updatedPokemon = await Pokemon.update(req.params.id, {
      nombre,
      nroPokedex,
      idHabilidad1: idHabilidad1 || null,
      idHabilidad2: idHabilidad2 || null,
      idHabilidad3: idHabilidad3 || null,
      idTipo1: idTipo1 || null,
      idTipo2: idTipo2 || null,
      descripcion,
      hp,
      attack,
      defense,
      spattack,
      spdefense,
      speed,
      nivelEvolution,
      idEvPrevia: idEvPrevia || null,
      idEvSiguiente: idEvSiguiente || null,
      imagen
    });
    res.json(updatedPokemon);
  } catch (error) {
    res.status(400).json({ error: 'An error occurred while updating the Pokemon' });
  }
};

exports.deletePokemon = async (req, res) => {
  try {
    await Pokemon.delete(req.params.id);
    res.json({ message: 'Pokemon deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the Pokemon' });
  }
};
