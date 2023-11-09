let clickCount = 0;
let timerRunning = false;
let timerInterval;
let buttonClicked = false;

let player = JSON.parse(localStorage.getItem('player'));
// Check if "lifetimeHighScore" exists in local storage
const lifetimeHighScore = player.lifetimeHighScore;

// Set the "highScore" variable based on the local storage value
let highScore;
if (lifetimeHighScore !== 0) {
    highScore = lifetimeHighScore;
} else {
    highScore = 0;
}
const lifetimeHighScoreDisplay = document.getElementById('lifetime-highscore');
    lifetimeHighScoreDisplay.textContent = highScore; 

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

// Add a click event listener to the button to start the timer
const customButton = document.getElementById('custom-button');
customButton.addEventListener('click', startTimer);

// Add a click event listener to the button to update the click count
customButton.addEventListener('click', () => {
    if (timerRunning && customButton.textContent === "Tap") {
        updateClickCount();
    }
});