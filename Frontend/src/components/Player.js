import React, { useEffect, useRef, useState } from 'react';

const Player = ({ currentSong }) => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.load();
            if (isPlaying) {
                audioRef.current.play();
            }
        }
    }, [currentSong]);

    const togglePlay = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div>
            <audio ref={audioRef}>
                <source src={currentSong} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
            <button onClick={togglePlay}>
                {isPlaying ? 'Pause' : 'Play'}
            </button>
        </div>
    );
};

export default Player;
