import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const HomePage = ({ search }) => {
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        fetchGenres();
    }, []);

    const fetchGenres = async () => {
        const response = await axios.get('http://localhost:3001/genres');
        setGenres(response.data);
    };

    const filteredGenres = genres.filter(genre => genre.name.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="home-page">
            <div className="genre-list">
                {filteredGenres.map((genre) => (
                    <Link to={`/genres/${genre.id}`} key={genre.id}>
                        <div className="genre-item">
                            <img src={`http://localhost:3001/uploads/${genre.image}`} alt={genre.name} className="genre-image" />
                            <h3>{genre.name}</h3>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default HomePage;
