import React from 'react';
import './login.css';

import { AuthState } from './authState';

export function Login({ userName, authState, onAuthChange }) {
    return (
        <main className="main_login">
            <h2 className="login-title">Welcome to TuneShare!</h2>
            <p id="login-instructions">Login or create an account to get started</p>
            <form className="login-form" action="home.html" method="post">
                <section className="login-section">
                    <div className="form-group">
                        <label className="login-label" for="username">Username</label>
                        <input className="textbox" type="text" name="username" id="username" />
                    </div>
                    <div class="form-group">
                        <label className="login-label" for="password">Password</label>
                        <input className="textbox" type="password" name ="password" id="password" />
                    </div>
                    <br />
                    <div className="buttons">
                        <input id="login-button" type="submit" value="Login" />
                        <input id="register-button" type="submit" value="Register" />
                    </div> 
                </section>
            </form>
        </main>
    );
}