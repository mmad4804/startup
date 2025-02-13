import React from 'react';
import './home.css';

export function Home() {
    return (
        <main className="main_home">
            <div className="button-div">
                <button className = "add-song-button" type="button">+</button>
            </div>
            <h2 id="add-song-title">Add Your Song of the Day!</h2>
        </main>
    );
}