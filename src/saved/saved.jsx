import React from "react";
import "./saved.css";
import { MessageDialog } from "../login/messageDialog";

export function Saved() {
  const [savedSongs, setSavedSongs] = React.useState([]);
  const [lyrics, setLyrics] = React.useState("");

  React.useEffect(() => {
    fetch("/api/getSavedSongs")
      .then((response) => response.json())
      .then((data) => {
        setSavedSongs(data);
      })
      .catch((error) => {
        console.error("Error fetching saved songs");
        setSavedSongs([]);
      });
  }, []);

  function displayLyrics(lyrics) {
    if (!lyrics) {
      setLyrics("No lyrics available");
      return;
    }
    setLyrics(lyrics);
  }

  const songInfo = [];
  if (savedSongs.length) {
    for (let i = savedSongs.length - 1; i >= 0; i--) {
      const song = savedSongs[i];
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
                  onClick={() => displayLyrics(song.lyrics)}
                  type="button"
                >
                  Lyrics
                </button>
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

      <MessageDialog
        message={lyrics}
        onHide={() => setLyrics("")}
        title="Lyrics"
      />
    </main>
  );
}
