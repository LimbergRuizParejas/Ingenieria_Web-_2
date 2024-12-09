import React, { useState } from 'react';
import axios from 'axios';

const CreateUser = () => {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    const handleCreateUser = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/register`, { nombre, email, password, role });
            alert('Usuario creado exitosamente');
        } catch (error) {
            console.error('Error al crear el usuario:', error);
        }
    };

    return (
        <div>
            <h2>Crear Usuario</h2>
            <form onSubmit={handleCreateUser}>
                <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Nombre"
                    required
                    autoComplete="name"
                />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                    autoComplete="email"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Contraseña"
                    required
                    autoComplete="new-password"
                />
                <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="Rol"
                    required
                />
                <button type="submit">Crear Usuario</button>
            </form>
        </div>
    );
};

export default CreateUser;
