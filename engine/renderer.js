//------------------------------------------------------
// RENDERER — Mini Micro Montagem 2025
//------------------------------------------------------

console.log("renderer.js loaded");

//------------------------------------------------------
// Unified renderFrame() — SAFE
//------------------------------------------------------
function renderFrame() {

    // 如果 canvas 或 ctx 尚未初始化 → 不畫、也不報錯
    if (typeof canvas === "undefined" || !canvas) return;
    if (typeof ctx === "undefined" || !ctx) return;

    // 清畫面
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw Map
    drawMap();

    // Draw Player
    drawPlayer();

    // （之後可加入敵人、子彈）
    // drawEnemies();
    // drawBullets();
}


//------------------------------------------------------
// MAP DRAW
//------------------------------------------------------
function drawMap() {

    if (!map) return;

    for (let y = 0; y < MAP_H; y++) {
        for (let x = 0; x < MAP_W; x++) {

            ctx.fillStyle = (map[y][x] === 1) ? "#444" : "#111";
            ctx.fillRect(x * TILE, y * TILE, TILE, TILE);
        }
    }
}


//------------------------------------------------------
// DRAW PLAYER
//------------------------------------------------------
function drawPlayer() {

    if (typeof px === "undefined" || typeof py === "undefined") return;

    ctx.fillStyle = "#fff";
    ctx.fillRect(px * TILE, py * TILE, TILE, TILE);
}
