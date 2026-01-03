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

    if (!gameRunning) return;

    // 更新玩家輸入
    updateInput();

    // 繪製畫面
    renderFrame();

    requestAnimationFrame(gameLoop);
}
