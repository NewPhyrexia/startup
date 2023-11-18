// Gobal variables
let clickCount = 0;
let timerRunning = false;
let timerInterval;
let buttonClicked = false;
let highScore;
let player = JSON.parse(localStorage.getItem('player'));

function getPlayerName() {
    return localStorage.getItem(player.userName) ?? 'Mystery player';
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

function updatePlayersScores() {
    //Player 1
    const tempScore1 = document.getElementById('player-1');
    tempScore1.textContent = "53";

    //Player 2
    const tempScore2 = document.getElementById('player-2');
    tempScore2.textContent = "67";

    //Player 3
    const tempScore3 = document.getElementById('player-3');
    tempScore3.textContent = "42";
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
                updatePlayersScores();//web socket placeholder for other player's score update.
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

// async function getLifetimeHighScore() {
//     // Get the user's lifetimeHighScore from the service
//     const response = await fetch('/api/lifetimeHighScore');
//     let userObj = await response.json();
//     lifetimeHighScore = userObj.highScore;
//     return lifetimeHighScore;
// }

async function updateUserLifetimeHighScore() {
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
    } catch (error) {
        console.error('Error:', error);
        // Handle errors
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
        console.log('Updated Player:', player);
        // Now the player object in play.js is updated with the received data
      } else {
        throw new Error('Failed to fetch player object');
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle errors
    }
  }

async function postUpdatePlayer() {

} 

async function main() {
    //functions to use on boot up
    await fetchPlayerAndUpdate();
    initHighScore();
    displayRandomEmoji(); // load a random emoji on page opening
    listeners(); // click event listeners
}
main();