const statusDisplay = document.querySelector('.status');
const cells = document.querySelectorAll('.grid-cell');
const gameOverText = document.querySelector('#game-result');
const restartButton = document.querySelector('#restart-button');

let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];

statusDisplay.querySelector('#status-message').textContent = "It's X's turn";

function handleCellClick(event)
{
  const clickedCell = event.target;
  const clickedCellIndex = parseInt(clickedCell.getAttribute('data-value'));

  if (!gameActive || gameState[clickedCellIndex] !== "") {
    return;
  }

  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.textContent = currentPlayer;
  clickedCell.classList.add(currentPlayer);

  if (checkWin() || checkDraw()) {
    endGame();
  } else {
    togglePlayer();
  }
}

function togglePlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusDisplay.querySelector('#status-message').textContent = "It's " + currentPlayer + "'s turn";
}

function checkWin() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (gameState[a] && gameState[a] === gameState[b] && gameState[b] === gameState[c]) {
      return true;
    }
  }

  return false;
}

function checkDraw() {
  return gameState.every(cell => cell !== "");
}

function endGame() {
  gameActive = false;
  statusDisplay.querySelector('#status-message').textContent = "";
  gameOverText.textContent = currentPlayer + " wins!";
}

function restartGame() {
  gameActive = true;
  currentPlayer = "X";
  statusDisplay.querySelector('#status-message').textContent = "It's X's turn";
  gameOverText.textContent = "";
  gameState = ["", "", "", "", "", "", "", "", ""];

  cells.forEach(cell => {
    cell.classList.remove('x', 'o');
    cell.textContent = "";
  });
}

cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});
restartButton.addEventListener('click', restartGame);
