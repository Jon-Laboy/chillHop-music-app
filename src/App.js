import React, { useState, useRef } from 'react'
import './styles/app.scss'
import Song from './components/Song'
import PlayerControls from './components/PlayerControls'
import Library from './components/Library'
import Nav from './components/Nav'
import data from './data'


function App() {

  const audioRef = useRef(null)

  const [songs, setSongs] = useState(data);
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: null,
    duration: null
  }
  );
  const [libraryStatus, setLibraryStatus] = useState(false); 


  //Update song time as it plays 
  const handleTimeUpdate = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({ ...songInfo, currentTime: current, duration })
  }

   // skip back and forward 10 seconds 
//    const tenSecondHandler = (direction, e) {
//     const current = e.target.currentTime;
//     if(direction === "forward-ten") { 
//         await setCurrentSong()
//     }
// }

  //Auto skip to next song when song ends 
  const handleSongEnd = async() => {
    const currentIndex = songs.findIndex(song => song.id === currentSong.id)
    await setCurrentSong(songs[(currentIndex + 1) % songs.length] )
    //play the next song if playing previous song 
    if(isPlaying) audioRef.current.play(); 
  }

  return (
    <div className={`App ${libraryStatus ? "library-active" : ""}`}>
      {/* <h1 className="title" >Chill-Hop</h1> */}
      <Nav 
      libraryStatus={libraryStatus} 
      setLibraryStatus={setLibraryStatus} 
      /> 
      <Song 
      currentSong={currentSong}
      songInfo={songInfo}
      isPlaying={isPlaying}
       />
      <PlayerControls 
      songs={songs} 
      songInfo={songInfo} 
      setSongInfo={setSongInfo} 
      audioRef={audioRef} 
      currentSong={currentSong} 
      setCurrentSong={currentSong} 
      songs={songs} 
      isPlaying={isPlaying} 
      setIsPlaying={setIsPlaying} 
      setCurrentSong={setCurrentSong} 
      />
      <Library 
      audioRef={audioRef} 
      songs={songs} 
      setSongs={setSongs} 
      currentSong={currentSong} 
      setCurrentSong={setCurrentSong} 
      isPlaying={isPlaying} 
      libraryStatus={libraryStatus}
      />

      <audio
        onTimeUpdate={handleTimeUpdate}
        //have song time loaded on load instead of when clicking play
        onLoadedMetadata={handleTimeUpdate}
        src={currentSong.audio}
        ref={audioRef}
        onEnded={handleSongEnd}
        >
      </audio>
    </div>
  );
}

export default App;
