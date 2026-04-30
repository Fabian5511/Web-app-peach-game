console.log("script started");

let peachCount = 0;
let autoClickerRunning = false;
let autoClickerTimer;

function updatePeachDisplay() {
    const countDisplay = document.getElementById("peachCount");
    if (countDisplay) {
        countDisplay.innerText = peachCount;
    }
}

function handlePeachClick() {
    peachCount += 1;
    updatePeachDisplay();
}

function toggleAutoClick() {
    const statusElement = document.getElementById("autoClickStatus");
    if (autoClickerRunning) {
        clearInterval(autoClickerTimer);
        autoClickerRunning = false;
        if (statusElement) statusElement.innerText = "OFF";
    } else {
        autoClickerRunning = true;
        autoClickerTimer = setInterval(handlePeachClick, 1000);
        if (statusElement) statusElement.innerText = "ON";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const peachButton = document.getElementById("peachButton");
    if (peachButton) {
        peachButton.addEventListener("click", handlePeachClick);
    }
    
    const startButton = document.getElementById("autoClickBtn");
    if (startButton) {
        startButton.addEventListener("click", toggleAutoClick);
    }
    
    const buyGnomeButton = document.getElementById("buyGnome");
    if (buyGnomeButton) {
        buyGnomeButton.addEventListener("click", buyGnome);
    }
    
    updatePeachDisplay();
    updateGnomeDisplay();
});

let gnomeCount = 0;
const gnomeCost = 10;

function updateGnomeDisplay() {
    const gnomeDisplay = document.getElementById("gnomeCount");
    if (gnomeDisplay) {
        gnomeDisplay.innerText = gnomeCount;
    }
}

function buyGnome() {
    if (peachCount >= gnomeCost) {
        peachCount -= gnomeCost;
        gnomeCount += 1;
        updatePeachDisplay();
        updateGnomeDisplay();
        console.log("Gnome bought ");
    }
}





