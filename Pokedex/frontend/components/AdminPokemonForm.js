import React, { useState, useEffect } from 'react';
import { createPokemon, updatePokemon, deletePokemon, fetchPokemonById } from '../services/pokemonService';

function AdminPokemonForm({ pokemonId, onSave, onDelete }) {
  const [formData, setFormData] = useState({
    nombre: '',
    nroPokedex: '',
    idHabilidad1: '',
    idHabilidad2: '',
    idHabilidad3: '',
    idTipo1: '',
    idTipo2: '',
    descripcion: '',
    hp: '',
    attack: '',
    defense: '',
    spattack: '',
    spdefense: '',
    speed: '',
    nivelEvolution: '',
    idEvPrevia: '',
    idEvSiguiente: '',
    imagen: ''
  });

  useEffect(() => {
    const loadPokemon = async () => {
      try {
        const pokemonData = await fetchPokemonById(pokemonId);
        setFormData((prevState) => ({
          ...prevState,
          nombre: pokemonData.nombre || '',
          nroPokedex: pokemonData.nroPokedex || '',
          idHabilidad1: pokemonData.idHabilidad1 || '',
          idHabilidad2: pokemonData.idHabilidad2 || '',
          idHabilidad3: pokemonData.idHabilidad3 || '',
          idTipo1: pokemonData.idTipo1 || '',
          idTipo2: pokemonData.idTipo2 || '',
          descripcion: pokemonData.descripcion || '',
          hp: pokemonData.hp || '',
          attack: pokemonData.attack || '',
          defense: pokemonData.defense || '',
          spattack: pokemonData.spattack || '',
          spdefense: pokemonData.spdefense || '',
          speed: pokemonData.speed || '',
          nivelEvolution: pokemonData.nivelEvolution || '',
          idEvPrevia: pokemonData.idEvPrevia || '',
          idEvSiguiente: pokemonData.idEvSiguiente || '',
          imagen: pokemonData.imagen || ''
        }));
      } catch (error) {
        console.error('Error loading the Pokémon:', error);
      }
    };
  
    if (pokemonId) {
      loadPokemon();
    }
  }, [pokemonId]);
  

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData({
        ...formData,
        [name]: files[0] ? URL.createObjectURL(files[0]) : null,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const validateFormData = (data) => {
    const errors = [];
    if (!data.nombre || typeof data.nombre !== 'string') errors.push('Nombre inválido');
    if (!Number.isInteger(parseInt(data.nroPokedex))) errors.push('Número de Pokedex inválido');
    if (data.idHabilidad1 && !Number.isInteger(parseInt(data.idHabilidad1))) errors.push('ID de Habilidad 1 inválido');
    if (data.idHabilidad2 && !Number.isInteger(parseInt(data.idHabilidad2))) errors.push('ID de Habilidad 2 inválido');
    if (data.idHabilidad3 && !Number.isInteger(parseInt(data.idHabilidad3))) errors.push('ID de Habilidad 3 inválido');
    if (data.idTipo1 && !Number.isInteger(parseInt(data.idTipo1))) errors.push('ID de Tipo 1 inválido');
    if (data.idTipo2 && !Number.isInteger(parseInt(data.idTipo2))) errors.push('ID de Tipo 2 inválido');
    if (data.descripcion && typeof data.descripcion !== 'string') errors.push('Descripción inválida');
    if (data.hp && !Number.isInteger(parseInt(data.hp))) errors.push('HP inválido');
    if (data.attack && !Number.isInteger(parseInt(data.attack))) errors.push('Ataque inválido');
    if (data.defense && !Number.isInteger(parseInt(data.defense))) errors.push('Defensa inválida');
    if (data.spattack && !Number.isInteger(parseInt(data.spattack))) errors.push('Ataque Especial inválido');
    if (data.spdefense && !Number.isInteger(parseInt(data.spdefense))) errors.push('Defensa Especial inválida');
    if (data.speed && !Number.isInteger(parseInt(data.speed))) errors.push('Velocidad inválida');
    if (data.nivelEvolution && !Number.isInteger(parseInt(data.nivelEvolution))) errors.push('Nivel de Evolución inválido');
    if (data.idEvPrevia && !Number.isInteger(parseInt(data.idEvPrevia))) errors.push('ID de Evolución Previa inválido');
    if (data.idEvSiguiente && !Number.isInteger(parseInt(data.idEvSiguiente))) errors.push('ID de Evolución Siguiente inválido');
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = {
      ...formData,
      nroPokedex: parseInt(formData.nroPokedex),
      idHabilidad1: formData.idHabilidad1 ? parseInt(formData.idHabilidad1) : null,
      idHabilidad2: formData.idHabilidad2 ? parseInt(formData.idHabilidad2) : null,
      idHabilidad3: formData.idHabilidad3 ? parseInt(formData.idHabilidad3) : null,
      idTipo1: formData.idTipo1 ? parseInt(formData.idTipo1) : null,
      idTipo2: formData.idTipo2 ? parseInt(formData.idTipo2) : null,
      hp: formData.hp ? parseInt(formData.hp) : null,
      attack: formData.attack ? parseInt(formData.attack) : null,
      defense: formData.defense ? parseInt(formData.defense) : null,
      spattack: formData.spattack ? parseInt(formData.spattack) : null,
      spdefense: formData.spdefense ? parseInt(formData.spdefense) : null,
      speed: formData.speed ? parseInt(formData.speed) : null,
      nivelEvolution: formData.nivelEvolution ? parseInt(formData.nivelEvolution) : null,
      idEvPrevia: formData.idEvPrevia ? parseInt(formData.idEvPrevia) : null,
      idEvSiguiente: formData.idEvSiguiente ? parseInt(formData.idEvSiguiente) : null,
      imagen: formData.imagen || null
    };
  
    const errors = validateFormData(dataToSend);
    if (errors.length > 0) {
      console.error('Errores de validación:', errors);
      return;
    }
  
    try {
      if (pokemonId) {
        await updatePokemon(pokemonId, dataToSend);
      } else {
        await createPokemon(dataToSend);
      }
      onSave();
    } catch (error) {
      console.error('Error al guardar el Pokémon:', error);
    }
  };
  
  
  
  const handleDelete = async () => {
    if (pokemonId) {
      await deletePokemon(pokemonId);
      onDelete();
    }
  };
  
  
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Nombre" />
      <input type="text" name="nroPokedex" value={formData.nroPokedex} onChange={handleChange} placeholder="Número de Pokédex" />
      <input type="text" name="idHabilidad1" value={formData.idHabilidad1} onChange={handleChange} placeholder="Habilidad 1" />
      <input type="text" name="idHabilidad2" value={formData.idHabilidad2} onChange={handleChange} placeholder="Habilidad 2" />
      <input type="text" name="idHabilidad3" value={formData.idHabilidad3} onChange={handleChange} placeholder="Habilidad 3" />
      <input type="text" name="idTipo1" value={formData.idTipo1} onChange={handleChange} placeholder="Tipo 1" />
      <input type="text" name="idTipo2" value={formData.idTipo2} onChange={handleChange} placeholder="Tipo 2" />
      <input type="text" name="descripcion" value={formData.descripcion} onChange={handleChange} placeholder="Descripción" />
      <input type="number" name="hp" value={formData.hp} onChange={handleChange} placeholder="HP" />
      <input type="number" name="attack" value={formData.attack} onChange={handleChange} placeholder="Ataque" />
      <input type="number" name="defense" value={formData.defense} onChange={handleChange} placeholder="Defensa" />
      <input type="number" name="spattack" value={formData.spattack} onChange={handleChange} placeholder="Ataque Especial" />
      <input type="number" name="spdefense" value={formData.spdefense} onChange={handleChange} placeholder="Defensa Especial" />
      <input type="number" name="speed" value={formData.speed} onChange={handleChange} placeholder="Velocidad" />
      <input type="number" name="nivelEvolution" value={formData.nivelEvolution} onChange={handleChange} placeholder="Nivel de Evolución" />
      <input type="number" name="idEvPrevia" value={formData.idEvPrevia} onChange={handleChange} placeholder="ID Evolución Previa" />
      <input type="number" name="idEvSiguiente" value={formData.idEvSiguiente} onChange={handleChange} placeholder="ID Evolución Siguiente" />
  
      <label htmlFor="imagen">Imagen</label>
      <input type="file" name="imagen" id="imagen" title="Seleccionar imagen" onChange={handleChange} />
      {formData.imagen && <img src={formData.imagen} alt="Imagen de Pokémon" width="100" height="100" />}
  
      <button type="submit">Guardar</button>
      {pokemonId && <button type="button" onClick={handleDelete}>Eliminar</button>}
    </form>
  );
}  

export default AdminPokemonForm;
