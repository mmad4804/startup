import React from "react";
import "./home.css";
import Button from "react-bootstrap/Button";

export function Home({ userName }) {
  const [songTitle, setSongTitle] = React.useState("");
  const [songArtist, setSongArtist] = React.useState("");
  const [formEnabled, setFormEnabled] = React.useState(false);
  const [buttonEnabled, setButtonEnabled] = React.useState(true);
  const [lyrics, setLyrics] = React.useState("");

  async function setSongDetails(title, artist) {
    await fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
      .then((response) => response.json())
      .then((data) => {
        const songLyrics = data.lyrics;
        setLyrics(songLyrics);
        console.log(songLyrics);

        const song = JSON.stringify({
          title: title,
          artist: artist,
          username: userName,
          lyrics: lyrics,
        });

        const mySong = localStorage.setItem("mySong", song);
        setFormEnabled(false);
        setButtonEnabled(true);
      })
      .catch((error) => {
        console.error("Error fetching lyrics:");
      });
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
      <div className="song-form">
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
              onClick={() => setSongDetails(songTitle, songArtist)}
              disabled={!songTitle || !songArtist}
            >
              Post
            </Button>
            <Button
              id="clear-button"
              onClick={() => clearSongDetails(songTitle, songArtist)}
              disabled={!songTitle || !songArtist}
            >
              Clear
            </Button>
          </div>
        </section>
        <pre>{lyrics}</pre>
      </div>
    );
  }

  function addSongForm() {
    setFormEnabled(true);
    setButtonEnabled(false);
  }

  return (
    <main className="main_home">
      <div className="button-div">
        {formEnabled && songOfTheDay()}
        {buttonEnabled && (
          <button
            className="add-song-button"
            onClick={() => addSongForm()}
            type="button"
          >
            +
          </button>
        )}
      </div>
      <h2 id="add-song-title">Add Your Song of the Day!</h2>
    </main>
  );
}
