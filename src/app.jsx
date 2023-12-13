import React from "react";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import { Login } from "./login/login";
import { Play } from "./play/play";
import { AuthState } from "./login/authState";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";

function App() {
  const [userName, setUserName] = React.useState(
    localStorage.getItem("userName") || ""
  );
  const currentAuthState = userName
    ? AuthState.Authenticated
    : AuthState.Unauthenticated;
  const [authState, setAuthState] = React.useState(currentAuthState);

  return (
    <BrowserRouter>
      <div className="app bg-dark text-light">
        <header className="container-fluid">
          <nav className="navbar fixed-top navbar-dark">
            <a className="navbar-brand" href="#" style={{ color: "teal" }}>
              Tapbattle
            </a>
            <menu className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" to="">
                  Home
                </NavLink>
              </li>
              {/* <li className="nav-item">
                <NavLink className="nav-link" to="Play">
                  Play
                </NavLink>
              </li> */}
              {authState === AuthState.Authenticated && (
                <li className="nav-item">
                  <NavLink className="nav-link" to="play">
                    Play
                  </NavLink>
                </li>
              )}
            </menu>
          </nav>
        </header>

        <Routes>
          <Route
            path="/"
            element={
              <Login
                userName={userName}
                authState={authState}
                onAuthChange={(userName, authState) => {
                  setAuthState(authState);
                  setUserName(userName);
                }}
              />
            }
            exact
          />
          <Route path="/play" element={<Play />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <footer className="bg-dark text-white-50">
          <div className="container-fluid">
            <span className="text-reset">Author Name: Wajih</span>
            <a
              href="https://github.com/NewPhyrexia/startup"
              style={{ color: "teal" }}
            >
              GitHub
            </a>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

function NotFound() {
  return (
    <main className="container-fluid bg-secondary text-center">
      404: Return to sender. Address unknown.
    </main>
  );
}

export default App;
