var ctx
const UPDATE_INTERVAL = 100
const PIXEL_SIZE      = 30
const MATRIX_WIDTH    = 16
const MATRIX_HEIGHT   = 16
const WIDTH           = PIXEL_SIZE * MATRIX_WIDTH
const HEIGHT          = PIXEL_SIZE * MATRIX_HEIGHT
const MARGIN          = PIXEL_SIZE * 0.2
let foodsEaten          = 0
let score               = 0
var snake             = {}
var food


const keyboardKeys = {
  37: 'LEFT',
  38: 'UP',
  39: 'RIGHT',
  40: 'DOWN',
  13: 'ENTER'
}

class GM {
  constructor() {
    //
  }

  computeMovement() {
    moveSnake();
    this.tryToEat();
  }

  moveSnake(direction) {
    snake.direction = direction
  }

  tryToEat() {
    if ( snake.blocks[0].x == food.x && snake.blocks[0].y == food.y ) {
      foodEated()
      foodsEaten++;
      score = scoreFormula();
    } else {
      snake.blocks.pop();
    }
  }


  endGame() {
    if (score < localStorage.record) {
      renderMessage("You are dead!", "red");
    } else {
      localStorage.record = score;
      renderMessage("New record!", "green");
    }
  }

  reset() {
    if (localStorage.record == undefined) {
      localStorage.record = 0;
    }
    generateSnake();
    generateFood();
    foodsEaten = 0;
    score = 0;
  }
}

const scoreFormula = () => {
  return Math.round(
    (foodsEaten * 500) / (MATRIX_WIDTH / 4) / (MATRIX_HEIGHT / 4) / (UPDATE_INTERVAL / 50)
  );
}
