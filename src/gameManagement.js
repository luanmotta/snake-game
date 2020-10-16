const UPDATE_INTERVAL = 100
const PIXEL_SIZE      = 30
const MATRIX_WIDTH    = 16
const MATRIX_HEIGHT   = 16
const WIDTH           = PIXEL_SIZE * MATRIX_WIDTH
const HEIGHT          = PIXEL_SIZE * MATRIX_HEIGHT
const MARGIN          = PIXEL_SIZE * 0.2

class GM {
  constructor() {
    this.canvas = new Canvas()
    this.record = localStorage.record
  }

  renderGame() {
    this.canvas.renderAll(
      this.foodsEaten,
      this.score,
      this.record,
      this.snake,
      this.food
    )
  }

  manageKeyPress(key) {
    if (key === 'ENTER') {
      this.reset()
    }
    if (key !== oppositeDirections[this.snake.direction]) {
      this.changeSnakeDirection(key)
    }
  }

  computeMovement() {
    this.snake.move();
    this.tryToEat();
  }

  changeSnakeDirection(direction) {
    this.snake.direction = direction
  }

  tryToEat() {
    if (this.snake.blocks[0].x == this.food.x && this.snake.blocks[0].y == this.food.y) {
      this.generateFood()
      this.foodsEaten++;
      this.score = this.scoreFormula();
    } else {
      this.snake.blocks.pop();
    }
  }

  generateFood() {
    this.food = {}
    do {
      this.food.x = Math.floor(Math.random() * MATRIX_WIDTH);
      this.food.y = Math.floor(Math.random() * MATRIX_HEIGHT);
    } while (this.snake.haveSnake(this.food.x, this.food.y));
  }

  endGame() {
    if (this.score < localStorage.record) {
      this.canvas.renderMessage("You are dead!", "red");
    } else {
      localStorage.record = this.score;
      this.record = this.score
      this.canvas.renderMessage("New record!", "green");
    }
  }

  reset() {
    if (localStorage.record == undefined) {
      localStorage.record = 0;
    }
    this.snake = new Snake();
    this.generateFood()
    this.foodsEaten = 0;
    this.score = 0;
  }

  scoreFormula () {
    return Math.round(
      (this.foodsEaten * 500) / (MATRIX_WIDTH / 4) / (MATRIX_HEIGHT / 4) / (UPDATE_INTERVAL / 50)
    );
  }
}
