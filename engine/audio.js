//------------------------------------------------------
// Mini Micro Montagem 2025 - AUDIO ENGINE (1-bit BEEP)
//------------------------------------------------------

window.AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();
window.audioCtx = new (window.AudioContext || window.webkitAudioContext)();


let volumeMaster = 0.25;
let sfxEnabled = true;


//======================================================
// 基礎 1-bit BEEP（ZX Spectrum 風格）
//======================================================
function beep(freq, dur, vol = 1.0) {
    if (!sfxEnabled) return;

    let osc = audioCtx.createOscillator();
    let gain = audioCtx.createGain();

    osc.frequency.value = freq;
    osc.type = "square";

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    gain.gain.setValueAtTime(vol * volumeMaster, audioCtx.currentTime);

    osc.start();
    osc.stop(audioCtx.currentTime + dur);
}


//======================================================
// SOUND EFFECTS
//======================================================

function sfxShoot() {
    beep(880, 0.05);
    beep(660, 0.04);
}

function sfxPickup() {
    beep(1200, 0.05);
    beep(1600, 0.05);
}

function sfxHit() {
    beep(200, 0.08);
    beep(150, 0.05);
}

function sfxEnemyDown() {
    beep(900, 0.03);
    beep(700, 0.03);
    beep(500, 0.03);
}

function sfxDoor() {
    beep(500, 0.08);
    beep(900, 0.06);
}

function sfxFloorChange() {
    beep(1200, 0.07);
    beep(1500, 0.07);
    beep(1800, 0.07);
}

function toggleSFX() {
    sfxEnabled = !sfxEnabled;
}
