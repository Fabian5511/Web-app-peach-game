console.log("script started ");

// Store the current count
let peachCount = 0;

// Get the button and add click listener
let peachButton = document.getElementById("peachButton");
peachButton.addEventListener("click", handlePeachClick);

// Function to handle peach clicks
function handlePeachClick() {
    peachCount = peachCount + 1; // Add 1 to count
    // Update the display
    let countDisplay = document.getElementById("peachCount");
    countDisplay.innerText = peachCount;
}

