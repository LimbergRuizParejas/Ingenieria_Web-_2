import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_URL}/api/auth`;

const register = (email, password, role) => {
  return axios.post(`${API_URL}/register`, { email, password, role });
};

const login = (email, password) => {
  return axios.post(`${API_URL}/login`, { email, password });
};

const authService = {
  register,
  login,
};

export default authService;
