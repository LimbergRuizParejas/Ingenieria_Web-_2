import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_URL}/api/carreteras`;

export const CarreterasContext = createContext();

export const CarreterasProvider = ({ children }) => {
  const [carreteras, setCarreteras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCarreteras = async () => {
      try {
        const response = await axios.get(API_URL);
        setCarreteras(response.data);
      } catch (error) {
        setError('Error al obtener las carreteras');
        console.error('Error al obtener las carreteras:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCarreteras();
  }, []);

  const addCarretera = async (carretera) => {
    try {
      const response = await axios.post(API_URL, carretera);
      setCarreteras([...carreteras, response.data]);
    } catch (error) {
      console.error('Error al añadir la carretera', error);
    }
  };

  const updateCarretera = async (id, updatedCarretera) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, updatedCarretera);
      setCarreteras(carreteras.map(carretera => carretera.id === id ? response.data : carretera));
    } catch (error) {
      console.error('Error al actualizar la carretera', error);
    }
  };

  const deleteCarretera = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setCarreteras(carreteras.filter(carretera => carretera.id !== id));
    } catch (error) {
      console.error('Error al eliminar la carretera', error);
    }
  };

  return (
    <CarreterasContext.Provider value={{ carreteras, loading, error, addCarretera, updateCarretera, deleteCarretera }}>
      {children}
    </CarreterasContext.Provider>
  );
};
