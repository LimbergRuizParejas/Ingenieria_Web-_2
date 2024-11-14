import React, { useState, useEffect } from 'react';
import { obtenerPeliculas } from '../services/peliculaService';

const PeliculaLista = () => {
  const [peliculas, setPeliculas] = useState([]);

  useEffect(() => {
    const fetchPeliculas = async () => {
      try {
        const peliculasData = await obtenerPeliculas();
        setPeliculas(Array.isArray(peliculasData) ? peliculasData : []);
      } catch (error) {
        console.error('Error fetching peliculas:', error);
      }
    };

    fetchPeliculas();
  }, []);

  return (
    <div>
      <h2>Lista de Películas</h2>
      <ul>
        {peliculas.map((pelicula) => (
          <li key={pelicula.id}>
            {pelicula.nombre}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PeliculaLista;
