let game = document.getElementById("game");
let form = document.getElementById("player-form");
let player1 = "X";
let player2 = "O";
let playerMap = {
  X: "",
  O: "",
};
function loadPlayerForm() {
  game.hidden = !game.hidden;
  form.hidden = !form.hidden;
}

function startGame() {
  player1 = document.getElementById("player1").value;
  player2 = document.getElementById("player2").value;
  // validating whether their names are greater than 5 characters
  if (player1.length > 5 && player2.length > 5) {
    game.hidden = !game.hidden;
    form.hidden = !form.hidden;
    document.getElementById("player1ScoreCard").innerText = player1;
    document.getElementById("player2ScoreCard").innerText = player2;
    document.getElementById("player-name").innerText = player1;
    playerMap.X = player1;
    playerMap.O = player2;
  }
}

// Selecting all the cells, game status, and restart button
const cells = document.querySelectorAll(".cell");
const gameStatus = document.getElementById("game-status");
const restartButton = document.getElementById("restart-button");

// Initializing game variables
let currentPlayer = "X";
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

// Winning conditions for the Tic Tac Toe game
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Function to handle cell click event
function handleCellClick(clickedCellEvent) {
  const clickedCell = clickedCellEvent.target;
  const clickedCellIndex = parseInt(
    clickedCell.getAttribute("data-cell-index")
  );

  // Check if the cell is already filled or the game is inactive
  if (gameState[clickedCellIndex] !== "" || !gameActive) {
    console.log("Already filled or game over");
    return;
  }

  // Update game state and display current player's symbol
  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.innerHTML = currentPlayer;

  // Check for a win or draw, then switch players
  checkWin();
  checkDraw();
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  document.getElementById("player-name").innerText = playerMap[currentPlayer];
}

// Function to check for a win
function checkWin() {
  console.log("win");
  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    if (
      gameState[a] &&
      gameState[a] === gameState[b] &&
      gameState[a] === gameState[c]
    ) {
      // If there's a win, update scores and display winner
      gameActive = false;
      switch (gameState[a]) {
        case "X": {
          console.log("X");
          let xScore = parseInt(
            document.getElementById("playerXScore").innerText
          );
          xScore++;
          document.getElementById("playerXScore").innerText = xScore;
          break;
        }
        case "O": {
          console.log("O");
          let oScore = parseInt(
            document.getElementById("playerOScore").innerText
          );
          oScore++;
          document.getElementById("playerOScore").innerText = oScore;
          break;
        }
        default: {
          console.log("Invalid Game State");
        }
      }
      gameStatus.innerHTML = `Player ${playerMap[gameState[a]]} wins!`;
      return;
    }
  }
}

// Function to check for a draw
function checkDraw() {
  if (!gameState.includes("") && gameActive) {
    // If it's a draw and no cells are empty, end the game
    gameActive = false;
    gameStatus.innerHTML = "It's a draw!";
    return;
  }
}

// Function to restart the game
function restartGame() {
  // Reset all game-related variables and display elements
  gameActive = true;
  currentPlayer = "X";
  gameState = ["", "", "", "", "", "", "", "", ""];
  gameStatus.innerHTML = "";
  cells.forEach((cell) => (cell.innerHTML = ""));
  document.getElementById("player-name").innerText = "X";
}

// Function to reset the scores
function resetScore() {
  // Reset scores for both players to zero
  document.getElementById("playerXScore").innerText = "0";
  document.getElementById("playerOScore").innerText = "0";
}

// Add event listeners to cells and restart button
cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
restartButton.addEventListener("click", restartGame);
