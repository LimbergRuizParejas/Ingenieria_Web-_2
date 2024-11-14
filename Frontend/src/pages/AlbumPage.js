import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const AlbumPage = () => {
    const { id } = useParams();
    const [album, setAlbum] = useState(null);

    useEffect(() => {
        fetchAlbum();
    }, [id]);

    const fetchAlbum = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/albums/${id}`);
            setAlbum(response.data);
        } catch (error) {
            console.error('Error fetching album:', error);
        }
    };

    return (
        <div className="album-page">
            {album ? (
                <div className="album-details">
                    <div className="album-header">
                        <img src={`http://localhost:3001/uploads/${album.image}`} alt={album.title} className="album-image" />
                        <div className="album-info">
                            <h1>{album.title}</h1>
                            <h2>By {album.artist.name}</h2>
                        </div>
                    </div>
                    <h2>Canciones</h2>
                    <ul className="song-list">
                        {album.songs.map(song => (
                            <li key={song.id} className="song-item">
                                <audio controls>
                                    <source src={`http://localhost:3001/uploads/${song.mp3}`} type="audio/mpeg" />
                                    Tu navegador no soporta el elemento de audio.
                                </audio>
                                <span>{song.title}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>Cargando album...</p>
            )}
        </div>
    );
};

export default AlbumPage;
