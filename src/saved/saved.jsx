import React from "react";
import "./saved.css";
import { useRef } from "react";

export function Saved() {
  const [savedSongs, setSavedSongs] = React.useState([]);
  const audioRef = useRef("");
  const [isPlaying, setIsPlaying] = React.useState(false);

  const handlePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  //Make sure spotify web api gives json song data
  React.useEffect(() => {
    const savedSongText = localStorage.getItem("savedSongText");
    if (savedSongText) {
      setSavedSongs(JSON.parse(savedSongText));
    }
  }, []);

  const songInfo = [];
  if (savedSongs.length) {
    for (const [i, song] of savedSongs.entries()) {
      songInfo.push(
        <table className="saved-songs" key={i}>
          <colgroup className="song">
            <col />
          </colgroup>
          <tbody className="song">
            <tr className="song-row">
              <td scope="col">
                <button
                  className="play-button"
                  onClick={handlePlay}
                  type="button"
                >
                  <span>
                    <img
                      className="play-button-image"
                      src="play-con.webp"
                    ></img>
                  </span>
                </button>
                <audio
                  ref={audioRef}
                  className="test-audio"
                  src="chill-audio.mp3"
                ></audio>
              </td>
            </tr>
            <tr className="song-stacked">
              <td className="song-title">{song.title}</td>
              <td className="artist">{song.artist}</td>
            </tr>
          </tbody>
        </table>
      );
    }
  } else {
    songInfo.push(
      <table>
        <tbody>
          <tr className="song-row" key={0}>
            <td className="song-title">No saved songs</td>
          </tr>
        </tbody>
      </table>
    );
  }

  return (
    <main className="main_saved">
      <h2 className="main-title">Your Saved Songs</h2>
      {songInfo}
    </main>
  );
}
