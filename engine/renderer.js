//------------------------------------------------------
// Mini Micro Montagem 2025 - RENDER ENGINE
//------------------------------------------------------

const TILE = 16;    // 16x16 pixel tiles
const WIDTH = 32;   // map width
const HEIGHT = 12;  // map height

// ZX Spectrum palette
const ZX = {
    BLACK: "#000",
    BLUE: "#0011EE",
    RED: "#DD0000",
    MAGENTA: "#DD00DD",
    GREEN: "#00CC00",
    CYAN: "#00DDDD",
    YELLOW: "#EEEE00",
    WHITE: "#FFFFFF"
};


//======================================================
// DRAW TILE
//======================================================
function drawTile(x, y, color, char) {
    ctx.fillStyle = color;
    ctx.fillRect(x * TILE, y * TILE, TILE, TILE);

    if (char) {
        ctx.fillStyle = ZX.WHITE;
        ctx.font = "16px ZX";
        ctx.fillText(char, x * TILE + 2, y * TILE + 14);
    }
}


//======================================================
// RENDER MAP
//======================================================
function renderMap() {
    let map = FLOORS[currentFloor];

    for (let y = 0; y < HEIGHT; y++) {
        for (let x = 0; x < WIDTH; x++) {
            let t = map[y][x];

            switch (t) {
                case "#": drawTile(x, y, ZX.BLUE); break;
                case "H": drawTile(x, y, ZX.YELLOW); break;
                case "D": drawTile(x, y, ZX.RED, "D"); break;
                case ".": drawTile(x, y, ZX.BLACK); break;
                default:  drawTile(x, y, ZX.BLACK); break;
            }
        }
    }
}


//======================================================
// RENDER PLAYER
//======================================================
function renderPlayer() {
    ctx.fillStyle = ZX.WHITE;
    ctx.fillRect(px * TILE + 2, py * TILE + 2, TILE - 4, TILE - 4);
}


//======================================================
// RENDER ENEMIES
//======================================================
function renderEnemies() {
    for (let e of enemies) {
        if (!e.active) continue;

        switch (e.type) {
            case "A": ctx.fillStyle = ZX.RED; break;
            case "V": ctx.fillStyle = ZX.MAGENTA; break;
            case "R": ctx.fillStyle = ZX.GREEN; break;
            case "S": ctx.fillStyle = ZX.CYAN; break;
        }

        ctx.fillRect(e.x * TILE + 2, e.y * TILE + 2, TILE - 4, TILE - 4);
    }
}


//======================================================
// RENDER BULLETS
//======================================================
function renderBullets() {
    ctx.fillStyle = ZX.YELLOW;

    for (let b of bullets) {
        ctx.fillRect(b.x * TILE + 6, b.y * TILE + 6, 4, 4);
    }
}


//======================================================
// RENDER COLLECTIBLES
//======================================================
function renderCollectibles() {
    ctx.fillStyle = ZX.MAGENTA;

    for (let c of collects) {
        if (!c.active) continue;
        ctx.fillRect(c.x * TILE + 5, c.y * TILE + 5, 6, 6);
    }
}


//======================================================
// RENDER UI
//======================================================
function renderUI() {
    ctx.fillStyle = ZX.BLACK;
    ctx.fillRect(0, 0, 300, 20);

    ctx.fillStyle = ZX.WHITE;
    ctx.font = "16px ZX";
    ctx.fillText("FLOOR " + (currentFloor + 1), 6, 16);
    ctx.fillText("SCORE " + score, 130, 16);
}


//======================================================
// MINI-MAP
//======================================================
function drawMiniMap() {
    let map = FLOORS[currentFloor];
    let ox = 480;
    let oy = 10;
    let s = 3;

    ctx.fillStyle = "#222";
    ctx.fillRect(ox, oy, 32 * s, 12 * s);

    for (let y = 0; y < HEIGHT; y++) {
        for (let x = 0; x < WIDTH; x++) {
            let t = map[y][x];
            ctx.fillStyle = (t === "#") ? ZX.BLUE : ZX.BLACK;
            ctx.fillRect(ox + x*s, oy + y*s, s, s);
        }
    }

    ctx.fillStyle = ZX.WHITE;
    ctx.fillRect(ox + px*s, oy + py*s, s, s);
}


//======================================================
// CRT BLEED / COLOR SMEAR
//======================================================
function applyBleed() {
    let img = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = img.data;

    for (let i = 0; i < data.length; i += 4) {
        data[i] *= 1.05;     // R
        data[i+1] *= 1.02;   // G
    }

    ctx.putImageData(img, 0, 0);
}


//======================================================
// FULL FRAME RENDER
//======================================================
function renderFrame() {
    ctx.fillStyle = ZX.BLACK;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    renderMap();
    renderCollectibles();
    renderBullets();
    renderEnemies();
    renderPlayer();
    renderUI();
}
