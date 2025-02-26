import React from "react";
import "./saved.css";

export function Saved() {
  const [savedSongs, setSavedSongs] = React.useState([]);

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
        <thead className="song" key={i}>
          <tbody className="song-row">
            <td>
              <button className="play-button" type="button">
                <span>
                  <img className="play-button-image" src="play-con.webp"></img>
                </span>
              </button>
            </td>
            <td>
              <tbody className="song-table">
                <tr className="song-row">
                  <td className="song-title">{song.title}</td>
                </tr>
                <tr className="song-row">
                  <td className="artist">{song.artist}</td>
                </tr>
              </tbody>
            </td>
          </tbody>
        </thead>
      );
    }
  } else {
    songInfo.push(
      <tr className="song-row" key={0}>
        <td className="song-title">No saved songs</td>
      </tr>
    );
  }

  return (
    <main className="main_saved">
      <h2 className="main-title">Your Saved Songs</h2>
      <table className="saved-songs">
        <tbody>{songInfo}</tbody>
      </table>
    </main>
  );
}
