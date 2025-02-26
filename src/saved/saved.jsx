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
        <section className="song" key={i}>
          <tr className="song-row">
            <td>
              <button className="play-button" type="button">
                <span>
                  <img className="play-button-image" src="play-con.webp"></img>
                </span>
              </button>
            </td>
            <td>
              <table className="song-table">
                <tr className="song-row">
                  <h3 className="song-title">{song.title}</h3>
                </tr>
                <tr className="song-row">
                  <p className="artist">{song.artist}</p>
                </tr>
              </table>
            </td>
          </tr>
        </section>
      );
    }
  } else {
    songInfo.push(
      <tr className="song-row" key={0}>
        <h3 className="song-title">No saved songs</h3>
      </tr>
    );
  }

  return (
    <main className="main_saved">
      <h2 className="main-title">Your Saved Songs</h2>
      <ul className="saved-songs">
        {songInfo}
        <br></br>
        <section className="song">
          <table className="song-table">
            <tr className="song-row">
              <td>
                <button className="play-button" type="button">
                  <span>
                    <img
                      src="play-con.webp"
                      className="play-button-image"
                    ></img>
                  </span>
                </button>
              </td>
              <td>
                <table className="song-table">
                  <tr className="song-row">
                    <h3 className="song-title">Range Rover</h3>
                  </tr>
                  <tr className="song-row">
                    <p className="artist">Ben Rector</p>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </section>
        <br></br>
        <section className="song">
          <table className="song-table">
            <tr className="song-row">
              <td>
                <button className="play-button" type="button">
                  <span>
                    <img
                      src="play-con.webp"
                      className="play-button-image"
                    ></img>
                  </span>
                </button>
              </td>
              <td>
                <table className="song-table">
                  <tr className="song-row">
                    <h3 className="song-title">Stargazing</h3>
                  </tr>
                  <tr className="song-row">
                    <p className="artist">Miles Smyth</p>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </section>
      </ul>
    </main>
  );
}
