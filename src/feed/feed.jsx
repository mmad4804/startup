import React from "react";

import { songNotifier } from "./song";
import "./feed.css";
import { MessageDialog } from "../login/messageDialog";

export function Feed({ userName }) {
  const [feedSongs, setSongs] = React.useState([]);
  const [lyrics, setLyrics] = React.useState("");

  React.useEffect(() => {
    songNotifier.addHandler(handleNewSong);

    // fetch("/api/retrieveSongs")
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setSongs(data);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching feed songs");
    //     setSongs([]);
    //   });

    return () => {
      songNotifier.removeHandler(handleNewSong);
    };
  }); //removed dependency []

  function handleNewSong(song) {
    // setSongs((prevSongs) => {
    //   let newSongs = [...prevSongs, song];
    //   if (newSongs.length > 10) {
    //     newSongs = newSongs.slice(newSongs.length - 11, newSongs.length - 1); // Keep only the latest 10 songs
    //   }
    //   return newSongs;
    // });

    setSongs([...feedSongs, song]);
    // let lyrics = "temp";
    // await fetch(`https://api.lyrics.ovh/v1/${song.artist}/${song.title}`)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     lyrics = data.lyrics;

    //     const updatedSong = {
    //       title: song.title,
    //       artist: song.artist,
    //       username: song.username,
    //       lyrics: lyrics,
    //     };

    //     setSongs((prevSongs) => {
    //       let newSongs = [...prevSongs, updatedSong];
    //       if (newSongs.length > 10) {
    //         newSongs = newSongs.slice(
    //           newSongs.length - 11,
    //           newSongs.length - 1
    //         ); // Keep only the latest 10 songs
    //       }
    //       return newSongs;
    //     });

    //     // fetch("api/updateList", {
    //     //   method: "POST",
    //     //   headers: {
    //     //     "Content-Type": "application/json",
    //     //   },
    //     //   body: JSON.stringify(feedSongs),
    //     // });
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching lyrics");
    //     setLyrics("No lyrics available");
    //     return feedSongs;
    //   });
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
