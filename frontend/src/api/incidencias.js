import axios from 'axios';

const API_URL = '/api/incidencias/';

const getIncidencias = () => {
    return axios.get(API_URL);
};

const reportIncidencia = (data) => {
    return axios.post(API_URL + 'reportar', data);
};

export default {
    getIncidencias,
    reportIncidencia
};
