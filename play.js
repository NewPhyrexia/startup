let clickCount = 0;

// Function to update the click count and score display
function updateClickCount() {
    // Increment the click count
    clickCount++;

    // Update the score display immediately
    const scoreDisplay = document.getElementById('player-score');
    scoreDisplay.textContent = clickCount;
}

// Add a click event listener to the button
const customButton = document.getElementById('custom-button');
customButton.addEventListener('click', () => {
    updateClickCount();
});