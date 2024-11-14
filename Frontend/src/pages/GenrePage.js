import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const GenrePage = ({ search }) => {
    const { id } = useParams();
    const [artists, setArtists] = useState([]);

    useEffect(() => {
        fetchArtists();
    }, [id]);

    const fetchArtists = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/genres/${id}/artists`);
            setArtists(response.data);
        } catch (error) {
            console.error('Error fetching artists:', error);
        }
    };

    const filteredArtists = artists.filter(artist => artist.name.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="genre-page">
            <h1>Artistas</h1>
            <div className="artist-list">
                {filteredArtists.length > 0 ? (
                    filteredArtists.map((artist) => (
                        <Link to={`/artists/${artist.id}`} key={artist.id} className="artist-link">
                            <div className="artist-item">
                                <img src={`http://localhost:3001/uploads/${artist.image}`} alt={artist.name} className="artist-image" />
                                <h3>{artist.name}</h3>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p>No hay artistas disponibles para este género.</p>
                )}
            </div>
        </div>
    );
};

export default GenrePage;
