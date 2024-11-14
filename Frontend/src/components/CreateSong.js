import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateSong = () => {
    const [title, setTitle] = useState('');
    const [media, setMedia] = useState(null);
    const [albumId, setAlbumId] = useState('');
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        // Obtener la lista de álbumes desde el backend
        const fetchAlbums = async () => {
            try {
                const response = await axios.get('http://localhost:3001/albums');
                setAlbums(response.data);
            } catch (error) {
                console.error('Error al obtener los álbumes:', error);
            }
        };

        fetchAlbums();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('mp3', media);  // Usando 'mp3' como nombre del campo
        formData.append('albumId', albumId);

        console.log('Form data being sent:', { title, media, albumId });  // Añadir log para verificar los datos enviados

        try {
            const response = await axios.post('http://localhost:3001/songs', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Server response:', response.data);  // Log de la respuesta del servidor
            alert('Canción creada con éxito!');
            setTitle('');
            setMedia(null);
            setAlbumId('');
        } catch (error) {
            console.error('Error al crear la canción:', error);
            alert('Hubo un error al crear la canción.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Título de la Canción:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Archivo MP3 o MP4:</label>
                <input
                    type="file"
                    accept=".mp3,.mp4"
                    onChange={(e) => setMedia(e.target.files[0])}
                    required
                />
            </div>
            <div>
                <label>Álbum:</label>
                <select
                    value={albumId}
                    onChange={(e) => setAlbumId(e.target.value)}
                    required
                >
                    <option value="">Selecciona un álbum</option>
                    {albums.map((album) => (
                        <option key={album.id} value={album.id}>
                            {album.title}
                        </option>
                    ))}
                </select>
            </div>
            <button type="submit">Crear Canción</button>
        </form>
    );
};

export default CreateSong;
