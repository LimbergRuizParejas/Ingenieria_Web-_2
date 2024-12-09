import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MunicipioItem from './MunicipioItem';

const ListMunicipios = () => {
  const [municipios, setMunicipios] = useState([]);

  useEffect(() => {
    const fetchMunicipios = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/municipios`);
        setMunicipios(response.data || []);
      } catch (error) {
        console.error('Error al obtener los municipios:', error);
        setMunicipios([]);  // Asegúrate de que municipios no sea undefined
      }
    };

    fetchMunicipios();
  }, []);

  if (!municipios) {
    return <p>Cargando municipios...</p>;
  }

  return (
    <div>
      <h2>Lista de Municipios</h2>
      <ul>
        {municipios.length > 0 ? (
          municipios.map((municipio) => (
            <MunicipioItem key={municipio.id} municipio={municipio} />
          ))
        ) : (
          <p>No se encontraron municipios.</p>
        )}
      </ul>
    </div>
  );
};

export default ListMunicipios;
