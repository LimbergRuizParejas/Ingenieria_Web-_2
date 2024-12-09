import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../assets/styles/main.css';

const EditCarretera = ({ match }) => {
  const [carretera, setCarretera] = useState({
    nombre: '',
    municipio_origen: '',
    municipio_destino: '',
    estado: '',
    razon_bloqueo: '',
    path: []
  });

  useEffect(() => {
    const fetchCarretera = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/carreteras/${match.params.id}`);
        setCarretera(response.data);
      } catch (error) {
        console.error('Error al obtener la carretera', error);
      }
    };

    fetchCarretera();
  }, [match.params.id]);

  const handleSave = async () => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/api/carreteras/${match.params.id}`, carretera);
      alert('Carretera actualizada exitosamente');
    } catch (error) {
      console.error('Error al actualizar la carretera', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarretera({ ...carretera, [name]: value });
  };

  return (
    <div className="container">
      <h2>Editar Carretera</h2>
      <div className="form-container">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre de la Carretera"
          value={carretera.nombre}
          onChange={handleChange}
        />
        <input
          type="text"
          name="municipio_origen"
          placeholder="Municipio de Origen"
          value={carretera.municipio_origen}
          onChange={handleChange}
        />
        <input
          type="text"
          name="municipio_destino"
          placeholder="Municipio de Destino"
          value={carretera.municipio_destino}
          onChange={handleChange}
        />
        <input
          type="text"
          name="estado"
          placeholder="Estado"
          value={carretera.estado}
          onChange={handleChange}
        />
        <input
          type="text"
          name="razon_bloqueo"
          placeholder="Razón de Bloqueo"
          value={carretera.razon_bloqueo}
          onChange={handleChange}
        />
        <button className="floating-button" onClick={handleSave}>Guardar Cambios</button>
      </div>
    </div>
  );
};

export default EditCarretera;
