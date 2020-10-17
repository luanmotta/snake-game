let keyPressed
let clock = 0
// Total games per epoch
let totalPopulation = 10;
// All active games (snakes that not died yet)
let activeGames = [];
// All games for any given population
let allGames = [];
// Best snake of all time
let bestGame = null
let highScore = 0

const oppositeDirections = {
  'LEFT': 'RIGHT',
  'RIGHT': 'LEFT',
  'UP': 'DOWN',
  'DOWN': 'UP'
}

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
  // Process Game
  for (let i = 0; i < activeGames.length; i++) {
    let gm = activeGames[i]
    if (gm.snake.isDead) {
      keyPressed = false;
      gm.endGame();
      activeGames.splice(i, 1)
      i--
      continue
    }
    if (i === 0 && activeGames.length === totalPopulation) { // TODO: Watch only bestGame
      gm.renderGame();
    }
    keyPressed = false;
    gm.snake.think()
    gm.computeMovement()
  }
  // Calculate the best score
  let tempHighScore = 0;
  let tempBestGame = null;
  for (let i = 0; i < activeGames.length; i++) {
    let s = activeGames[i].score;
    if (s > tempHighScore) {
      tempHighScore = s;
      tempBestGame = activeGames[i];
    }
    // Is it the all time high scorer?
    if (tempHighScore > highScore) {
      highScore = tempHighScore;
      bestGame = tempBestGame;
    }
  }
  if (activeGames.length == 0) {
    nextGeneration();
  }
}

// Create games/population
for (let i = 0; i < totalPopulation; i++) {
  let gm = new GM();
  gm.start()
  activeGames[i] = gm;
  allGames[i] = gm;
}
setInterval(process, UPDATE_INTERVAL);
// window.addEventListener("keydown", doKeyDown, true);
