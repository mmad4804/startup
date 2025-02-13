import React from 'react';
import './home.css';

export function Home() {
    return (
        <main>
            <button className = "add-song-button" type="button">+</button>
            <h2 id="add-song-title">Add Your Song of the Day!</h2>
        </main>
    );
}