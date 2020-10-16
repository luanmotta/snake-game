class SnakeBlock {
  constructor(x = MATRIX_WIDTH / 2, y = MATRIX_HEIGHT / 2) {
    this.x = x;
    this.y = y;
  }
}

class Snake {
  constructor() {
    this.status = "ALIVE";
    this.direction = undefined;
    this.blocks = [];
    this.blocks[0] = new SnakeBlock();
    this.r = 0;
    this.g = 0;
    this.b = 0;
  }

  move() {
    switch (snake.direction) {
      case "UP":  /* Up arrow was pressed */
        if (snake.blocks[0].y - 1 >= 0 && !(haveSnake(snake.blocks[0].x, snake.blocks[0].y - 1, false))) {
          snake.blocks.unshift(new SnakeBlock(snake.blocks[0].x, snake.blocks[0].y - 1));
        } else snake.status = "DEAD";
        break;
      case "DOWN":  /* Down arrow was pressed */
        if (snake.blocks[0].y + 1 < MATRIX_HEIGHT && !(haveSnake(snake.blocks[0].x, snake.blocks[0].y + 1, false))) {
          snake.blocks.unshift(new SnakeBlock(snake.blocks[0].x, snake.blocks[0].y + 1));
        } else snake.status = "DEAD";
        break;
      case "LEFT":  /* Left arrow was pressed */
        if (snake.blocks[0].x - 1 >= 0 && !(haveSnake(snake.blocks[0].x - 1, snake.blocks[0].y, false))) {
          snake.blocks.unshift(new SnakeBlock(snake.blocks[0].x - 1, snake.blocks[0].y));
        } else snake.status = "DEAD";
        break;
      case "RIGHT":  /* Right arrow was pressed */
        if (snake.blocks[0].x + 1 < MATRIX_WIDTH && !(haveSnake(snake.blocks[0].x + 1, snake.blocks[0].y, false))) {
          snake.blocks.unshift(new SnakeBlock(snake.blocks[0].x + 1, snake.blocks[0].y));
        } else snake.status = "DEAD";
        break;
      default:
      snake.blocks.push(new SnakeBlock());
    }
  }
}

function snakeColor(index) {
  var decreaseFactor;

  if (snake.blocks.lenght >= MATRIX_WIDTH * MATRIX_HEIGHT * 0.1 ) {
    decreaseFactor = 1;
  }
  else if (snake.blocks.lenght >= MATRIX_WIDTH * MATRIX_HEIGHT * 0.2)  decreaseFactor = 3;
  else decreaseFactor = 4;

  decreaseFactor = Math.round(decreaseFactor * index);

  if  (snake.r < decreaseFactor && snake.g < decreaseFactor && snake.b < decreaseFactor) {
    snake.r = Math.floor(Math.random() * 255); // 152 is good
    snake.g = Math.floor(Math.random() * 255); // 52 is good
    snake.b = Math.floor(Math.random() * 255); // 152 is good
  }

  if (snake.r >= decreaseFactor ) return `rgb(${snake.r - decreaseFactor}, ${snake.g}, ${snake.b})`;
  else if (snake.r + snake.g >= decreaseFactor ) return `rgb(0, ${snake.r + snake.g - decreaseFactor}, ${snake.b})`;
  else if (snake.r + snake.g + snake.b >= decreaseFactor ) return `rgb(0,0, ${snake.r + snake.g + snake.b - decreaseFactor})`;
  return "rgb(0, 0, 0)";
}

function haveSnake(x, y, tail = true) {
  for (var i = 0; i < snake.blocks.length - !tail; i++) {
    if (snake.blocks[i].x == x && snake.blocks[i].y == y) return true;
  }
  return false;
}
