import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Admin from './pages/AdminDashboard';
import Verificador from './pages/VerificadorDashboard';
import ListUsers from './components/Usuarios/ListUsers';
import CreateUser from './components/Usuarios/CreateUser';
import EditUser from './components/Usuarios/EditUser';
import ChangePassword from './components/Usuarios/ChangePassword';
import ListCarreteras from './components/Home/ListCarreteras';
import CreateCarretera from './components/Home/CrearCarretera';
import EditCarretera from './components/Home/EditCarretera';
import ListMunicipios from './components/Municipios/ListMunicipios';
import CreateMunicipio from './components/Municipios/CreateMunicipio';
import ListIncidencias from './components/Incidencias/ListIncidencias';
import CreateIncidencia from './components/Incidencias/CreateIncidencia';

const RoutesConfig = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/verificador" element={<Verificador />} />
      <Route path="/admin/users" element={<ListUsers />} />
      <Route path="/admin/users/create" element={<CreateUser />} />
      <Route path="/admin/users/edit/:id" element={<EditUser />} />
      <Route path="/admin/users/change-password/:id" element={<ChangePassword />} />
      <Route path="/admin/incidencias" element={<ListIncidencias />} />
      <Route path="/admin/carreteras" element={<ListCarreteras />} />
      <Route path="/admin/municipios" element={<ListMunicipios />} />
      <Route path="/verificador/carreteras" element={<ListCarreteras />} />
      <Route path="/verificador/carreteras/create" element={<CreateCarretera />} />
      <Route path="/verificador/carreteras/edit/:id" element={<EditCarretera />} />
      <Route path="/verificador/municipios" element={<ListMunicipios />} />
      <Route path="/verificador/municipios/create" element={<CreateMunicipio />} />
      <Route path="/verificador/incidencias" element={<ListIncidencias />} />
      <Route path="/verificador/incidencias/create" element={<CreateIncidencia />} />
    </Routes>
  );
};

export default RoutesConfig;
