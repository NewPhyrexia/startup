import React from "react";

import "./play.css";
// import "../app.css";

export function Play() {
  return (
    <main className="bg-secondary">
      <div className="room-lifetime-container">
        <div className="lifetime-field">
          <h2>Lifetime</h2>
          <div className="lifetime-display" id="lifetime-highscore"></div>
        </div>
        <div className="room-field" id="third-party-emoji">
          <h2>Karma</h2>
          <div className="lifetime-display" id="lifetime-display"></div>
        </div>
      </div>

      <div className="scoreboard">
        <div className="score-row">
          <span className="player-name" id="player-1-name">
            - - - -
          </span>
          <span className="score-value" id="player-1-score">
            - -
          </span>
        </div>
        <div className="score-row">
          <span className="player-name" id="player-2-name">
            - - - -
          </span>
          <span className="score-value" id="player-2-score">
            - -
          </span>
        </div>
        <div className="score-row">
          <span className="player-name" id="player-3-name">
            - - - -
          </span>
          <span className="score-value" id="player-3-score">
            - -
          </span>
        </div>
      </div>

      <div className="score-timer-container">
        <div className="timer-field">
          <h2>Time</h2>
          <div className="timer-display" id="player-timer">
            - -
          </div>
        </div>
        <div className="score-field">
          <h2>Score</h2>
          <div className="score-display" id="player-score">
            - -
          </div>
        </div>
      </div>

      <div>
        <button id="custom-button" className="btn btn-tap">
          Click to start
        </button>
      </div>

      <div>
        <button className="btn btn-teal" onclick="reset()">
          Play Again
        </button>
      </div>
    </main>
  );
}
