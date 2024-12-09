import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/login">Iniciar Sesión</Link></li>
          <li><Link to="/register">Registrar</Link></li>
          <li><Link to="/reportar">Reportar Incidente</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
