import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditUser = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('Token no disponible');
                }
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setUser(response.data);
            } catch (error) {
                const errorMsg = error.response && error.response.data && error.response.data.message
                    ? error.response.data.message
                    : 'Error al obtener el usuario';
                setError(errorMsg);
                console.error('Error al obtener el usuario:', error);
            }
        };

        fetchUser();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Token no disponible');
            }
            await axios.put(`${process.env.REACT_APP_API_URL}/api/users/${id}`, user, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            alert('Usuario actualizado exitosamente');
            navigate('/admin/users');
        } catch (error) {
            const errorMsg = error.response && error.response.data && error.response.data.message
                ? error.response.data.message
                : 'Error al actualizar el usuario';
            setError(errorMsg);
            console.error('Error al actualizar el usuario:', error);
        }
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!user) {
        return <div>Cargando...</div>;
    }

    return (
        <div>
            <h2>Editar Usuario</h2>
            <form onSubmit={handleFormSubmit}>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={user.email} onChange={handleInputChange} required />
                </div>
                <div>
                    <label>Rol:</label>
                    <input type="text" name="role" value={user.role} onChange={handleInputChange} required />
                </div>
                <button type="submit">Actualizar Usuario</button>
            </form>
        </div>
    );
};

export default EditUser;
