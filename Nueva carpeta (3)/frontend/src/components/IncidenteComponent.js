import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import '../assets/styles/main.css';

const mapContainerStyle = {
  height: "500px",
  width: "100%"
};

const center = {
  lat: -3.745,
  lng: -38.523
};

const IncidenteComponent = ({ apiKey }) => {
  const [marker, setMarker] = useState(null);

  const handleClick = (event) => {
    setMarker({ lat: event.latLng.lat(), lng: event.latLng.lng() });
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
          {marker && <Marker position={marker} />}
        </GoogleMap>
        <button className="floating-button" onClick={() => console.log(marker)}>Guardar Incidente</button>
      </div>
    </LoadScript>
  );
}

export default IncidenteComponent;
