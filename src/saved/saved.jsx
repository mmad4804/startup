import React from 'react';
import './saved.css';

export function Saved() {
  return (
    <main className="main_saved">
        <h2 className="main-title">Your Saved Songs</h2>
        <ul className="saved-songs">
            <section className="song">
                <table className="song-table">
                    <tr className="song-row">
                        <td>
                            <button className="play-button" type="button"><span><img className="play-button-image" src="play-con.webp"></img></span></button>
                        </td>
                        <td>
                            <table className="song-table">
                                <tr className="song-row"><h3 className="song-title">Heat Waves</h3></tr>
                                <tr className="song-row"><p className="artist">Glass Animals</p></tr>
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
                            <button className="play-button" type="button"><span><img src="play-con.webp" className="play-button-image"></img></span></button>
                        </td>
                        <td>
                            <table className="song-table">
                                <tr className="song-row"><h3 className="song-title">Range Rover</h3></tr>
                                <tr className="song-row"><p className="artist">Ben Rector</p></tr>
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
                            <button className="play-button" type="button"><span><img src="play-con.webp" className="play-button-image"></img></span></button>
                        </td>
                        <td>
                            <table className="song-table">
                                <tr className="song-row"><h3 className="song-title">Stargazing</h3></tr>
                                <tr className="song-row"><p className="artist">Miles Smyth</p></tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </section>
        </ul>
    </main>
  );
}