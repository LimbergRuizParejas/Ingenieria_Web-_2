import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateArtist = () => {
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
    const [genreId, setGenreId] = useState('');
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        // Obtener la lista de géneros desde el backend
        const fetchGenres = async () => {
            try {
                const response = await axios.get('http://localhost:3001/genres');
                setGenres(response.data);
            } catch (error) {
                console.error('Error al obtener los géneros:', error);
            }
        };

        fetchGenres();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('image', image);
        formData.append('genreId', genreId);

        console.log('Form data being sent:', { name, image, genreId });  // Añadir log para verificar los datos enviados

        try {
            const response = await axios.post('http://localhost:3001/artists', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Server response:', response.data);  // Log de la respuesta del servidor
            alert('Artista creado con éxito!');
            setName('');
            setImage(null);
            setGenreId('');
        } catch (error) {
            console.error('Error al crear el artista:', error);
            alert('Hubo un error al crear el artista.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Nombre del Artista:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Imagen del Artista:</label>
                <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                    required
                />
            </div>
            <div>
                <label>Género:</label>
                <select
                    value={genreId}
                    onChange={(e) => setGenreId(e.target.value)}
                    required
                >
                    <option value="">Selecciona un género</option>
                    {genres.map((genre) => (
                        <option key={genre.id} value={genre.id}>
                            {genre.name}
                        </option>
                    ))}
                </select>
            </div>
            <button type="submit">Crear Artista</button>
        </form>
    );
};

export default CreateArtist;
