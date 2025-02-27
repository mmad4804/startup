import React from "react";
import "./home.css";
import Button from "react-bootstrap/Button";

export function Home() {
  const [songTitle, setSongTitle] = React.useState("");
  const [songArtist, setSongArtist] = React.useState("");
  const [formEnabled, setFormEnabled] = React.useState(false);

  async function setSongDetails(title, artist) {
    const song = { title: title, artist: artist };
    const mySong = localStorage.setItem("mySong", song);
    setFormEnabled(false);
  }

  async function clearSongDetails(title, artist) {
    const song = { title: title, artist: artist };
    const savedSongs = localStorage.getItem("savedSongText");
    const songsList = savedSongs ? JSON.parse(savedSongs) : [];
    /*eliminate this song from the list */
    setSongTitle("");
    setSongArtist("");
  }

  function songOfTheDay() {
    return (
      <form className="song-form" action="home.html" method="post">
        <section className="song-section">
          <div className="song-group">
            <label className="song-label" for="song-title">
              Song Title:
            </label>
            <input
              className="textbox"
              value={songTitle}
              onChange={(e) => setSongTitle(e.target.value)}
              type="text"
              name="song-title"
              id="song-title"
            />
          </div>
          <div className="song-group">
            <label className="song-label" for="song-artist">
              Artist
            </label>
            <input
              className="textbox"
              type="text"
              value={songArtist}
              onChange={(e) => setSongArtist(e.target.value)}
              name="song-artist"
              id="song-artist"
            />
          </div>
          <br />
          <div className="buttons">
            <Button
              id="post-button"
              onClick={() => setSongDetails(title, artist)}
              disabled={!songTitle || !songArtist}
            >
              Post
            </Button>
            <Button
              id="clear-button"
              onClick={() => clearSongDetails()}
              disabled={!songTitle || !songArtist}
            >
              Clear
            </Button>
          </div>
        </section>
      </form>
    );
  }

  function addSong() {
    setFormEnabled(true);
  }

  return (
    <main className="main_home">
      <div className="button-div">
        {formEnabled && songOfTheDay()}
        <button
          className="add-song-button"
          onClick={() => addSong()}
          type="button"
        >
          +
        </button>
      </div>
      <h2 id="add-song-title">Add Your Song of the Day!</h2>
    </main>
  );
}
