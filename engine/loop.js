//------------------------------------------------------
// loop.js - Main Game Loop
//------------------------------------------------------

console.log("loop.js loaded");

let gameRunning = false;


//------------------------------------------------------
// START LOOP
//------------------------------------------------------
function startLoop() {
    if (!gameRunning) {
        gameRunning = true;
        requestAnimationFrame(gameLoop);
    }
}


//------------------------------------------------------
// MAIN LOOP
//------------------------------------------------------
function gameLoop() {
    updatePlayer();   // 可留空
    renderFrame();    // ⭐ 要畫畫面
    requestAnimationFrame(gameLoop);
}
