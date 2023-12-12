import React from "react";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import { Login } from "./login/login";
import { Play } from "./play/play";
// import { AuthState } from './login/authState';
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";

export default function App() {
  return (
    <BrowserRouter>
      <div className="app bg-dark text-light">
        {/* Use header, main, and footer elements to give semantic structure */}
        <header className="container-fluid">
          {/* Navigation elements */}
          <nav className="navbar fixed-top navbar-dark">
            <a className="navbar-brand" href="#" style={{ color: "teal" }}>
              Tapbattle
            </a>
            {/* Menu is a semantic alternative to <ul> that represents an interaction */}
            <menu className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" to="">
                  Home
                </NavLink>
              </li>
            </menu>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Login />} exact />
          {/* <Route path="/play" element={<Play userName={userName} />} /> */}
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
