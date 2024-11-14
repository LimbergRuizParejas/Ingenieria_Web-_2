import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const ArtistPage = () => {
    const { id } = useParams();
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        fetchAlbums();
    }, [id]);

    const fetchAlbums = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/artists/${id}/albums`);
            setAlbums(response.data);
        } catch (error) {
            console.error('Error fetching albums:', error);
        }
    };

    return (
        <div className="artist-page">
            <h1>Álbumes</h1>
            <div className="album-list">
                {albums.length > 0 ? (
                    albums.map((album) => (
                        <div key={album.id} className="album-item">
                            <Link to={`/albums/${album.id}`}>
                                <img src={`http://localhost:3001/uploads/${album.image}`} alt={album.title} className="album-image" />
                                <h3>{album.title}</h3>
                            </Link>
                        </div>
                    ))
                ) : (
                    <p>No hay álbumes disponibles para este artista.</p>
                )}
            </div>
        </div>
    );
};

export default ArtistPage;
