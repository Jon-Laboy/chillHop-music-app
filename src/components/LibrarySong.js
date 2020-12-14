import React from 'react';

const LibrarySong = ({ isPlaying, audioRef, currentSong, setCurrentSong, song }) => {

    const handleSongSelect = async () => {
        await setCurrentSong(song)
        if (isPlaying) audioRef.current.play();

    }

    return (
        <div className={`library-song  ${song.id === currentSong.id ? 'selected' : ''}`}
            onClick={handleSongSelect}>
            <img src={song.cover} />
            <div className="song-description">
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>
        </div>
    )
}

export default LibrarySong
