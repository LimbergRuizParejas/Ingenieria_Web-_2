import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const useAuth = () => {
  const { user, setUser } = useContext(AuthContext); // Eliminado 'loading'

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, { email, password });
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
    } catch (error) {
      console.error('Error en el inicio de sesión', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return { user, login, logout }; // Eliminado 'loading' del retorno
};

export default useAuth;
