const cells = document.querySelectorAll('.tiles');
let spanText = document.querySelector('.result');
let restartBtn = document.querySelector('.reset-btn');


let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isPlaying = false;



const winningCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


initializeGame();

function initializeGame() {
    cells.forEach(cell => {
        cell.addEventListener('click', speakText);
        cell.addEventListener('click', cellClicked);
        restartBtn.addEventListener('click', resetGame);
        spanText.innerHTML = `<p> Player <span class = "bold"> ${currentPlayer}</span>'s turn </p>`;
        isPlaying = true;
    })
}

function cellClicked() {
    const cellIndex = this.getAttribute('cellIndex');

    if (board[cellIndex] !== '' || !isPlaying) {
        return;
    }
    cells.forEach(cell => {
        cell.addEventListener('click', speakText);
    })

    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index) {
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function changePlayer() {
    currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
    spanText.innerHTML = `<p>Player <span class = "bold">${currentPlayer}</span>'s turn</p>`;
}

function checkWinner() {
    let roundWon = false;

    for (let i = 0; i < winningCombination.length; i++) {
        const condition = winningCombination[i];
        const cellA = board[condition[0]];
        const cellB = board[condition[1]];
        const cellC = board[condition[2]];

        if (cellA === '' || cellB === '' || cellC === '') {
            continue;
        }
        if (cellA === cellB && cellB === cellC) {
            roundWon = true;
            break;
        }
    }

    if (roundWon === true) {
        spanText.innerHTML = `<p>Player<span class = "bold"> ${currentPlayer}</span>Wins!!!</p>`;
        isPlaying = false;
    }
    else if (!board.includes('')) {
        spanText.innerHTML = `<p> Draw!! </p>`;
        isPlaying = false;
    }
    else {
        changePlayer();
    }
}

function resetGame() {
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    spanText.innerHTML = `<p>Player<span class = "bold"> ${currentPlayer}</span>'s turn</p>`;
    cells.forEach(cell => cell.textContent = '');
    isPlaying = true;
}

function textToSpeech(text) {
    let utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
}

function speakText() {
    textToSpeech(span);
}


