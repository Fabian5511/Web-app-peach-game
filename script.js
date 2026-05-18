console.log("script started");

let peachCount = 0;
const baseClickPower = 1;
let clickMultiplier = 1;
let clickUpgradeCost = 500;
let productionMultiplier = 1;
let productionUpgradeCost = 2000;
let prestigeLevel = 0;
let prestigeMultiplier = 1;
const prestigeThreshold = 1000000;
let gnomeProductionMultiplier = 1;
let fairyProductionMultiplier = 1;
let botProductionMultiplier = 1;
let factoryProductionMultiplier = 1;
let cosmicProductionMultiplier = 1;
let gnomeUpgradeCost = 50;
let fairyUpgradeCost = 250;
let botUpgradeCost = 1500;
let factoryUpgradeCost = 7500;
let cosmicUpgradeCost = 40000;
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
let cosmicCount = 0;
let cosmicCost = 100000;
const cosmicProductionPerSecond = 500;

function updatePeachDisplay() {
    const countDisplay = document.getElementById("peachCount");
    if (countDisplay) {
        countDisplay.innerText = peachCount;
    }
    updatePrestigeDisplay();
}

function getEffectiveClickPower() {
    return baseClickPower * clickMultiplier * prestigeMultiplier;
}

function updateClickPowerDisplay() {
    const clickPowerDisplay = document.getElementById("clickPower");
    const clickMultiplierDisplay = document.getElementById("clickMultiplier");
    if (clickPowerDisplay) {
        clickPowerDisplay.innerText = getEffectiveClickPower();
    }
    if (clickMultiplierDisplay) {
        clickMultiplierDisplay.innerText = `x${clickMultiplier * prestigeMultiplier}`;
    }
}

function updateClickUpgradeCostDisplay() {
    const clickUpgradeCostDisplay = document.getElementById("clickUpgradeCost");
    if (clickUpgradeCostDisplay) {
        clickUpgradeCostDisplay.innerText = clickUpgradeCost;
    }
}

function updateProductionUpgradeCostDisplay() {
    const productionUpgradeCostDisplay = document.getElementById("productionUpgradeCost");
    if (productionUpgradeCostDisplay) {
        productionUpgradeCostDisplay.innerText = productionUpgradeCost;
    }
}
function updatePrestigeDisplay() {
    const prestigeDisplay = document.getElementById("prestigeLevel");
    if (prestigeDisplay) {
        prestigeDisplay.innerText = prestigeLevel;
    }

    const requirementDisplay = document.getElementById("prestigeReq");
    if (requirementDisplay) {
        requirementDisplay.innerText = peachCount >= prestigeThreshold ? "READY" : `Need ${prestigeThreshold.toLocaleString()}`;
    }

    const peachCountDisplay = document.getElementById("peachCount");
    if (peachCountDisplay) {
        if (prestigeLevel > 0) {
            peachCountDisplay.classList.add("gold-peach");
            const glow = Math.min(prestigeLevel, 5);
            peachCountDisplay.style.setProperty("--prestige-glow", glow.toString());
        } else {
            peachCountDisplay.classList.remove("gold-peach");
            peachCountDisplay.style.removeProperty("--prestige-glow");
        }
    }
}

function resetWorkersAndUpgrades() {
    gnomeCount = 0;
    gnomeCost = 10;
    gnomeProductionMultiplier = 1;
    gnomeUpgradeCost = 50;

    fairyCount = 0;
    fairyCost = 100;
    fairyProductionMultiplier = 1;
    fairyUpgradeCost = 250;

    botCount = 0;
    botCost = 1000;
    botProductionMultiplier = 1;
    botUpgradeCost = 1500;

    factoryCount = 0;
    factoryCost = 10000;
    factoryProductionMultiplier = 1;
    factoryUpgradeCost = 7500;

    cosmicCount = 0;
    cosmicCost = 100000;
    cosmicProductionMultiplier = 1;
    cosmicUpgradeCost = 40000;

    clickMultiplier = 1;
    clickUpgradeCost = 500;
    productionMultiplier = 1;
    productionUpgradeCost = 2000;
}

