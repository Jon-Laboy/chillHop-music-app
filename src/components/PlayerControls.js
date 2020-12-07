import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlayCircle, faAngleLeft, faAngleRight, faPauseCircle } from '@fortawesome/free-solid-svg-icons'
import { playAudio } from '../util'

const PlayerControls = ({
    songs,
    songInfo,
    setSongInfo,
    audioRef,
    currentSong,
    setCurrentSong,
    isPlaying,
    setIsPlaying
}) => {


    const handlePlayPause = () => {
        // if playing then onClick set audio to pause onClick. if paused then set to play. setIsPlaying state to the opposite of what it currently is
        isPlaying ? audioRef.current.pause() : audioRef.current.play();
        setIsPlaying(!isPlaying)
    }


    const formatTime = (time) => {
        return (
            Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
        )
    }
    //drag the range bar to different parts of song
    const dragHandler = (e) => {
        audioRef.current.currentTime = e.target.value;
        setSongInfo({ ...songInfo, currentTime: e.target.value })
    }

    const skipTrackHandler = (direction) => {
        const currentIndex = songs.findIndex(song => song.id === currentSong.id)
        if (direction === "skip-forward") {
            //setcurrent song to the index + 1 for next song then use % to go back to index of 0 when reach last index
            setCurrentSong(songs[(currentIndex + 1) % songs.length]);
        } if (direction === "skip-back") {
            //once on index of 0 (first song) and -1 again that will equal -1 if so..then set the current song to the songs with the index of songs.length -1 which gives the highest index in array
            if ((currentIndex - 1) % songs.length === -1) {
                setCurrentSong(songs[songs.length - 1])
                //allows music to continue to play while skipping 
                playAudio(isPlaying, audioRef)
                return;
            }
            setCurrentSong(songs[currentIndex - 1]);
        }
        //allows music to continue to play while skipping 
        playAudio(isPlaying, audioRef)
    }

    const animationPercentage = (songInfo.currentTime / songInfo.duration) * 100;

    return (
        <div className="player-container">
            <div className="time-control">
                <p>{formatTime(songInfo.currentTime)}</p>
                <div style = {{background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`}}className="track">
                    <input type="range"
                        min={0}
                        max={songInfo.duration}
                        value={songInfo.currentTime || ""}
                        onChange={dragHandler}
                    />
                    <div style={{
                        transform: `translateX(${animationPercentage}%)`
                    }} className="animate-track"></div>
                </div>
                <p>{formatTime(songInfo.duration || 0)}</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon onClick={() => skipTrackHandler("skip-back")} className="skip-back" icon={faAngleLeft} size="2x" />
                <FontAwesomeIcon onClick={handlePlayPause} className="play" icon={isPlaying ? faPauseCircle : faPlayCircle} size="2x" />
                <FontAwesomeIcon onClick={() => skipTrackHandler("skip-forward")} className="skip-forward" icon={faAngleRight} size="2x" />
            </div>
        </div>
    )
}

export default PlayerControls
