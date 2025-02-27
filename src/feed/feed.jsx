import React from "react";

import { songNotifier } from "./song";
import "./feed.css";

export function Feed() {
  const [events, setSongs] = React.useState([]);

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
        <thead key={i} className="feed-section">
          <tbody className="feed-table">
            <tr className="feed-row">
              <td className="button-section">
                <button className="play-button" type="button">
                  <span>
                    <img
                      className="play-button-image"
                      src="play-con.webp"
                    ></img>
                  </span>
                </button>
              </td>
              <td className="song-info">
                <tbody className="feed-table">
                  <tr className="feed-row">
                    <td className="username">{song.username}</td>
                  </tr>
                  <tr className="feed-row">
                    <td className="song-title">{song.title}</td>
                  </tr>
                  <tr className="feed-row">
                    <td className="artist">{song.artist}</td>
                  </tr>
                </tbody>
              </td>
            </tr>
          </tbody>
          <button
            className="saved-songs-button"
            onClick={() => addToSavedSongs(song.title, song.artist)}
            type="button"
          >
            Add to Saved Songs
          </button>
        </thead>
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
      <table className="feed-ul">{createPostedSongList()}</table>
    </main>
  );
}
