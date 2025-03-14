import React from "react";

import { songNotifier } from "./song";
import "./feed.css";
import { MessageDialog } from "../login/messageDialog";

export function Feed() {
  const [events, setSongs] = React.useState([]);
  const [lyrics, setLyrics] = React.useState("");

  React.useEffect(() => {
    songNotifier.addHandler(handleNewSong);

    const mySong = localStorage.getItem("mySong");
    if (mySong) {
      const currentSong = JSON.parse(mySong);
      songNotifier.postSong(
        currentSong.title,
        currentSong.artist,
        currentSong.username,
        currentSong.lyrics
      );
    }

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

  function displayLyrics(lyrics) {
    return () => {
      MessageDialog({
        title: "Lyrics",
        message: lyrics,
        onClose: () => {},
      });
    };
  }

  function createPostedSongList() {
    const songInfo = fetch("/api/feedSongs");
    for (const [i, song] of events.entries()) {
      fetch(`https://api.lyrics.ovh/v1/${song.artist}/${song.title}`)
        .then((response) => response.json())
        .then((data) => {
          setLyrics(data.lyrics);
        })
        .catch((error) => {
          console.error("Error fetching lyrics");
          setLyrics("No lyrics available");
        });

      songInfo.push(
        <table className="feed-section" key={i}>
          <tbody className="feed-body">
            <tr className="col-1">
              <td rowSpan="4" className="button-section">
                <button
                  className="play-button"
                  onClick={displayLyrics(song.lyrics)}
                  type="button"
                >
                  Lyrics
                </button>
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
                  onClick={() =>
                    addToSavedSongs(song.title, song.artist, song.lyrics)
                  }
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

  function addToSavedSongs(title, artist, lyrics) {
    const song = { title: title, artist: artist, lyrics: lyrics };
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
