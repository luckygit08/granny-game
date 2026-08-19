let bossHP = 1000;
let playerHP = 100;

let defending = false;
let playerTurn = true;

const boss = document.getElementById("boss");

const health = document.getElementById("health");
const healthText = document.getElementById("health-text");

const playerHealth = document.getElementById("player-health");
const playerHealthText = document.getElementById("player-health-text");

const attackButton = document.getElementById("attack-button");
const defendButton = document.getElementById("defend-button");

const battleMessage = document.getElementById("battle-message");

const loreButton = document.getElementById("lore-button");
const loreScreen = document.getElementById("lore-screen");
const closeLore = document.getElementById("close-lore");

const hitSound = document.getElementById("hit-sound");
const defeatSound = document.getElementById("defeat-sound");


// ========================
// PLAYER ATTACK
// ========================

attackButton.addEventListener("click", function () {

if (!playerTurn) {
return;
}

// Play hit sound
hitSound.currentTime = 0;
hitSound.play();

// Make boss shake
boss.classList.remove("boss-hit");
void boss.offsetWidth;
boss.classList.add("boss-hit");

// Damage boss
bossHP -= 200;

if (bossHP < 0) {
bossHP = 0;
}

// Update boss health bar
health.style.width = (bossHP / 10) + "%";

healthText.textContent =
"HP: " + bossHP + " / 1000";

battleMessage.textContent =
"⚔️ You attacked Granny! -200 HP";


// ========================
// BOSS DEFEATED
// ========================

if (bossHP === 0) {

battleMessage.textContent =
"💀 BOSS DEFEATED 💀";

attackButton.disabled = true;
defendButton.disabled = true;

defeatSound.currentTime = 0;
defeatSound.play();

return;
}


// ========================
// BOSS TURN
// ========================

playerTurn = false;

attackButton.disabled = true;

setTimeout(bossAttack, 1000);
});


// ========================
// BOSS ATTACK
// ========================

function bossAttack() {

battleMessage.textContent =
"⚠️ Granny IS ATTACKING!";

defendButton.disabled = false;

setTimeout(function () {

if (!defending) {

playerHP -= 25;

battleMessage.textContent =
"💥 DIRECT HIT! You lost 25 HP!";

} else {

playerHP -= 5;

battleMessage.textContent =
"🛡️ BLOCKED! You only lost 5 HP!";

}

// Don't let HP go below zero
if (playerHP < 0) {
playerHP = 0;
}

// Update player health bar
playerHealth.style.width = playerHP + "%";

playerHealthText.textContent =
"❤️ YOUR HP: " + playerHP + " / 100";

// Reset defending
defending = false;

// Check if player died
if (playerHP === 0) {

battleMessage.textContent =
"💀 YOU HAVE BEEN DEFEATED.";

attackButton.disabled = true;
defendButton.disabled = true;

return;
}

// Give player another turn
setTimeout(function () {

playerTurn = true;

attackButton.disabled = false;
defendButton.disabled = true;

battleMessage.textContent =
"⚔️ Your turn!";

}, 1000);

}, 2000);
}


// ========================
// DEFEND
// ========================

defendButton.addEventListener("click", function () {

if (playerTurn) {
return;
}

defending = true;

battleMessage.textContent =
"🛡️ YOU'RE DEFENDING!";
});


// ========================
// LORE
// ========================

loreButton.addEventListener("click", function () {

loreScreen.style.display = "flex";
});


// ========================
// CLOSE LORE
// ========================

closeLore.addEventListener("click", function () {

loreScreen.style.display = "none";
});