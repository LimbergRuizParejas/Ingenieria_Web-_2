import React, { useState } from 'react';
import axios from 'axios';

const CreateIncidencia = () => {
  const [descripcion, setDescripcion] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');

  const handleCreateIncidencia = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/incidencias`, { descripcion, lat, lng });
      alert('Incidencia creada exitosamente');
    } catch (error) {
      console.error('Error al crear la incidencia:', error);
    }
  };

  return (
    <div>
      <h2>Crear Incidencia</h2>
      <input
        type="text"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        placeholder="Descripción"
      />
      <input
        type="text"
        value={lat}
        onChange={(e) => setLat(e.target.value)}
        placeholder="Latitud"
      />
      <input
        type="text"
        value={lng}
        onChange={(e) => setLng(e.target.value)}
        placeholder="Longitud"
      />
      <button onClick={handleCreateIncidencia}>Crear Incidencia</button>
    </div>
  );
};

export default CreateIncidencia;
