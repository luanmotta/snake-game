let keyPressed
let clock = 0

const keyboardKeys = {
  37: 'LEFT',
  38: 'UP',
  39: 'RIGHT',
  40: 'DOWN',
  13: 'ENTER'
}

function doKeyDown(evt) {
  if (keyPressed == false) {
    const key = keyboardKeys[evt.keyCode]
    gm.manageKeyPress(key)
  }
  keyPressed = true;
}

function flipflop() {
  if (clock) clock = 0;
  else clock = 1;
  return clock;
}

function process() {
  if (snake.status == "ALIVE") {
    if (flipflop()) {
      canvas.renderAll();
    } else {
      keyPressed = false;
      gm.computeMovement()
    }
  } else {
    keyPressed = false;
    gm.endGame();
  }
}

const canvas = new Canvas(WIDTH, HEIGHT)
const gm = new GM()
gm.reset();
setInterval(process, UPDATE_INTERVAL / 2);
window.addEventListener("keydown", doKeyDown, true);
