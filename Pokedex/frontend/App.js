import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MenuBar from './components/MenuBar'; // Importa MenuBar
import PokemonList from './components/PokemonList';
import PokemonDetail from './components/PokemonDetail';
import AdminDashboard from './components/AdminDashboard';

function App() {
  return (
    <Router>
      <div>
        <MenuBar /> {/* Incluye MenuBar */}
        <Routes>
          <Route path="/" element={<PokemonList />} />
          <Route path="/pokemon/:id" element={<PokemonDetail />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
