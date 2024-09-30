import axios from 'axios';

export const obtenerPeliculas = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/peliculas');
    return response.data;
  } catch (error) {
    console.error('Error al obtener las películas:', error);
    throw error;
  }
};

export const crearPelicula = async (peliculaData) => {
  try {
    const formData = new FormData();
    for (const key in peliculaData) {
      formData.append(key, peliculaData[key]);
    }
    const response = await axios.post('http://localhost:3000/api/peliculas', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error al crear la película:', error);
    throw error;
  }
};

export const actualizarPelicula = async (id, peliculaData) => {
  try {
    const formData = new FormData();
    for (const key in peliculaData) {
      formData.append(key, peliculaData[key]);
    }
    const response = await axios.put(`http://localhost:3000/api/peliculas/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error al actualizar la película:', error);
    throw error;
  }
};

export const eliminarPelicula = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:3000/api/peliculas/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar la película:', error);
    throw error;
  }
};
