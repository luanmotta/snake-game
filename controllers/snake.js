class SnakeBlock {
  constructor(x = matrixWidth/2, y = matrixHeight/2, snakeDirection) {
    this.x = x;
    this.y = y;
    this.direction = snakeDirection;
  }
}

function generateSnake() {
  snake.status = "ALIVE";
  snake.direction = undefined;
  snake.blocks = [];
  snake.blocks[0] = new SnakeBlock();
}

function renderSnake() {
  snake.blocks.forEach(function (block, index) {
    ctx.beginPath();
      switch (block.direction) {

        case "UP"    : ctx.rect(block.x * pixel,
                      block.y * pixel  + (pixel/2 * (index > 0) ),
                      pixel - margin,
                      pixel * (1 + ((!index)/2)));
                      break;

        case "DOWN"  : ctx.rect(block.x * pixel,
                      block.y * pixel  - pixel/2,
                      pixel - margin,
                      pixel * (1 + ((!index)/2)));
                      break;

        case "LEFT"  : ctx.rect(block.x * pixel + (pixel/2 * (index > 0) ),
                      block.y * pixel, pixel * (1 + ((!index)/2)),
                      pixel - margin);
                      break;

        case "RIGHT" : ctx.rect(block.x * pixel  - pixel/2,
                      block.y * pixel, pixel * (1 + ((!index)/2)),
                      pixel - margin);
                      break;

        default      : ctx.rect(block.x * pixel,
                      block.y * pixel  - pixel/2,
                      pixel - margin,
                      pixel * (1 + ((!index)/2)));
    }

    // use this for squared snake -> ctx.rect(block.x * pixel, block.y * pixel, pixel, pixel);

    ctx.closePath();
    ctx.fillStyle = snakeColor(index);
    ctx.fill();
    ctx.stroke();
  });
}

function snakeColor(index) {
  var decreaseFactor = 4,
      r = 152,
      g = 52,
      b = 152;

  decreaseFactor *= index;

  if (decreaseFactor <= r) return `rgb(${r - decreaseFactor}, ${g}, ${b})`;
  else if (decreaseFactor <= r+g) return `rgb(0, ${r + g - decreaseFactor}, ${b})`;
  else if (decreaseFactor <= r+g+b ) return `rgb(0,0, ${r + g + b - decreaseFactor})`;
  return "rgb(0, 0, 0)";
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