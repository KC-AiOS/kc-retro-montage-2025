//------------------------------------------------------
// Mini Micro Montagem 2025 - GAME FLOW CONTROLLER
//------------------------------------------------------

let gameStarted = false;
let audioUnlocked = false;

// Canvas
let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");


//======================================================
// TITLE MENU CONTROL
//======================================================
function startGame() {
    hideTitleMenu();
    newGame();
}

function continueGame() {
    hideTitleMenu();

    if (!loadGame()) {
        newGame();
    }
}

function showAbout() {
    alert(
`MINI MICRO MONTAGEM 2025
Retro 8-bit Action Adventure
ZX Spectrum Inspired Edition

Created by KC
Engine: KC ZX-HTML5 Engine v1.0
2025`
    );
}


//======================================================
// NEW GAME
//======================================================
function newGame() {
    currentFloor = 0;
    score = 0;

    parseEnemiesFromMap();
    resetAttributes();

    px = 2;
    py = 2;

    initInput();
    gameStarted = true;

    requestAnimationFrame(gameLoop);
}


//======================================================
// AUDIO UNLOCK (Chrome/iOS requirement)
//======================================================
window.addEventListener("click", function unlock() {
    if (!audioUnlocked) {
        let o = audioCtx.createOscillator();
        let g = audioCtx.createGain();

        o.connect(g).connect(audioCtx.destination);
        o.start();
        o.stop(audioCtx.currentTime + 0.01);

        audioUnlocked = true;
        console.log("Audio unlocked.");
    }
    window.removeEventListener("click", unlock);
});


//======================================================
// HIDE TITLE MENU
//======================================================
function hideTitleMenu() {
    let menu = document.getElementById("titleMenu");
    menu.style.display = "none";
}


//======================================================
// INIT (Optional)
//======================================================
function initGame() {
    resetAttributes();
    parseEnemiesFromMap();
    initInput();
}


//======================================================
// MAIN LOOP HANDOFF
//======================================================
function gameLoop() {
    if (!gameStarted) return;

    updatePlayer();
    updateEnemies();
    updateBullets();
    updatePlayerAnimation();
    updateEnemyAnimation();
    updateCollectibles();
    updateGate();

    renderFrame();
    drawMiniMap();
    applyBleed();

    requestAnimationFrame(gameLoop);
}

console.log("Mini Micro Montagem 2025 Loaded.");
