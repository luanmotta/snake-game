var ctx;
var pixel = 20;
var matrixWidth  = 30;
var matrixHeight = 20;
var WIDTH = pixel*matrixWidth;
var HEIGHT = pixel*matrixHeight;
var food;
var matrix;
var snake = {};

function generateSnake() {
  snake.status = "ALIVE";
  snake.direction = "undefined";
  snake.blocks = [];
  snake.blocks[0] = new SnakeBlock(matrixWidth/2, matrixHeight/2);
  matrix[matrixWidth/2][matrixHeight/2] = new SnakeBlock(matrixWidth/2, matrixHeight/2);
}

function reset() {
  clear();
  renderArena();
  generateMatrix();
  generateSnake();
  generateFood();
  renderFood();
}

function init() {
  var canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  canvas.width  = WIDTH;
  canvas.height = HEIGHT;
  reset();
  return setInterval(draw, 50);
}

function renderSnake() {
  snake.blocks.forEach(function (block) {
    ctx.beginPath();
    ctx.rect(block.x * pixel, block.y * pixel, pixel, pixel);
    ctx.closePath();
    ctx.fillStyle = "purple";
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

function generateFood() {

  do {
    var randomX = Math.floor(Math.random() * matrixWidth);
    var randomY = Math.floor(Math.random() * matrixHeight);
  } while (matrix[randomX][randomY] instanceof SnakeBlock);

  food = new Food(randomX, randomY);
  matrix[randomX][randomY] = food; 

}

function clear() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
}

function moveSnake() {
  switch (snake.direction) {
    case "UP":  /* Up arrow was pressed */
      if (snake.blocks[0].y - 1 >= 0){
        snake.blocks[0].y -= 1;
      } else snake.status = "DEAD";
      break;
    case "DOWN":  /* Down arrow was pressed */
      if (snake.blocks[0].y + 1 < matrixHeight){
        snake.blocks[0].y += 1;
      } else snake.status = "DEAD";
      break;
    case "LEFT":  /* Left arrow was pressed */
      if (snake.blocks[0].x - 1 >= 0){
        snake.blocks[0].x -= 1;
      } else snake.status = "DEAD";             
      break;  
    case "RIGHT":  /* Right arrow was pressed */
      if (snake.blocks[0].x + 1 < matrixWidth){
        snake.blocks[0].x += 1;
      } else snake.status = "DEAD";
  }
}

function doKeyDown(evt) {
  switch (evt.keyCode) {
    case 38: snake.direction = "UP";    break;
    case 40: snake.direction = "DOWN";  break;
    case 37: snake.direction = "LEFT";  break;
    case 39: snake.direction = "RIGHT"; break;
    case 13: reset();
  }
}

function message(content, color) {
  ctx.fillStyle = color;
  ctx.font = "24px Helvetica";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText(content, 32, 32);
}

function generateMatrix() {
  matrix = new Array(matrixWidth);
  matrix.fill(new Array(matrixHeight));
}

class SnakeBlock {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Food {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

function renderMatrix() {
  matrix.forEach(line => line.forEach(function(item) {

    if (item instanceof SnakeBlock) {
      renderSnake();
    } else if (item instanceof Food) {
      renderFood();
    }
  }));
}
    
function draw() {
  if (snake.status == "ALIVE") {
    renderMatrix();
    moveSnake();

    if (snake.blocks[0].x == food.x && snake.blocks[0].y == food.y) {
      generateFood();
      renderFood();
    }
  } else {
    message("You are dead!", "red");
  }
}

init();
window.addEventListener("keydown", doKeyDown, true);
