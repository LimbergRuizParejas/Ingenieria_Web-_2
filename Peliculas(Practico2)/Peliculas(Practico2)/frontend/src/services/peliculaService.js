import axios from 'axios';

const API_URL = 'http://localhost:3000/api/peliculas';

export const obtenerPeliculas = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const obtenerPeliculaPorId = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const crearPelicula = async (peliculaData) => {
  const response = await axios.post(API_URL, peliculaData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const actualizarPelicula = async (id, peliculaData) => {
  const response = await axios.put(`${API_URL}/${id}`, peliculaData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const eliminarPelicula = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
