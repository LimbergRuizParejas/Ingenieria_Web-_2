import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CarreteraItem = ({ carretera }) => {
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/carreteras/${id}`);
      alert('Carretera eliminada exitosamente');
      window.location.reload(); // Recargar la página para actualizar la lista de carreteras
    } catch (error) {
      console.error('Error al eliminar la carretera:', error);
    }
  };

  return (
    <li>
      <p><strong>Nombre:</strong> {carretera.nombre}</p>
      <p><strong>Municipio de Origen:</strong> {carretera.municipio_origen}</p>
      <p><strong>Municipio de Destino:</strong> {carretera.municipio_destino}</p>
      <p><strong>Estado:</strong> {carretera.estado}</p>
      <p><strong>Razón de Bloqueo:</strong> {carretera.razon_bloqueo}</p>
      <Link to={`/verificador/roads/edit/${carretera.id}`}><button>Editar</button></Link>
      <button onClick={() => handleDelete(carretera.id)}>Eliminar</button>
    </li>
  );
};

export default CarreteraItem;
