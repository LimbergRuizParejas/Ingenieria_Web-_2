import React, { useState } from 'react';
import { GoogleMap, LoadScript, Polyline } from '@react-google-maps/api';
import axios from 'axios';
import '../../assets/styles/main.css';

const mapContainerStyle = {
  height: "500px",
  width: "100%"
};

const center = {
  lat: -3.745,
  lng: -38.523
};

const CreateCarretera = ({ apiKey }) => {
  const [path, setPath] = useState([]);
  const [nombre, setNombre] = useState('');
  const [municipioOrigen, setMunicipioOrigen] = useState('');
  const [municipioDestino, setMunicipioDestino] = useState('');
  const [estado, setEstado] = useState('');
  const [razonBloqueo, setRazonBloqueo] = useState('');

  const handleClick = (event) => {
    setPath([...path, { lat: event.latLng.lat(), lng: event.latLng.lng() }]);
  };

  const handleSave = async () => {
    const nuevaCarretera = {
      nombre,
      municipio_origen: municipioOrigen,
      municipio_destino: municipioDestino,
      estado,
      razon_bloqueo: razonBloqueo,
      path
    };
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/carreteras`, nuevaCarretera);
      alert('Carretera guardada exitosamente');
    } catch (error) {
      console.error('Error al guardar la carretera', error);
    }
  };

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <div className="container">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={10}
          onClick={handleClick}
        >
          <Polyline
            path={path}
            options={{ strokeColor: '#FF0000', strokeOpacity: 1, strokeWeight: 2 }}
          />
        </GoogleMap>
        <div className="form-container">
          <input
            type="text"
            placeholder="Nombre de la Carretera"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <input
            type="text"
            placeholder="Municipio de Origen"
            value={municipioOrigen}
            onChange={(e) => setMunicipioOrigen(e.target.value)}
          />
          <input
            type="text"
            placeholder="Municipio de Destino"
            value={municipioDestino}
            onChange={(e) => setMunicipioDestino(e.target.value)}
          />
          <input
            type="text"
            placeholder="Estado"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
          />
          <input
            type="text"
            placeholder="Razón de Bloqueo"
            value={razonBloqueo}
            onChange={(e) => setRazonBloqueo(e.target.value)}
          />
          <button className="floating-button" onClick={handleSave}>Guardar Carretera</button>
        </div>
      </div>
    </LoadScript>
  );
};

export default CreateCarretera;
