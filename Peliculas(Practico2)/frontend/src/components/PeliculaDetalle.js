import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { obtenerPeliculaPorId } from '../services/peliculaService';

const PeliculaDetalle = () => {
  const { id } = useParams();
  const [pelicula, setPelicula] = useState(null);

  useEffect(() => {
    const fetchPelicula = async () => {
      const data = await obtenerPeliculaPorId(id);
      setPelicula(data);
    };

    fetchPelicula();
  }, [id]);

  if (!pelicula) return <div>Cargando...</div>;

  return (
    <div>
      <h2>{pelicula.nombre}</h2>
      <p>{pelicula.sinopsis}</p>
      <img src={pelicula.imagen} alt={pelicula.nombre} />
      <p>Fecha de Lanzamiento: {pelicula.fecha_lanzamiento}</p>
      <p>Calificación: {pelicula.calificacion}</p>
      <a href={pelicula.trailer} target="_blank" rel="noopener noreferrer">Ver Trailer</a>
      <h3>Director:</h3>
      <div>
        <img src={pelicula.director.foto} alt={pelicula.director.nombre} />
        <p>{pelicula.director.nombre}</p>
      </div>
      <h3>Reparto:</h3>
      <ul>
        {pelicula.actores.map((actor) => (
          <li key={actor.id}>
            <img src={actor.foto} alt={actor.nombre} />
            <p>{actor.nombre}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PeliculaDetalle;
