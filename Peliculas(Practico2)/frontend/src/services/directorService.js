import axios from 'axios';

const API_URL = 'http://localhost:3000/api/directores';

export const obtenerDirectores = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const obtenerDirectorPorId = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const crearDirector = async (directorData) => {
  const response = await axios.post(API_URL, directorData);
  return response.data;
};

export const actualizarDirector = async (id, directorData) => {
  const response = await axios.put(`${API_URL}/${id}`, directorData);
  return response.data;
};

export const eliminarDirector = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
