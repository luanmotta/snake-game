const foodElement         = document.getElementById("foodsEaten")
const scoreElement        = document.getElementById("score")
const recordElement       = document.getElementById("record")
const canvasElement       = document.getElementById("canvas");

class Canvas {
  constructor(width, height) {
    ctx = canvasElement.getContext("2d");
    canvasElement.width  = width;
    canvasElement.height = height;
  }
  renderAll() {
    renderArena();
    renderSnake();
    renderFood();
    foodElement.innerHTML = `Foods Eaten: ${foodsEaten}`;
    scoreElement.innerHTML = `Score: ${score}`;
    recordElement.innerHTML = `Record: ${localStorage.record}`;
  }
}

function renderAll() {
  renderArena();
  renderSnake();
  renderFood();
  foodElement.innerHTML = `Foods Eaten: ${foodsEaten}`;
  scoreElement.innerHTML = `Score: ${score}`;
  recordElement.innerHTML = `Record: ${localStorage.record}`;
}

const renderMessage = (content, color) => {
  ctx.fillStyle = color;
  ctx.font = "24px Helvetica";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText(content, 32, 32);
}

function renderFood(){
  ctx.beginPath();
  ctx.rect(food.x * PIXEL_SIZE,food.y * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE);
  ctx.closePath();
  ctx.fillStyle = "green";
  ctx.fill();
  ctx.stroke();
}

function renderSnake() {
  snake.blocks.forEach(function (block, index) {
    ctx.beginPath();
    ctx.rect(block.x * PIXEL_SIZE, block.y * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE);
    ctx.closePath();
    ctx.fillStyle = snakeColor(index + 1);
    ctx.fill();
    ctx.stroke();
  });
}

function renderArena() {
  ctx.beginPath();
  ctx.rect(0, 0, WIDTH, HEIGHT);
  ctx.closePath();
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.strokeStyle = "black";
  ctx.stroke();
}
