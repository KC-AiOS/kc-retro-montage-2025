//------------------------------------------------------
// Mini Micro Montagem 2025 - 8-BIT SFX SYNTH
//------------------------------------------------------

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function beep(freq, duration = 0.1, type = "square", volume = 0.2) {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = type;
    osc.frequency.value = freq;

    gain.gain.value = volume;

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + duration);
}


//======================================================
// RETRO SOUND EFFECTS
//======================================================

// Player/enemy shooting
function sfxShoot() {
    beep(440, 0.05, "square", 0.3);
    beep(880, 0.05, "square", 0.2);
}

// Pickup items
function sfxPickup() {
    beep(600, 0.06, "triangle", 0.25);
    beep(900, 0.06, "triangle", 0.25);
}

// Player hit
function sfxHit() {
    beep(180, 0.1, "sawtooth", 0.3);
    beep(120, 0.1, "square", 0.3);
}

// Floor change
function sfxFloorChange() {
    beep(300, 0.12, "square", 0.3);
    beep(600, 0.12, "square", 0.3);
    beep(900, 0.12, "square", 0.3);
}
