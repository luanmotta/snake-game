var keyPressed;
var clock = 0;
var foodsEaten = 0;
var score = 0;
var record = 0;
var foodElement   = document.getElementById("foodsEaten");
var scoreElement  = document.getElementById("score");
var recordElement = document.getElementById("record");

function reset() {
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
  recordElement.innerHTML = `Record: ${record}`;
}

function flipflop() {
  if (clock) clock = 0;
  else clock = 1;
  return clock;
}

function deadSneak() {
  keyPressed = false;
  if (score < record) {
    message("You are dead!", "red");
  } else {
    record = score;
    message("New record!", "green");
  }
}

function tryEat() {
  if ( snake.blocks[0].x == food.x && snake.blocks[0].y == food.y ) { 

    generateFood();
    renderFood();
    foodsEaten++;
    score = Math.round( (foodsEaten*500)  / (matrixWidth/4) / (matrixHeight/4) / (updateInterval/50));

  } else snake.blocks.pop();    
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
