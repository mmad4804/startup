import React from 'react';
import './login.css';
import { MessageDialog } from './messageDialog';

export function Unauthenticated(props) {
    const [userName, setUserName] = React.useState(props.userName);
    const [password, setPassword] = React.useState('');
    const [displayError, setDisplayError] = React.useState(null);


    async function loginUser() {
        localStorage.setItem('userName', userName);
        props.onLogin(userName);
    }

    async function createUser() {
        localStorage.setItem('userName', userName);
        props.onLogin(userName);
    }

    return (
        <>
            <div>
                <h2 className="login-title">Welcome to TuneShare!</h2>
                <p id="login-instructions">Login or create an account to get started</p>
                <form className="login-form" action="home.html" method="post">
                    <section className="login-section">
                        <div className="form-group">
                            <label className="login-label" for="username">Username</label>
                            <input className="textbox" value={userName} onChange={(e) => setUserName(e.target.value)} type="text" name="username" id="username" />
                        </div>
                        <div class="form-group">
                            <label className="login-label" for="password">Password</label>
                            <input className="textbox" type="password" onChange={(e) => setPassword(e.target.value)} name ="password" id="password" />
                        </div>
                        <br />
                        <div className="buttons">
                            <input id="login-button" onClick={() => loginUser()} disabled={!username || !password} type="submit" value="Login" />
                            <input id="register-button" onClick={() => createUser()} disabled={!username || !password} type="submit" value="Register" />
                        </div> 
                    </section>
                </form>
            </div>

            <MessageDialog message={displayError} onHide={() => setDisplayError(null)} />
        </>
    )
}