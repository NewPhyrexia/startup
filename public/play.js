
// Gobal variables
let clickCount = 0;
let timerRunning = false;
let timerInterval;
let buttonClicked = false;
let highScore;

let player = JSON.parse(localStorage.getItem('player'));


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

function setHighScore(lifetimeHighScore) {
    // Set the "highScore" variable based on the local storage value
    if (lifetimeHighScore !== 0) {
        highScore = lifetimeHighScore;
    } else {
        highScore = 0;
    }
    const lifetimeHighScoreDisplay = document.getElementById('lifetime-highscore');
        lifetimeHighScoreDisplay.textContent = highScore; 
}
// Function to update the lifetime high score display
function updateLifetimeHighScore() {
    const lifetimeHighScoreDisplay = document.getElementById('lifetime-highscore');
    lifetimeHighScoreDisplay.textContent = highScore; // Display highScore
    player.lifetimeHighScore = highScore;
    localStorage.setItem('player', JSON.stringify(player));
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
            updateLifetimeHighScore(); // Update lifetime high score display
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
                    updateLifetimeHighScore();
                    updateUserLifetimeHighScore(highScore);
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

// Check if "lifetimeHighScore" exists in local storage
// const lifetimeHighScore = player.lifetimeHighScore;
async function initHighScore() {
    lifetimeHighScore = await getLifetimeHighScore();
    setHighScore(lifetimeHighScore); // check database for user's highscore
}

async function getLifetimeHighScore() {
    // Get the user's lifetimeHighScore from the service
    const response = await fetch('/api/lifetimeHighScore');
    let userObj = await response.json();
    lifetimeHighScore = userObj.highScore;
    return lifetimeHighScore;
}

async function updateUserLifetimeHighScore(score) {
    const response = await fetch('/api/updateHighScore', {
        method: 'POST',
        body: JSON.stringify({
          user: 'temp name',
          highScore: score,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
      })
        .then((response) => response.json())
        .then((jsonResponse) => {
          console.log(jsonResponse);
        });
}

function main() {
    //functions to use on boot up
    initHighScore();
    displayRandomEmoji(); // load a random emoji on page opening
    listeners(); // click event listeners
}
main();