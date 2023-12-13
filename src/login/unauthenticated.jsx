import React from "react";

import Button from "react-bootstrap/Button";
import "../app.css";
import { MessageDialog } from "./messageDialog";

export function Unauthenticated(props) {
  const [userName, setUserName] = React.useState(props.userName);
  const [password, setPassword] = React.useState("");
  const [displayError, setDisplayError] = React.useState(null);

  async function loginUser() {
    loginOrCreate(`/api/auth/login`);
  }

  async function createUser() {
    loginOrCreate(`/api/auth/create`);
  }

  async function loginOrCreate(endpoint) {
    const response = await fetch(endpoint, {
      method: "post",
      body: JSON.stringify({ name: userName, password: password }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    if (response?.status === 200) {
      localStorage.setItem("userName", userName);
      props.onLogin(userName);
    } else {
      const body = await response.json();
      setDisplayError(`⚠ Error: ${body.msg}`);
    }
  }

  return (
    <>
      <div>
        <div className="input-group mb-3">
          <input
            className="form-control custom-placeholder"
            type="text"
            value={userName}
            id="userName"
            onChange={(e) => setUserName(e.target.value)}
            placeholder="   username"
          />
        </div>
        <div className="input-group mb-3">
          <input
            className="form-control custom-placeholder"
            type="password"
            id="userPassword"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="   password"
          />
        </div>
        <Button
          variant="primary"
          className="btn btn-teal"
          onClick={() => loginUser()}
        >
          Login
        </Button>
        <Button variant="secondary" onClick={() => createUser()}>
          Create
        </Button>
      </div>

      <MessageDialog
        message={displayError}
        onHide={() => setDisplayError(null)}
      />
    </>
  );
}
