import React from 'react';
import './login.css';

import { AuthState } from './authState';
import { Authenticated } from './authenticated';
import { Unauthenticated } from './unauthenticated';

export function Login({ userName, authState, onAuthChange }) {
    return (
        <main className="main_login">
            <div>
                {authState !== AuthState.Unknown && <h1>Welcome to TuneShare</h1>}
                {authState === AuthState.Authenticated && (
                    <Authenticated userName={userName} onLogout={() => onAuthChange(userName, AuthState.Unauthenticated)} />
                )}
                {authState === AuthState.Unauthenticated && (
                    <Unauthenticated
                        userName={userName}
                        onLogin={(loginUserName) => {
                            onAuthChange(loginUserName, AuthState.Authenticated);
                        }}
                    />
                )}
            </div>
        </main>
    );
}