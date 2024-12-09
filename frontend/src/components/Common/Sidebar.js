import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <aside>
      <ul>
        <li><Link to="/admin">Dashboard Administrador</Link></li>
        <li><Link to="/verificador">Dashboard Verificador</Link></li>
        <li><Link to="/">Página Pública</Link></li>
      </ul>
    </aside>
  );
}

export default Sidebar;
