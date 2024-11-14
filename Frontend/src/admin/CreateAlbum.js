import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateAlbum = () => {
    const [title, setTitle] = useState('');
    const [image, setImage] = useState(null);
    const [artistId, setArtistId] = useState('');
    const [artists, setArtists] = useState([]);

    useEffect(() => {
        // Obtener la lista de artistas desde el backend
        const fetchArtists = async () => {
            try {
                const response = await axios.get('http://localhost:3001/artists');
                setArtists(response.data);
            } catch (error) {
                console.error('Error al obtener los artistas:', error);
            }
        };

        fetchArtists();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('image', image);
        formData.append('artistId', artistId);

        try {
            await axios.post('http://localhost:3001/albums', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('Álbum creado con éxito!');
            setTitle('');
            setImage(null);
            setArtistId('');
        } catch (error) {
            console.error('Error al crear el álbum:', error);
            alert('Hubo un error al crear el álbum.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Título del Álbum:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Imagen del Álbum:</label>
                <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                    required
                />
            </div>
            <div>
                <label>Artista:</label>
                <select
                    value={artistId}
                    onChange={(e) => setArtistId(e.target.value)}
                    required
                >
                    <option value="">Selecciona un artista</option>
                    {artists.map((artist) => (
                        <option key={artist.id} value={artist.id}>
                            {artist.name}
                        </option>
                    ))}
                </select>
            </div>
            <button type="submit">Crear Álbum</button>
        </form>
    );
};

export default CreateAlbum;
