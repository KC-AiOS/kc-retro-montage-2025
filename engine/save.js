//------------------------------------------------------
// Mini Micro Montagem 2025 - KC-SAVE-STATE v1.0
//------------------------------------------------------

const SAVE_KEY = "MMM2025_SAVE";
let saveVersion = 1;   // 若日後資料格式改變可調整


//------------------------------------------------------
// SIMPLE CHECKSUM (avoid broken save files)
//------------------------------------------------------
function checksum(str) {
    let h = 0;
    for (let i = 0; i < str.length; i++) {
        h = (h << 5) - h + str.charCodeAt(i);
        h |= 0;
    }
    return h;
}


//------------------------------------------------------
// SAVE GAME
//------------------------------------------------------
function saveGame() {
    let data = {
        version: saveVersion,
        floor: currentFloor,
        score: score,
        px: px,
        py: py
    };

    let json = JSON.stringify(data);
    let check = checksum(json);

    let pack = JSON.stringify({
        data,
        check
    });

    localStorage.setItem(SAVE_KEY, pack);
}


//------------------------------------------------------
// LOAD GAME
//------------------------------------------------------
function loadGame() {
    let raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return false;

    try {
        let pack = JSON.parse(raw);
        let data = pack.data;

        // check checksum
        if (pack.check !== checksum(JSON.stringify(data))) {
            console.warn("Save checksum mismatch, ignoring.");
            return false;
        }

        if (data.version !== saveVersion) {
            console.warn("Save version mismatch, ignoring.");
            return false;
        }

        // restore
        currentFloor = data.floor;
        score = data.score;
        px = data.px;
        py = data.py;

        resetAttributes();
        parseEnemiesFromMap();
        initInput();

        return true;

    } catch (err) {
        console.warn("Save corrupted:", err);
        return false;
    }
}


//------------------------------------------------------
// CLEAR SAVE
//------------------------------------------------------
function clearSave() {
    localStorage.removeItem(SAVE_KEY);
    console.log("Save cleared.");
}
