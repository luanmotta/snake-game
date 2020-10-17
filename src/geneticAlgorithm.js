// Start the game over
function resetGame() {
  //
}


// Create the next generation
function nextGeneration() {
  resetGame();
  // Normalize the fitness values 0-1
  normalizeFitness(allGames);
  // Generate a new set of games
  activeGames = generate(allGames);
  // Copy those games to another array
  allGames = activeGames.slice();
}

// Generate a new population of snakes
function generate(oldGames) {
  let newGames = [];
  for (let i = 0; i < oldGames.length; i++) {
    // Select a snake based on fitness
    let game = poolSelection(oldGames);
    newGames[i] = game;
  }
  return newGames;
}

// Normalize the fitness of all snakes
function normalizeFitness(games) {
  // Make score exponentially better?
  for (let i = 0; i < games.length; i++) {
    games[i].score = Math.pow(games[i].score, 2);
  }

  // Add up all the scores
  let sum = 0;
  for (let i = 0; i < games.length; i++) {
    sum += games[i].score;
  }
  // Divide by the sum
  for (let i = 0; i < games.length; i++) {
    games[i].fitness = games[i].score / sum;
  }
}


// An algorithm for picking one snake from an array
// based on fitness
function poolSelection(games) {
  // Start at 0
  let index = 0;

  // Pick a random number between 0 and 1
  let r = Math.random(1);

  // Keep subtracting probabilities until you get less than zero
  // Higher probabilities will be more likely to be fixed since they will
  // subtract a larger number towards zero
  while (r > 0) {
    r -= games[index].fitness;
    // And move on to the next
    index += 1;
  }

  // Go back one
  index -= 1;

  // Make sure it's a copy!
  // (this includes mutation)
  games[index].snake = games[index].snake.copy();
  return games[index]
}