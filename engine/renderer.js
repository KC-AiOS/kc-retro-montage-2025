//------------------------------------------------------
// renderer.js - Draw Map + Player
//------------------------------------------------------

console.log("renderer.js loaded");

//------------------------------------------------------
// BASIC CANVAS ACCESS
//------------------------------------------------------

let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");

// 每格 tile 尺寸（10px → 320x240 剛好畫 32x24）
const TILE = 10;


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
