import React, { useState, useCallback, useEffect, useRef } from 'react';
import { GoogleMap, LoadScript, Polyline } from '@react-google-maps/api';
import axios from 'axios';
import '../assets/styles/main.css';

const center = { lat: -3.745, lng: -38.523 };
const containerStyle = { width: '100%', height: '500px' };

const RoadEditor = ({ onPathChange }) => {
  const [path, setPath] = useState([]);

  const handleMapClick = useCallback((ev) => {
    const newPath = [...path, { lat: ev.latLng.lat(), lng: ev.latLng.lng() }];
    setPath(newPath);
    onPathChange(newPath);
  }, [path, onPathChange]);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={13}
      onClick={handleMapClick}
    >
      <Polyline path={path} options={{ strokeColor: '#FF0000', strokeOpacity: 1.0, strokeWeight: 2 }} />
    </GoogleMap>
  );
};

const MapComponent = ({ apiKey }) => {
  const [roads, setRoads] = useState([]);

  const handlePathChange = (path) => {
    setRoads([path]);
    // Llamar al backend para guardar la carretera
    axios.post(`${process.env.REACT_APP_API_URL}/api/carreteras`, { path })
      .then(response => console.log(response))
      .catch(error => console.error('Error al guardar la carretera:', error));
  };

  const handleDeleteRoad = (id) => {
    // Llamar al backend para eliminar la carretera
    axios.delete(`${process.env.REACT_APP_API_URL}/api/carreteras/${id}`)
      .then(response => setRoads(roads.filter(road => road.id !== id)))
      .catch(error => console.error('Error al eliminar la carretera:', error));
  };

  useEffect(() => {
    // Llamar al backend para obtener las carreteras existentes
    axios.get(`${process.env.REACT_APP_API_URL}/api/carreteras`)
      .then(response => setRoads(response.data))
      .catch(error => console.error('Error al obtener las carreteras:', error));
  }, []);

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <div className="map-container">
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={13}>
          {roads.map((road, index) => (
            <Polyline key={index} path={road.path} options={{ strokeColor: '#FF0000', strokeOpacity: 1.0, strokeWeight: 2 }} />
          ))}
          <RoadEditor onPathChange={handlePathChange} />
        </GoogleMap>
        <button onClick={() => handleDeleteRoad(someRoadId)}>Eliminar Carretera</button> {/* Reemplaza someRoadId con el ID correspondiente */}
      </div>
    </LoadScript>
  );
};

export default MapComponent;
