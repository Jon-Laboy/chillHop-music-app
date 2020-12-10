import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlayCircle,
  faAngleLeft,
  faAngleRight,
  faPauseCircle,
  faRandom,
  faUndoAlt,
  faRedoAlt
} from "@fortawesome/free-solid-svg-icons";

const PlayerControls = ({
  songs,
  songInfo,
  setSongInfo,
  audioRef,
  currentSong,
  setCurrentSong,
  isPlaying,
  setIsPlaying,
  handleSongEnd,
  setShuffleState,
  shuffleState,
}) => {
  const animationPercentage = (songInfo.currentTime / songInfo.duration) * 100;

  const handlePlayPause = () => {
    // if playing then onClick set audio to pause onClick. if paused then set to play. setIsPlaying state to the opposite of what it currently is
    isPlaying ? audioRef.current.pause() : audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const formatTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };
  //drag the range bar to different parts of song
  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  const skipTrackHandler = async (direction) => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if (direction === "skip-forward") {
      //setcurrent song to the index + 1 for next song then use % to go back to index of 0 when reach last index
      await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    }
    if (direction === "skip-back") {
      //once on index of 0 (first song) and - 1 again that will equal -1 if so..then set the current song to the songs with the index of songs.length -1 which gives the highest index in array
      if ((currentIndex - 1) % songs.length === -1) {
        await setCurrentSong(songs[songs.length - 1]);
        return;
      }
      await setCurrentSong(songs[currentIndex - 1]);
    }
    if (isPlaying) audioRef.current.play();
  };

  //CODE THE 10 SECONDS TIME ICONS
  // const forwardTenSec =() => {

  // }

  // const backTenSec =() => {
    
  // }
  return (
    <div className="player-container">
      <div className="time-control">
        <p>{formatTime(songInfo.currentTime)}</p>
        <div
          style={{
            background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`,
          }}
          className="track"
        >
          <input
            type="range"
            min={0}
            max={songInfo.duration}
            value={songInfo.currentTime || ""}
            onChange={dragHandler}
          />
          <div
            style={{ transform: `translateX(${animationPercentage}%)` }}
            className="animate-track"
          ></div>
        </div>
        <p>{formatTime(songInfo.duration || 0)}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skip-back")}
          className="skip-back"
          icon={faAngleLeft}
          size="3x"
        />
        <FontAwesomeIcon
          onClick={handlePlayPause}
          className="play"
          icon={isPlaying ? faPauseCircle : faPlayCircle}
          size="3x"
        />
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skip-forward")}
          className="skip-forward"
          icon={faAngleRight}
          size="3x"
        />
      </div>
      <div className="shuffle-row">
        <FontAwesomeIcon 
        className="back10" 
        icon={faUndoAlt} 
        size="2x"
        style={{color:"white", cursor:"pointer", marginBottom:"1rem"}} 
        />
        <FontAwesomeIcon
          onClick={()=> setShuffleState(!shuffleState)}
          icon={faRandom}
          size="2x"
          style={{margin:"0rem 3rem 1rem 3rem", cursor:"pointer",color: shuffleState ? "rgb(218, 92, 92)" : "white"}}
        />
         <FontAwesomeIcon 
         className="back10" 
         icon={faRedoAlt} 
         size="2x" 
         style={{color:"white", cursor:"pointer", marginBottom:"1rem"}} 
         />
       </div>
    </div>
  );
};

export default PlayerControls;
