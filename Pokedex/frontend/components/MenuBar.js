import React from 'react';
import { Link } from 'react-router-dom';
import '../MenuBar.css'; // Importa tu archivo CSS

function MenuBar() {
  return (
    <nav className="menu-bar">
      <ul>
        <li><Link to="/">Pokedex</Link></li>
        <li><Link to="/admin">Crea Tu Pokemon</Link></li>
      </ul>
    </nav>
  );
}

export default MenuBar;
