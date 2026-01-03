//------------------------------------------------------
// Mini Micro Montagem 2025 - INPUT & PLAYER CONTROL
//------------------------------------------------------

let keys = {};

let px = 2;   // player position
let py = 2;

let playerHP = 3;
let playerDead = false;

document.addEventListener("keydown", e => keys[e.key] = true);
document.addEventListener("keyup",   e => keys[e.key] = false);


//======================================================
// INIT INPUT
//======================================================
function initInput() {
    keys = {};
    playerDead = false;
    playerHP = 3;
}


//======================================================
// PLAYER MOVE (collision-aware)
//======================================================
function movePlayer(dx, dy) {
    let nx = px + dx;
    let ny = py + dy;

    if (!isWalkable(nx, ny)) return;

    px = nx;
    py = ny;

    sfxPickup();   // movement sound (retro)
}


//======================================================
// PLAYER SHOOT
//======================================================
function playerShoot() {
    bullets.push({
        x: px,
        y: py,
        dx: 1,           // forward shot
        dy: 0,
        speed: 0.18,
        owner: "player"
    });

    sfxShoot();
}


//======================================================
// PLAYER UPDATE (called every frame)
//======================================================
function updatePlayer() {
    if (playerDead) return;

    // movement
    if (keys["ArrowUp"])    movePlayer(0, -1);
    if (keys["ArrowDown"])  movePlayer(0, 1);
    if (keys["ArrowLeft"])  movePlayer(-1, 0);
    if (keys["ArrowRight"]) movePlayer(1, 0);

    // shooting
    if (keys[" "]) {
        playerShoot();
        keys[" "] = false;
    }

    playerCollectCheck();
    playerEnemyCheck();
    playerDoorCheck();
}


//======================================================
// PICKUP COLLECTIBLES
//======================================================
function playerCollectCheck() {
    for (let c of collects) {
        if (!c.active) continue;

        if (px === c.x && py === c.y) {
            c.active = false;
            score += 10;
            sfxPickup();
            saveGame();
        }
    }
}


//======================================================
// COLLISION WITH ENEMY (touch damage)
//======================================================
function playerEnemyCheck() {
    for (let e of enemies) {
        if (!e.active) continue;

        if (px === e.x && py === e.y) {
            takeDamage();
        }
    }
}


//======================================================
// PLAYER TAKES DAMAGE
//======================================================
function takeDamage() {
    playerHP--;

    sfxHit();

    if (playerHP <= 0) {
        playerDead = true;
        console.warn("Player Dead");
    }
}


//======================================================
// ENTER DOOR (D) → NEXT FLOOR
//======================================================
function playerDoorCheck() {
    let t = FLOORS[currentFloor][py][px];

    if (t === "D") {
        currentFloor++;

        if (currentFloor >= FLOORS.length)
            currentFloor = 0;  // wrap-around

        sfxFloorChange();
        saveGame();

        resetAttributes();
        parseEnemiesFromMap();

        px = 2;
        py = 2;
    }
}
