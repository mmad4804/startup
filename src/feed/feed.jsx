import React from "react";

import { songNotifier } from "./song";
import "./feed.css";
import { MessageDialog } from "../login/messageDialog";

export function Feed({ userName }) {
  const [feedSongs, setSongs] = React.useState([]);
  const [lyrics, setLyrics] = React.useState("");

  React.useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await fetch("/api/retrieveSongs");
        const data = await response.json();
        setSongs(data);
      } catch (error) {
        console.error("Error fetching feed songs");
        setSongs([]);
      }
    };

    fetchSongs();
  }, []);

  React.useEffect(() => {
    songNotifier.addHandler(handleNewSong);

    return () => {
      songNotifier.removeHandler(handleNewSong);
    };
  });

  function handleNewSong(song) {
    console.log("New song lyrics:", song.lyrics);
    song.lyrics = "Loading, try again later";
    let newSongs = [...feedSongs, song];
    if (newSongs.length > 10) {
      newSongs = newSongs.slice(newSongs.length - 10); // Keep only the latest 10 songs
    }
    setSongs(newSongs);

    let lyrics = "temp";
    fetch(`https://api.lyrics.ovh/v1/${song.artist}/${song.title}`)
      .then((response) => response.json())
      .then((data) => {
        lyrics = data.lyrics;
        song.lyrics = lyrics;

        // const updatedSong = {
        //   title: song.title,
        //   artist: song.artist,
        //   username: song.username,
        //   lyrics: lyrics,
        // };
      });
  }

  function displayLyrics(lyrics) {
    if (!lyrics) {
      setLyrics("No lyrics available");
      return;
    }
    setLyrics(lyrics);
  }

  function createPostedSongList() {
    const songInfo = [];
    for (let i = feedSongs.length - 1; i >= 0; i--) {
      //for (const [i, song] of feedSongs.entries()) {
      const song = feedSongs[i];
      songInfo.push(
        <table className="feed-section" key={i}>
          <tbody className="feed-body">
            <tr className="col-1">
              <td rowSpan="4" className="button-section">
                <button
                  className="play-button"
                  onClick={() => displayLyrics(song.lyrics)}
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
                    addToSavedSongs(
                      song.title,
                      song.artist,
                      song.lyrics,
                      userName
                    )
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

  async function addToSavedSongs(title, artist, lyrics, username) {
    const song = JSON.stringify({
      title: title,
      artist: artist,
      lyrics: lyrics,
      username: username,
    });

    await fetch("/api/saveSong", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: song,
    }).catch((error) => {
      console.error("Error saving song");
    });
  }

  return (
    <main className="main_feed">
      <h2 id="feed-title">See What Others Are Posting</h2>
      {createPostedSongList()}

      <MessageDialog
        message={lyrics}
        onHide={() => setLyrics("")}
        title="Lyrics"
      />
    </main>
  );
}
