import React, { useState } from 'react';
import axios from 'axios';

function ChangePassword() {
    const [userId, setUserId] = useState(''); // Añadido para enviar el ID del usuario
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/change-password`, { userId, newPassword }); // Enviando userId y newPassword
            alert('Contraseña cambiada exitosamente');
        } catch (error) {
            console.error('Error al cambiar la contraseña', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="ID de Usuario"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Contraseña Actual"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Nueva Contraseña"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
            />
            <button type="submit">Cambiar Contraseña</button>
        </form>
    );
}

export default ChangePassword;
