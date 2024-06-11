let board;
let currentPlayer;
let isGameActive;

const playerX = 'X';
const playerO = 'O';
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const cells = document.querySelectorAll('.cell');
const messageElement = document.getElementById('message');

function initializeGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = playerX;
    isGameActive = true;
    messageElement.textContent = `Player ${currentPlayer}'s turn`;

    cells.forEach(cell => {
        cell.textContent = '';
        cell.addEventListener('click', handleCellClick);
    });
}

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (board[clickedCellIndex] !== '' || !isGameActive) {
        return;
    }

    board[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    if (checkWin()) {
        messageElement.textContent = `Player ${currentPlayer} wins!`;
        isGameActive = false;
        return;
    }

    if (checkDraw()) {
        messageElement.textContent = `It's a draw!`;
        isGameActive = false;
        return;
    }

    currentPlayer = currentPlayer === playerX ? playerO : playerX;
    messageElement.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWin() {
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }
    return false;
}

function checkDraw() {
    return board.every(cell => cell !== '');
}

function resetGame() {
    initializeGame();
}

initializeGame();
