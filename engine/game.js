//------------------------------------------------------
// game.js - Clean Boot Version (Minimal Playable Build)
//------------------------------------------------------

console.log("game.js loaded");

//------------------------------------------------------
// TITLE MENU CONTROL
//------------------------------------------------------

function startGame() {

    // 隱藏主選單
    const menu = document.getElementById("titleMenu");
    menu.style.display = "none";

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
// INITIALIZE (optional future expansion)
//------------------------------------------------------
function initGame() {
    // 若需要預載資料，可以放這裡
}

// Boot message
console.log("Mini Micro Montagem 2025 (Minimal Mode) Ready.");
