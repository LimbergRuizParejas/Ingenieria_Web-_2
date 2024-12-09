import axios from 'axios';

const API_URL = '/api/municipios/';

const getMunicipios = () => {
    return axios.get(API_URL);
};

const createMunicipio = (data) => {
    return axios.post(API_URL, data);
};

export default {
    getMunicipios,
    createMunicipio
};
