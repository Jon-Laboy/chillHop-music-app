import React from 'react';
import {playAudio} from '../util';

const LibrarySong = ({ isPlaying, audioRef, songs, setSongs, currentSong, setCurrentSong, song }) => {

    const handleSongSelect = () => {
        setCurrentSong(song)

        // setSongs(
        //     songs.map((targetSong) => {
        //         return {
        //             ...targetSong,
        //             active: targetSong.id === song.id
        //         }
        //     }
        //     )
        // )
      playAudio(isPlaying, audioRef)
    }

    return (
        // To avoid the need for updating the active song in the library, you can just use the following code in the LibrarySong component instead of checking adding the class based on 'song.active':className={`library-song ${song.id === currentSong.id ? 'selected' : ''}`} and now don't need the setSongs under handleSongSelect

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
