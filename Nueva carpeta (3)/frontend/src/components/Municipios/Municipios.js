import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Municipios = () => {
  const [municipios, setMunicipios] = useState([]);
  const [nombre, setNombre] = useState('');

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/municipios`)
      .then(response => setMunicipios(response.data))
      .catch(error => console.error('Error al obtener municipios:', error));
  }, []);

  const handleCreate = () => {
    axios.post(`${process.env.REACT_APP_API_URL}/api/municipios`, { nombre })
      .then(response => setMunicipios([...municipios, response.data]))
      .catch(error => console.error('Error al crear municipio:', error));
  };

  const handleDelete = (id) => {
    axios.delete(`${process.env.REACT_APP_API_URL}/api/municipios/${id}`)
      .then(response => setMunicipios(municipios.filter(municipio => municipio.id !== id)))
      .catch(error => console.error('Error al eliminar municipio:', error));
  };

  return (
    <div>
      <h2>Municipios</h2>
      <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre del municipio" />
      <button onClick={handleCreate}>Crear Municipio</button>
      <ul>
        {municipios.map(municipio => (
          <li key={municipio.id}>
            {municipio.nombre}
            <button onClick={() => handleDelete(municipio.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Municipios;
