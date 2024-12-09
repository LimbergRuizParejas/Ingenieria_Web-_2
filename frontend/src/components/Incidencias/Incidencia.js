import React from 'react';

function Incidencia({ incidencia }) {
  return (
    <div className="incidencia">
      <h3>{incidencia.tipo}</h3>
      <p>{incidencia.detalle}</p>
      {incidencia.foto_url && <img src={incidencia.foto_url} alt="Foto del incidente" />}
    </div>
  );
}

export default Incidencia;
