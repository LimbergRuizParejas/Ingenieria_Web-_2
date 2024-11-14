import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ArtistList = ({ genreId }) => {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3000/genres/${genreId}/artists`)
      .then(response => setArtists(response.data))
      .catch(error => console.error(error));
  }, [genreId]);

  return (
    <div>
      {artists.map(artist => (
        <div key={artist.id}>
          <Link to={`/artist/${artist.id}`}>
            <img src={artist.image} alt={artist.name} />
            <h3>{artist.name}</h3>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ArtistList;
