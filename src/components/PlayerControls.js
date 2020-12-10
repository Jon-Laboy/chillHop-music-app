import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlayCircle,
  faAngleLeft,
  faAngleRight,
  faPauseCircle,
  faRandom,
  faRedoAlt,
  faUndo,
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
          size="2x"
        />
        <FontAwesomeIcon
          onClick={handlePlayPause}
          className="play"
          icon={isPlaying ? faPauseCircle : faPlayCircle}
          size="2x"
        />
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skip-forward")}
          className="skip-forward"
          icon={faAngleRight}
          size="2x"
        />
      </div>
      <div className={`shuffle-btn ${shuffleState ? "shuffle-selected" : ""}`}>
        {/* <span> <FontAwesomeIcon className="back10" icon={faUndo} size="2x" style={{marginRight:"2rem"}}  />  </span>      */}
        <FontAwesomeIcon
          onClick={()=> setShuffleState(!shuffleState)}
          icon={faRandom}
          size="2x"
        />
       {/* <span> <FontAwesomeIcon  className="forward10" icon={faRedoAlt} size="2x" style={{marginLeft:"2rem"}} /></span> */}
      </div>
    </div>
  );
};

export default PlayerControls;
