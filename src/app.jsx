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
                            <li className="nav-bar-item" id="login-link">
                                <NavLink className='nav-link' to="">Login</NavLink>
                            </li>
                            <li className="nav-bar-item">
                                <NavLink className='nav-link' to="home">Home</NavLink>
                            </li>
                            <li className="nav-bar-item">
                                <NavLink className='nav-link' to="feed">Feed</NavLink>
                            </li>
                            <li className="nav-bar-item">
                                <NavLink className='nav-link' to="saved">Saved</NavLink>
                            </li>
                        </menu>
                    </nav>
                </header>

                <Routes>
                    <Route path="/" element={<Login />} exact />
                    <Route path="/home" element={<Home />} />
                    <Route path="/feed" element={<Feed />} />
                    <Route path="/saved" element={<Saved />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>

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

function NotFound() {
  return (
    <main>
      <div>404: Return to sender. Address unkown.</div>
    </main>
  );
}