import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { obtenerActorPorId } from '../services/actorService';

const ActorDetalle = () => {
  const { id } = useParams();
  const [actor, setActor] = useState(null);

  useEffect(() => {
    const fetchActor = async () => {
      const data = await obtenerActorPorId(id);
      setActor(data);
    };

    fetchActor();
  }, [id]);

  if (!actor) return <div>Cargando...</div>;

  return (
    <div>
      <h2>{actor.nombre}</h2>
      <img src={actor.foto} alt={actor.nombre} />
    </div>
  );
};

export default ActorDetalle;
