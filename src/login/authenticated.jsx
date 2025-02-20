import React from "react";
import { useNavigate } from "react-router-dom";

import './login.css';

export function Authenticated(props) {
    const navigate = useNavigate();

    function logout() {
        localStorage.removeItem('userName');
        props.onLogout();
    }

    return (
        <div>
            filler for now
        </div>
    )
}