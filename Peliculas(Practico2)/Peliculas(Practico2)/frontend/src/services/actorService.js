import axios from 'axios';

const API_URL = 'http://localhost:3000/api/actores';

export const obtenerActores = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const obtenerActorPorId = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const crearActor = async (actorData) => {
  const response = await axios.post(API_URL, actorData);
  return response.data;
};

export const actualizarActor = async (id, actorData) => {
  const response = await axios.put(`${API_URL}/${id}`, actorData);
  return response.data;
};

export const eliminarActor = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
