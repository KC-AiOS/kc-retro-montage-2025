//------------------------------------------------------
// game.js - Clean Boot Version (Minimal Playable Build)
//------------------------------------------------------

console.log("game.js loaded");

let canvas = null;
let ctx = null;

//------------------------------------------------------
// DOM READY → 初始化 canvas + ctx
//------------------------------------------------------
window.addEventListener("DOMContentLoaded", () => {

    canvas = document.getElementById("game");
    if (!canvas) {
        console.error("❌ ERROR: <canvas id='game'> not found");
        return;
    }

    ctx = canvas.getContext("2d");
    console.log("✔ Canvas & Context initialized");

    initGame();
});


//------------------------------------------------------
// TITLE MENU CONTROL
//------------------------------------------------------
function startGame() {

    // 隱藏主選單
    const menu = document.getElementById("titleMenu");
    if (menu) menu.style.display = "none";

    // 初始化玩家位置
    px = 2;
    py = 2;

    // 啟動主迴圈
    startLoop();
}

function continueGame() {
    alert("Continue not implemented yet.");
}

function showAbout() {
    alert(
`MINI MICRO MONTAGEM 2025
Retro 8-bit Action Adventure
HTML5 ZX Engine (Minimal Build)

Created by KC`
    );
}


//------------------------------------------------------
// INITIALIZE
//------------------------------------------------------
function initGame() {
    console.log("Game initialized");
}


//------------------------------------------------------
// Boot message
//------------------------------------------------------
console.log("Mini Micro Montagem 2025 (Minimal Mode) Ready.");
