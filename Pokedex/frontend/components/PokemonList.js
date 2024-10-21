import React, { useEffect, useState } from 'react';
import { fetchPokemons } from '../services/pokemonService';
import SearchBar from './SearchBar';
import { Link } from 'react-router-dom';
import '../PokemonList.css'; // Importa tu archivo CSS

function PokemonList() {
  const [pokemons, setPokemons] = useState([]);
  const [searchTerms, setSearchTerms] = useState({
    name: '',
    pokedexNumber: '',
    type: ''
  });

  useEffect(() => {
    loadPokemons();
  }, []);

  const loadPokemons = async () => {
    const data = await fetchPokemons();
    setPokemons(data);
  };

  const handleSearch = (name, value) => {
    setSearchTerms((prevTerms) => ({
      ...prevTerms,
      [name]: value
    }));
  };

  const filteredPokemons = pokemons.filter((pokemon) => {
    const nameMatch = pokemon.nombre?.toLowerCase().includes(searchTerms.name.toLowerCase()) ?? true;
    const pokedexMatch = searchTerms.pokedexNumber ? pokemon.nroPokedex?.toString().includes(searchTerms.pokedexNumber) : true;
    const typeMatch = searchTerms.type ?
      (pokemon.idTipo1?.toString().includes(searchTerms.type) || pokemon.idTipo2?.toString().includes(searchTerms.type)) : true;

    return nameMatch && pokedexMatch && typeMatch;
  });

  return (
    <div className="pokemon-list">
      <h1>Lista de Pokémon</h1>
      <SearchBar onSearch={handleSearch} />
      <ul className="pokemon-grid">
        {filteredPokemons.map((pokemon) => (
          <li key={pokemon.id} className="pokemon-card">
            <Link to={`/pokemon/${pokemon.id}`}>
              {pokemon.imagen && (
                <img
                  src={pokemon.imagen}
                  alt={pokemon.nombre}
                  width="200px"
                  height="auto"
                />
              )}
              <span>{pokemon.nombre}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PokemonList;
