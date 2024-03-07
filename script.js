let fields = [null, null, null, null, null, null, null, null, null];
let currentPlayer = "circle";
let cells = document.querySelectorAll(".cell");

function render() {
  const board = document.getElementById("board");
  board.innerHTML = ""; // Clear the board

  for (let i = 0; i < fields.length; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");

    // Add the SVG for the player's symbol if the cell is not empty
    if (fields[i] === "circle") {
      cell.innerHTML =
        '<svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="15"/></svg>';
    } else if (fields[i] === "x") {
      cell.innerHTML =
        '<svg viewBox="0 0 40 40"><line x1="10" y1="10" x2="30" y2="30" /><line x1="30" y1="10" x2="10" y2="30" /></svg>';
    }

    board.appendChild(cell);
    // Remove active class from both symbols
    document.getElementById("circle").classList.remove("active");
    document.getElementById("cross").classList.remove("active");

    // Add active class to the current player's symbol
    document.getElementById(currentPlayer).classList.add("active");
  }

  let cells = document.querySelectorAll(".cell");

  function switchPlayer() {
    if (currentPlayer === "circle") {
      currentPlayer = "x";
      document.getElementById("circle").classList.remove("active");
      document.getElementById("cross").classList.add("active");
    } else {
      currentPlayer = "circle";
      document.getElementById("cross").classList.remove("active");
      document.getElementById("circle").classList.add("active");
    }
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
    const svg =
      currentPlayer === "circle"
        ? '<svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="15" fill="#FFFFFF" stroke-width="4"></svg>'
        : '<svg viewBox="0 0 40 40"><line x1="5" y1="5" x2="35" y2="35" stroke="#ff0000" stroke-width="4" /> <line x1="35" y1="5" x2="5" y2="35" stroke="#ff0000" stroke-width="4" /></svg>';
    // Updates the cell's inner HTML with the SVG
    cell.innerHTML = svg;
  }

  cells.forEach((cell, index) => {
    cell.addEventListener("click", () => {
      if (isCellEmpty(index)) {
        updateGameState(index);
        updateDisplay(cell);

        const result = checkGameOver();
        if (result !== false) {
          gameOver = true;
          document.getElementById("announcement").classList.remove("hide");

          // If there's a win, highlight the winning line
          if (result !== "draw") {
            result.indices.forEach((i) =>
              cells[i].classList.add(`winning-line-${result.type}`)
            );
          }
        } else {
          switchPlayer();
        }
      }
    });
  });
  let gameOver = false;

  function checkGameOver() {
    // Winning combinations
    const lines = [
      { type: "horizontal", indices: [0, 1, 2] },
      { type: "horizontal", indices: [3, 4, 5] },
      { type: "horizontal", indices: [6, 7, 8] },
      { type: "vertical", indices: [0, 3, 6] },
      { type: "vertical", indices: [1, 4, 7] },
      { type: "vertical", indices: [2, 5, 8] },
      { type: "diagonal-right", indices: [0, 4, 8] },
      { type: "diagonal-left", indices: [2, 4, 6] },
    ];

    for (let line of lines) {
      if (
        fields[line.indices[0]] === currentPlayer &&
        fields[line.indices[1]] === currentPlayer &&
        fields[line.indices[2]] === currentPlayer
      ) {
        document.getElementById(
          "game-history"
        ).innerHTML += `<p>${currentPlayer} wins!</p>`;
        document.getElementById(
          "announcement-text"
        ).innerHTML = `${currentPlayer} wins!`;
        document.getElementById("announcement").classList.remove("hide");
        gameOver = true;
        return line; // Return the winning line
      }
    }

    // Check for draw
    if (fields.every((cell) => cell !== null)) {
      document.getElementById("game-history").innerHTML += "<p>Draw!</p>";
      document.getElementById("announcement-text").innerHTML = "Draw!";
      document.getElementById("announcement").classList.remove("hide");
      gameOver = true;
      return "draw";
    }

    // Game is not over
    return false;
  }
  function resetGameState() {
    fields = [null, null, null, null, null, null, null, null, null];
    currentPlayer = "circle";
    document.getElementById("game-history").innerHTML = "";
    render();
  }

  function clearGameHistory() {
    document.getElementById("game-history").innerHTML = "";
  }

  function resetGame() {
    resetGameState();
    clearGameHistory();
    render();
    document.getElementById("announcement").classList.add("hide");
    document.getElementById("game-history").classList.add("hide");
  }

  document.getElementById("announcement").addEventListener("click", () => {
    if (gameOver) {
      resetGame();
    }
  });
}
render();
