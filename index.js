var ctx;
var pixel = 30;
var matrixWidth  = 10;
var matrixHeight = 10;
var WIDTH = pixel*matrixWidth;
var HEIGHT = pixel*matrixHeight;
var food;
var snake = {};
var keyPressed;
var updateInterval = 150;
var clock = 0;
var foodsEaten = 0;
var score = 0;
var record = 0;
var margin = pixel*0.2;
var foodElement   = document.getElementById("foodsEaten");
var scoreElement  = document.getElementById("score");
var recordElement = document.getElementById("record");

class SnakeBlock {
  constructor(x = matrixWidth/2, y = matrixHeight/2, snakeDirection) {
    this.x = x;
    this.y = y;
    this.direction = snakeDirection;
  }
}

class Food {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

function reset() {
  generateSnake();
  generateFood();
  foodsEaten = 0;
  score = 0;
}

function init() {
  var canvas       = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  canvas.width  = WIDTH;
  canvas.height = HEIGHT;
  reset();
  return setInterval(draw, updateInterval/2);
}

function generateFood() {

  do {
    var randomX = Math.floor(Math.random() * matrixWidth);
    var randomY = Math.floor(Math.random() * matrixHeight);
  } while (haveSnake(randomX, randomY));

  food = new Food(randomX, randomY);
}

function generateSnake() {
  snake.status = "ALIVE";
  snake.direction = undefined;
  snake.blocks = [];
  snake.blocks[0] = new SnakeBlock();
}

function haveSnake(x, y, tail = true) {
  for (var i = 0; i < snake.blocks.length - !tail; i++) {
    if (snake.blocks[i].x == x && snake.blocks[i].y == y) return true;
  }
  return false;
}


function moveSnake() {
  switch (snake.direction) {
    case "UP":  /* Up arrow was pressed */
      if (snake.blocks[0].y - 1 >= 0 && !(haveSnake(snake.blocks[0].x, snake.blocks[0].y - 1, false))) {
        snake.blocks.unshift(new SnakeBlock(snake.blocks[0].x, snake.blocks[0].y - 1, snake.direction));
      } else snake.status = "DEAD";
      break;
    case "DOWN":  /* Down arrow was pressed */
      if (snake.blocks[0].y + 1 < matrixHeight && !(haveSnake(snake.blocks[0].x, snake.blocks[0].y + 1, false))) {
        snake.blocks.unshift(new SnakeBlock(snake.blocks[0].x, snake.blocks[0].y + 1, snake.direction));
      } else snake.status = "DEAD";
      break;
    case "LEFT":  /* Left arrow was pressed */
      if (snake.blocks[0].x - 1 >= 0 && !(haveSnake(snake.blocks[0].x - 1, snake.blocks[0].y, false))) {
        snake.blocks.unshift(new SnakeBlock(snake.blocks[0].x - 1, snake.blocks[0].y, snake.direction));
      } else snake.status = "DEAD";             
      break;  
    case "RIGHT":  /* Right arrow was pressed */
      if (snake.blocks[0].x + 1 < matrixWidth && !(haveSnake(snake.blocks[0].x + 1, snake.blocks[0].y, false))) {
        snake.blocks.unshift(new SnakeBlock(snake.blocks[0].x + 1, snake.blocks[0].y, snake.direction));
      } else snake.status = "DEAD";
      break;
    default: 
    snake.blocks.push(new SnakeBlock());
  }
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

function message(content, color) {
  ctx.fillStyle = color;
  ctx.font = "24px Helvetica";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText(content, 32, 32);
}

function renderSnake() {
  snake.blocks.forEach(function (block, index) {
    ctx.beginPath();
      switch (block.direction) {
      case "UP"    : ctx.rect(block.x * pixel, block.y * pixel  + (pixel/2) , pixel - margin, pixel * (1 + ((!index)/2))); break;
      case "DOWN"  : ctx.rect(block.x * pixel, block.y * pixel  - pixel/2, pixel - margin, pixel * (1 + ((!index)/2))); break;
      case "LEFT"  : ctx.rect(block.x * pixel  + (pixel/2), block.y * pixel, pixel * (1 + ((!index)/2)), pixel - margin); break;
      case "RIGHT" : ctx.rect(block.x * pixel  - pixel/2, block.y * pixel, pixel * (1 + ((!index)/2)), pixel - margin); break;
      default      : ctx.rect(block.x * pixel, block.y * pixel, pixel, pixel);
    }
    
    ctx.closePath();
    if (index == 0) {
     /* switch (block.direction) {
        case "UP"    : ctx.rect(block.x * pixel, block.y * pixel, pixel - margin, pixel*1.5); break;
        case "DOWN"  : ctx.rect(block.x * pixel, block.y * pixel - pixel/2 , pixel - margin, pixel*1.5); break;
        case "LEFT"  : ctx.rect(block.x * pixel, block.y * pixel, pixel*1.5, pixel - margin); break;
        case "RIGHT" : ctx.rect(block.x * pixel - pixel/2 , block.y * pixel, pixel*1.5, pixel - margin); break;
        default      : ctx.rect(block.x * pixel, block.y * pixel, pixel, pixel);
      }*/
        ctx.fillStyle = "blue";
    } 
    else if (index == snake.blocks.length - 1) ctx.fillStyle = "red";
    else ctx.fillStyle = "purple";
    ctx.fill();
    ctx.stroke();
  });
}

function renderArena() {
  ctx.beginPath();
  ctx.rect(0,0,WIDTH,HEIGHT);
  ctx.closePath();
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.strokeStyle = "black";
  ctx.stroke();
}

function renderFood(){
  ctx.beginPath();  
  ctx.rect(food.x * pixel,food.y * pixel, pixel, pixel);
  ctx.closePath();
  ctx.fillStyle = "green";
  ctx.fill();
  ctx.stroke();
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
    
function draw() {

  if (snake.status == "ALIVE") {
    if (flipflop()) {
      renderAll();
    } else {
      moveSnake();
      keyPressed = false;
      if ( snake.blocks[0].x == food.x && snake.blocks[0].y == food.y ) { 
        generateFood();
        renderFood();
        foodsEaten++;
        score = Math.round( (foodsEaten*500)  / (matrixWidth/4) / (matrixHeight/4) / (updateInterval/50));
      } else {
        snake.blocks.pop();      
      }
    } 
  } else {

    keyPressed = false;

    if (score < record) {
      message("You are dead!", "red");
    } else {
      record = score;
      message("New record!", "green");
    }  
  }
}

init();
window.addEventListener("keydown", doKeyDown, true);
