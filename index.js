const board = document.getElementById("board");
const message = document.getElementById("message");
const resetButton = document.getElementById("reset");

let currentPlayer = "X";
let gameActive = true;
let boardState = Array(9).fill("");

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function handleCellClick(event) {
  const cell = event.target;
  const cellIndex = cell.getAttribute("data-index");

  if (boardState[cellIndex] !== "" || !gameActive) {
    return;
  }

  boardState[cellIndex] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add("taken");

  if (checkWin()) {
    message.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
    return;
  }

  if (boardState.every(cell => cell !== "")) {
    message.textContent = "It's a tie!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  message.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWin() {
  return winPatterns.some(pattern => 
    pattern.every(index => boardState[index] === currentPlayer)
  );
}

function resetGame() {
  currentPlayer = "X";
  gameActive = true;
  boardState.fill("");
  message.textContent = "Player X's turn";
  Array.from(board.children).forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("taken");
  });
}

board.addEventListener("click", handleCellClick);
resetButton.addEventListener("click", resetGame);
