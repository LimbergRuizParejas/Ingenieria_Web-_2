import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Polyline, Marker } from '@react-google-maps/api';
import axios from 'axios';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: -16.2902,
  lng: -63.5887,
};

function Map() {
  const [carreteras, setCarreteras] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const carreterasResponse = await axios.get(`${process.env.REACT_APP_API_URL}/api/carreteras`);
        const municipiosResponse = await axios.get(`${process.env.REACT_APP_API_URL}/api/municipios`);
        setCarreteras(carreterasResponse.data || []);
        setMunicipios(municipiosResponse.data || []);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
        setError('Error al obtener los datos');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="map-container">
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={6}>
          {Array.isArray(carreteras) && carreteras.length > 0 && carreteras.map((carretera) => (
            <Polyline
              key={carretera.id}
              path={carretera.puntos && carretera.puntos.map((punto) => ({ lat: punto.lat, lng: punto.lng }))}
              options={{ strokeColor: carretera.estado === 'bloqueada' ? 'red' : 'green' }}
            />
          ))}
          {Array.isArray(municipios) && municipios.length > 0 && municipios.map((municipio) => (
            <Marker key={municipio.id} position={{ lat: municipio.lat, lng: municipio.lng }} title={municipio.nombre} />
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default React.memo(Map);
