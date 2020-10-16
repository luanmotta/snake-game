class SnakeBlock {
  constructor(x = MATRIX_WIDTH / 2, y = MATRIX_HEIGHT / 2) {
    this.x = x;
    this.y = y;
  }
}

class Snake {
  constructor() {
    this.isDead = false;
    this.direction = undefined;
    this.blocks = [];
    this.blocks[0] = new SnakeBlock();
    this.r = 0;
    this.g = 0;
    this.b = 0;
  }

  move() {
    const sneakHead = this.blocks[0]
    switch (this.direction) {
      case "UP":  /* Up arrow was pressed */
        if (sneakHead.y - 1 >= 0 && !(this.haveSnake(sneakHead.x, sneakHead.y - 1))) {
          this.blocks.unshift(new SnakeBlock(sneakHead.x, sneakHead.y - 1));
        } else this.isDead = true;
        break;
      case "DOWN":  /* Down arrow was pressed */
        if (sneakHead.y + 1 < MATRIX_HEIGHT && !(this.haveSnake(sneakHead.x, sneakHead.y + 1))) {
          this.blocks.unshift(new SnakeBlock(sneakHead.x, sneakHead.y + 1));
        } else this.isDead = true;
        break;
      case "LEFT":  /* Left arrow was pressed */
        if (sneakHead.x - 1 >= 0 && !(this.haveSnake(sneakHead.x - 1, sneakHead.y))) {
          this.blocks.unshift(new SnakeBlock(sneakHead.x - 1, sneakHead.y));
        } else this.isDead = true;
        break;
      case "RIGHT":  /* Right arrow was pressed */
        if (sneakHead.x + 1 < MATRIX_WIDTH && !(this.haveSnake(sneakHead.x + 1, sneakHead.y))) {
          this.blocks.unshift(new SnakeBlock(sneakHead.x + 1, sneakHead.y));
        } else this.isDead = true;
        break;
      default:
      this.blocks.push(new SnakeBlock());
    }
  }
  haveSnake(x, y) {
    for (var i = 0; i < this.blocks.length; i++) {
      if (this.blocks[i].x == x && this.blocks[i].y == y) return true;
    }
    return false;
  }
  snakeColor(index) {
    var decreaseFactor;

    if (this.blocks.lenght >= MATRIX_WIDTH * MATRIX_HEIGHT * 0.1 ) {
      decreaseFactor = 1;
    }
    else if (this.blocks.lenght >= MATRIX_WIDTH * MATRIX_HEIGHT * 0.2)  decreaseFactor = 3;
    else decreaseFactor = 4;

    decreaseFactor = Math.round(decreaseFactor * index);

    if  (this.r < decreaseFactor && this.g < decreaseFactor && this.b < decreaseFactor) {
      this.r = Math.floor(Math.random() * 255); // 152 is good
      this.g = Math.floor(Math.random() * 255); // 52 is good
      this.b = Math.floor(Math.random() * 255); // 152 is good
    }

    if (this.r >= decreaseFactor ) return `rgb(${this.r - decreaseFactor}, ${this.g}, ${this.b})`;
    else if (this.r + this.g >= decreaseFactor ) return `rgb(0, ${this.r + this.g - decreaseFactor}, ${this.b})`;
    else if (this.r + this.g + this.b >= decreaseFactor ) return `rgb(0,0, ${this.r + this.g + this.b - decreaseFactor})`;
    return "rgb(0, 0, 0)";
  }
}
