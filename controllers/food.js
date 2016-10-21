class Food {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

function generateFood() {

  do {
    var randomX = Math.floor(Math.random() * matrixWidth);
    var randomY = Math.floor(Math.random() * matrixHeight);
  } while (haveSnake(randomX, randomY));

  food = new Food(randomX, randomY);
}

function renderFood(){
  ctx.beginPath();  
  ctx.rect(food.x * pixel,food.y * pixel, pixel, pixel);
  ctx.closePath();
  ctx.fillStyle = "green";
  ctx.fill();
  ctx.stroke();
}