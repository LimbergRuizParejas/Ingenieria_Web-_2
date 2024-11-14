import React from 'react';

const SongList = ({ songs, playSong }) => {
    return (
        <ul>
            {songs.map(song => (
                <li key={song.id}>
                    <button onClick={() => playSong(song.mp3)}>{song.title}</button>
                </li>
            ))}
        </ul>
    );
};

export default SongList;
