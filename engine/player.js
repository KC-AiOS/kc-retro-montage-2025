//------------------------------------------------------
// player.js - Player state + movement
//------------------------------------------------------

console.log("player.js loaded");

// 玩家初始座標（會被 game.js START 覆蓋）
let px = 2;
let py = 2;

// 一格 tile 對應 TILE 大小
function movePlayer(dx, dy) {
    let nx = px + dx;
    let ny = py + dy;

    // 邊界 & 碰牆檢查
    if (nx < 0 || ny < 0 || nx >= MAP_W || ny >= MAP_H) return;
    if (map[ny][nx] === 1) return;

    px = nx;
    py = ny;
}

// 用於 renderer.js 繪製玩家
function drawPlayer() {
    ctx.fillStyle = "#fff"; // 白色方塊
    ctx.fillRect(px * TILE, py * TILE, TILE, TILE);
}
