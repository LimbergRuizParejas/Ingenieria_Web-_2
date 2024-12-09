import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import PublicPage from './pages/PublicPage';
import AdminDashboard from './pages/AdminDashboard';
import VerificadorDashboard from './pages/VerificadorDashboard';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register'; // Importar el componente Register
import ReportarIncidencia from './components/Incidencias/ReportarIncidencia';
import useAuth from './hooks/useAuth';

// Componente de Ruta Protegida
const PrivateRoute = ({ children, roles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (roles && roles.indexOf(user.role) === -1) {
    return <Navigate to="/" />;
  }

  return children;
};

function RoutesConfig() {
  return (
    <Routes>
      <Route path="/" element={<PublicPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} /> {/* Añadir la ruta de registro */}
      <Route path="/reportar" element={<ReportarIncidencia />} />
      <Route
        path="/admin"
        element={
          <PrivateRoute roles={['admin']}>
            <AdminDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/verificador"
        element={
          <PrivateRoute roles={['verificador']}>
            <VerificadorDashboard />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default RoutesConfig;
