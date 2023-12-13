import React from "react";
import { useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";

import "./authenticated.css";

export function Authenticated(props) {
  const navigate = useNavigate();

  function logout() {
    fetch(`/api/auth/logout`, {
      method: "delete",
    })
      .catch(() => {
        // Logout failed. Assuming offline
      })
      .finally(() => {
        localStorage.removeItem("userName");
        props.onLogout();
      });
  }

  return (
    <div>
      <div style={{ color: "#555" }} className="playerName">
        {props.userName}
      </div>
      <Button
        variant="primary"
        className="btn btn-teal"
        onClick={() => navigate("/play")}
      >
        Play
      </Button>
      <Button
        // style={{ color: "#555" }}
        variant="secondary"
        onClick={() => logout()}
      >
        Logout
      </Button>
    </div>
  );
}
