import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/styles/main.css';

const FiltrarCarreteras = ({ apiKey }) => {
  const [municipio, setMunicipio] = useState('');
  const [carreteras, setCarreteras] = useState([]);

  useEffect(() => {
    if (municipio) {
      axios.get(`${process.env.REACT_APP_API_URL}/carreteras/municipio/${municipio}`)
        .then(response => setCarreteras(response.data))
        .catch(error => console.error('Error al obtener carreteras', error));
    }
  }, [municipio]);

  return (
    <div className="container">
      <input
        type="text"
        placeholder="Ingrese el municipio"
        value={municipio}
        onChange={(e) => setMunicipio(e.target.value)}
        className="input"
      />
      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Municipio de Origen</th>
            <th>Municipio de Destino</th>
          </tr>
        </thead>
        <tbody>
          {carreteras.map(carretera => (
            <tr key={carretera.id}>
              <td>{carretera.nombre}</td>
              <td>{carretera.municipioOrigen}</td>
              <td>{carretera.municipioDestino}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FiltrarCarreteras;
