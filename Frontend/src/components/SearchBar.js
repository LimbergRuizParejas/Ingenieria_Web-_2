import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SearchBar = ({ search, setSearch }) => {
    const [results, setResults] = useState([]);

    useEffect(() => {
        if (search) {
            fetchResults();
        } else {
            setResults([]);
        }
    }, [search]);

    const fetchResults = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/search?q=${search}`);
            setResults(response.data);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    return (
        <div className="search-bar-container">
            <input
                type="text"
                placeholder="Buscar..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="search-bar"
            />
            <div className="search-results">
                {results.map((result) => (
                    <Link to={result.url} key={result.id}>
                        <div className="result-item">
                            <img src={result.image} alt={result.name} className="result-image" />
                            <h3>{result.name}</h3>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default SearchBar;
