import React, { useState } from 'react';
import axios from 'axios';

const CreateMunicipio = () => {
  const [nombre, setNombre] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');

  const handleCreateMunicipio = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/municipios`, { nombre, lat, lng });
      alert('Municipio creado exitosamente');
    } catch (error) {
      console.error('Error al crear el municipio:', error);
    }
  };

  return (
    <div>
      <h2>Crear Municipio</h2>
      <form onSubmit={handleCreateMunicipio}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Latitud"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Longitud"
          value={lng}
          onChange={(e) => setLng(e.target.value)}
          required
        />
        <button type="submit">Crear Municipio</button>
      </form>
    </div>
  );
};

export default CreateMunicipio;
