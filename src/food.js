class Food {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

const foodEated = () => {
  generateFood();
  renderFood();
}

function generateFood() {

  do {
    var randomX = Math.floor(Math.random() * MATRIX_WIDTH);
    var randomY = Math.floor(Math.random() * MATRIX_HEIGHT);
  } while (haveSnake(randomX, randomY));

  food = new Food(randomX, randomY);
}
