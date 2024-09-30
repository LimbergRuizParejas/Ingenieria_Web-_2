import React, { useState, useEffect } from 'react';
import { obtenerPeliculas, crearPelicula, actualizarPelicula, eliminarPelicula } from '../services/peliculaService';
import { obtenerActores, crearActor, actualizarActor, eliminarActor } from '../services/actorService';
import { obtenerDirectores, crearDirector, actualizarDirector, eliminarDirector } from '../services/directorService';

const Admin = () => {
  const [peliculas, setPeliculas] = useState([]);
  const [actores, setActores] = useState([]);
  const [directores, setDirectores] = useState([]);
  const [formData, setFormData] = useState({
    nombre: '',
    sinopsis: '',
    imagen: null,
    fecha_lanzamiento: '',
    calificacion: '',
    trailer: '',
    director_id: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const peliculasData = await obtenerPeliculas();
        setPeliculas(Array.isArray(peliculasData) ? peliculasData : []);
        const actoresData = await obtenerActores();
        setActores(Array.isArray(actoresData) ? actoresData : []);
        const directoresData = await obtenerDirectores();
        setDirectores(Array.isArray(directoresData) ? directoresData : []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, imagen: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }
    try {
      if (formData.id) {
        await actualizarPelicula(formData.id, formDataToSend);
      } else {
        await crearPelicula(formDataToSend);
      }
      const peliculasData = await obtenerPeliculas();
      setPeliculas(Array.isArray(peliculasData) ? peliculasData : []);
      setFormData({
        nombre: '',
        sinopsis: '',
        imagen: null,
        fecha_lanzamiento: '',
        calificacion: '',
        trailer: '',
        director_id: '',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleEdit = (pelicula) => {
    setFormData(pelicula);
  };

  const handleDelete = async (id) => {
    try {
      await eliminarPelicula(id);
      const peliculasData = await obtenerPeliculas();
      setPeliculas(Array.isArray(peliculasData) ? peliculasData : []);
    } catch (error) {
      console.error('Error deleting pelicula:', error);
    }
  };

  return (
      <div>
        <h1>Administración</h1>
        <form onSubmit={handleSubmit}>
          <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={formData.nombre}
              onChange={handleInputChange}
          />
          <input
              type="text"
              name="sinopsis"
              placeholder="Sinopsis"
              value={formData.sinopsis}
              onChange={handleInputChange}
          />
          <input
              type="file"
              name="imagen"
              onChange={handleFileChange}
          />
          <input
              type="date"
              name="fecha_lanzamiento"
              placeholder="Fecha de Lanzamiento"
              value={formData.fecha_lanzamiento}
              onChange={handleInputChange}
          />
          <input
              type="number"
              name="calificacion"
              placeholder="Calificación"
              value={formData.calificacion}
              onChange={handleInputChange}
          />
          <input
              type="text"
              name="trailer"
              placeholder="URL del Trailer"
              value={formData.trailer}
              onChange={handleInputChange}
          />
          <input
              type="text"
              name="director_id"
              placeholder="ID del Director"
              value={formData.director_id}
              onChange={handleInputChange}
          />
          <button type="submit">Guardar</button>
        </form>

        <h2>Películas</h2>
        <ul>
          {peliculas.map((pelicula) => (
              <li key={pelicula.id}>
                {pelicula.nombre}
                <button onClick={() => handleEdit(pelicula)}>Editar</button>
                <button onClick={() => handleDelete(pelicula.id)}>Eliminar</button>
              </li>
          ))}
        </ul>

        {/* Similar forms and lists for Actores y Directores */}
      </div>
  );
};

export default Admin;