function buyPrestige() {
    if (peachCount < prestigeThreshold) {
        return;
    }

    prestigeLevel += 1;
    prestigeMultiplier *= 2;
    peachCount = 0;
    resetWorkersAndUpgrades();
    updatePeachDisplay();
    updateClickPowerDisplay();
    updateClickUpgradeCostDisplay();
    updateProductionUpgradeCostDisplay();
    updateGnomeDisplay();
    updateGnomeCostDisplay();
    updateGnomeProductionDisplay();
    updateGnomeUpgradeCostDisplay();
    updateFairyDisplay();
    updateFairyCostDisplay();
    updateFairyProductionDisplay();
    updateFairyUpgradeCostDisplay();
    updateBotDisplay();
    updateBotCostDisplay();
    updateBotProductionDisplay();
    updateBotUpgradeCostDisplay();
    updateFactoryDisplay();
    updateFactoryCostDisplay();
    updateFactoryProductionDisplay();
    updateFactoryUpgradeCostDisplay();
    updateCosmicDisplay();
    updateCosmicCostDisplay();
    updateCosmicProductionDisplay();
    updateCosmicUpgradeCostDisplay();
    updateTotalProductionDisplay();
    updatePrestigeDisplay();
    console.log("Prestige activated");
}
function buyClickUpgrade() {
    if (peachCount >= clickUpgradeCost) {
        peachCount -= clickUpgradeCost;
        clickMultiplier *= 2;
        clickUpgradeCost = Math.max(100, Math.floor(clickUpgradeCost * 2.5));
        updatePeachDisplay();
        updateClickPowerDisplay();
        updateClickUpgradeCostDisplay();
        updateTotalProductionDisplay();
        console.log("Click power upgraded");
    }
}

