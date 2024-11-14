import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import GenrePage from './pages/GenrePage';
import ArtistPage from './pages/ArtistPage';
import AlbumPage from './pages/AlbumPage';
import AdminPage from './pages/AdminPage';
import SearchBar from './components/SearchBar';
import Logo from './components/Logo'; // Importamos el componente Logo

function App() {
    const [search, setSearch] = useState('');

    return (
        <Router>
            <div>
                <Logo /> {/* Incluimos el componente Logo */}
                <SearchBar search={search} setSearch={setSearch} />
                <Switch>
                    <Route path="/" exact>
                        <HomePage search={search} />
                    </Route>
                    <Route path="/genres/:id">
                        <GenrePage search={search} />
                    </Route>
                    <Route path="/artists/:id">
                        <ArtistPage search={search} />
                    </Route>
                    <Route path="/albums/:id">
                        <AlbumPage search={search} />
                    </Route>
                    <Route path="/admin" component={AdminPage} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
