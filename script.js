let fields = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    
];
let currentPlayer = 'circle';
let cells = document.querySelectorAll('.cell');


function render() {
    const board = document.getElementById('board');
    board.innerHTML = '';  // Clear the board

    for (let i = 0; i < fields.length; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');

        // Add the SVG for the player's symbol if the cell is not empty
        if (fields[i] === 'circle') {
            cell.innerHTML = '<svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="15"/></svg>';
        } else if (fields[i] === 'x') {
            cell.innerHTML = '<svg viewBox="0 0 40 40"><line x1="10" y1="10" x2="30" y2="30" /><line x1="30" y1="10" x2="10" y2="30" /></svg>';
        }

        board.appendChild(cell);

    }
    
    let cells = document.querySelectorAll('.cell');

    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => {
            if (isCellEmpty(index)) {
                updateGameState(index);
                updateDisplay(cell);
                switchPlayer();

                const result = checkGameOver();
                if (result === 'win' || result === 'draw') {
                    announceResult(result);
                }
            }
        });
    });

}

function switchPlayer() {
    if (currentPlayer === 'circle') {
        currentPlayer = 'x';
        document.getElementById('circle').classList.remove('active');
        document.getElementById('cross').classList.add('active');
    } else {
        currentPlayer = 'circle';
        document.getElementById('cross').classList.remove('active');
        document.getElementById('circle').classList.add('active');
    }
}

// Function to announce the result
function announceResult(result) {
    const announcement = document.getElementById('announcement');
    const announcementText = document.getElementById('announcement-text');

    if (result === 'win') {
        announcementText.textContent = currentPlayer + ' wins!';
    } else if (result === 'draw') {
        announcementText.textContent = 'Draw!';
    }

    announcement.classList.remove('hidden');
}

// Function to check if a cell is empty
function isCellEmpty(index) {
    // Returns true if the cell at the given index is null
    return fields[index] === null;
}

// Function to update the game state
function updateGameState(index) {
    // Sets the cell at the given index to the current player's symbol
    fields[index] = currentPlayer;
}

// Function to update the display
function updateDisplay(cell) {
    // Determines the correct SVG based on the current player's symbol
    const svg = currentPlayer === 'circle'
        ? '<svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="15" fill="#FFFFFF" stroke-width="4"></svg>'
        : '<svg viewBox="0 0 40 40"><line x1="5" y1="5" x2="35" y2="35" stroke="#ff0000" stroke-width="4" /> <line x1="35" y1="5" x2="5" y2="35" stroke="#ff0000" stroke-width="4" /></svg>';
      
    // Updates the cell's inner HTML with the SVG
    cell.innerHTML = svg;
}



// For each cell, attach a click event listener
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => {
        if (isCellEmpty(index)) {
            updateGameState(index);
            updateDisplay(cell);
            switchPlayer();

            // Check for game over
            const result = checkGameOver();
            if (result === 'win') {
                document.getElementById('game-history').innerHTML += `<p>${currentPlayer} wins!</p>`;
            } else if (result === 'draw') {
                document.getElementById('game-history').innerHTML += '<p>Draw!</p>';
            }

            document.getElementById('circle').classList.remove('active');
            document.getElementById('cross').classList.remove('active');
            document.getElementById(currentPlayer).classList.add('active');
        }
    });
});
let gameOver = false;

function checkGameOver() {
    // Winning combinations
    const lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
        [0, 4, 8], [2, 4, 6]              // Diagonals
    ];

    for (let line of lines) {
        if (fields[line[0]] === currentPlayer &&
            fields[line[1]] === currentPlayer &&
            fields[line[2]] === currentPlayer) {
            document.getElementById('game-history').innerHTML += `<p>${currentPlayer} wins!</p>`;
            document.getElementById('announcement').classList.remove('hide');
            gameOver = true;
            return 'win';
        }
    }

    // Check for draw
    if (fields.every(cell => cell !== null)) {
        document.getElementById('game-history').innerHTML += '<p>Draw!</p>';
        document.getElementById('announcement').classList.remove('hide');
        gameOver = true;
        return 'draw';
    }
    

    // Game is not over
    return false;
}
function resetGameState() {
    fields = [null, null, null, null, null, null, null, null, null];
    currentPlayer = 'circle';
    document.getElementById('game-history').innerHTML = '';
    render();
}

function clearGameHistory() {
    document.getElementById('game-history').innerHTML = '';
}

function resetGame() {
    resetGameState();
    clearGameHistory();
    render();
    document.getElementById('announcement').classList.add('hide');

}

function handleClick() {
    if (gameOver) {
        resetGame();
        gameOver = false;
    } else {
        const result = checkGameOver();
        if (result === 'win' || result === 'draw') {
            gameOver = true;
        }
    }
}
document.getElementById('announcement').addEventListener('click', () => {
    if (gameOver) {
        resetGame();
    }
});