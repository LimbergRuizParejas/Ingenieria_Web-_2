import React from 'react';

function MunicipioItem({ municipio }) {
  return (
    <li>
      {municipio.nombre}
    </li>
  );
}

export default MunicipioItem;
