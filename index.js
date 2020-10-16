var keyPressed
var clock = 0

function doKeyDown(evt) {
  if (keyPressed == false) {
    const direction = keyboardKeys[evt.keyCode]
    switch (direction) {
      case 'LEFT':  if ( snake.direction != "RIGHT" ) gm.moveSnake(direction);  break;
      case 'UP':    if ( snake.direction != "DOWN" )  gm.moveSnake(direction);  break;
      case 'RIGHT': if ( snake.direction != "LEFT" )  gm.moveSnake(direction);  break;
      case 'DOWN':  if ( snake.direction != "UP" )    gm.moveSnake(direction);  break;
      case 'ENTER': gm.reset();
    }
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
