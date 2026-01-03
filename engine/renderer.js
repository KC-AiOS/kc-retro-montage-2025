//------------------------------------------------------
// renderer.js - Draw Map + Player
//------------------------------------------------------

console.log("renderer.js loaded");

// renderer 只負責繪圖，不負責初始化 canvas
// canvas & ctx 由 game.js 提供
function renderFrame() {
    if (!ctx) return; // 防呆

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawMap();
    drawPlayer();
    drawEnemies();
    drawBullets();
}



//------------------------------------------------------
// DRAW EVERYTHING
//------------------------------------------------------
function renderFrame() {

    // 清畫面
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawMap();
    drawPlayer();
}


//------------------------------------------------------
// MAP DRAW
//------------------------------------------------------
function drawMap() {

    for (let y = 0; y < MAP_H; y++) {
        for (let x = 0; x < MAP_W; x++) {

            if (map[y][x] === 1) {
                ctx.fillStyle = "#444";   // 牆
            } else {
                ctx.fillStyle = "#111";   // 地板
            }

            ctx.fillRect(x * TILE, y * TILE, TILE, TILE);
        }
    }
}


//------------------------------------------------------
// DRAW PLAYER
//------------------------------------------------------
function drawPlayer() {

    ctx.fillStyle = "#fff"; // 白色小方塊
    ctx.fillRect(px * TILE, py * TILE, TILE, TILE);
}
