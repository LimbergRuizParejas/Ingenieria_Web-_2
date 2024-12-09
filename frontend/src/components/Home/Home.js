import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Map from './Map';
import '../../assets/styles/main.css'; // Asegúrate de que la ruta sea correcta

function Home() {
  const [carreteras, setCarreteras] = useState([]);

  useEffect(() => {
    const fetchCarreteras = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/carreteras`);
        setCarreteras(response.data);
      } catch (error) {
        console.error('Error al obtener las carreteras:', error);
      }
    };
    fetchCarreteras();
  }, []);

  const handleVerCarretera = (carretera) => {
    // Implementar la lógica para resaltar la carretera en el mapa
  };

  const handleVerMotivo = (incidencia) => {
    // Implementar la lógica para mostrar la foto del motivo en un popup
  };

  return (
    <div className="container">
      <h1>Consulta de Rutas y Transitabilidad</h1>
      <Map carreteras={carreteras} />
      <table className="table">
        <thead>
          <tr>
            <th>Municipio de Origen</th>
            <th>Municipio de Destino</th>
            <th>Nombre de la Carretera</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {carreteras.map((carretera) => (
            <tr key={carretera.id}>
              <td>{carretera.municipioOrigen}</td>
              <td>{carretera.municipioDestino}</td>
              <td>{carretera.nombre}</td>
              <td>{carretera.estado}</td>
              <td>
                <button className="btn" onClick={() => handleVerCarretera(carretera)}>Ver Carretera</button>
                {carretera.estado === 'bloqueada' && (
                  <button className="btn" onClick={() => handleVerMotivo(carretera)}>Ver Motivo</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="floating-button">Reportar Incidente</button>
    </div>
  );
}

export default Home;
