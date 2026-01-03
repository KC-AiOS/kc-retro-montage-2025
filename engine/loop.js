//------------------------------------------------------
// Mini Micro Montagem 2025 - MAIN LOOP
//------------------------------------------------------

let lastTime = 0;


//======================================================
// UPDATE GAME STATE
//======================================================
function update(dt) {
    updatePlayer();
    updateEnemies();
    updateBullets();
    updateAnimations();
}


//======================================================
// RENDER GAME STATE
//======================================================
function render() {
    clearScreen();
    drawMap();
    drawCollects();
    drawEnemies();
    drawBullets();
    drawPlayer();
    drawUI();
}


//======================================================
// MAIN LOOP (requestAnimationFrame)
//======================================================
function gameLoop(timestamp) {
    let dt = timestamp - lastTime;
    lastTime = timestamp;

    update(dt);
    render();

    requestAnimationFrame(gameLoop);
}


//======================================================
// START GAME
//======================================================
function startGame() {
    initInput();
    resetAttributes();
    parseEnemiesFromMap();

    if (!loadGame()) {
        px = 2;
        py = 2;
        score = 0;
    }

    requestAnimationFrame(gameLoop);
}
