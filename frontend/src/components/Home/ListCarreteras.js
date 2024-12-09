import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CarreteraItem from './CarreteraItem';
import { Link } from 'react-router-dom';

const ListCarreteras = () => {
  const [carreteras, setCarreteras] = useState([]);

  useEffect(() => {
    const fetchCarreteras = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/carreteras`);
        setCarreteras(response.data || []);
      } catch (error) {
        console.error('Error al obtener las carreteras:', error);
        setCarreteras([]);  // Asegúrate de que carreteras no sea undefined
      }
    };

    fetchCarreteras();
  }, []);

  if (!carreteras) {
    return <p>Cargando carreteras...</p>;
  }

  return (
    <div>
      <h2>Lista de Carreteras</h2>
      <Link to="/verificador/roads/create"><button>Crear Carretera</button></Link>
      <ul>
        {carreteras.length > 0 ? (
          carreteras.map((carretera) => (
            <CarreteraItem key={carretera.id} carretera={carretera} />
          ))
        ) : (
          <p>No se encontraron carreteras.</p>
        )}
      </ul>
    </div>
  );
};

export default ListCarreteras;
