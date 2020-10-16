class SnakeBlock {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

const getDirection = (outputs) => {
  // Decide direction
  let maxValue = { value: outputs[0], index: 0 }
  outputs.forEach((value, index) => {
    if (value > maxValue.value) {
      maxValue.value = value
      maxValue.index = index
    }
  })
  const directionValues = {
    0: 'LEFT',
    1: 'UP',
    2: 'RIGHT',
    3: 'DOWN'
  }
  return directionValues[maxValue.index]
}


function randomGaussian(mean, sd) {
  var y1, x1, x2, w;
  do {
    x1 = Math.random(2) - 1;
    x2 = Math.random(2) - 1;
    w = x1 * x1 + x2 * x2;
  } while (w >= 1);
  w = Math.sqrt(-2 * Math.log(w) / w);
  y1 = x1 * w;
  y2 = x2 * w;
  var m = mean || 0;
  var s = sd || 1;
  return y1 * s + m;
};

// Mutation function to be passed into snake.brain
function mutate(x) {
  if (Math.random(1) < 0.1) {
    let offset = randomGaussian() * 0.5;
    let newx = x + offset;
    return newx;
  } else {
    return x;
  }
}

class Snake {
  constructor(brain) {
    this.isDead = false;
    this.direction = 'UP';
    this.blocks = [];
    this.blocks[0] = new SnakeBlock(MATRIX_WIDTH / 2, MATRIX_HEIGHT / 2);
    this.r = 0;
    this.g = 0;
    this.b = 0;

    // Is this a copy of another Snake or a new one?
    // The Neural Network is the snake's "brain"
    if (brain instanceof NeuralNetwork) {
      this.brain = brain.copy();
      this.brain.mutate(mutate);
    } else {
      this.brain = new NeuralNetwork(2, 8, 4);
    }

    // Score is how many frames it's been alive
    this.score = 0;
    // Fitness is normalized version of score
    this.fitness = 0;
  }

  // Create a copy of this snake
  copy() {
    return new Snake(this.brain);
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

  // This is the key function now that decides
  // if it should jump or not jump!
  think() {
    // Now create the inputs to the neural network
    let inputs = [];
    // x position of the snake
    inputs[0] = this.blocks[0].x;
    // y position of the snake
    inputs[1] = this.blocks[0].y;
    // Get the outputs from the network
    let outputs = this.brain.predict(inputs);

    this.changeDirection(getDirection(outputs))
  }

  changeDirection(direction) {
    if (direction !== oppositeDirections[this.direction]) {
      this.direction = direction
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
