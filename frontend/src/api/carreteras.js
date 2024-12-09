import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_URL}/api/carreteras`;

const getCarreteras = () => {
  return axios.get(API_URL);
};

const createCarretera = (data) => {
  return axios.post(API_URL, data);
};

export default {
  getCarreteras,
  createCarretera
};
