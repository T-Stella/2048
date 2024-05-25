// Select the game board and score elements
const gameBoard = document.querySelector('.game-board');
const scoreElement = document.querySelector('.score');
const restartButton = document.querySelector('.Restart-button');

// Initialize the game state
let gameState = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let score = 0;

// Function to update the game board
function updateGameBoard() {
  const tiles = document.querySelectorAll('.tile');
  tiles.forEach((tile, index) => {
    tile.textContent = gameState[index] || '';
    tile.className = `tile tile-${gameState[index]}`;
  });
}

// Function to add a new tile to the board
function addNewTile() {
  const emptyIndices = gameState.reduce((indices, tile, i) => {
    if (tile === 0) {
      indices.push(i);
    }
    return indices;
  }, []);

  if (emptyIndices.length > 0) {
    const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    gameState[randomIndex] = Math.random() < 0.9 ? 2 : 4;
    updateGameBoard();
  }
}

// Function to handle key press events
function handleKeyPress(event) {
  let moved = false;
  switch (event.key) {
    case 'ArrowUp':
      moved = shiftTilesUp();
      break;
    case 'ArrowDown':
      moved = shiftTilesDown();
      break;
    case 'ArrowLeft':
      moved = shiftTilesLeft();
      break;
    case 'ArrowRight':
      moved = shiftTilesRight();
      break;
  }

  if (moved) {
    addNewTile();
    updateScore();
  }
}

// Function to update the score
function updateScore() {
  score = gameState.reduce((total, tile) => total + tile, 0);
  scoreElement.textContent = score;
}

// Function to reset the game
function resetGame() {
  gameState = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  score = 0;
  updateGameBoard();
  updateScore();
}

// Add event listeners
document.addEventListener('keydown', handleKeyPress);
restartButton.addEventListener('click', resetGame);

// Initialize the game
addNewTile();
addNewTile();
updateGameBoard();
updateScore();

// Function to shift tiles up
function shiftTilesUp() {
  let moved = false;
  for (let col = 0; col < 4; col++) {
    let top = 0;
    for (let row = 0; row < 4; row++) {
      if (gameState[row * 4 + col] !== 0) {
        if (top !== row) {
          if (gameState[top * 4 + col] === gameState[row * 4 + col]) {
            gameState[top * 4 + col] *= 2;
            gameState[row * 4 + col] = 0;
          } else {
            gameState[top * 4 + col] = gameState[row * 4 + col];
            gameState[row * 4 + col] = 0;
          }
          moved = true;
        }
        top++;
      }
    }
  }
  return moved;
}

// Function to shift tiles down
function shiftTilesDown() {
  let moved = false;
  for (let col = 0; col < 4; col++) {
    let bottom = 3;
    for (let row = 3; row >= 0; row--) {
      if (gameState[row * 4 + col] !== 0) {
        if (bottom !== row) {
          if (gameState[bottom * 4 + col] === gameState[row * 4 + col]) {
            gameState[bottom * 4 + col] *= 2;
            gameState[row * 4 + col] = 0;
          } else {
            gameState[bottom * 4 + col] = gameState[row * 4 + col];
            gameState[row * 4 + col] = 0;
          }
          moved = true;
        }
        bottom--;
      }
    }
  }
  return moved;
}

// Function to shift tiles left
function shiftTilesLeft() {
  let moved = false;
  for (let row = 0; row < 4; row++) {
    let left = 0;
    for (let col = 0; col < 4; col++) {
      if (gameState[row * 4 + col] !== 0) {
        if (left !== col) {
          if (gameState[row * 4 + left] === gameState[row * 4 + col]) {
            gameState[row * 4 + left] *= 2;
            gameState[row * 4 + col] = 0;
          } else {
            gameState[row * 4 + left] = gameState[row * 4 + col];
            gameState[row * 4 + col] = 0;
          }
          moved = true;
        }
        left++;
      }
    }
  }
  return moved;
}

// Function to shift tiles right
function shiftTilesRight() {
  let moved = false;
  for (let row = 0; row < 4; row++) {
    let right = 3;
    for (let col = 3; col >= 0; col--) {
      if (gameState[row * 4 + col] !== 0) {
        if (right !== col) {
          if (gameState[row * 4 + right] === gameState[row * 4 + col]) {
            gameState[row * 4 + right] *= 2;
            gameState[row * 4 + col] = 0;
          } else {
            gameState[row * 4 + right] = gameState[row * 4 + col];
            gameState[row * 4 + col] = 0;
          }
          moved = true;
        }
        right--;
      }
    }
  }
  return moved;
}