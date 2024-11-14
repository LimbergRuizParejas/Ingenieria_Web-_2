import React from 'react';
import CreateGenre from '../components/CreateGenre';
import CreateArtist from '../components/CreateArtist';
import CreateAlbum from '../components/CreateAlbum';
import CreateSong from '../components/CreateSong';

const AdminPage = () => {
    return (
        <div className="admin-page">
            <h1>Panel de Administración</h1>
            <div className="admin-section">
                <h2>Crear Género</h2>
                <CreateGenre />
            </div>
            <div className="admin-section">
                <h2>Crear Artista</h2>
                <CreateArtist />
            </div>
            <div className="admin-section">
                <h2>Crear Álbum</h2>
                <CreateAlbum />
            </div>
            <div className="admin-section">
                <h2>Crear Canción</h2>
                <CreateSong />
            </div>
        </div>
    );
};

export default AdminPage;
