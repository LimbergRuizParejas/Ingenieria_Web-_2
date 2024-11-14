import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const GenreList = () => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    axios.get('/api/genres')
        .then(response => setGenres(response.data))
        .catch(error => console.error('Error fetching genres:', error));
  }, []);

  return (
      <div>
        <h1>Géneros</h1>
        <ul>
          {genres.map(genre => (
              <li key={genre.id}>
                <Link to={`/genres/${genre.id}`}>
                  <img src={genre.image} alt={genre.name} />
                  <p>{genre.name}</p>
                </Link>
              </li>
          ))}
        </ul>
      </div>
  );
};

export default GenreList;
