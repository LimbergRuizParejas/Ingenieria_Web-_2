import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ListIncidencias = () => {
    const [incidencias, setIncidencias] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchIncidencias = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('Token no disponible');
                }
                const response = await axios.get('http://localhost:3000/api/incidencias', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setIncidencias(response.data);
            } catch (error) {
                setError(error);
                console.error('Error al obtener las incidencias:', error);
            }
        };

        fetchIncidencias();
    }, []);

    if (error) {
        return <div>Error al obtener las incidencias: {error.message}</div>;
    }

    return (
        <div>
            <h1>Listado de Incidencias</h1>
            <ul>
                {incidencias.map((incidencia, index) => (
                    <li key={index}>
                        <h2>{incidencia.tipo}</h2>
                        <p>{incidencia.descripcion}</p>
                        <p>Ubicación: {incidencia.ubicacion?.lat}, {incidencia.ubicacion?.lng}</p>
                        <img src={incidencia.foto} alt={incidencia.detalle} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListIncidencias;
