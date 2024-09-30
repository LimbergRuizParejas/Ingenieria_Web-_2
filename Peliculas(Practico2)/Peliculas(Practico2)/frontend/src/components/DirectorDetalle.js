import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { obtenerDirectorPorId } from '../services/directorService';

const DirectorDetalle = () => {
  const { id } = useParams();
  const [director, setDirector] = useState(null);

  useEffect(() => {
    const fetchDirector = async () => {
      const data = await obtenerDirectorPorId(id);
      setDirector(data);
    };

    fetchDirector();
  }, [id]);

  if (!director) return <div>Cargando...</div>;

  return (
    <div>
      <h2>{director.nombre}</h2>
      <img src={director.foto} alt={director.nombre} />
    </div>
  );
};

export default DirectorDetalle;
