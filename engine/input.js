//------------------------------------------------------
// input.js - Keyboard Input Controller
//------------------------------------------------------

console.log("input.js loaded");

//------------------------------------------------------
// KEY STATE TABLE
//------------------------------------------------------

let keyDown = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false
};


//------------------------------------------------------
// EVENT HANDLERS
//------------------------------------------------------

window.addEventListener("keydown", (e) => {
    if (keyDown[e.key] !== undefined) {
        keyDown[e.key] = true;
    }
});

window.addEventListener("keyup", (e) => {
    if (keyDown[e.key] !== undefined) {
        keyDown[e.key] = false;
    }
});


//------------------------------------------------------
// INPUT UPDATE → PLAYER MOVEMENT
//------------------------------------------------------

function updateInput() {

    if (keyDown.ArrowUp)    movePlayer(0, -1);
    if (keyDown.ArrowDown)  movePlayer(0,  1);
    if (keyDown.ArrowLeft)  movePlayer(-1, 0);
    if (keyDown.ArrowRight) movePlayer( 1, 0);
}
