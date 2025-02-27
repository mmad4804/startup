import React from "react";

import { songNotifier } from "./song";
import "./feed.css";
import { useRef } from "react";

export function Feed() {
  const [events, setSongs] = React.useState([]);
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

  React.useEffect(() => {
    songNotifier.addHandler(handleNewSong);

    return () => {
      songNotifier.removeHandler(handleNewSong);
    };
  }, []);

  function handleNewSong(song) {
    setSongs((prevSongs) => {
      let newSongs = [song, ...prevSongs];
      if (newSongs.length > 10) {
        newSongs = newSongs.slice(0, 10);
      }
      return newSongs;
    });
  }

  function createPostedSongList() {
    const songInfo = [];
    for (const [i, song] of events.entries()) {
      songInfo.push(
        <table className="feed-section" key={i}>
          <tbody className="feed-body">
            <tr className="col-1">
              <td rowSpan="4" className="button-section">
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
            <tr className="feed-row">
              <td className="username">{song.username}</td>
            </tr>
            <tr className="feed-row">
              <td className="song-title">{song.title}</td>
            </tr>
            <tr className="feed-row">
              <td className="artist">{song.artist}</td>
            </tr>
            <tr colSpan="2" className="feed-song-row">
              <td className="feed-song-button">
                <button
                  className="saved-songs-button"
                  onClick={() => addToSavedSongs(song.title, song.artist)}
                  type="button"
                >
                  Add to Saved Songs
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      );
    }
    return songInfo;
  }

  function addToSavedSongs(title, artist) {
    const song = { title: title, artist: artist };
    const savedSongs = localStorage.getItem("savedSongText");
    const songsList = savedSongs ? JSON.parse(savedSongs) : [];
    songsList.push(song);
    localStorage.setItem("savedSongText", JSON.stringify(songsList));
  }

  return (
    <main className="main_feed">
      <h2 id="feed-title">See What Others Are Posting</h2>
      {createPostedSongList()}
    </main>
  );
}
