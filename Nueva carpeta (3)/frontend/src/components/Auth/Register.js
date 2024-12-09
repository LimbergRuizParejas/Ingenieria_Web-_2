import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('verificador');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');  // Limpiar errores previos
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/register`, { email, password, role });
      alert('Usuario registrado exitosamente');
    } catch (err) {
      const errorMsg = err.response && err.response.data && err.response.data.error
        ? err.response.data.error
        : 'Error al registrar el usuario';
      setError(errorMsg);
      console.error('Error en el registro:', err);
    }
  };

  return (
    <div>
      <h2>Registrar Usuario</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="username" />
        </div>
        <div>
          <label>Contraseña:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" />
        </div>
        <div>
          <label>Rol:</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="admin">Administrador</option>
            <option value="verificador">Verificador</option>
          </select>
        </div>
        <button type="submit">Registrar</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}

export default Register;
