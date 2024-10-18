const ecoFacts = [
    "Recycling one aluminum can saves enough energy to run a TV for three hours.",
    "A single tree can absorb 10 pounds of air pollutants a year.",
    "The average American uses 650 pounds of paper each year.",
    "About 27,000 trees are cut down each day just to make toilet paper.",
    "Plastic bags and other plastic garbage thrown into the ocean kill as many as 1 million sea creatures every year."
];

const ecoActions = [
    "Use a reusable water bottle instead of buying bottled water.",
    "Turn off lights and electronics when not in use.",
    "Use cloth bags for grocery shopping instead of plastic bags.",
    "Start composting your food scraps and yard waste.",
    "Choose products with minimal packaging to reduce waste."
];

function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function generateNewContent() {
    document.getElementById('eco-fact').textContent = getRandomItem(ecoFacts);
    document.getElementById('eco-action').textContent = getRandomItem(ecoActions);
}

// Initial content generation
generateNewContent();