import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import CreateArtist from '../admin/CreateArtist';
import CreateGenre from '../admin/CreateGenre';
import CreateAlbum from '../admin/CreateAlbum';
import CreateSong from '../admin/CreateSong';

const AdminPanel = () => {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/admin/create-artist">Crear Artista</Link>
                        </li>
                        <li>
                            <Link to="/admin/create-genre">Crear Género</Link>
                        </li>
                        <li>
                            <Link to="/admin/create-album">Crear Álbum</Link>
                        </li>
                        <li>
                            <Link to="/admin/create-song">Crear Canción</Link>
                        </li>
                    </ul>
                </nav>

                <Switch>
                    <Route path="/admin/create-artist" component={CreateArtist} />
                    <Route path="/admin/create-genre" component={CreateGenre} />
                    <Route path="/admin/create-album" component={CreateAlbum} />
                    <Route path="/admin/create-song" component={CreateSong} />
                </Switch>
            </div>
        </Router>
    );
};

export default AdminPanel;
