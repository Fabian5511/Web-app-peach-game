console.log("script started");

let peachCount = 0;
let autoClickerRunning = false;
let autoClickerTimer;
let gnomeCount = 0;
let gnomeCost = 10;
const gnomeProductionPerSecond = 1;
let fairyCount = 0;
let fairyCost = 100;
const fairyProductionPerSecond = 5;
let botCount = 0;
let botCost = 1000;
const botProductionPerSecond = 25;
let factoryCount = 0;
let factoryCost = 10000;
const factoryProductionPerSecond = 100;

function updatePeachDisplay() {
    const countDisplay = document.getElementById("peachCount");
    if (countDisplay) {
        countDisplay.innerText = peachCount;
    }
}

function updateGnomeDisplay() {
    const gnomeDisplay = document.getElementById("gnomeCount");
    if (gnomeDisplay) {
        gnomeDisplay.innerText = gnomeCount;
    }
}

function updateGnomeProductionDisplay() {
    const productionDisplay = document.getElementById("gnomeProduction");
    if (productionDisplay) {
        productionDisplay.innerText = gnomeCount * gnomeProductionPerSecond;
       
    } 
}

function updateFairyDisplay() {
    const fairyDisplay = document.getElementById("fairyCount");
    if (fairyDisplay) {
        fairyDisplay.innerText = fairyCount;
    }
}

function updateFairyProductionDisplay() {
    const productionDisplay = document.getElementById("fairyProduction");
    if (productionDisplay) {
        productionDisplay.innerText = fairyCount * fairyProductionPerSecond;
    }
}

function updateFairyCostDisplay() {
    const fairyCostDisplay = document.getElementById("fairyCost");
    if (fairyCostDisplay) {
        fairyCostDisplay.innerText = fairyCost;
    }
}

function updateTotalProductionDisplay() {
    const totalProduction = gnomeCount * gnomeProductionPerSecond + fairyCount * fairyProductionPerSecond + botCount * botProductionPerSecond + factoryCount * factoryProductionPerSecond;
    const totalDisplay = document.getElementById("peachPerSecond");
    if (totalDisplay) {
        totalDisplay.innerText = totalProduction;
    }
}

function handlePeachClick() {
    peachCount += 1;
    updatePeachDisplay();
}

function logButtonClick(event) {
    const button = event.currentTarget;
    const buttonId = button.id || "(no id)";
    const buttonText = button.innerText.trim().split('\n')[0];
    console.log(`Button clicked: ${buttonId}${buttonText ? ` (${buttonText})` : ""}`);
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

function applyPassiveIncome() {
    const passiveTotal = gnomeCount * gnomeProductionPerSecond + fairyCount * fairyProductionPerSecond + botCount * botProductionPerSecond + factoryCount * factoryProductionPerSecond;
    if (passiveTotal > 0) {
        peachCount += passiveTotal;
        updatePeachDisplay();
        updateGnomeProductionDisplay();
        updateFairyProductionDisplay();
        updateBotProductionDisplay();
        updateFactoryProductionDisplay();
        updateTotalProductionDisplay();
    }
}

function buyGnome() {
    if (peachCount >= gnomeCost) {
        peachCount -= gnomeCost;
        gnomeCount += 1;
        gnomeCost *= 2;
        updateGnomeCostDisplay();
        updatePeachDisplay();
        updateGnomeDisplay();
        updateGnomeProductionDisplay();
        updateTotalProductionDisplay();
        
        console.log("Gnome bought");
    }
}

function buyFairy() {
    if (peachCount >= fairyCost) {
        peachCount -= fairyCost;
        fairyCount += 1;
        fairyCost *= 2;
        updateFairyCostDisplay();
        updatePeachDisplay();
        updateFairyDisplay();
        updateFairyProductionDisplay();
        updateTotalProductionDisplay();
        
        console.log("Fairy bought");
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
    
    const buyFairyButton = document.getElementById("buyFairy");
    if (buyFairyButton) {
        buyFairyButton.addEventListener("click", buyFairy);
    }

    const buyBotButton = document.getElementById("buyBot");
    if (buyBotButton) {
        buyBotButton.addEventListener("click", buyBot);
    }

    const buyFactoryButton = document.getElementById("buyFactory");
    if (buyFactoryButton) {
        buyFactoryButton.addEventListener("click", buyFactory);
    }

    document.querySelectorAll("button").forEach((button) => {
        button.addEventListener("click", logButtonClick);
    });
    
    updatePeachDisplay();
    updateGnomeDisplay();
    updateGnomeCostDisplay();
    updateGnomeProductionDisplay();
    updateFairyDisplay();
    updateFairyCostDisplay();
    updateFairyProductionDisplay();
    updateBotDisplay();
    updateBotCostDisplay();
    updateBotProductionDisplay();
    updateFactoryDisplay();
    updateFactoryCostDisplay();
    updateFactoryProductionDisplay();
    updateTotalProductionDisplay();
    setInterval(applyPassiveIncome, 1000);
});

function updateGnomeCostDisplay() {
    let gnomeCostDisplay = document.getElementById("gnomeCost");
    if (gnomeCostDisplay) {
        gnomeCostDisplay.innerText = gnomeCost;
    }
}

function buyBot() {
    if (peachCount >= botCost) {
        peachCount -= botCost;
        botCount += 1;
        botCost *= 2;
        updateBotCostDisplay();
        updateBotDisplay();
        updateBotProductionDisplay();
        updateTotalProductionDisplay();
        updatePeachDisplay();
        console.log("Harvest Bot bought");
    }
}

function updateBotDisplay() {
    const botDisplay = document.getElementById("botCount");
    if (botDisplay) {
        botDisplay.innerText = botCount;
    }
}

function updateBotProductionDisplay() {
    const productionDisplay = document.getElementById("botProduction");
    if (productionDisplay) {
        productionDisplay.innerText = botCount * botProductionPerSecond;
    }
}

function updateBotCostDisplay() {
    const botCostDisplay = document.getElementById("botCost");
    if (botCostDisplay) {
        botCostDisplay.innerText = botCost;
    }
}

function updateFactoryDisplay() {
    const factoryDisplay = document.getElementById("factoryCount");
    if (factoryDisplay) {
        factoryDisplay.innerText = factoryCount;
    }
}

function updateFactoryProductionDisplay() {
    const productionDisplay = document.getElementById("factoryProduction");
    if (productionDisplay) {
        productionDisplay.innerText = factoryCount * factoryProductionPerSecond;
    }
}

function updateFactoryCostDisplay() {
    const factoryCostDisplay = document.getElementById("factoryCost");
    if (factoryCostDisplay) {
        factoryCostDisplay.innerText = factoryCost;
    }
}

function buyFactory() {
    if (peachCount >= factoryCost) {
        peachCount -= factoryCost;
        factoryCount += 1;
        factoryCost *= 2;
        updateFactoryCostDisplay();
        updatePeachDisplay();
        updateFactoryDisplay();
        updateFactoryProductionDisplay();
        updateTotalProductionDisplay();
        
        console.log("Factory bought");
    }
}
