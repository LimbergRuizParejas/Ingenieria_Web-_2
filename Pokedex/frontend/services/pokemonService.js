import axios from 'axios';

const apiUrl = 'http://localhost:3000';




export const fetchPokemons = async () => {
  const response = await axios.get(`${apiUrl}/pokemon`);
  return response.data;
};

export const createPokemon = async (pokemon) => {
  const response = await axios.post(`${apiUrl}/admin/pokemon`, pokemon);
  return response.data;
};

export const updatePokemon = async (id, pokemon) => {
  const response = await axios.put(`${apiUrl}/admin/pokemon/${id}`, pokemon);
  return response.data;
};

export const deletePokemon = async (id) => {
  const response = await axios.delete(`${apiUrl}/admin/pokemon/${id}`);
  return response.data;
};

export const fetchPokemonById = async (id) => {
  try {
    const response = await axios.get(`http://localhost:3000/pokemon/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching the Pokemon:', error);
    throw error;
  }
};
export const searchPokemons = async (query) => {
  const response = await axios.get(`${apiUrl}/pokemon?search=${query}`);
  return response.data;
};
