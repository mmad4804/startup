import React from "react";
import { useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";

import "./login.css";
import { Home } from "../home/home";

export function Authenticated(props) {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("userName");
    props.onLogout();
  }

  return (
    <div>
      <div className="buttons">
        <Button
          variant="primary"
          id="register-button"
          onClick={() => navigate("/home")}
        >
          Home
        </Button>
        <Button
          variant="secondary"
          id="register-button"
          onClick={() => logout()}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}
