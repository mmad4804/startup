import React from "react";

import { songNotifier } from "./song";
import "./feed.css";

export function Feed() {
  const [songs, setSongs] = React.useState([]);

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

  return (
    <main className="main_feed">
      <h2 id="feed-title">See What Others Are Posting</h2>
      <ul className="feed-ul">
        <section className="feed-section">
          <table className="feed-table">
            <tr className="feed-row">
              <td class="button-section">
                <button class="play-button" type="button">
                  <span>
                    <img
                      className="play-button-image"
                      src="play-con.webp"
                    ></img>
                  </span>
                </button>
              </td>
              <td class="song-info">
                <table className="feed-table">
                  <tr className="feed-row">
                    <p class="username">JohnnyLingo674</p>
                  </tr>
                  <tr className="feed-row">
                    <h3 class="song-title">Range Rover</h3>
                  </tr>
                  <tr className="feed-row">
                    <p class="artist">Ben Rector</p>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
          <button class="saved-songs-button" type="button">
            Add to Saved Songs
          </button>
        </section>
        <br />
        <section className="feed-section">
          <table className="feed-table">
            <tr className="feed-row">
              <td class="button-section">
                <button class="play-button" type="button">
                  <span>
                    <img
                      className="play-button-image"
                      src="play-con.webp"
                    ></img>
                  </span>
                </button>
              </td>
              <td class="song-info">
                <table className="feed-table">
                  <tr className="feed-row">
                    <p class="username">username</p>
                  </tr>
                  <tr className="feed-row">
                    <h3 class="song-title">Song Name</h3>
                  </tr>
                  <tr className="feed-row">
                    <p class="artist">Artist</p>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
          <button class="saved-songs-button" type="button">
            Add to Saved Songs
          </button>
        </section>
      </ul>
    </main>
  );
}
