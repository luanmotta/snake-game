const foodElement         = document.getElementById("foodsEaten")
const scoreElement        = document.getElementById("score")
const recordElement       = document.getElementById("record")
const canvasElement       = document.getElementById("canvas");

class Canvas {
  constructor() {
    this.ctx = canvasElement.getContext("2d");
    canvasElement.width  = WIDTH;
    canvasElement.height = HEIGHT;
  }
  renderAll(foodsEaten, score, record, snake, food) {
    this.renderArena();
    this.renderSnake(snake);
    this.renderFood(food);
    foodElement.innerHTML = `Foods Eaten: ${foodsEaten}`;
    scoreElement.innerHTML = `Score: ${score}`;
    recordElement.innerHTML = `Record: ${record}`;
  }
  renderMessage(content, color) {
    this.ctx.fillStyle = color;
    this.ctx.font = "24px Helvetica";
    this.ctx.textAlign = "left";
    this.ctx.textBaseline = "top";
    this.ctx.fillText(content, 32, 32);
  }
  _drawRect(d1, d2, d3, d4, fillStyle, strokeStyle) {
    this.ctx.beginPath();
    this.ctx.rect(d1, d2, d3, d4);
    this.ctx.closePath();
    this.ctx.fillStyle = fillStyle;
    this.ctx.fill();
    if (strokeStyle) this.ctx.strokeStyle = strokeStyle;
    this.ctx.stroke();
  }
  renderArena() {
    this._drawRect(0, 0, WIDTH, HEIGHT, 'white', 'black')
  }
  renderFood(food) {
    this._drawRect(food.x * PIXEL_SIZE, food.y * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE, 'green')
  }
  renderSnake(snake) {
    snake.blocks.forEach((block, index) => {
      this._drawRect(block.x * PIXEL_SIZE, block.y * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE, snake.snakeColor(index + 1))
    });
  }
}
