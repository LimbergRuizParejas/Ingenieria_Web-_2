import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PaginaPrincipal from './pages/PaginaPrincipal';
import PeliculaDetalle from './components/PeliculaDetalle';
import ActorDetalle from './components/ActorDetalle';
import DirectorDetalle from './components/DirectorDetalle';
import Admin from './pages/Admin';
import Navbar from './components/Navbar'; // Importar el componente Navbar

const App = () => {
  return (
    <Router>
      <Navbar /> {/* Agregar el componente Navbar */}
      <Routes>
        <Route path="/" element={<PaginaPrincipal />} />
        <Route path="/pelicula/:id" element={<PeliculaDetalle />} />
        <Route path="/actor/:id" element={<ActorDetalle />} />
        <Route path="/director/:id" element={<DirectorDetalle />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
};

export default App;
