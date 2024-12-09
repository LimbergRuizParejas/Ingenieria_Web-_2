import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserItem from './UserItem';
import { Link } from 'react-router-dom';

const ListUsers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('Token no disponible');
                }
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/users`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setUsers(response.data || []);
            } catch (error) {
                console.error('Error al obtener los usuarios:', error);
                setUsers([]);  // Asegúrate de que users no sea undefined
            }
        };

        fetchUsers();
    }, []);

    const handleDeleteUser = async (userId) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Token no disponible');
            }
            await axios.delete(`${process.env.REACT_APP_API_URL}/api/users/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setUsers(users.filter(user => user.id !== userId));
            console.log('Usuario eliminado con ID:', userId);
        } catch (error) {
            console.error('Error al eliminar el usuario:', error);
        }
    };

    return (
        <div>
            <h2>Lista de Usuarios</h2>
            <Link to="/admin/users/create"><button>Crear Usuario</button></Link>
            <ul>
                {users.length > 0 ? (
                    users.map((user) => (
                        <UserItem key={user.id} user={user} onDelete={handleDeleteUser} />
                    ))
                ) : (
                    <p>No se encontraron usuarios.</p>
                )}
            </ul>
        </div>
    );
};

export default ListUsers;
