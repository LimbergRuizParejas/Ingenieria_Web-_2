import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

function ReportarIncidencia() {
  const [isOpen, setIsOpen] = useState(false);
  const [detalle, setDetalle] = useState('');
  const [tipo, setTipo] = useState('');
  const [foto, setFoto] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('detalle', detalle);
    formData.append('tipo', tipo);
    formData.append('foto', foto);

    try {
      await axios.post('/api/incidencias/reportar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      // Notificación de éxito
      setIsOpen(false);
    } catch (error) {
      console.error('Error al reportar incidencia', error);
    }
  };

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Reportar Incidente</button>
      <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)}>
        <h2>Reportar Incidente</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Detalle"
            value={detalle}
            onChange={(e) => setDetalle(e.target.value)}
            required
          />
          <select value={tipo} onChange={(e) => setTipo(e.target.value)} required>
            <option value="">Seleccione el tipo de incidencia</option>
            <option value="Transitable con desvíos y/o horarios de circulación">Transitable con desvíos y/o horarios de circulación</option>
            <option value="No transitable por conflictos sociales">No transitable por conflictos sociales</option>
            <option value="Restricción vehicular">Restricción vehicular</option>
            <option value="No transitable tráfico cerrado">No transitable tráfico cerrado</option>
            <option value="Restricción vehicular, especial">Restricción vehicular, especial</option>
          </select>
          <input
            type="file"
            onChange={(e) => setFoto(e.target.files[0])}
            required
          />
          <button type="submit">Reportar Incidencia</button>
        </form>
        <button onClick={() => setIsOpen(false)}>Cerrar</button>
      </Modal>
    </div>
  );
}

export default ReportarIncidencia;
