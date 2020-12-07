  //waits for new song to load so while playing and clicking on next song that song plays as well --checks if song is playing
  export const playAudio = (isPlaying, audioRef) => {
    if (isPlaying) {
        const playPromise = audioRef.current.play()
        if (playPromise !== undefined) {
            playPromise.then(audio => {
                audioRef.current.play()
            })
        }
    }
  }
