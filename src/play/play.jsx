// import React from "react";
import React, { useEffect } from "react";

import "./play.css";

let clickCount = 0;
let timerRunning = false;
let timerInterval;
let buttonClicked = false;
let highScore;
let player;

const GameEndEvent = "gameEnd";
const protocol = window.location.protocol === "http:" ? "ws" : "wss";
const socket = new WebSocket(`${protocol}://${window.location.host}/ws`);

function getPlayer() {
  const nameEl = localStorage.getItem("userName");

  let playerObject = {
    userName: nameEl,
    HighScore: 0,
  };

  localStorage.setItem("player", JSON.stringify(playerObject));
}

function displayRandomEmoji() {
  const emojiContainer = document.getElementById("lifetime-display");
  fetch("https://emojihub.yurace.pro/api/random")
    .then((response) => response.json())
    .then((data) => {
      const emojiHtmlCode = data.htmlCode[0];
      emojiContainer.innerHTML = emojiHtmlCode;
    })
    .catch((error) => {
      console.error("Error fetching random emoji:", error);
    });
}

function setHighScore(score) {
  // Set the "highScore" variable based on the local storage value
  if (score !== 0) {
    highScore = score;
  } else {
    highScore = 0;
  }
  const lifetimeHighScoreDisplay =
    document.getElementById("lifetime-highscore");
  lifetimeHighScoreDisplay.textContent = highScore;
}
function updateLifetimeHighScore(score) {
  // Function to update the lifetime high score display
  const lifetimeHighScoreDisplay =
    document.getElementById("lifetime-highscore");
  lifetimeHighScoreDisplay.textContent = score; // Display highScore
  player.HighScore = score;
  localStorage.setItem("player", JSON.stringify(player)); //update local storage player info
  updateUserLifetimeHighScore(); // update the user's player obj in db
}

function updateTimerDisplay(seconds) {
  // Function to update the timer display
  const timerDisplay = document.getElementById("player-timer");
  if (seconds === 0) {
    timerDisplay.textContent = "Time!";
    if (clickCount > highScore) {
      highScore = clickCount; // Update highScore
      updateLifetimeHighScore(highScore); // Update lifetime high score display
    }
  } else {
    timerDisplay.textContent = seconds;
  }
}

function startTimer() {
  // Function to start the timer and enable button
  if (!timerRunning && !buttonClicked) {
    timerRunning = true;
    buttonClicked = true;
    const customButton = document.getElementById("custom-button");
    customButton.textContent = "Tap";

    let seconds = 10;
    updateTimerDisplay(seconds);

    timerInterval = setInterval(() => {
      seconds--;

      if (seconds > 0) {
        updateTimerDisplay(seconds);
      } else if (seconds === 0) {
        updateTimerDisplay("T_T");
        customButton.disabled = true;
        console.log(player);
        broadcastEvent(player.userName, GameEndEvent, clickCount);
        if (clickCount > highScore) {
          highScore = clickCount;
          updateLifetimeHighScore(highScore);
        }
      }
    }, 1000);
  }
}

function updateClickCount() {
  // Function to update the click count
  if (timerRunning) {
    clickCount++;
    const scoreDisplay = document.getElementById("player-score");
    scoreDisplay.textContent = clickCount;
  }
}

function listeners() {
  // Add a click event listener to the button to start the timer
  const customButton = document.getElementById("custom-button");
  customButton.addEventListener("click", startTimer);

  // Add a click event listener to the button to update the click count
  customButton.addEventListener("click", () => {
    if (timerRunning && customButton.textContent === "Tap") {
      updateClickCount();
    }
  });
}

async function initHighScore() {
  // score = await getLifetimeHighScore();
  // setHighScore(score); // check database for user's highscore
  setHighScore(player.HighScore);
}

async function updateUserLifetimeHighScore() {
  console.log("Sending player: ", player);
  try {
    const createResponse = await fetch("/api/updateHighScore", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(player),
    });

    if (!createResponse.ok) {
      throw new Error("Failed to send player object");
    }

    console.log("Player object sent successfully");

    if (createResponse.ok) {
      const data = await createResponse.json();
      console.log("Player retrieved:", data);
      player = data; // Update the player object with the received data
      // Now the player object in play.js is updated with the received data
    } else {
      throw new Error("Failed to fetch player object");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

async function fetchPlayerAndUpdate() {
  console.log("I am in the fetchplayerandupdate function");
  try {
    const createResponse = await fetch("/api/createPlayer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(player),
    });

    if (!createResponse.ok) {
      throw new Error("Failed to send player object");
    }

    console.log("Player object sent successfully");

    const playerResponse = await fetch(`/api/player/${player.userName}`);

    if (playerResponse.ok) {
      const data = await playerResponse.json();
      console.log("Player retrieved:", data);
      player = data; // Update the player object with the received data
      // Now the player object in play.js is updated with the received data
    } else {
      throw new Error("Failed to fetch player object");
    }
  } catch (error) {
    console.error("Error:", error);
    // Handle errors
  }
}

function broadcastEvent(from, type, value) {
  // Functionality for peer communication using WebSocket
  console.log("in broadcasting function");
  const event = {
    from: from,
    type: type,
    value: value,
  };
  socket.send(JSON.stringify(event));
}

function updatePlayersScores(msg) {
  console.log("in update player scores function");
  console.log(msg.from);
  console.log(msg.value);

  //Player 3
  const tempScore3 = document.getElementById("player-3-score");
  tempScore3.textContent = document.getElementById("player-2-score").innerHTML;
  const tempName3 = document.getElementById("player-3-name");
  tempName3.textContent = document.getElementById("player-2-name").innerHTML;

  //Player 2
  const tempScore2 = document.getElementById("player-2-score");
  tempScore2.textContent = document.getElementById("player-1-score").innerHTML;
  const tempName2 = document.getElementById("player-2-name");
  tempName2.textContent = document.getElementById("player-1-name").innerHTML;

  //Player 1
  const tempScore1 = document.getElementById("player-1-score");
  // tempScore1.textContent = latestPlayerScore.HighScore;
  tempScore1.textContent = msg.value;
  const tempName1 = document.getElementById("player-1-name");
  // tempName1.textContent = latestPlayerName.userName;
  tempName1.textContent = msg.from;
}

socket.onmessage = async (event) => {
  const msg = JSON.parse(await event.data.text());
  console.log("in configureWebSocket function");
  if (msg.type === GameEndEvent) {
    console.log("passed configureWebSocket event type");
    console.log(msg.from);
    console.log(msg.value);
    const from = msg.from;
    const value = msg.value;
    updatePlayersScores(msg);
  }
};

function reset() {
  const timerDisplay = document.getElementById("player-timer");

  if (timerDisplay.textContent === "T_T") {
    clickCount = 0;
    timerRunning = false;
    timerInterval;
    buttonClicked = false;
    highScore;
    updateTimerDisplay("- -");
    const scoreDisplay = document.getElementById("player-score");
    scoreDisplay.textContent = "- -";
    const customButton = document.getElementById("custom-button");
    customButton.textContent = "Click to start";
    customButton.disabled = false;
  }
}

export function Play() {
  useEffect(() => {
    async function fetchData() {
      getPlayer();
      player = JSON.parse(localStorage.getItem("player"));
      displayRandomEmoji();
      listeners();
      await fetchPlayerAndUpdate();
      initHighScore();
    }
    fetchData();
  }, []);

  // Your JSX UI structure starts here
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
        <button className="btn btn-teal" onClick={reset}>
          Play Again
        </button>
      </div>
    </main>
  );
}
