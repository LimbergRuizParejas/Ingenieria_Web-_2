import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AlbumList = ({ artistId }) => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/artists/${artistId}/albums`) // Asegúrate de que esta URL es correcta
        .then(response => setAlbums(response.data))
        .catch(error => console.error('Error fetching albums:', error));
  }, [artistId]);

  return (
      <div>
        {albums.map(album => (
            <div key={album.id} className="album-item">
              <h3>{album.title}</h3>
              <img src={`http://localhost:3001/uploads/${album.image}`} alt={album.title} /> {/* Asegúrate de que la URL es correcta */}
              <ul>
                {album.songs.map(song => (
                    <li key={song.id}>
                      <audio controls>
                        <source src={`http://localhost:3001/uploads/${song.mp3}`} type="audio/mpeg" /> {/* Asegúrate de que la URL es correcta */}
                        Tu navegador no soporta el elemento de audio.
                      </audio>
                      {song.title}
                    </li>
                ))}
              </ul>
            </div>
        ))}
      </div>
  );
};

export default AlbumList;
