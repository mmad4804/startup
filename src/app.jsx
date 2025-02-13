import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Home } from './home/home';
import { Feed } from './feed/feed';
import { Saved } from './saved/saved';

export default function App() {
  return (
    <BrowserRouter>
        <div>
            <body>
                <header>
                    <img id="logo" src="logo.png" alt="TuneShare Logo"/>
                    <h1>TuneShare</h1>

                    <nav>
                        <menu>
                            <li className="nav-bar-item" id="login-link"><a href="index.html">Login</a></li>
                            <li className="nav-bar-item"><a href="home.html">Home</a></li>
                            <li className="nav-bar-item"><a href="feed.html">Feed</a></li>
                            <li className="nav-bar-item"><a href="saved.html">Saved</a></li>
                        </menu>
                    </nav>
                </header>

                <main>App components go here</main>

                <footer>
                    <span className="author">Micaela Madariaga</span>
                    <br />
                    <a id="github" href="https://github.com/mmad4804/startup.git">Github</a>
                </footer>
            </body>
        </div>
    </BrowserRouter>
  )
}