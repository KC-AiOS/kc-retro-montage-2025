//------------------------------------------------------
// Mini Micro Montagem 2025 - ENEMY AI ENGINE
//------------------------------------------------------

let enemies = [];
let bullets = [];
let collects = [];


//======================================================
// TILE WALKABLE?
//======================================================
function isWalkable(x, y) {
    if (x < 0 || x >= WIDTH) return false;
    if (y < 0 || y >= HEIGHT) return false;

    return (FLOORS[currentFloor][y][x] !== "#");
}


//======================================================
// ENEMY SHOOT
//======================================================
function enemyShoot(ex, ey) {
    bullets.push({
        x: ex,
        y: ey,
        dx: Math.sign(px - ex),
        dy: Math.sign(py - ey),
        speed: 0.12,
        owner: "enemy"
    });

    sfxShoot();
}


//======================================================
// AGGRESSIVE ("A") — CHASE PLAYER
//======================================================
function aiAggressive(e) {
    let dx = Math.sign(px - e.x);
    let dy = Math.sign(py - e.y);

    let nx = e.x + dx;
    let ny = e.y + dy;

    if (isWalkable(nx, ny)) {
        e.x = nx;
        e.y = ny;
    }

    // attack when near player
    if (Math.abs(px - e.x) <= 1 && Math.abs(py - e.y) <= 1) {
        enemyShoot(e.x, e.y);
    }
}


//======================================================
// VERTICAL ("V") — UP & DOWN
//======================================================
function aiVertical(e) {
    if (e.vdir === undefined) e.vdir = 1;

    let ny = e.y + e.vdir;

    if (!isWalkable(e.x, ny)) {
        e.vdir *= -1;
        ny = e.y + e.vdir;
    }

    e.y = ny;
}


//======================================================
// RANDOM ("R") — UNPREDICTABLE WALK
//======================================================
function aiRandom(e) {
    if (Math.random() < 0.03) {
        e.rx = Math.floor(Math.random() * 3) - 1;
        e.ry = Math.floor(Math.random() * 3) - 1;
    }

    let nx = e.x + e.rx;
    let ny = e.y + e.ry;

    if (isWalkable(nx, ny)) {
        e.x = nx;
        e.y = ny;
    }
}


//======================================================
// STATIC ("S") — TURRET SHOOTER
//======================================================
function aiStatic(e) {
    // if in line of sight or diagonal
    if (px === e.x || py === e.y || Math.abs(px - e.x) === Math.abs(py - e.y)) {
        if (Math.random() < 0.02) {
            enemyShoot(e.x, e.y);
        }
    }
}


//======================================================
// UPDATE ALL ENEMIES
//======================================================
function updateEnemies() {
    for (let e of enemies) {
        if (!e.active) continue;

        switch (e.type) {
            case "A": aiAggressive(e); break;
            case "V": aiVertical(e); break;
            case "R": aiRandom(e); break;
            case "S": aiStatic(e); break;
        }
    }
}


//======================================================
// PARSE MAP FOR ENEMIES & ITEMS
//======================================================
function parseEnemiesFromMap() {
    enemies = [];
    collects = [];
    bullets = [];

    let map = FLOORS[currentFloor];

    for (let y = 0; y < HEIGHT; y++) {
        for (let x = 0; x < WIDTH; x++) {
            let t = map[y][x];

            // enemies
            if ("AVRS".includes(t)) {
                enemies.push({
                    x: x,
                    y: y,
                    type: t,
                    active: true
                });
                map[y][x] = ".";
            }

            // collectibles
            if (t === "C") {
                collects.push({
                    x: x,
                    y: y,
                    active: true
                });
                map[y][x] = ".";
            }
        }
    }
}
