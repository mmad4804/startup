import React from "react";
import "./login.css";
import { MessageDialog } from "./messageDialog";
import Button from "react-bootstrap/Button";

export function Unauthenticated(props) {
  const [userName, setUserName] = React.useState(props.userName);
  const [password, setPassword] = React.useState("");
  const [displayError, setDisplayError] = React.useState(null);

  async function loginUser() {
    loginOrRegister("/api/auth/login");
  }

  async function createUser() {
    loginOrRegister("/api/auth/register");
  }

  async function loginOrRegister(endpoint) {
    const response = await fetch(endpoint, {
      method: "post",
      body: JSON.stringify({ username: userName, password: password }),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });
    if (response?.status === 200) {
      localStorage.setItem("userName", userName);
      props.onLogin(userName);
    } else {
      const body = await response.json();
      setDisplayError(`Error: ${body.msg}`);
    }
  }

  return (
    <>
      <div>
        <p id="login-instructions">Login or create an account to get started</p>
        <form className="login-form" action="home.html" method="post">
          <section className="login-section">
            <div className="form-group">
              <label className="login-label" for="username">
                Username
              </label>
              <input
                className="textbox"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                type="text"
                name="username"
                id="username"
              />
            </div>
            <div className="form-group">
              <label className="login-label" for="password">
                Password
              </label>
              <input
                className="textbox"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                id="password"
              />
            </div>
            <br />
            <div className="buttons">
              <Button
                id="login-button"
                onClick={() => loginUser()}
                disabled={!userName || !password}
              >
                Login
              </Button>
              <Button
                id="register-button"
                onClick={() => createUser()}
                disabled={!userName || !password}
                type="submit"
              >
                Register
              </Button>
            </div>
          </section>
        </form>
      </div>

      <MessageDialog
        message={displayError}
        onHide={() => setDisplayError(null)}
      />
    </>
  );
}
