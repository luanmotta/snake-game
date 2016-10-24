var keyPressed,
    clock               = 0,
    foodsEaten          = 0,
    foodElement         = document.getElementById("foodsEaten"),
    scoreElement        = document.getElementById("score"),
    recordElement       = document.getElementById("record"),
    score               = 0;

function reset() {
  if (localStorage.record == undefined) localStorage.record = 0;
  generateSnake();
  generateFood();
  foodsEaten = 0;
  score = 0;
}

function init() {
  var canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  canvas.width  = WIDTH;
  canvas.height = HEIGHT;
  reset();
  return setInterval(draw, updateInterval/2);
}

function doKeyDown(evt) {
  if (keyPressed == false) {
    switch (evt.keyCode) {
      case 38: if ( snake.direction != "DOWN" )  snake.direction = "UP";    break;
      case 40: if ( snake.direction != "UP" )    snake.direction = "DOWN";  break;
      case 37: if ( snake.direction != "RIGHT" ) snake.direction = "LEFT";  break;
      case 39: if ( snake.direction != "LEFT" )  snake.direction = "RIGHT"; break;
      case 13: reset();
    }
  }
  keyPressed = true;
}

function renderAll() {
  renderArena();
  renderSnake();
  renderFood();
  foodElement.innerHTML = `Foods Eaten: ${foodsEaten}`;
  scoreElement.innerHTML = `Score: ${score}`;
  recordElement.innerHTML = `Record: ${localStorage.record}`;
}

function flipflop() {
  if (clock) clock = 0;
  else clock = 1;
  return clock;
}

function deadSneak() {
  keyPressed = false;
  if (score < localStorage.record) {
    message("You are dead!", "red");
  } else {
    localStorage.record = score;
    message("New record!", "green");
  }
}

function tryEat() {
  if ( snake.blocks[0].x == food.x && snake.blocks[0].y == food.y ) { 

    generateFood();
    renderFood();
    foodsEaten++;
    score = scoreFormula();

  }  else snake.blocks.pop();    
}  


function draw() {

  if (snake.status == "ALIVE") {

    if (flipflop()) {
      renderAll();
    } else {
      moveSnake();
      keyPressed = false;
      tryEat();    
    } 
  } else deadSneak();
}

init();
window.addEventListener("keydown", doKeyDown, true);
