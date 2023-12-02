// Gobal variables
let clickCount = 0;
let timerRunning = false;
let timerInterval;
let buttonClicked = false;
let highScore;
let player;

const GameEndEvent = 'gameEnd';
const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
socket = new WebSocket(`${protocol}://${window.location.host}/ws`);

function getPlayer() {
  const nameEl = localStorage.getItem('userName');

  let playerObject = {
          userName: nameEl,
          HighScore: 0
          };
    
        localStorage.setItem('player', JSON.stringify(playerObject));
  }

// Function to fetch and display a random emoji
function displayRandomEmoji() {
    const emojiContainer = document.getElementById('lifetime-display');
    fetch('https://emojihub.yurace.pro/api/random')
        .then(response => response.json())
        .then(data => {
            const emojiHtmlCode = data.htmlCode[0];
            emojiContainer.innerHTML = emojiHtmlCode;
        })
        .catch(error => {
            console.error('Error fetching random emoji:', error);
        });
}

function setHighScore(score) {
    // Set the "highScore" variable based on the local storage value
    if (score !== 0) {
        highScore = score;
    } else {
        highScore = 0;
    }
    const lifetimeHighScoreDisplay = document.getElementById('lifetime-highscore');
        lifetimeHighScoreDisplay.textContent = highScore; 
}
// Function to update the lifetime high score display
function updateLifetimeHighScore(score) {
    const lifetimeHighScoreDisplay = document.getElementById('lifetime-highscore');
    lifetimeHighScoreDisplay.textContent = score; // Display highScore
    player.HighScore = score;
    localStorage.setItem('player', JSON.stringify(player)); //update local storage player info
    updateUserLifetimeHighScore(); // update the user's player obj in db
}

// Function to update the timer display
function updateTimerDisplay(seconds) {
    const timerDisplay = document.getElementById('player-timer');
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

// Function to start the timer and enable button
function startTimer() {
    if (!timerRunning && !buttonClicked) {
        timerRunning = true;
        buttonClicked = true;
        const customButton = document.getElementById('custom-button');
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

// Function to update the click count
function updateClickCount() {
    if (timerRunning) {
        clickCount++;
        const scoreDisplay = document.getElementById('player-score');
        scoreDisplay.textContent = clickCount;
    }
}

function listeners() {
    // Add a click event listener to the button to start the timer
    const customButton = document.getElementById('custom-button');
    customButton.addEventListener('click', startTimer);

    // Add a click event listener to the button to update the click count
    customButton.addEventListener('click', () => {
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

    console.log('Sending player: ', player);
    try {
      const createResponse = await fetch('/api/updateHighScore', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(player),
      });

      if (!createResponse.ok) {
        throw new Error('Failed to send player object');
      }
  
      console.log('Player object sent successfully');

      if (createResponse.ok) {
        const data = await createResponse.json();
        console.log('Player retrieved:', data);
        player = data; // Update the player object with the received data
        // Now the player object in play.js is updated with the received data
      } else {
        throw new Error('Failed to fetch player object');
      }  
    } catch (error) {
        console.error('Error:', error);
      }
}

async function fetchPlayerAndUpdate() {
    console.log("I am in the fetchplayerandupdate function");
    try {
      const createResponse = await fetch('/api/createPlayer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(player),
      });
      
      if (!createResponse.ok) {
        throw new Error('Failed to send player object');
      }
  
      console.log('Player object sent successfully');
  
      const playerResponse = await fetch(`/api/player/${player.userName}`);
  
      if (playerResponse.ok) {
        const data = await playerResponse.json();
        console.log('Player retrieved:', data);
        player = data; // Update the player object with the received data
        // Now the player object in play.js is updated with the received data
      } else {
        throw new Error('Failed to fetch player object');
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle errors
    }
  }

// Functionality for peer communication using WebSocket

function broadcastEvent(from, type, value) {
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
  const tempScore3 = document.getElementById('player-3-score');
  tempScore3.textContent = document.getElementById('player-2-score').innerHTML;
  const tempName3 = document.getElementById('player-3-name');
  tempName3.textContent = document.getElementById('player-2-name').innerHTML;

  //Player 2
  const tempScore2 = document.getElementById('player-2-score');
  tempScore2.textContent = document.getElementById('player-1-score').innerHTML;
  const tempName2 = document.getElementById('player-2-name');
  tempName2.textContent = document.getElementById('player-1-name').innerHTML;

  //Player 1
  const tempScore1 = document.getElementById('player-1-score');
  // tempScore1.textContent = latestPlayerScore.HighScore;
  tempScore1.textContent = msg.value;
  const tempName1 = document.getElementById('player-1-name');
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

async function main() {
    //functions to use on boot up
    getPlayer();
    player = JSON.parse(localStorage.getItem('player'));
    displayRandomEmoji(); // load a random emoji on page opening
    listeners(); // click event listeners
    await fetchPlayerAndUpdate();
    initHighScore();
}
main();