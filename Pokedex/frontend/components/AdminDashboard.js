import React, { useState, useEffect } from 'react';
import { fetchPokemons, deletePokemon } from '../services/pokemonService';
import AdminPokemonForm from './AdminPokemonForm';
import '../adminDashboard.css';

function AdminDashboard() {
  const [pokemons, setPokemons] = useState([]);
  const [selectedPokemonId, setSelectedPokemonId] = useState(null);

  useEffect(() => {
    loadPokemons();
  }, []);

  const loadPokemons = async () => {
    const data = await fetchPokemons();
    setPokemons(data);
  };

  const handleSelectPokemon = (pokemon) => {
    setSelectedPokemonId(pokemon.id);
  };

  const handleSave = () => {
    setSelectedPokemonId(null);
    loadPokemons();
  };

  const handleDelete = async (id) => {
    try {
      await deletePokemon(id);
      loadPokemons();
    } catch (error) {
      console.error('Error al eliminar el Pokémon:', error);
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Crea Tu Pokemon</h1>
      <AdminPokemonForm pokemonId={selectedPokemonId} onSave={handleSave} onDelete={handleDelete} />
      <h2>Listado de Pokémon</h2>
      <ul className="pokemon-list">
        {pokemons.map((pokemon) => (
          <li key={pokemon.id} className="pokemon-card">
            <img src={pokemon.imagen} alt={pokemon.nombre} className="pokemon-image" />
            <div className="pokemon-info">
              <span>{pokemon.nombre}</span>
              <div className="pokemon-buttons">
                <button className="edit-button" onClick={() => handleSelectPokemon(pokemon)}>Editar</button>
                <button className="delete-button" onClick={() => handleDelete(pokemon.id)}>Eliminar</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminDashboard;