function buyProductionUpgrade() {
    if (peachCount >= productionUpgradeCost) {
        peachCount -= productionUpgradeCost;
        productionMultiplier *= 2;
        productionUpgradeCost = Math.max(200, Math.floor(productionUpgradeCost * 2.5));
        updatePeachDisplay();
        updateProductionUpgradeCostDisplay();
        updateTotalProductionDisplay();
        console.log("Production upgraded");
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

function updateGnomeDisplay() {
    const gnomeDisplay = document.getElementById("gnomeCount");
    if (gnomeDisplay) {
        gnomeDisplay.innerText = gnomeCount;
    }
}

function updateGnomeProductionDisplay() {
    const productionDisplay = document.getElementById("gnomeProduction");
    if (productionDisplay) {
        productionDisplay.innerText = gnomeCount * gnomeProductionPerSecond * gnomeProductionMultiplier * prestigeMultiplier;
    }
}

function updateGnomeCostDisplay() {
    let gnomeCostDisplay = document.getElementById("gnomeCost");
    if (gnomeCostDisplay) {
        gnomeCostDisplay.innerText = gnomeCost;
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

function updateFairyDisplay() {
    const fairyDisplay = document.getElementById("fairyCount");
    if (fairyDisplay) {
        fairyDisplay.innerText = fairyCount;
    }
}

function updateFairyProductionDisplay() {
    const productionDisplay = document.getElementById("fairyProduction");
    if (productionDisplay) {
        productionDisplay.innerText = fairyCount * fairyProductionPerSecond * fairyProductionMultiplier * prestigeMultiplier;
    }
}

function updateFairyCostDisplay() {
    const fairyCostDisplay = document.getElementById("fairyCost");
    if (fairyCostDisplay) {
        fairyCostDisplay.innerText = fairyCost;
    }
}

function updateGnomeUpgradeCostDisplay() {
    const gnomeUpgradeCostDisplay = document.getElementById("gnomeUpgradeCost");
    if (gnomeUpgradeCostDisplay) {
        gnomeUpgradeCostDisplay.innerText = gnomeUpgradeCost;
    }
}

function updateFairyUpgradeCostDisplay() {
    const fairyUpgradeCostDisplay = document.getElementById("fairyUpgradeCost");
    if (fairyUpgradeCostDisplay) {
        fairyUpgradeCostDisplay.innerText = fairyUpgradeCost;
    }
}

function updateBotUpgradeCostDisplay() {
    const botUpgradeCostDisplay = document.getElementById("botUpgradeCost");
    if (botUpgradeCostDisplay) {
        botUpgradeCostDisplay.innerText = botUpgradeCost;
    }
}

function updateFactoryUpgradeCostDisplay() {
    const factoryUpgradeCostDisplay = document.getElementById("factoryUpgradeCost");
    if (factoryUpgradeCostDisplay) {
        factoryUpgradeCostDisplay.innerText = factoryUpgradeCost;
    }
}

function updateCosmicUpgradeCostDisplay() {
    const cosmicUpgradeCostDisplay = document.getElementById("cosmicUpgradeCost");
    if (cosmicUpgradeCostDisplay) {
        cosmicUpgradeCostDisplay.innerText = cosmicUpgradeCost;
    }
}

function buyGnomeUpgrade() {
    if (peachCount >= gnomeUpgradeCost) {
        peachCount -= gnomeUpgradeCost;
        gnomeProductionMultiplier *= 2;
        gnomeUpgradeCost = Math.max(20, Math.floor(gnomeUpgradeCost * 2.5));
        updatePeachDisplay();
        updateGnomeProductionDisplay();
        updateGnomeUpgradeCostDisplay();
        updateTotalProductionDisplay();
        console.log("Gnome upgrade purchased");
    }
}

function buyFairyUpgrade() {
    if (peachCount >= fairyUpgradeCost) {
        peachCount -= fairyUpgradeCost;
        fairyProductionMultiplier *= 2;
        fairyUpgradeCost = Math.max(100, Math.floor(fairyUpgradeCost * 2.5));
        updatePeachDisplay();
        updateFairyProductionDisplay();
        updateFairyUpgradeCostDisplay();
        updateTotalProductionDisplay();
        console.log("Fairy upgrade purchased");
    }
}

function buyBotUpgrade() {
    if (peachCount >= botUpgradeCost) {
        peachCount -= botUpgradeCost;
        botProductionMultiplier *= 2;
        botUpgradeCost = Math.max(500, Math.floor(botUpgradeCost * 2.5));
        updatePeachDisplay();
        updateBotProductionDisplay();
        updateBotUpgradeCostDisplay();
        updateTotalProductionDisplay();
        console.log("Bot upgrade purchased");
    }
}

function buyFactoryUpgrade() {
    if (peachCount >= factoryUpgradeCost) {
        peachCount -= factoryUpgradeCost;
        factoryProductionMultiplier *= 2;
        factoryUpgradeCost = Math.max(2500, Math.floor(factoryUpgradeCost * 2.5));
        updatePeachDisplay();
        updateFactoryProductionDisplay();
        updateFactoryUpgradeCostDisplay();
        updateTotalProductionDisplay();
        console.log("Factory upgrade purchased");
    }
}

function buyCosmicUpgrade() {
    if (peachCount >= cosmicUpgradeCost) {
        peachCount -= cosmicUpgradeCost;
        cosmicProductionMultiplier *= 2;
        cosmicUpgradeCost = Math.max(12000, Math.floor(cosmicUpgradeCost * 2.5));
        updatePeachDisplay();
        updateCosmicProductionDisplay();
        updateCosmicUpgradeCostDisplay();
        updateTotalProductionDisplay();
        console.log("Cosmic upgrade purchased");
    }
}

function updateTotalProductionDisplay() {
    const gnomeProduction = gnomeCount * gnomeProductionPerSecond * gnomeProductionMultiplier;
    const fairyProduction = fairyCount * fairyProductionPerSecond * fairyProductionMultiplier;
    const botProduction = botCount * botProductionPerSecond * botProductionMultiplier;
    const factoryProduction = factoryCount * factoryProductionPerSecond * factoryProductionMultiplier;
    const cosmicProduction = cosmicCount * cosmicProductionPerSecond * cosmicProductionMultiplier;
    const baseProduction = gnomeProduction + fairyProduction + botProduction + factoryProduction + cosmicProduction;
    const totalProduction = baseProduction * productionMultiplier * prestigeMultiplier;
    const totalDisplay = document.getElementById("peachPerSecond");
    if (totalDisplay) {
        totalDisplay.innerText = totalProduction;
    }
}

function handlePeachClick() {
    peachCount += getEffectiveClickPower();
    updatePeachDisplay();

    const peachButton = document.getElementById("peachButton");
    if (peachButton) {
        peachButton.classList.remove("bounce");
        void peachButton.offsetWidth;
        peachButton.classList.add("bounce");
    }
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
    const passiveTotal = (gnomeCount * gnomeProductionPerSecond * gnomeProductionMultiplier + fairyCount * fairyProductionPerSecond * fairyProductionMultiplier + botCount * botProductionPerSecond * botProductionMultiplier + factoryCount * factoryProductionPerSecond * factoryProductionMultiplier + cosmicCount * cosmicProductionPerSecond * cosmicProductionMultiplier) * productionMultiplier * prestigeMultiplier;
    if (passiveTotal > 0) {
        peachCount += passiveTotal;
        updatePeachDisplay();
        updateGnomeProductionDisplay();
        updateFairyProductionDisplay();
        updateBotProductionDisplay();
        updateFactoryProductionDisplay();
        updateCosmicProductionDisplay();
        updateTotalProductionDisplay();
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

    const buyCosmicButton = document.getElementById("buyCosmic");
    if (buyCosmicButton) {
        buyCosmicButton.addEventListener("click", buyCosmicOrchard);
    }

    const buyClickUpgradeButton = document.getElementById("buyClickUpgrade");
    if (buyClickUpgradeButton) {
        buyClickUpgradeButton.addEventListener("click", buyClickUpgrade);
    }

    const buyProductionUpgradeButton = document.getElementById("buyProductionUpgrade");
    if (buyProductionUpgradeButton) {
        buyProductionUpgradeButton.addEventListener("click", buyProductionUpgrade);
    }

    const prestigeButton = document.getElementById("prestigeBtn");
    if (prestigeButton) {
        prestigeButton.addEventListener("click", buyPrestige);
    }

    const buyGnomeUpgradeButton = document.getElementById("buyGnomeUpgrade");
    if (buyGnomeUpgradeButton) {
        buyGnomeUpgradeButton.addEventListener("click", buyGnomeUpgrade);
    }

    const buyFairyUpgradeButton = document.getElementById("buyFairyUpgrade");
    if (buyFairyUpgradeButton) {
        buyFairyUpgradeButton.addEventListener("click", buyFairyUpgrade);
    }

    const buyBotUpgradeButton = document.getElementById("buyBotUpgrade");
    if (buyBotUpgradeButton) {
        buyBotUpgradeButton.addEventListener("click", buyBotUpgrade);
    }

    const buyFactoryUpgradeButton = document.getElementById("buyFactoryUpgrade");
    if (buyFactoryUpgradeButton) {
        buyFactoryUpgradeButton.addEventListener("click", buyFactoryUpgrade);
    }

    const buyCosmicUpgradeButton = document.getElementById("buyCosmicUpgrade");
    if (buyCosmicUpgradeButton) {
        buyCosmicUpgradeButton.addEventListener("click", buyCosmicUpgrade);
    }

    document.querySelectorAll("button").forEach((button) => {
        button.addEventListener("click", logButtonClick);
    });
    
    updatePeachDisplay();
    updateClickPowerDisplay();
    updateClickUpgradeCostDisplay();
    updateProductionUpgradeCostDisplay();
    updatePrestigeDisplay();
    updateGnomeDisplay();
    updateGnomeCostDisplay();
    updateGnomeProductionDisplay();
    updateGnomeUpgradeCostDisplay();
    updateFairyDisplay();
    updateFairyCostDisplay();
    updateFairyProductionDisplay();
    updateFairyUpgradeCostDisplay();
    updateBotDisplay();
    updateBotCostDisplay();
    updateBotProductionDisplay();
    updateBotUpgradeCostDisplay();
    updateFactoryDisplay();
    updateFactoryCostDisplay();
    updateFactoryProductionDisplay();
    updateFactoryUpgradeCostDisplay();
    updateCosmicDisplay();
    updateCosmicCostDisplay();
    updateCosmicProductionDisplay();
    updateCosmicUpgradeCostDisplay();
    updateTotalProductionDisplay();
    setInterval(applyPassiveIncome, 1000);
});



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
        productionDisplay.innerText = botCount * botProductionPerSecond * botProductionMultiplier * prestigeMultiplier;
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
        productionDisplay.innerText = factoryCount * factoryProductionPerSecond * factoryProductionMultiplier * prestigeMultiplier;
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

function updateCosmicDisplay() {
    const cosmicDisplay = document.getElementById("cosmicCount");
    if (cosmicDisplay) {
        cosmicDisplay.innerText = cosmicCount;
    }
}

function updateCosmicProductionDisplay() {
    const productionDisplay = document.getElementById("cosmicProduction");
    if (productionDisplay) {
        productionDisplay.innerText = cosmicCount * cosmicProductionPerSecond * cosmicProductionMultiplier * prestigeMultiplier;
    }
}

function updateCosmicCostDisplay() {
    const cosmicCostDisplay = document.getElementById("cosmicCost");
    if (cosmicCostDisplay) {
        cosmicCostDisplay.innerText = cosmicCost;
    }
}

function buyCosmicOrchard() {
    if (peachCount >= cosmicCost) {
        peachCount -= cosmicCost;
        cosmicCount += 1;
        cosmicCost *= 2;
        updateCosmicCostDisplay();
        updateCosmicDisplay();
        updateCosmicProductionDisplay();
        updatePeachDisplay();
        updateTotalProductionDisplay();
        console.log("Cosmic Orchard bought");
    }
}


