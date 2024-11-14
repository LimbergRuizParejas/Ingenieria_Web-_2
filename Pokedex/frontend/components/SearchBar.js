import React from 'react';

function SearchBar({ onSearch }) {
  const handleSearch = (e) => {
    onSearch(e.target.name, e.target.value);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        name="name"
        placeholder="Buscar por nombre..."
        onChange={handleSearch}
        className="search-input"
      />
      <input
        type="text"
        name="pokedexNumber"
        placeholder="Buscar por número de Pokédex..."
        onChange={handleSearch}
        className="search-input"
      />
      <input
        type="text"
        name="type"
        placeholder="Buscar por tipo..."
        onChange={handleSearch}
        className="search-input"
      />
    </div>
  );
}

export default SearchBar;
