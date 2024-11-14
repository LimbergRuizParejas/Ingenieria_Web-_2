import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPokemonById } from '../services/pokemonService';
import '../PokemonDetail.css'; // Importa tu archivo CSS

function PokemonDetail() {
  const { id } = useParams(); // Utilizar useParams para obtener el id
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    const loadPokemon = async () => {
      const data = await fetchPokemonById(id);
      setPokemon(data);
    };
    loadPokemon();
  }, [id]);

  if (!pokemon) return <div>Cargando...</div>;

  // Calcular los valores máximos y mínimos en nivel 100
  const calculateStats = (base, stat) => {
    const min = Math.floor((2 * base + 0 + 0 + 100) * 100 / 100 + 10);
    const max = Math.floor((2 * base + 31 + Math.floor(252 / 4) + 100) * 100 / 100 + 10);
    return { min, max };
  };

  return (
    <div className="pokemon-detail">
      <h1>{pokemon.nombre}</h1>
      <img src={pokemon.imagen} alt={pokemon.nombre} />
      <p>Número de Pokédex: {pokemon.nroPokedex}</p>
      <p>Tipo: {pokemon.idTipo1} {pokemon.idTipo2}</p>
      <p>Habilidades: {pokemon.idHabilidad1}, {pokemon.idHabilidad2}, {pokemon.idHabilidad3}</p>
      <h2>Estadísticas Base</h2>
      <ul className="stats-list">
        <li><span>HP:</span> {pokemon.hp} (Min: {calculateStats(pokemon.hp, 'hp').min}, Max: {calculateStats(pokemon.hp, 'hp').max})</li>
        <li><span>Ataque:</span> {pokemon.attack} (Min: {calculateStats(pokemon.attack, 'attack').min}, Max: {calculateStats(pokemon.attack, 'attack').max})</li>
        <li><span>Defensa:</span> {pokemon.defense} (Min: {calculateStats(pokemon.defense, 'defense').min}, Max: {calculateStats(pokemon.defense, 'defense').max})</li>
        <li><span>Ataque Especial:</span> {pokemon.spattack} (Min: {calculateStats(pokemon.spattack, 'spattack').min}, Max: {calculateStats(pokemon.spattack, 'spattack').max})</li>
        <li><span>Defensa Especial:</span> {pokemon.spdefense} (Min: {calculateStats(pokemon.spdefense, 'spdefense').min}, Max: {calculateStats(pokemon.spdefense, 'spdefense').max})</li>
        <li><span>Velocidad:</span> {pokemon.speed} (Min: {calculateStats(pokemon.speed, 'speed').min}, Max: {calculateStats(pokemon.speed, 'speed').max})</li>
      </ul>
      <h2>Línea Evolutiva</h2>
      <div className="evolution-line">
        {pokemon.idEvPrevia && (
          <div className="evolution-step">
            <img src={pokemon.idEvPrevia.imagen} alt={pokemon.idEvPrevia.nombre} />
            <p>{pokemon.idEvPrevia.nombre}</p>
            <p>Nivel: {pokemon.idEvPrevia.nivelEvolution}</p>
          </div>
        )}
        <div className="current-pokemon evolution-step">
          <img src={pokemon.imagen} alt={pokemon.nombre} />
          <p>{pokemon.nombre}</p>
        </div>
        {pokemon.idEvSiguiente && (
          <div className="evolution-step">
            <img src={pokemon.idEvSiguiente.imagen} alt={pokemon.idEvSiguiente.nombre} />
            <p>{pokemon.idEvSiguiente.nombre}</p>
            <p>Nivel: {pokemon.idEvSiguiente.nivelEvolution}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default PokemonDetail;
